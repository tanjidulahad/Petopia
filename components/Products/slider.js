import React, { useState, useEffect, useRef } from "react";
import { GoPrimitiveDot } from "react-icons/go";
import { Sliderimage ,Dot} from "./styled";

const featuredProducts = [
  "https://img.onmanorama.com/content/dam/mm/en/food/features/images/2021/10/17/pizza.jpg",
  "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8N3x8fGVufDB8fHx8&w=1000&q=80",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHt0T3F5FkyPbTzSnHVOu_oX8Pc0rezMq5WlzA1WmpkB8lIRKDiOFO8TmpUAcdqYQJjm4&usqp=CAU",
];

let count = 0;
let slideInterval;
export default function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slideRef = useRef();

  const removeAnimation = () => {
    slideRef?.current?.classList?.remove("fade-anim");
  };

  useEffect(() => {
    slideRef.current.addEventListener("animationend", removeAnimation);
    slideRef.current.addEventListener("mouseenter", pauseSlider);
    slideRef.current.addEventListener("mouseleave", startSlider);

    startSlider();
    return () => {
      pauseSlider();
    };
    // eslint-disable-next-line
  }, []);

  const startSlider = () => {
    slideInterval = setInterval(() => {
      handleOnNextClick();
    }, 3000);
  };

  const pauseSlider = () => {
    clearInterval(slideInterval);
  };

  const handleOnNextClick = () => {
    count = (count + 1) % featuredProducts.length;
    setCurrentIndex(count);
    slideRef.current?.classList?.add("fade-anim");
  };



  return (
    <div ref={slideRef} className="w-full select-none relative">
      <div className=" mx-2 ">
        <Sliderimage src={featuredProducts[currentIndex]} alt="" />
      </div>

      <div className=" w-full flex justify-center flex-row my-2">
          {
              featuredProducts.map((value,index)=>(
                <Dot key={index} >
                <GoPrimitiveDot color={ index === currentIndex ?"#D85A5A":"#2424243F"}/>
            </Dot>

              ))
          }


      </div>
{/*
      <div className="absolute w-full top-1/2 transform -translate-y-1/2 px-3 flex justify-between items-center">
        <button
          className="bg-black text-white p-1 rounded-full bg-opacity-50 cursor-pointer hover:bg-opacity-100 transition"
          onClick={handleOnPrevClick}
        >
          <AiOutlineVerticalRight size={30} />
        </button>
        <button
          className="bg-black text-white p-1 rounded-full bg-opacity-50 cursor-pointer hover:bg-opacity-100 transition"
          onClick={handleOnNextClick}
        >
          <AiOutlineVerticalLeft size={30} />
        </button>
      </div> */}
    </div>
  );
}
