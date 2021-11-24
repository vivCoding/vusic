import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Main from './components/Main.vue'
import About from './components/About.vue'
import Error from './components/404.vue'

const routes: RouteRecordRaw[] = [
    {
        path: '/:playlistId',
        component: Main
    },
    {
        path: '/',
        component: Main
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/error',
        component: Error
    },
    {
        path: '/:pathMatch(.*)*',
        component: Error
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router