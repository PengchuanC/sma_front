import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    // base: '/fof/',
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
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: ()=>import('@/components/Login')
        },
        {
            path: '/reset',
            name: 'reset',
            component: ()=>import('@/components/Profile')
        },
        {
            path: '/card',
            name: 'card',
            component: ()=>import('@/components/cards/SwapHistory')
        },
        {
            path: '*',
            redirect: '/'
        },
    ]
})
