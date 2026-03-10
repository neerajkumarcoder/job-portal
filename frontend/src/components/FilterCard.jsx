import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice";
const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: [
      "Frontend Developer",
      "Backend Developer",
      "FullStack Developer",
      "Java Developer",
    ],
  },
  // {
  //   filterType: "Salary",
  //   array: ["0-40k", "42-1lakh", "11lakh to 51lakh"],
  // },
];

function FilterCard() {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();
  const changeHandler = (value) => {
    setSelectedValue(value);
  };
  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);
  return (
    <div className="w-full bg-white p-3 rounded-md 
        sm:p-4 sm:rounded-lg 
        md:max-w-md md:mx-auto md:p-6
        ">
      <h1 className="font-bold text-lg sm:text-xl md:text-2xl">Filter Jobs</h1>
      <hr className="mt-3 mb-2" />
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data, index) => (
          <div key={data.filterType} className="mb-4 sm:mb-6">
            <h1 className="font-bold text-lg sm:text-xl">{data.filterType}</h1>
            {data.array.map((item, idx) => {
              const itemId = `id${index}-${idx}`;
              return (
                <div 
                  className="flex items-center space-x-2 my-2 
                  sm:my-3
                  " 
                  key={itemId}
                >
                  <RadioGroupItem value={item} id={itemId} />
                  <Label 
                    htmlFor={itemId}
                    className="text-base sm:text-lg"
                  >
                    {item}
                  </Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}

export default FilterCard;
