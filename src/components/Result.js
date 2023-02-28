import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { calLUB ,resetGame } from "../redux/biddingSystem/action";
import Btn from "./Btn";
function Result() {
  useEffect(() => {
    dispatch(calLUB());
   
  }, []);

  // dispatch(generateUser());
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const LUB = useSelector((state) => state.item.LUB);
  return (
     <div className="flex-box">
     <h1>Lowest Unique Bid: {LUB}</h1>
     <div className="flex-row-box">

     <Btn label="Reset" clickHandler={() => {
        dispatch(resetGame())
        navigate("/")
        }}/>
        <Btn label="Go Back" clickHandler={() => navigate("/")}/>
     </div>
     </div>
  ) 
}

export default Result;
