<template>

  <div class="row-0 comment-container">
    <share-dialog  v-if="isAuth" :edit="isEdit"  @updated="onUpdated"  :content_id="content_id" :parent_id=parent_content.id :is-comment="isComment"></share-dialog>
    <div class="comment-list row-0">

      <div class="comment col-lg-12"  v-for="data in comments" v-if="parent_content.id==data.parent_id ">
        <router-link :to="{ name: 'user', params: {name:data.name, user_id:data.user_id} }">
        <picture>
          <img :src="data.avatar" />
        </picture>
        <author>
          {{data.name}}
        </author>
        </router-link>
        <date>{{data.created_at}}</date>
        <button class="btn default small" v-if="isAuth && data.user_id==user.id" @click="deleteContent(data.id)">{{$t("form.delete")}}</button>
        <button class="btn default small" v-if="isAuth && data.user_id==user.id" @click="editContent(data.id)">{{$t("form.edit")}}</button>
        <content v-html="data.html_content"></content>
        <actions :content=data  v-on:toggleComment="toggleComment"></actions>
      </div>
    </div>

  </div>
</template>
<script>
import {mapGetters , mapActions} from 'vuex';
export default {
    name: "Comments",
    props:{
      parent_content:
      {
        default:false
      }
    },
    data() {
        return{

          isComment:true,
          isEdit:false,
          content_id:0,
          content:[],
          error:""
        }
      },
      async created(){

        this.getComment( this.parent_content.id );

      },
      methods:{
        ...mapActions('content', ['getComment']),

        deleteContent(id){
          axios.delete('/api/content/'+id).then(({data}) => {
            this.$store.commit('content/deleteContent', id);
          })
        },
        onUpdated (value) {
          this.isEdit=false;
        },
        editContent(id){
          this.isEdit=true;
          this.content_id=id;
        },


        toggleComment(id){
          console.log(this.$refs.id);
        }
      },
      computed:{
        user(){
          return this.$store.getters["user/getUser"];
        },        
        comments(){
          return  this.$store.getters["content/getCommentById"](this.parent_content.id);
        },
        isAuth(){
          return this.$store.getters["user/isAuth"];
        }
      }
    }
</script>
<style>

</style>
