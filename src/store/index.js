import Vue from 'vue'
import Vuex from 'vuex'
import web3 from '../contracts/web3'
// import todo_contract from '../contracts/todo_contract';

Vue.use(Vuex)


// window.addEventListener('load', async()=>{
//     var list = '';
//     const accounts = await web3.eth.getAccounts();
//     const result = await todo_contract.methods.getTodosByOwner(accounts[0]).call();
    
//     await Promise.all(result.map(async number => { 
//       return await todo_contract.methods.todos(number).call();
//     })).then(value => {
//       console.log(value);
//     //   return value;
//       list = value;
//       // this.setState({todolist: value});
//     });
// })
// console.log(list);

export default new Vuex.Store({
    data:{
      contractAddress: '0xfb208c6a68cfaad012b92625363630ff2afbbd9e'
    },
    state:{
        memos: [
            {id: 1, body: 'サンプルのメモ' },
        ],
        
    },
    methods: {
        fetchSample: async function(){
            return await web3.eth.getAccounts()
        }
    },
    
    mutations: {
        save(state, memo){
            // 最大のidを取得する
            var max = state.memos[state.memos.length - 1].id
            memo.id = max + 1
            state.memos.push(memo)
        },
        update(state, data){
            var x = state.memos.find(memo => memo.id == data.id);
            x.body = data.body
        },
        remove(state, id){
            for(var i=0; i<state.memos.length; i++){
                if(state.memos[i].id == id){
                    state.memos.splice(i, 1);
                }
            }
        }

    }
})