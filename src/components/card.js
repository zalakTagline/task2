import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {  addCard } from "../redux/biddingSystem/action";

function Card({ fees, user }) {
  const [cardValues, setCardValues] = useState({
    f1: null,
    f2: null,
    f3: null,
    f4: null,
    f5: null,
    f6: null,
  });
  const [error, setError] = useState({
    f1: "",
    f2: "",
    f3: "",
    f4: "",
    f5: "",
    f6: "",
  });
  const dispatch = useDispatch()

  const handleCardValue = (e) => {
    const reg = RegExp(/^[1-7]+$/);
    const { name, value } = e.target;
    const filedValues = Object.values(user.bids).map((val) =>  val[name])
    if (!reg.test(value) || filedValues.includes(value)) {
      setError({ ...error, [name]: "value should be unique and include 1 to 7 numbers" });
    } else {
      setError({ ...error, [name]: "" });
    }
    setCardValues((prv) => ({ ...prv, [name]: value }));
  };

  const formValid = () => {
    let isValid = true;

    Object.values(error).forEach((val) => {
      if (val.length > 0) {
        isValid = false;
      }
    });
    Object.values(cardValues).forEach((val) => {
      if (val === null) {
        isValid = false;
      }
    });
    return isValid;
  };
  const submit = (e) => {
    e.preventDefault();
    if (formValid()) {
      // alert("valid")
      dispatch(addCard(user.id,fees,cardValues))
      setCardValues({
        f1: null,
        f2: null,
        f3: null,
        f4: null,
        f5: null,
        f6: null,
      })
      setError({
        f1: "",
        f2: "",
        f3: "",
        f4: "",
        f5: "",
        f6: "",
      })

    }else{
      alert("not valid")

    }
    
  };

  return (
    <>
      {Object.keys(user.bids).includes(fees.toString()) ? (
        <div className="card" style={{ pointerEvents: "none", opacity: "0.6" }}>
          <div className="mr">{fees ? fees : "free"}</div>
          <form className="card-form" onSubmit={submit}>
            {Object.keys(cardValues).map((key,i) => {
              return (
                <div key={i}>
                  <input
                    type="number"
                    name={key}
                    value={user.bids[fees][key]}
                    onChange={handleCardValue}
                  
                  />
                 
                </div>
              );
            })}
            <button className="card-btn">submit</button>
          </form>
        </div>
      ) : (
        <div
          className="card"
          style={
            fees > user.coins ? { pointerEvents: "none", opacity: "0.6" } : {}
          }
        >
          <div className="mr">{fees ? fees : "free"}</div>
          <form className="card-form" onSubmit={submit}>
            {Object.keys(cardValues).map((key,i) => {
              return (
                <div key={`card${i}`}>
                  <input
                    type="number"
                    name={key}
                    value={cardValues.key}
                    onChange={handleCardValue}
                  />
                  <span className="err-txt">{error[key]}</span>
                </div>
              );
            })}
            <button className="card-btn">submit</button>
          </form>
        </div>
      )}
    </>
  );
}

export default Card;
