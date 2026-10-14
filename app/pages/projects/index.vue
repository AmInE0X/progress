<script setup lang="ts">
import { Search, SlidersHorizontal, BookOpen, Users, ClipboardList, ArrowUpRight, ChevronLeft, ChevronRight, X, CheckCircle2, AlertCircle, Sparkles } from 'lucide-vue-next'
import { useSession } from '../../composables/useSession'
import { gsap } from 'gsap'
import { ref , computed, watch,onMounted } from 'vue'

const { projects, restore, selectedProjectId } = useSession()
const query = ref<string>('')
const specialty = ref<string>('Toutes les spécialités')
const supervisor = ref<string>('Tous les encadrants')
const status = ref<string>('Tous les statuts')
const page = ref(1)
const pageSize = 6
const selected = ref<any>(null)
const notice = ref('')
const noticeKind = ref('success')
const specialties = computed(() => ['Toutes les spécialités', ...new Set(projects.map(p => p.specialty))])
const supervisors = computed(() => ['Tous les encadrants', ...new Set(projects.map(p => p.supervisor))])

const filtered = computed(() => projects.filter(p => {
  const q = query.value.trim().toLocaleLowerCase('fr')
  return (!q || [p.title, p.reference, p.domain, p.supervisor].some(v => v.toLocaleLowerCase('fr').includes(q))) &&
    (specialty.value === 'Toutes les spécialités' || p.specialty === specialty.value) &&
    (supervisor.value === 'Tous les encadrants' || p.supervisor === supervisor.value) &&
    (status.value === 'Tous les statuts' || p.status === status.value)
}))

const pages = computed(() => Math.max(1, Math.ceil(filtered.value.length / pageSize)))
const shown = computed(() => filtered.value.slice((page.value - 1) * pageSize, page.value * pageSize))

watch([query, specialty, supervisor, status], () => page.value = 1)

onMounted(() => {
  restore()
  // Animate stats cards
  gsap.from('.stat-card', {
    opacity: 0,
    y: 20,
    duration: 0.5,
    stagger: 0.1,
    ease: 'power2.out',
    delay: 0.2
  })
  
  // Animate filter section
  gsap.from('.filter-section', {
    opacity: 0,
    y: 10,
    duration: 0.4,
    ease: 'power2.out',
    delay: 0.4
  })
  
  // Animate table
  gsap.from('.table-container', {
    opacity: 0,
    y: 10,
    duration: 0.4,
    ease: 'power2.out',
    delay: 0.5
  })
})

function confirmSelection(p: any) {
  if (p.available_places < 1 || p.status !== 'Ouvert') {
    noticeKind.value = 'error'
    notice.value = 'Ce sujet n’accepte plus de nouvelles sélections.'
    return
  }
  selected.value = p
}

function choose() {
  if (!selected.value) return
  selectedProjectId.value = selected.value.id
  noticeKind.value = 'success'
  notice.value = `Sujet sélectionné : ${selected.value.reference}`
  selected.value = null
}
</script>

<template>
  <div class="min-h-screen bg-[#f5f7f5]">
    <PortalHeader />
    
    <main class="mx-auto max-w-[1400px] px-4 py-7 sm:px-6 lg:px-8 lg:py-10">
      <!-- Header Section -->
      <div class="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end animate-fade-in">
        <div>
          <p class="eyebrow mb-2">Espace étudiant / Année 2025–2026</p>
          <h1 class="text-3xl font-extrabold tracking-tight text-[#20372a] sm:text-[34px]">
            Sélection des sujets de PFE
          </h1>
          <p class="mt-2 max-w-2xl text-sm leading-6 text-[#738078]">
            Consultez les propositions de projets de fin d’études et choisissez un sujet selon votre spécialité et vos intérêts.
          </p>
        </div>
        <div class="flex items-center gap-2 self-start rounded-xl border border-[#dce9df] bg-white px-4 py-3 text-xs font-semibold text-[#2c714b] shadow-soft sm:self-auto">
          <span class="h-2 w-2 rounded-full bg-[#2c9b60] pulse"></span>
          Session active
        </div>
      </div>
      
      <!-- Stats Cards -->
      <div class="mb-7 grid gap-4 sm:grid-cols-3 animate-slide-up">
        <div class="stat-card card flex items-center gap-4 p-5 shadow-soft hover:shadow-strong transition-shadow">
          <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e8f5ec] text-[#18794e]">
            <BookOpen :size="22" />
          </div>
          <div>
            <p class="text-sm text-[#7a877f]">Sujets proposés</p>
            <p class="mt-1 text-2xl font-extrabold text-[#20372a]">{{ projects.length }}</p>
          </div>
        </div>
        
        <div class="stat-card card flex items-center gap-4 p-5 shadow-soft hover:shadow-strong transition-shadow">
          <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-[#edf2ff] text-[#4764a6]">
            <Users :size="22" />
          </div>
          <div>
            <p class="text-sm text-[#7a877f]">Encadrants</p>
            <p class="mt-1 text-2xl font-extrabold text-[#20372a]">{{ supervisors.length - 1 }}</p>
          </div>
        </div>
        
        <div class="stat-card card flex items-center gap-4 p-5 shadow-soft hover:shadow-strong transition-shadow">
          <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-[#fff3df] text-[#9a6a1a]">
            <ClipboardList :size="22" />
          </div>
          <div>
            <p class="text-sm text-[#7a877f]">Places disponibles</p>
            <p class="mt-1 text-2xl font-extrabold text-[#20372a]">{{ projects.reduce((n, p) => n + p.available_places, 0) }}</p>
          </div>
        </div>
      </div>
      
      <!-- Projects Table Section -->
      <div class="card table-container overflow-hidden shadow-soft">
        <div class="filter-section flex flex-col justify-between gap-4 border-b border-[#e9eeea] p-5 sm:flex-row sm:items-center sm:px-6">
          <div>
            <h2 class="text-lg font-extrabold">Catalogue des sujets</h2>
            <p class="mt-1 text-sm text-[#7a877f]">Consultez les propositions disponibles.</p>
          </div>
          <div class="flex items-center gap-2 rounded-lg bg-[#f0f7f2] px-3 py-2 text-xs font-bold text-[#26744a]">
            <Sparkles :size="15" />
            {{ filtered.length }} résultat(s)
          </div>
        </div>
        
        <div class="filter-section grid gap-3 border-b border-[#e9eeea] bg-[#fcfdfc] p-4 sm:grid-cols-2 lg:grid-cols-4 lg:p-5">
          <div class="relative sm:col-span-2 lg:col-span-1">
            <Search :size="17" class="absolute left-3 top-1/2 -translate-y-1/2 text-[#87938b]" />
            <input 
              v-model="query" 
              class="field pl-9 focus-ring" 
              type="text" 
              placeholder="Rechercher un sujet…" 
              aria-label="Rechercher un sujet"
            />
          </div>
          <select v-model="specialty" class="field focus-ring" aria-label="Filtrer par spécialité">
            <option v-for="s in specialties" :key="s">{{ s }}</option>
          </select>
          <select v-model="supervisor" class="field focus-ring" aria-label="Filtrer par encadrant">
            <option v-for="s in supervisors" :key="s">{{ s }}</option>
          </select>
          <select v-model="status" class="field focus-ring" aria-label="Filtrer par statut">
            <option>Tous les statuts</option>
            <option>Ouvert</option>
            <option>Complet</option>
          </select>
        </div>
        
        <div v-if="shown.length" class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Référence</th>
                <th>Intitulé du sujet</th>
                <th>Domaine</th>
                <th>Encadrant</th>
                <th>Places</th>
                <th>Type de projet</th>
                <th>Statut</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="p in shown" :key="p.id" class="animate-fade-in">
                <td>
                  <span class="font-mono text-xs font-bold text-[#718078]">{{ p.reference }}</span>
                </td>
                <td class="min-w-[240px]">
                  <NuxtLink :to="`/projects/${p.id}`" class="font-bold leading-5 text-[#263d2e] hover:text-[#18794e] transition-colors">
                    {{ p.title }}
                  </NuxtLink>
                  <p class="mt-1 text-xs text-[#87938b]">{{ p.specialty }}</p>
                </td>
                <td>
                  <span class="rounded-md bg-[#f1f5f2] px-2 py-1 text-xs font-semibold">{{ p.domain }}</span>
                </td>
                <td class="min-w-[140px]">{{ p.supervisor }}</td>
                <td>
                  <span class="font-extrabold" :class="p.available_places ? 'text-[#276e48]' : 'text-[#a16d22]'">
                    {{ p.available_places }}
                  </span>
                  <span class="text-xs text-[#8b968f]"> / 3</span>
                </td>
                <td class="min-w-[145px] text-[#647168]">{{ p.project_type }}</td>
                <td>
                  <span class="pill" :class="p.status === 'Ouvert' ? 'pill-green' : 'pill-amber'">
                    <span class="h-1.5 w-1.5 rounded-full" :class="p.status === 'Ouvert' ? 'bg-[#26985b]' : 'bg-[#c58b2e]'"></span>
                    {{ p.status }}
                  </span>
                </td>
                <td>
                  <div class="flex items-center gap-2">
                    <NuxtLink 
                      :to="`/projects/${p.id}`" 
                      class="rounded-lg border border-[#dce5de] p-2 text-[#52705e] hover:bg-[#f1f7f3] transition-colors"
                      :aria-label="`Voir ${p.title}`"
                    >
                      <ArrowUpRight :size="16" />
                    </NuxtLink>
                    <button 
                      class="rounded-lg px-3 py-2 text-xs font-bold transition-all duration-200"
                      :class="p.available_places && p.status === 'Ouvert' ? 'bg-[#18794e] text-white hover:bg-[#12643f] hover:shadow-soft' : 'bg-gray-100 text-gray-400 cursor-not-allowed'"
                      :disabled="!p.available_places || p.status !== 'Ouvert'"
                      @click="confirmSelection(p)"
                    >
                      Choisir
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div v-else class="flex flex-col items-center px-5 py-16 text-center">
          <div class="mb-4 rounded-2xl bg-[#f0f5f1] p-4 text-[#6b8272]">
            <Search :size="25" />
          </div>
          <h3 class="font-extrabold">Aucun sujet trouvé</h3>
          <p class="mt-1 text-sm text-[#7a877f]">Essayez de modifier votre recherche ou vos filtres.</p>
          <button 
            class="mt-4 text-sm font-bold text-[#18794e] hover:text-[#12643f] transition-colors underline-offset-2 hover:underline"
            @click="query='';specialty='Toutes les spécialités';supervisor='Tous les encadrants';status='Tous les statuts'"
          >
            Réinitialiser les filtres
          </button>
        </div>
        
        <div class="filter-section flex flex-col justify-between gap-3 border-t border-[#e9eeea] px-5 py-4 text-sm text-[#77847b] sm:flex-row sm:items-center sm:px-6">
          <span>
            Affichage {{ filtered.length ? (page - 1) * pageSize + 1 : 0 }}–{{ Math.min(page * pageSize, filtered.length) }} sur {{ filtered.length }} sujets
          </span>
          <div class="flex items-center gap-2">
            <button 
              class="btn-secondary !px-3 !py-2 disabled:opacity-40 disabled:cursor-not-allowed" 
              :disabled="page <= 1" 
              aria-label="Page précédente" 
              @click="page--"
            >
              <ChevronLeft :size="16" />
            </button>
            <span class="min-w-16 text-center text-xs font-bold">{{ page }} / {{ pages }}</span>
            <button 
              class="btn-secondary !px-3 !py-2 disabled:opacity-40 disabled:cursor-not-allowed" 
              :disabled="page >= pages" 
              aria-label="Page suivante" 
              @click="page++"
            >
              <ChevronRight :size="16" />
            </button>
          </div>
        </div>
      </div>
      
      <!-- Info Banner -->
      <div class="mt-6 flex gap-3 rounded-2xl border border-[#dce8df] bg-[#eef6f0] p-4 text-sm text-[#476653] animate-fade-in">
        <AlertCircle :size="19" class="mt-0.5 shrink-0" />
        <p>
          <strong>Information :</strong> vos sélections sont enregistrées dans votre session. Contactez votre responsable pour finaliser votre choix.
        </p>
      </div>
    </main>
    
    <!-- Toast Notifications -->
    <div 
      v-if="notice" 
      class="fixed bottom-5 right-5 z-40 flex max-w-sm items-start gap-3 rounded-xl border bg-white p-4 shadow-xl animate-slide-up" 
      :class="noticeKind === 'success' ? 'border-[#cfe8d6]' : 'border-amber-200'"
      role="status"
    >
      <CheckCircle2 v-if="noticeKind === 'success'" class="text-[#18794e]" :size="20" />
      <AlertCircle v-else class="text-amber-600" :size="20" />
      <div class="flex-1 text-sm font-semibold">{{ notice }}</div>
      <button aria-label="Fermer" @click="notice = ''" class="hover:text-gray-600 transition-colors">
        <X :size="16" />
      </button>
    </div>
    
    <!-- Confirmation Modal -->
    <div 
      v-if="selected" 
      class="fixed inset-0 z-50 flex items-center justify-center bg-[#14271c]/45 p-4 animate-fade-in"
      @click.self="selected = null"
    >
      <section role="dialog" aria-modal="true" aria-labelledby="confirm-title" class="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl animate-scale-in">
        <div class="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#e8f5ec] text-[#18794e]">
          <ClipboardList :size="23" />
        </div>
        <h2 id="confirm-title" class="text-xl font-extrabold">Confirmer votre choix ?</h2>
        <p class="mt-2 text-sm leading-6 text-[#6d7b72]">Vous êtes sur le point de sélectionner ce sujet :</p>
        <p class="mt-3 rounded-xl bg-[#f6f9f6] p-3 text-sm font-bold">{{ selected.title }}</p>
        <p class="mt-3 text-xs text-[#8a968e]">Votre sélection sera enregistrée dans votre session.</p>
        <div class="mt-6 flex justify-end gap-3">
          <button class="btn-secondary" @click="selected = null">Annuler</button>
          <button class="btn-primary" @click="choose">Confirmer le choix</button>
        </div>
      </section>
    </div>
    
    <footer class="border-t border-[#e4eae5] bg-white px-5 py-6 text-center text-xs text-[#8b968f]">
      CAMPUS+ · Université de l’Atlas · Portail des projets de fin d'études
    </footer>
  </div>
</template>

<style scoped>
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.pulse {
  animation: pulse 2s infinite;
}
</style>
