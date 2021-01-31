import web3 from './web3'
import todo_contract from './todo_contract'

// class list {

//     constructor() {
      
//       this.state ={
//         todolist: []
//       }
//     }


    
    


// }


var list = async function() {
  
    const accounts = await web3.eth.getAccounts();
    const result = await todo_contract.methods.getTodosByOwner(accounts[0]).call();
    
    await Promise.all(result.map(async number => { 
      return await todo_contract.methods.todos(number).call();
    })).then(value => {
      console.log(value);
      return value;
    });
  }



export default list;