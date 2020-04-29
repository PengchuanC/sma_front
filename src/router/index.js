import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/layout',
        },
        {
            path: '/layout',
            name: 'layout',
            component: ()=>import('@/components/Layout'),
            redirect: '/portfolio',
            meta: {
                keepAlive: true
            },
            children: [
                {
                    path: '/portfolio',
                    name: 'portfolio',
                    component: ()=>import('@/components/Portfolio'),
                    meta: {
                        keepAlive: true
                    }
                },
                {
                    path: '/info/:port_id',
                    name: 'info',
                    component: ()=>import('@/components/PortInfo'),
                    meta: {
                        keepAlive: true
                    }
                },
                {
                    path: '/onepage/:port_id',
                    name: 'onepage',
                    component: ()=>import('@/components/OnePage')
                },
                {
                    path: '/hello',
                    name: 'hello',
                    component: ()=>import('@/components/HelloWorld')
                },
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: ()=>import('@/components/Login')
        },
        {
            path: '/home',
            name: 'home',
            component: ()=>import('@/components/Nav')
        },
        {
            path: '/card',
            name: 'card',
            component: ()=>import('@/components/cards/SwapHistory')
        }

    ]
})
