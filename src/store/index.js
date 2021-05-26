import axios from 'axios'
import Vue from 'vue';
import VuexPersistence from 'vuex-persist'
import Vuex from 'vuex'; Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

const uri = `http://localhost:8081`;
import USUARIOS from './modules/users';
export default new Vuex.Store({
  state: {
    token: null
  },
  mutations: {
    addToken: (state, token) => { state.token = token } 
  },
  actions: {
    async autenticationAction({commit,dispatch}, usuario) {
      const response = await axios.post(`${uri}/auth`, usuario);
      commit('addToken', response.data.token);
      dispatch('USUARIOS/getUsersAction');
    },

    async dismissAction({commit}) {
      commit('addToken', null);
      location.reload();
    }
  },
  modules: {
    USUARIOS
  },
  plugins: [vuexLocal.plugin]
})
