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
			quantityChanged: function(event, item){
				if (!isNaN(event.target.value) && parseInt(event.target.value) >= 0){
					item.count = event.target.value;
					this.updateLocalStorage(this.cartItems);
					this.totalSum = this.calcTotalSum();
				}
			},
			getCartItems: function(){
				let cartItems = JSON.parse(localStorage.getItem('cart'));
				if (cartItems !== null) return cartItems.reverse();
				return []
			},
			removeItem: function(event){
				var updatedArr = this.cartItems.filter(el => el.id !== event.target.id);
				this.updateLocalStorage(updatedArr);
				this.totalSum = this.calcTotalSum();
				this.rerender();
			},
			rerender: function(){
				this.$nextTick(function(){
					this.cartItems = this.getCartItems();
				});
			},
			calcTotalSum: function(){
				console.log(this.totalSum);
				var items = this.getCartItems();
				var sum = items.reduce((sum, el) => sum + (parseInt(el.count)*parseFloat(el.price)), 0);
				return sum.toFixed(2);
			}
		}
	}
</script>
<style>

#shopping-cart ul {
  list-style-type: none;
  padding-bottom: 50px;
  width: 80%;
  margin: auto;
  border-bottom: 3px solid;
}


	li {
		position:relative;
		width: 100%;
		border-top: 1px solid;
		padding: 20px 0;
	}
	.cart-item {
		display: flex;
		justify-content: space-between;
	}
	.cart-item div {
		display: flex;
		justify-content: center;
		font-size: 20px;
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
	}

	.cart-item .item-price {
		align-items: center;
	}

	.cart-item .item-quantity-wrapper {
		flex-direction: column;
		width: 10%;
		justify-content: space-around;
	}

	.cart-item .item-quantity-wrapper input {
		text-align: center;
	}

	.cart-item .item-quantity-wrapper button {
		border: none;
		background-color: #c72d2d;
		padding: 5px 10px;
		font-size: 1em;
		font-size: 1.5vw;
		color: white;
	}

	#total-sum {
		position: relative;
		text-align: right;
		float: right;
		margin-top: 10px;
		margin-right: 100px;
		font-size: 25px;
	}

	#total-sum span {
		position: relative;
		margin: 0px 5px;
	}

	#total-sum span:first-child {
		font-weight: 900;
	}

</style>