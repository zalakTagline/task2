import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCard } from "../redux/biddingSystem/action";

function Card({ fees, user }) {
  const [cardValues, setCardValues] = useState({
    f1: "",
    f2: "",
    f3: "",
    f4: "",
    f5: "",
    f6: "",
  });
  const [error, setError] = useState({
    f1: "",
    f2: "",
    f3: "",
    f4: "",
    f5: "",
    f6: "",
  });

  const dispatch = useDispatch();

  const handleCardValue = (e) => {
    const { name, value } = e.target;
    const filedValues = Object.values(user.bids).map((val) => val[name]);
    // console.log('filedValues :>> ', filedValues ,userBidCards);
    if (value.length > 7) {
      setError({ ...error, [name]: "only 7 digits allowed" });
    } else if (
      filedValues.includes(value) ||
      Object.values(cardValues).includes(value)
    ) {
      setError({ ...error, [name]: "value should be unique" });
    } else if (value === "") {
      setError((prevErr) => ({ ...prevErr, [name]: "field is empty" }));
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
    Object.entries(cardValues).forEach(([key, val]) => {
      if (val === "") {
        isValid = false;
        setError((prevErr) => ({ ...prevErr, [key]: "field is empty" }));
      }
    });
    return isValid;
  };
  const submit = (e) => {
    e.preventDefault();
    if (formValid()) {
      dispatch(addCard(user.id, fees, cardValues));
      setCardValues({
        f1: "",
        f2: "",
        f3: "",
        f4: "",
        f5: "",
        f6: "",
      });
      setError({
        f1: "",
        f2: "",
        f3: "",
        f4: "",
        f5: "",
        f6: "",
      });
    }
  };

  return (
    <>
      {Object.keys(user.bids).includes(fees.toString()) ? (
        <div className="card" style={{ pointerEvents: "none", opacity: "0.6" }}>
          <div className="mr">{fees ? fees : "free"}</div>
          <form className="card-form">
            {Object.keys(cardValues).map((key, i) => {
              return (
                <div key={i}>
                  <input
                    type="number"
                    name={key}
                    value={user?.bids[fees][key]}
                    readOnly={true}
                  />
                </div>
              );
            })}
            <button className="card-btn" disabled={true}>submit</button>
          </form>
        </div>
        
      ) : (
        <div
          className="card"
          style={
            user.curCard !== fees || fees > user.coins
              ? { pointerEvents: "none", opacity: "0.6" }
              : {}
          }
        >
          <div className="mr">{fees ? fees : "free"}</div>

          <form className="card-form" onSubmit={submit}>
            {Object.keys(cardValues).map((key, i) => {
              return (
                <div key={`card${i}`}>
                  <input
                    type="number"
                    name={key}
                    data={key}
                    value={cardValues[key]}
                    onChange={handleCardValue}
                    readOnly={user.curCard !== fees || fees > user.coins}
                  />
                  <span className="err-txt">{error[key]}</span>
                </div>
              );
            })}
            <button className="card-btn" disabled={user.curCard !== fees || fees > user.coins}>submit</button>
          </form>
        </div>
      )}
    </>
  );
}

export default Card;
