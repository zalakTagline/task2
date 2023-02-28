import { GENERATE_USER, GENERATE_COINS , ADD_CARD , LUB ,RESET_GAME} from "./actionType";
const minCoins = 2000;
const maxCoins = 6000;

function generatingCoins(state, userId) {
  const newUsers = state.users.map((user) => {
    if (user.id === userId) {
      if (user.generatedCoins < 2) {
        user.generatedCoins += 1;
        user.coins += Math.floor(
          Math.random() * (maxCoins - minCoins) + minCoins
        );
        return user;
      } else {
        return user;
      }
    } else {
      return user;
    }
  });

  return newUsers;
}

function generateUserFun(state) {
  
    return {
      id: new Date().getTime().toString(),
      name: "user" + (state.users.length + 1),
      bids: {
        
      },
      allBids:[],
      coins: 0,
      generatedCoins: 0,
      curCard:0
    };
  
}
function addCardFunc(state,userId,fees,cardValues){
//  alert(cardValues)
 const newUsers = state.users.map(user =>{
  if(user.id === userId){
    user.bids ={...user.bids , [fees]:{...cardValues}}
    user.coins -= fees
    user.allBids.push(fees)
    user.curCard = state.cards.indexOf(fees) !== state.cards.length && state.cards[state.cards.indexOf(fees) +1]
    return user
  }else{
    return user
  }
 })
//  console.log('newUsers :>> ', newUsers);
 return newUsers
}

function calLUBfunc(state){
  let allBids = []
      state.users.forEach(user => {
        Object.values(user.bids).forEach(bid =>{
           allBids = [...allBids, ...Object.values(bid)]
        })
      })
      const uni = allBids.filter(item => allBids.indexOf(item) === allBids.lastIndexOf(item))
      const lub = Math.min(...uni) 
      if(lub ===Infinity){
        return 'no unique value found';
      }else{
        console.log('allBids :>> ', uni);
        console.log('lub :>> ', lub);  
        return lub;
      }
       
     
  }

export const generateUser = () => {
  return {
    type: GENERATE_USER,
    generateUserFun,
  };
};

export const generateCoins = (payload) => {
  return {
    type: GENERATE_COINS,
    payload,
    generatingCoins,
  };
};
export const addCard = (userId,fees,cardValues) => {
  return {
    type: ADD_CARD,
    userId,
    fees,
    cardValues,
    addCardFunc,
  };
};
export const calLUB = () => {
  return {
    type: LUB,
    calLUBfunc
  };
};
export const resetGame = () => {
  return {
    type: RESET_GAME,
    
  };
};

