<template>
    <div class="editor">
        <Header>Edit memo</Header>
        <textarea name="memo" v-model="memoBody"></textarea>
        <button @click="save">保存</button>
        <button class="remove" @click="remove">削除</button>
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

.remove{
    background-color: transparent;
    color: #f33;
    border: none;
}
</style>

<script>
import Header from '@/components/Header.vue';
export default {
    name: "edit",
    data: function(){
        return{
            memoBody: ''
        }
    },
    mounted: function() {
        let id = this.$route.params["id"];
        let memo = this.$store.state.memos.slice().find(memo => memo.id == id);
        this.memoBody = memo.body;
    },
    computed:{
        memo: function(){
            let id = this.$route.params["id"];
            return this.$store.state.memos.find(memo => memo.id == id);
        }
    },
    methods:{
        save: function(){
            //alert('保存されました');
            this.$store.commit("update",{
                id: this.$route.params["id"],
                body: this.memoBody
            })
            this.$router.push("/");
        },
        remove: function(){
            this.$store.commit("remove",this.$route.params["id"]);
            this.$router.push("/");
        }
    },
    components: {
        Header
    }

    
}
</script>