import { Company } from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

// 1. REGISTER COMPANY
export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required",
        success: false,
      });
    }

    // Check if company already exists
    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "Company name already exists",
        success: false,
      });
    }

    // Check if req.id exists (from isAuthenticated middleware)
    if (!req.id) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }

    company = await Company.create({
      name: companyName,
      userId: req.id,
    });

    return res.status(201).json({
      message: "Company registered successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.log("Register company error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// 2. GET ALL COMPANIES BY USER
export const getCompany = async (req, res) => {
  try {
    const userId = req.id;
    if (!userId) {
      return res
        .status(401)
        .json({ message: "User not authenticated", success: false });
    }

    const companies = await Company.find({ userId });

    // 👇 FIX: Agar companies nahi hain, toh 404 (error) mat bhejo.
    // 200 OK ke sath ek empty array bhejo taaki frontend Redux state update kar sake!
    if (!companies || companies.length === 0) {
      return res.status(200).json({
        companies: [],
        success: true, // Isko true rakhna zaroori tha
      });
    }

    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.log("Get company error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// 3. GET COMPANY BY ID
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }
    return res.status(200).json({
      company,
      success: true,
    });
  } catch (error) {
    console.log("Get company by id error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// 4. UPDATE COMPANY
export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;

    const updateData = { name, description, website, location };

    // ✅ FIX: Logo upload tabhi hoga jab file exist karegi
    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      updateData.logo = cloudResponse.secure_url;
    }

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!company) {
      return res.status(404).json({
        message: "Company not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Company information updated",
      company,
      success: true,
    });
  } catch (error) {
    console.log("Update company error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
