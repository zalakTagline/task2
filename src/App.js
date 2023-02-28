import { useDispatch, useSelector } from "react-redux";
import {
  
  generateCoins,
  generateUser,
} from "./redux/biddingSystem/action";
import { useEffect } from "react";
import Card from "./components/Card";
// import Slider from "./components/slider/Slider";
import Btn from "./components/Btn";
import { NavLink } from "react-router-dom";
import CopyButton from "./components/CopyBtn";

function App() {
  const dispatch = useDispatch();
  const curUser = useSelector((state) =>
    state.item.users.filter((user) => user.id === state.item.currentUserId)
  )[0];
  const cards = useSelector((state) => state.item.cards);
  const totalUsers = useSelector((state) => state.item.users.length);
  useEffect(() => {
    if (!curUser) {
      dispatch(generateUser());
    }
   
  }, []);
  useEffect(() => {
    if (curUser) {
      if (
        curUser.generatedCoins === 2 &&
        curUser.coins < curUser.curCard &&
        totalUsers < 6
      ) {
        alert(
          "Not enough coins and you have generated coins 2 times ,generating new user"
        );
        dispatch(generateUser());
      }
    }
  }, [curUser?.bids]);
  return (
    <div className="App">
      <div className="nav">
        Task
        <div className="btn-container">
          {/* {console.log('curUser.allBids :>> ', curUser?.allBids)} */}
          <Btn
            isDisabled={
              totalUsers >= 6 || !curUser?.allBids.includes(0) ? true : false
            }
            clickHandler={() => dispatch(generateUser())}
            label="Generate User"
          />

          {curUser ? (
            <>
              <span>{curUser.name}</span>
              <span>coins : {curUser.coins}</span>
              <Btn
                clickHandler={() => dispatch(generateCoins(curUser.id))}
                isDisabled={
                  curUser.generatedCoins === 2 || !curUser?.allBids.includes(0)
                    ? true
                    : false
                }
                label={"Generate Coins"}
                type="Button"
              />

              <NavLink
                to="/result"
                
              >
                <Btn
                  label="Result"
                  isDisabled={totalUsers ===1 || (totalUsers ===2 && !curUser.allBids.includes(0)) ? true : false}
                />
              </NavLink>
              <CopyButton code={JSON.stringify(curUser)}/>
            </>
          ) : null}
        </div>
      </div>

      {curUser ? (
        <>
          {/* <Slider  user={curUser}/> */}
           {console.log('process.env.REACT_APP_API :>> ', process.env.REACT_APP_API_URL)}
          <div className="card-container">
            {cards.map((card, index) => (
              <Card key={index} fees={card} user={curUser} />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

export default App;
