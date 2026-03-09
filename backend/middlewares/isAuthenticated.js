import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    // UPDATE 1: Token nikalne ka tareeka behtar kiya hai.
    // Ab ye pehle Cookies mein check karega (req.cookies?.token).
    // Agar wahan nahi mila, toh ye 'Authorization' header mein check karega (req.headers.authorization).
    // Isse agar cookie block bhi ho jaye, toh frontend ka token pass ho jayega.
    const token =
      req.cookies?.token || req.headers?.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "User not authenticated (Token missing)",
        success: false,
      });
    }

    // UPDATE 2: process.env.SECRET_KEY ensure karein ki string format mein ho
    const decode = jwt.verify(token, process.env.SECRET_KEY);

    if (!decode) {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }

    req.id = decode.userId;
    next();
  } catch (error) {
    console.log("Authentication error:", error);
    return res.status(401).json({
      message: "Invalid or expired token",
      success: false,
    });
  }
};

export default isAuthenticated;
