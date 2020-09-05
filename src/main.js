// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import '@/assets/top.css'


Vue.config.productionTip = false

Vue.use(ElementUI)
/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: {
		App
	},
	template: '<App/>'
})
router.beforeEach((to, from, next) => {
	let flag = sessionStorage.getItem("quanxian")
	let list = ["play", "cinema", "plan"]
	let key = to.path.split("/")[2]
	if (list.find(item => {
			return item == key
		})) {
		if (flag.split(",").find(item => {
				return item == "2"
			})) {
			next()
		} else {
			next({
				path: '/log'
			})
		}
	}
	if (key == "user") {
		if (flag.split(",").find(item => {
				return item == "6"
			})) {
			next()
		} else {
			next({
				path: '/log'
			})
		}
	}
	if (key == "comment") {
		if (flag.split(",").find(item => {
				return item == "7"
			})) {
			next()
		} else {
			next({
				path: '/log'
			})
		}
	}
	console.log(to)
	console.log(key)
	next()
})
