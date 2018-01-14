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
	name: 'items-list',		// the component showing the list of all items available in the store
	data () {
		return {
			greetingSign: 'Welcome to Kazakhstani online shop of electronic devices',
			subtitle: "Check new arrivals",
			items: preload.items 	// all store items
		}
	},
	methods: {
		/*
		PARAMETERS: item: an object with properties of a store item (id, title, src image name, and price);
		DESCRIPTION: the function fires every time addToCart icon is clicked. The function checks if there
					 are any items in the cart. If so, the item is added to the array of items, otherwise a new array is created. In both cases after the array push the local storage is updated.
		*/
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

		/*
		PARAMETERS: newItem: an object with properties of a store item (id, title, src image name, and price);
					arr: the array to push newItem to;
		DESCRIPTION: the function receives an object representing store item, adds new property "count"
					 that is responsible for counting how many times a particular object appears in the cart,
					 and pushs the modified object to the supplied array.
		*/
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
	display: -webkit-box;      
	display: -moz-box;         
	display: -ms-flexbox;      
	display: -webkit-flex;     
	display: flex;            
	width: 80%;
	height: auto;
	margin: auto;
	flex-wrap: wrap;
	-webkit-flex-wrap: wrap;
	justify-content: center;
}

li.store-li {
	position: relative;
	width: 40%;
	display: inline-block;
	margin: 10px 20px;
	border: 1px solid #41b883;
}


li.store-li img {
	width: 100%;
	max-width: 200px;
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

@media screen and (max-width: 480px){
	#items-list ul {
		width: 100%;
	}
	li.store-li {
		width: 100%;
	}
}


</style>