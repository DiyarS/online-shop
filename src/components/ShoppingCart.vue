<template>
	<div id="shopping-cart">
		<h2>My cart</h2>
		<ul v-if="render" id="cart-items">
			<li v-for="cartItem in cartItems" class="li">
				<div class="cart-item">
					<div class="image-wrapper">
						<img :src="cartItem.img" :alt="cartItem.title" />	
					</div>
					<div class="item-name">{{cartItem.title}}</div>
					<div class="item-price">${{cartItem.price}}</div>
					<div class="item-quantity-wrapper">
						<input :value="cartItem.count" @input="quantityChanged($event, cartItem)"/>
						<button :id="cartItem.id" @click="removeItem">Remove</button>	
					</div>
					
				</div>
			</li>
		</ul>
		<div id="total-sum">
			<span>Total:</span>
			<span>${{totalSum}}</span>
		</div>
	</div>
</template>
<script>
export default {
	name: 'shopping-cart',
	data() {
		return {
			cartItems: this.getCartItems(),
			totalSum: this.calcTotalSum(),
			render: true
		}
	},
	methods: {
		/*
		PARAMETERS: event: the event arising every time an input for cart item count is changed;
					item: the item whose count has been changed;
		DESCRIPTION: the function fires every time an input responsible for a particular item count is changed.
					 The function tests whether the new input value is valid or not. If it is,
					 the count property for that item is changed and modified data is saved to the local storage
		*/
		quantityChanged: function(event, item){
			if (!isNaN(event.target.value) && parseInt(event.target.value) >= 0){
				item.count = event.target.value;
				this.updateLocalStorage(this.cartItems);
				this.totalSum = this.calcTotalSum();
			}
		},

		/*
		PARAMETERS: none;
		DESCRIPTION: the function returns the reverse of the array of items, stored in local storage.
					 If local storage is empty, an empty array is returned
		*/
		getCartItems: function(){
			let cartItems = JSON.parse(localStorage.getItem('cart'));
			if (cartItems !== null) return cartItems.reverse();
			return []
		},

		/*
		PARAMETERS: event: the event bind to a particular button with id equal to the id of corresponding item
		DESCRIPTION: the function removes an item, updates the local storage, and rerenders the page
		*/
		removeItem: function(event){
			var updatedArr = this.cartItems.filter(el => el.id !== event.target.id);
			this.updateLocalStorage(updatedArr);
			this.totalSum = this.calcTotalSum();
			this.rerender();
		},

		/*
		PARAMETERS: none
		DESCRIPTION: the function rerenders the page that is rendered dynamically with the v-for loop
		*/
		rerender: function(){
			this.$nextTick(function(){
				this.cartItems = this.getCartItems();
			});
		},

		/*
		PARAMETERS: none
		DESCRIPTION: the function calculates the total sum of the cart items
		*/
		calcTotalSum: function(){
			var items = this.getCartItems();
			var sum = items.reduce((sum, el) => sum + (parseInt(el.count)*parseFloat(el.price)), 0);
			return sum.toFixed(2);
		}
	}
}
</script>
<style>
#shopping-cart {
	padding-bottom: 150px;
}

#shopping-cart ul {
	list-style-type: none;
	padding-bottom: 50px;
	width: 80%;
	margin: auto;
	border-bottom: 3px solid;
	padding-start: 0px;
	-moz-padding-start: 0px;
	-webkit-padding-start: 0px;
}

li {
	position:relative;
	width: 100%;
	border-top: 1px solid;
	padding: 20px 0;
}
.cart-item {
	display: -webkit-box;      
	display: -moz-box;         
	display: -ms-flexbox;      
	display: -webkit-flex;     
	display: flex;            
	justify-content: space-between;
	-webkit-justify-content:space-between;
}
.cart-item div {
	display: -webkit-box;      
	display: -moz-box;         
	display: -ms-flexbox;      
	display: -webkit-flex;     
	display: flex;            
	justify-content: center;
	-webkit-justify-content:center;
	font-size: 20px;
	font-size: calc(100% + .2vw);
}
.cart-item .image-wrapper {
	height: 120px;
	width: 20%;
}
.cart-item .image-wrapper img{
	height: 100%;
}
.cart-item .item-name {
	width: 50%;
	align-items: center;
	-webkit-align-items: center;
}

.cart-item .item-price {
	align-items: center;
	-webkit-align-items: center;
}

.cart-item .item-quantity-wrapper {
	flex-direction: column;
	min-width: 10%;
	max-width: 80px;
	justify-content: space-around;
	-webkit-justify-content:space-around;
}

.cart-item .item-quantity-wrapper input {
	text-align: center;
	font-size: 30px;
	font-size: calc(100% + .2vw);
}

.cart-item .item-quantity-wrapper button {
	border: none;
	background-color: #c72d2d;
	padding: 5px 10px;
	font-size: 15px;
	color: white;
}

#total-sum {
	position: relative;
	text-align: right;
	float: right;
	margin-top: 10px;
	margin-right: 100px;
	font-size: 1.4em;
	font-size: calc(100% + 1vw);
}

#total-sum span {
	position: relative;
	margin: 0px 5px;
}

#total-sum span:first-child {
	font-weight: 900;
}



@media screen and (max-width: 480px){
	#shopping-cart ul {
		width: 95%;
	}

	.cart-item .item-name {
		width: 30%;
	}

	.cart-item .item-quantity-wrapper {
		width: 70px;
	}

	.cart-item .item-quantity-wrapper button {
		padding: 5px 5px;
	}

	.cart-item .image-wrapper {
		/*width: 40px;*/
	}
}

</style>