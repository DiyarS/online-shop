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
					<div class="item-price">{{cartItem.price}}</div>
					<div class="item-quantity-wrapper">
						<input :value="cartItem.count" @input="quantityChanged($event, cartItem)"/>
						<button :id="cartItem.id" @click="removeItem">remove</button>	
					</div>
					
				</div>
			</li>
		</ul>
	</div>
</template>
<script>
	export default {
		name: 'shopping-cart',
		data() {
			return {
				cartItems: this.getCartItems(),
				render: true
			}
		},
		methods: {
			quantityChanged: function(event, item){
				if (!isNaN(event.target.value) && parseInt(event.target.value) >= 0){
					item.count = event.target.value;
					this.updateLocalStorage(this.cartItems);
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
				this.rerender();
			},
			rerender: function(){
				this.$nextTick(function(){
					this.cartItems = this.getCartItems();
				});
			}
		}
	}
</script>
<style>
	ul {
  list-style-type: none;
  padding: 0;
  width: 80%;
  margin: auto;
}


	li {
		position:relative;
		width: 100%;
		border-top: 1px solid;
		margin-top: 10px;
	}
	.cart-item {
		display: flex;
		justify-content: space-between;
	}
	.cart-item div {
		display: flex;
		justify-content: center;
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
		width: 50px;
		justify-content: space-around;
	}
</style>