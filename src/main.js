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

const Bus = new Vue();
Object.defineProperties(Vue.prototype, {
	$eventBus: {
		get: function() {
			return Bus;
		}
	}
});

Vue.mixin({
	methods: {
		getCountFromLocalStorage: function() {
			var cartItems = JSON.parse(localStorage.getItem('cart'));
			if (cartItems !== null) {
				var count = cartItems.reduce((sum, elem) => sum + parseInt(elem.count), 0);
				return count;
			}
			return 0;
		}
	}
});

new Vue({
	el: '#app',
	router,
	render: h => h(App)
});
