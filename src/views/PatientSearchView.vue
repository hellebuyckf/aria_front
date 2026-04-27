<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { usePatientsStore } from '../stores/patients'
import AppSideNav from '../components/layout/AppSideNav.vue'
import AppTopBar from '../components/layout/AppTopBar.vue'
import PatientSearchForm from '../components/patients/PatientSearchForm.vue'
import PatientResultsTable from '../components/patients/PatientResultsTable.vue'
import PaginationBar from '../components/ui/PaginationBar.vue'

const router = useRouter()
const patientsStore = usePatientsStore()

onMounted(() => {
  patientsStore.loadMock()
})

function handleSearch(query) {
  patientsStore.search(query)
}

function handlePageChange(n) {
  patientsStore.fetchPage(n)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function handleNewPatient() {
  router.push('/patients/new')
}

function handleStartSession(patient) {
  patientsStore.setActive(patient)
  router.push(`/session/${patient.id}/setup`)
}
</script>

<template>
  <div class="flex min-h-screen bg-surface">
    <!-- Sidebar -->
    <AppSideNav />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col min-w-0">
      <AppTopBar />

      <main class="flex-1 p-8 overflow-y-auto">
        <div class="max-w-5xl mx-auto">
          <!-- Header Section -->
          <div class="mb-8">
            <h1 class="text-2xl font-bold text-on-surface mb-2">Gestion des Patients</h1>
            <p class="text-on-surface-variant">Recherchez un dossier existant ou créez une nouvelle fiche patient.</p>
          </div>

          <!-- Search Form -->
          <PatientSearchForm 
            v-model="patientsStore.searchQuery"
            @search="handleSearch"
            @new-patient="handleNewPatient"
          />

          <!-- Results Section -->
          <div class="flex flex-col gap-4">
            <div class="flex items-center justify-between px-2">
              <h3 class="text-[11px] uppercase tracking-[0.15em] font-bold text-on-surface-variant">
                Résultats de la recherche
              </h3>
              <span v-if="!patientsStore.loading" class="text-xs text-on-surface-variant/60">
                {{ patientsStore.filtered.length }} patient(s) trouvé(s)
              </span>
            </div>

            <PatientResultsTable 
              :patients="patientsStore.paginated"
              :loading="patientsStore.loading"
              @start-session="handleStartSession"
            />
            
            <PaginationBar 
              v-if="!patientsStore.loading && patientsStore.filtered.length > 0"
              :current-page="patientsStore.pagination.page"
              :total-pages="patientsStore.totalPages"
              :total-items="patientsStore.filtered.length"
              :per-page="patientsStore.pagination.perPage"
              @page-change="handlePageChange"
            />
          </div>

          <!-- Compliance Footer -->
          <div class="mt-12 flex items-center justify-center gap-2 text-on-surface-variant/40">
            <span class="material-symbols-outlined text-sm">verified_user</span>
            <span class="text-[10px] uppercase tracking-widest font-bold">Accès sécurisé HDS · Session cryptée</span>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
