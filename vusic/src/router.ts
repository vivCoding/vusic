import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Main from './components/Main.vue'
import About from './components/About.vue'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/about',
        component: About
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router