import { createRouter, createWebHashHistory } from 'vue-router'
import AnnuityCalculator from './components/AnnuityCalculator.vue'
import SavingsCalculator from './components/SavingsCalculator.vue'

const routes = [
  {
    path: '/',
    redirect: '/annuity-calc/',
  },
  {
    path: '/annuity-calc/',
    name: 'annuity-calculator',
    component: AnnuityCalculator,
  },
  {
    path: '/savings-calc/',
    name: 'savings-calculator',
    component: SavingsCalculator,
  },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})
