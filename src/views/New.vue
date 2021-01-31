<template>
    <div class="editor">
        <Header>New memo</Header>
        <textarea name="memo" v-model="memoBody"></textarea>
        <button @click="save">保存</button>
    </div>
</template>

<style scoped>
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

<script>
import Header from '@/components/Header.vue';

import web3 from '../contracts/web3'
import todo_contract from '../contracts/todo_contract'
// import contract_address from '../contracts/contract_address'

export default {
    name: "new",
    data: function(){
        return {
            memoBody: "",
            ethAccount: ""
        }
        
    },
    // data: {
    //     getAccounts: ''
    // },
    methods:{
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

        window:onload = async function() {  
            const accounts = await web3.eth.getAccounts();
            console.log(accounts[0]);
            // this.getAccounts = accounts[0];
        },
        
    },
    // computed: async function(){
        
    //     var ret = await web3.eth.getAccounts()
    //     console.log(ret);
    // },
    // mounted: function() {
    //     // var ret = this.fetchSample()
    //     // console.log(ret)
    // },
    components: {
        Header
    }

    
}
</script>