import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/patients'
    },
    {
      path: '/patients',
      name: 'patients',
      component: () => import('../views/PatientSearchView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/patients/new',
      name: 'new-patient',
      component: () => import('../views/Saisie.vue'), // Temporary mapped for MVP
      meta: { requiresAuth: true }
    },
    {
      path: '/session/:patientId/setup',
      name: 'session-setup',
      component: () => import('../views/Saisie.vue'), // Temporary mapped for MVP
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: 'patients' } // Simplified for MVP mock
  }
})

export default router
