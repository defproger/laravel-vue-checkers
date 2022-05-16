import Vue from 'vue'
import VueRouter from 'vue-router'

// import {isUserLoggedIn, getUserData, getHomeRouteForLoggedInUser} from '@/auth/utils'

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    scrollBehavior() {
        return {x: 0, y: 0}
    },
    routes: [
        {
            path: '/game',
            name: 'game',
            component: () => import('./views/Game'),
        },
        {
            path: '/',
            name: 'home',
            component: () => import('./views/Home'),
        },


        // {
        //     path: '/error-404',
        //     name: 'error-404',
        //     component: () => import('@/views/error/Error404.vue'),
        // },
        // {
        //     path: '*',
        //     redirect: 'error-404',
        // },
    ],
})

// router.beforeEach((to, _, next) => {
//     if(to.name !== 'login'){
//         const isLoggedIn = isUserLoggedIn()
//         if (!isLoggedIn) return next({name: 'login'})
//     }
//     return next();
//
// })

export default router
