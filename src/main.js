import Vue from 'vue'
import vuex from './vuex'
import App from './App.vue'

Vue.config.productionTip = false


new Vue({
    store: vuex,
    render: h => h(App),
}).$mount('#app')
