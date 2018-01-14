import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import ItemsList from './components/ItemsList.vue';
import ShoppingCart from './components/ShoppingCart.vue';

Vue.use(VueRouter);

const routes = [{ path: '/', component: ItemsList }, { path: '/shopping-cart', component: ShoppingCart }];
const router = new VueRouter({
	routes
});

// event bus used by sibling components to exchange data
const Bus = new Vue();
Object.defineProperties(Vue.prototype, {
	$eventBus: {
		get: function() {
			return Bus;
		}
	}
});

Vue.mixin({
	// functions available for every component
	methods: {
		/*
		PARAMETERS: none
		DESCRIPTION: the function return the number of items added to the cart
		*/
		getCountFromLocalStorage: function() {
			var cartItems = JSON.parse(localStorage.getItem('cart'));
			if (cartItems !== null) {
				var count = cartItems.reduce((sum, elem) => sum + parseInt(elem.count), 0);
				return count;
			}
			return 0;
		},

		/*
		PARAMETERS: arr: array to store in the local storage;
		DESCRIPTION: the function receives an array, stores it in the local storage and emits an event to notify other components listening for that event
		*/
		updateLocalStorage: function(arr) {
			localStorage.setItem('cart', JSON.stringify(arr));
			this.$eventBus.$emit('updateCartCount', this.getCountFromLocalStorage());
		}
	}
});

new Vue({
	el: '#app',
	router,
	render: h => h(App)
});
