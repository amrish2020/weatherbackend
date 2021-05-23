//require('./bootstrap');

///window.Vue = require('vue').default;
import Vue from 'vue'
import VueRouter from 'vue-router'

import store from './store'

import DashboardComponent from './components/DashboardComponent.vue'
import LoginComponent from './components/LoginComponent.vue'
import LogoutComponent from './components/LogoutComponent.vue'
import AppComponent from './components/AppComponent.vue'

const routes = [
    {
        path: '/',
        redirect: { name: 'login' }
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: DashboardComponent,
        meta: { requiresAuth: true }  // add this
    },
    {
        path: '/login',
        name: 'login',
        component: LoginComponent
    },
    {
        path: '/logout',
        name: 'logout',
        component: LogoutComponent
    }
];

const { VueLoaderPlugin } = require("vue-loader");



router.beforeEach((to, from, next) => {

    // check if the route requires authentication and user is not logged in
    if (to.matched.some(route => route.meta.requiresAuth) && !store.state.isLoggedIn) {
        // redirect to login page
        next({ name: 'login' })
        return
    }

    // if logged in redirect to dashboard
    if(to.path === '/login' && store.state.isLoggedIn) {
        next({ name: 'dashboard' })
        return
    }

    next()
})

const router = new VueRouter({
    routes
})

/*const app = new Vue({
    el: '#app',
    router,
});*/


const app = new Vue({
    components: { AppComponent },
    router
}).$mount('#app')