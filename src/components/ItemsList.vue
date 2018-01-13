<template>
	<div id="items-list">
		<h1>{{ greetingSign }}</h1>
    <h2>{{subtitle}}</h2>
    <ul>
      <li v-for="item in items" class="store-li">
        <div class="listing-item">
        	<img :src="item.img" :alt="item.title"/>
        	<div>{{item.title}}</div>
        	<div>${{item.price}}</div>
      	</div>
      	<i class="fa-cart-plus" :id="item.id" @click="addItemToCart(item)" ></i>
      </li>
    </ul>
	</div>
</template>

<script>
import preload from './../data.json';
export default {
  name: 'items-list',
  data () {
    return {
      greetingSign: 'Welcome to Kazakhstani online shop of electronic devices',
      subtitle: "New items",
      cartItemsCount: this.getCountFromLocalStorage(),
      items: preload.items
    }
  },
  methods: {
  	addItemToCart: function(item) {
  		var cartItems = JSON.parse(localStorage.getItem('cart'));
  		if (cartItems) {
  			var index = cartItems.findIndex(el => el.id === item.id);
  			if (index !== -1){
  				cartItems[index].count = parseInt(cartItems[index].count)+1;
  				this.updateLocalStorage(cartItems);
  			} else {
  				this.addNewItem(item, cartItems);
  			}
  		} else {
  			this.addNewItem(item, []);
  		}
  	},
  	addNewItem: function(newItem, arr){
  		var item = Object.assign({}, newItem, {count: 1});
  		arr.push(item);
  		this.updateLocalStorage(arr);
  	}
  }
}
</script>

<style>
	h1 {
  font-weight: normal;
}

h2{
  font-weight: 100;
  font-style: italic;
}

#items-list ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  width: 80%;
  height: auto;
  margin: auto;
  flex-wrap: wrap;
  justify-content: center;
}

li.store-li {
  position: relative;
  width: 40%;
  display: inline-block;
  margin: 10px 20px;
  border: 1px solid #41b883;
}

i {
  font-family: FontAwesome;
  font-style: normal;
  font-size: 2em;
  margin: 10px;
}

a {
  color: #42b983;
}
</style>