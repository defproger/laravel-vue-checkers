
require('./bootstrap');

window.Vue = require('vue').default;

import router from "./router";
import App from "./App";
import Vuex from 'vuex'
import store from "./store";

import VueEcho from 'vue-echo-laravel';
import VueSocketIO from 'vue-socket.io'

Vue.use(new VueSocketIO({
    debug: true,
    connection: 'http://localhost:8000',
    vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
    },
    // options: { path: "/my-app/" }
}))
Vue.use(VueEcho, {
    broadcaster: 'vue-socket.io',
    host: window.location.hostname + ':6001',
});

Vue.use(Vuex)


new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#App')
