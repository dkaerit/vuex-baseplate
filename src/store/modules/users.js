import axios from 'axios'
import store from '../index'
const uri = `http://localhost:8081/users`;

export default {
    namespaced: true,
    state: { // variables globales de la aplicación
        usuarios: [],
    },
    mutations: { // métodos encargados de mutar la store
        addUser: (state, usuario) => { state.usuarios = [usuario, ...state.usuarios] }, 
        setUsers: (state, userlist) => { state.usuarios = userlist }
    },
    actions: { // acciones despachadas desde el componente que realizan la mutación
        async addUserAction({dispatch}, usuario) { 
            await axios.post(`${uri}/create`, usuario);
            dispatch('getUsersAction');
        },

        async getUsersAction({commit}) { 
            const response = await axios.get(`${uri}/all`, { headers: {'Authorization': `Bearer ${ store.state.token }`} });
            commit('setUsers', response.data); 
        }
    },
    getters: {}
}