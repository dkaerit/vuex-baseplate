<template>
  <div class="hello">
    <h1>Home</h1>  
    <h2>Status</h2>
    <p v-if="token">Conectado: {{token}}</p>
    <p v-else>Desconectado: {{token}}</p>  

    <h2>Lista de usuarios</h2>
    <p v-for="(usuario, idx) in usuarios" :key="idx">{{ usuario }}</p>
    
    <h2>Agregar usuario</h2>
    <form @submit="addUser">
      <label for="name">Nombre </label><input id="name" name="name" type="texto" v-model="user"/><br>
      <label for="email">Email </label><input id="email" name="email" type="texto" v-model="email"/><br>
      <label for="passwd">Contraseña </label><input id="passwd" name="passwd" type="texto" v-model="passwd"/><br>
      <p><input type="submit" value="Enviar"></p>
    </form>
    usuario: {{ user }}<br/>
    email: {{ email }}<br/>
    passwd: {{ passwd }}<br/>

    <h2>Conectarse</h2>
    <form @submit="logIn">
      <label for="logname">Usuario</label><input id="logname" name="logname" type="texto" v-model="logUser"/><br>
      <label for="logpasswd">Contraseña </label><input id="logpasswd" name="logpasswd" type="texto" v-model="logPasswd"/><br>
      <p>
        <input type="submit" value="Login">
        <input type="button" @click="logOut" value="Log Out">
      </p>
    </form>
    usuario: {{ logUser }}<br/>
    passwd: {{ logPasswd }}<br/>


  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  name: 'HelloWorld',
  data() { // variables del componente
    return {
      user: null,
      email: null,
      passwd: null,

      logUser: null,
      logPasswd: null
    }
  },
  mounted() { /*this.listUsers()*/ },
  props: {}, // parametros del componente
  methods: {
    ...mapMutations('USUARIOS', ['addUser']), // mutations to methods
    ...mapActions('USUARIOS', ['addUserAction', 'getUsersAction']),
    ...mapActions(['autenticationAction', 'dismissAction']),
    
    addUser(e) { 
      this.$store.dispatch('USUARIOS/addUserAction', {user: this.user, email: this.email, passwd: this.passwd}); 
      this.listUsers();
      e.preventDefault();
    },

    listUsers() { 
      this.$store.dispatch('USUARIOS/getUsersAction') 
    },

    logIn(e) {
      this.$store.dispatch('autenticationAction', {user: this.logUser, passwd: this.logPasswd}) 
      e.preventDefault();
    },

    logOut() {
      this.$store.dispatch('dismissAction') 
    }
  },
  computed: {
    ...mapState('USUARIOS',['usuarios']), 
    ...mapState(['token']) 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

