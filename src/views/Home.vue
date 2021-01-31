<template>
  <div class="home">
    <Header>My memo</Header>
   <div class="container">
   <!-- <input placeholder="Todoを入力してください" class="form-control"> -->
  

  <!-- <div class="mt-3 mb-3 card">
    <div class="card-body">
      <form class="">
        <div class="form-row align-items-center">
          <input placeholder="Todoを入力してください" class="form-control" style="display: inline-block;">
          <div class="input-group-append" style="margin: 0px;">
            <button type="submit" class="btn btn-success">Add</button>
          </div>
        </div>
      </form>
    </div>
  </div> -->


   <div  class="form-row">
    <div class="col-md-10">
      <b-form-input v-model="memoBody" placeholder="Enter todo"></b-form-input>
    </div>
    <div class="col">
      <!-- <label for="inputTitle" class="col-md-2 control-label"> -->
      <b-button variant="primary" @click="save">add</b-button>
      <!-- </label> -->
    </div>
   </div>
   <div class="list-group list-group-flush">
     <div class="list-group-item list-group-item-dark">Todo List</div>
     <div v-for="memo in list" :key="memo.taskid" class="list-group-item">
       <div class="row">
        <div class="col-sm-10" >{{memo.task}}</div>
        <div class="col-sm-2">
          <button type="button" class="btn btn-outline-danger" @click="remove(memo.taskid) ">remove</button>
        </div>
       </div>
     </div>
   </div>

    </div><!-- container -->
  </div>
</template>

<style>
textarea {
    width: 100%;
    height: 10em;
}

button {
    border: 1px solid #333;
    background-color: #333;
    color: #fff;
    padding: 10px 20px;
    margin-top: 10px;
}
</style>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
a {
  display: block;
  border-bottom: 1px solid #ccc;
  padding: 20px;
  color: inherit;
  text-decoration: none;
  text-align: left;
  margin-bottom: 5px;
}
</style>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Header from '@/components/Header.vue';
import web3 from '../contracts/web3';
import todo_contract from '../contracts/todo_contract';
// import list from '../contracts/list';




export default {
  name: 'home',
  data: function(){
    return{
      accounts: '',
      list: []
    }
  },
  // data: {
  //   list: ''
  // },
  components: {
    Header
  },
  // created: function(){
  //   window.addEventListener("load", this.onWindowLoad);
  // },

  mounted: async function(){
    // window.addEventListener("load", this.onWindowLoad);
    const accounts = await web3.eth.getAccounts();
      const result = await todo_contract.methods.getTodosByOwner(accounts[0]).call();
    
      await Promise.all(result.map(async number => { 
        return await todo_contract.methods.todos(number).call();
      })).then(value => {
        // console.log(value);
        // this.setState({todolist: value});
        var filter_list = [];
        value.map(filter_value => {
          // console.log(filter_value.flag)
          if(filter_value.flag === true){
            // console.log(filter_value);
            filter_list.push(filter_value)
            // return filter_value;
          }
          
        })
        this.list = filter_list;
        console.log(this.list);
      });
  },
  methods: {
    // async onWindowLoad(){
    //   const accounts = await web3.eth.getAccounts();
    //   const result = await todo_contract.methods.getTodosByOwner(accounts[0]).call();
    
    //   await Promise.all(result.map(async number => { 
    //     return await todo_contract.methods.todos(number).call();
    //   })).then(value => {
    //     // console.log(value);
    //     // this.setState({todolist: value});
    //     this.list = value;
    //     console.log(this.list);
    //   });
    // },
    save: function(){
            web3.eth.getAccounts().then((accounts)=>{
                console.log(accounts);
                this.ethAccount = accounts[0];
                console.log(this.ethAccount);

                todo_contract.methods.TodoCreate(this.memoBody)
                .send({from: accounts[0]});
            });
            //alert('保存されました');
            this.$store.commit("save",{
                body: this.memoBody
            })
            // this.$router.push("/");
            // console.log(this.getAccounts)
            // console.log(getCurrentAccount())
            // web3.eth.Contract(todo_contract,state.contractAddress).methods.TodoCreate(memo.body).send({from:state.accounts[0]})
    },
    remove: function(memo_id){
      console.log(memo_id);
      web3.eth.getAccounts().then((accounts)=>{
        console.log(accounts);
        this.ethAccount = accounts[0];
        console.log(this.ethAccount);

        todo_contract.methods.TodoRemove(memo_id)
        .send({from: accounts[0]});
      });
    }, 
  },
  // mounted: {
  //   hoge: async function(){
  //     const accounts = await web3.eth.getAccounts();
  //     console.log(accounts[0]);

  //     const result = await todo_contract.methods.getTodosByOwner(this.accounts[0]).call();
  //       console.log(result);
        
  //       var todos = result.map(function(number){
  //         return todo_contract.methods.todos(number).call();
  //       });

  //       console.log(todos);
  //   }
  // },
  computed: {
    newest: function(){
      
      
      // console.log(this.list);
      return this.$store.state.memos.slice().reverse();
      // return this.list;
    },
    // hoge: async function(){
    //   const accounts = await web3.eth.getAccounts();
    //   console.log(accounts[0]);
    // }


  }
}
</script>
