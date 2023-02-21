import { useDispatch, useSelector } from "react-redux";
import { calLUB, generateCoins , generateUser} from "./redux/biddingSystem/action";
import Card from "./components/card";

function App() {
  const cards = [0,500,1000,2000,3000,4000]
  const dispatch = useDispatch();
  const  curUser = useSelector((state) =>
    state.item.users.filter((user) => user.id === state.item.currentUserId)
    )[0];
  const totalUsers = useSelector(state => state.item.users.length)
  return (
    <div className="App">
      <div className="nav">
        Task
        <div className="btn-container">
          <button disabled={totalUsers >=6 ? true : false}onClick={() => dispatch(generateUser())}>generate user</button>
          {curUser ? (
            <>
              <span>{curUser?.name}</span>
              <span>coins : {curUser.coins}</span>
              <button
                onClick={() => dispatch(generateCoins(curUser.id))}
                disabled={curUser ? false : true}
              >
                generateCoins
              </button>
              <button onClick={() => {
                dispatch(calLUB())
              
              }}>
                Result
              </button>
            </>
          ) : null}
        </div>
      </div>
     
      {curUser ? (
            <div className="card-container">
           {/* { console.log(' :>> ', result)} */}
           {cards.map((card,i)=> <Card key={i} fees={card} user={curUser}/>)}
   
         </div>) : null}
      
    </div>
  );
}

export default App;
