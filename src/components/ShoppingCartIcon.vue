<template>
	<router-link :to="{path: '/shopping-cart'}">
		<div id="cart-icon">
		<span class="fa-stack fa-3x">
			<i class="fa fa-shopping-cart"></i>
			<strong class="fa-stack-1x shopping-cart-digits">{{count}}</strong>
		</span>
		</div>
	</router-link>
</template>
<script>
	export default {
		name: 'shopping-cart-icon',
		mounted() {
			this.$eventBus.$on('updateCartCount', this.update)
		},
		methods: {
			update: function(count){
				this.count = count
			}
		},
		
		data() {
			return {
				count: this.getCountFromLocalStorage()
			}
		},
		
	}

</script>
<style>
	.shopping-cart-digits {
		margin-top: -3px;
		margin-left: 5px;
		font-size: 0.4em;
		color: green;
	}
</style>