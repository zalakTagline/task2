import { useDispatch, useSelector } from "react-redux";
import {
  calLUB,
  generateCoins,
  generateUser,
} from "./redux/biddingSystem/action";
import { useEffect } from "react";
import Card from "./components/card";
// import Slider from "./components/slider/Slider";

function App() {
  

  const dispatch = useDispatch();
  const curUser = useSelector((state) =>
    state.item.users.filter((user) => user.id === state.item.currentUserId)
  )[0];
  const cards = useSelector(state => state.item.cards)
  const totalUsers = useSelector((state) => state.item.users.length );
  useEffect(() => {
    if(!curUser){

       dispatch(generateUser());
    }

  }, []);
  useEffect(() => {
    if(curUser){

      if(curUser.generatedCoins === 2 && curUser.coins <curUser.curCard && totalUsers <6){
       alert("Not enough coins and you have generated coins 2 times ,generating new user")
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
          <button
            disabled={totalUsers >= 6 || !curUser?.allBids.includes(0) ? true : false }
            onClick={() => dispatch(generateUser())}
          >
            generate user
          </button>
          {curUser ? (
            <>
              <span>{curUser.name}</span>
              <span>coins : {curUser.coins}</span>
              <button
                onClick={() => dispatch(generateCoins(curUser.id))}
                disabled={curUser.generatedCoins === 2 || !curUser?.allBids.includes(0) ? true : false}
              >
                generateCoins
              </button>
              <button
                onClick={() => {
                  dispatch(calLUB());
                  dispatch(generateUser());
                }}
                disabled={totalUsers === 1 ? true : false}
              >
                Result
              </button>
            </>
          ) : null}
        </div>
      </div>

      {curUser ? (
        <>
         {/* <Slider  user={curUser}/> */}
      
       
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
