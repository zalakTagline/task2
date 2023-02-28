import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCard } from "../redux/biddingSystem/action";
import Btn from "./Btn";

function Card({ fees, user }) {
  useEffect(() => {
    resetCard();
  }, [user]);
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

  const resetCard = () => {
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

const handleCardValue = (e) => {
  const { name, value } = e.target;

  const temp = { ...cardValues, [name]: value }
  let filedValues = Object.values(user.bids).map((card) => {
    return Object.values(card);
  });

  filedValues = filedValues.flat(1);

  let errorMsg =""
  if (value === "") {
    errorMsg = "field is empty"
   
  }else if (value.length > 7) {
    errorMsg =  "only 7 digits allowed" ;
  }
  else if(filedValues.includes(value)){
    errorMsg = "value must be unique"
  }
  
  setError((prevErr) => ({ ...prevErr, [name]: errorMsg }));

  const newCardVal = Object.values(temp).filter((item, index) => Object.values(temp).indexOf(item) !== index)
  Object.entries(temp).forEach(([key, tempValue])=>{
    let errorMsg=""
    console.log('key ,tempValue :>> ', key ,tempValue);
    if(newCardVal.includes(tempValue) && tempValue !== ""){
      errorMsg = "value must be unique"
    }
    setError((prevErr) => ({ ...prevErr, [key]:errorMsg }))
  })
  
  setCardValues((prv) => ({ ...prv, [name]: value }));
};

  const submit = (e) => {
    e.preventDefault();
    if (formValid()) {
      dispatch(addCard(user.id, fees, cardValues));
      resetCard();
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
            <Btn
              className="card-btn"
              isDisabled={true}
              type="submit"
              label="submitted"
            />
          </form>
        </div>
      ) : (
        <div
          className={`card ${
            user.curCard !== fees || fees > user.coins
              ? "disabledCard"
              : "enabledCard"
          }`}
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

            <Btn
              className="card-btn"
              isDisabled={user.curCard !== fees || fees > user.coins}
              type="submit"
              label="submit"
            />
          </form>
        </div>
      )}
    </>
  );
}

export default Card;

