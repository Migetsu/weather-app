import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import CitiesPage from '@/pages/CitiesPage.vue'
import SettingsPage from '@/pages/SettingsPage.vue'

const routes = [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/cities', name: 'Cities', component: CitiesPage },
    { path: '/settings', name: 'Settings', component: SettingsPage },
]

const router = createRouter({
    history: createWebHistory('/weather-app/'),
    routes,
})

export default router