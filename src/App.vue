<template>
  <div id="app">
    <div id="nav-bar">
      <Home></Home>
      <ShoppingCartIcon></ShoppingCartIcon>
    </div>
    <div id="main-panel">
      <img src="./assets/logo.png">
      <router-view></router-view>
    </div>
  </div>

</template>

<script>
import Home from './components/Home.vue';
import ItemsList from './components/ItemsList.vue';
import ShoppingCartIcon from './components/ShoppingCartIcon.vue';

export default {
  name: 'app',
  components: {
    Home,
    ShoppingCartIcon
  },
  data() {
    return {
      cartItemsCount: 0
    }
  }
}
</script>

<style>

body {
  max-width: 1280px;
  margin: auto;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

#nav-bar {
  position: fixed;
  height: 100px;
  width: 100%;
  background-color: #41b883;
  top: 0;
  left: 0;
  margin: 0;
  z-index: 1;
}

#nav-bar>a:first-child {
  position: relative;
  float: left;
}

#nav-bar>a:nth-child(2) {
  position: relative;
  float: right;
}

#main-panel {
  position: relative;
  top: 50px;
}

.fa-stack {
  font-family: "Montserrat", "Helvetica Neue", Helvetica, Arial, sans-serif;
  color: white;
}
</style>
