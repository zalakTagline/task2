import { useState } from "react";
import BtnSlider from "./BtnSlider";
import './slider.css'
import Card from "../card";
export default function Slider({user}) {
    const cards = [0, 500, 1000, 2000, 3000, 4000]; 
    const [slideIndex, setSlideIndex] = useState(1)

    const nextSlide = () => {
        if(slideIndex !== cards.length){
            setSlideIndex(slideIndex + 1)
        } 
        else if (slideIndex === cards.length){
            setSlideIndex(1)
        }
    }

    const prevSlide = () => {
        if(slideIndex !== 1){
            setSlideIndex(slideIndex - 1)
        }
        else if (slideIndex === 1){
            setSlideIndex(cards.length)
        }
    }

    const moveDot = index => {
        setSlideIndex(index)
    }

    return (
        <div className="container-slider">
            {cards.map((card, index) => {
                return (
                    <div
                    key={index}
                    className={slideIndex === index + 1 ? "slide active-anim" : "slide"}
                    >
                        <Card  fees={card} user={user} />
                    </div>
                )
            })} 
              
            <BtnSlider moveSlide={nextSlide} direction={"next"} />
            <BtnSlider moveSlide={prevSlide} direction={"prev"}/>

            <div className="container-dots">
                {Array.from({length: 6}).map((item, index) => (
                    <div key={index}
                    onClick={() => moveDot(index + 1)}
                    className={slideIndex === index + 1 ? "dot active" : "dot"}
                    ></div>
                ))}
            </div>
        </div>
    )
}