<template>
	<div id="nav-bar">
	<Home></Home>
	<ShoppingCartIcon></ShoppingCartIcon>
	</div>
</template>

<script>
	import Home from './Home.vue';
	import ShoppingCartIcon from './ShoppingCartIcon.vue';
	export default {
		components: {
			Home, ShoppingCartIcon
		},
		data(){
			return {
		
				}
		}
	}
</script>
<style></style>