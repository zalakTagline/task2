import React from "react";
import "./slider.css";

import {AiOutlineLeft} from 'react-icons/ai'
import {AiOutlineRight} from 'react-icons/ai'

export default function BtnSlider({ direction, moveSlide }) {
//   console.log(direction, moveSlide);
  return (
    <button
      onClick={moveSlide}
      className={direction === "next" ? "btn-slide next" : "btn-slide prev"}
    >
      {direction === "next" ? <AiOutlineRight/> : <AiOutlineLeft />}
    </button>
  );
}