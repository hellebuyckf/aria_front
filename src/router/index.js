import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { usePatientsStore } from '../stores/patients'

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
      component: () => import('../views/SessionSetupView.vue'),
      meta: { requiresAuth: true, requiresActivePatient: true }
    },
    {
      path: '/session/:sessionId/analysis',
      name: 'analysis',
      component: () => import('../views/AnalysisView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/session/:sessionId/report',
      name: 'report',
      component: () => import('../views/ReportView.vue'),
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  const patients = usePatientsStore()

  // Authentication guard
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: 'patients' } // Simplified for MVP mock
  }

  // Active patient guard for session setup
  if (to.meta.requiresActivePatient && !patients.activePatient) {
    return { name: 'patients' }
  }
})

export default router
