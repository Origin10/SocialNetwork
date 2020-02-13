import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import content from './modules/content'
import comments from './modules/comments'
import likes from './modules/likes'
Vue.use(Vuex)


export const store = new Vuex.Store({

  modules:{
      user,
      content,
      comments,
      likes,
  },

});
