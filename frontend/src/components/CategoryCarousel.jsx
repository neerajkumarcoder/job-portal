import React from "react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "../redux/jobSlice";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Data Science",
  "Graphic Designer",
  "FullStack Developer",
];

function CategoryCarousel() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="w-full px-2 sm:px-4">
      <Carousel className="w-full max-w-xs sm:max-w-lg md:max-w-xl mx-auto my-10 sm:my-16 md:my-20">
        <CarouselContent>
          {category.map((cat, index) => (
            <CarouselItem
              key={cat}
              // 1 per slide on mobile, 2 on tablet, 3 on desktop
              className="basis-full sm:basis-1/2 md:basis-1/3 px-2 flex justify-center"
            >
              <Button
                onClick={() => searchJobHandler(cat)}
                variant="outline"
                className="rounded-full w-full sm:w-auto text-xs sm:text-sm md:text-base"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex -left-4" />
        <CarouselNext className="hidden sm:flex -right-4" />
      </Carousel>
    </div>
  );
}

export default CategoryCarousel;
