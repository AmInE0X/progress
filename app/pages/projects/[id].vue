<script setup lang="ts">
import { ArrowLeft, GraduationCap, Users, Code2, CalendarDays, CheckCircle2, AlertCircle, ShieldCheck } from 'lucide-vue-next'
import { projects, selectedProjectId } from '../../composables/useSession'
import { gsap } from 'gsap'
import { useRoute } from 'nuxt/app'
import { computed, ref, onMounted } from 'vue'

const route = useRoute()
const project = computed(() => projects.find(p => p.id === String(route.params.id)))
const confirmOpen = ref(false)
const notice = ref('')
const done = computed(() => !!project.value && selectedProjectId.value === project.value.id)

// Animations
onMounted(() => {
  if (project.value) {
    gsap.from('.project-header', {
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: 'power3.out'
    })
    
    gsap.from('.project-section', {
      opacity: 0,
      y: 20,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out',
      delay: 0.2
    })
    
    gsap.from('.project-sidebar', {
      opacity: 0,
      x: 20,
      duration: 0.5,
      ease: 'power2.out',
      delay: 0.3
    })
  }
})

function choose() {
  if (!project.value || !project.value.available_places || project.value.status !== 'Ouvert') return
  selectedProjectId.value = project.value.id
  confirmOpen.value = false
  notice.value = 'Votre choix a été enregistré avec succès.'
}
</script>

<template>
  <div class="min-h-screen bg-[#f5f7f5]">
    <PortalHeader />
    
    <main class="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:py-12">
      <NuxtLink 
        to="/projects" 
        class="mb-6 inline-flex items-center gap-2 text-sm font-bold text-[#597164] hover:text-[#18794e] transition-colors group"
      >
        <ArrowLeft :size="17" class="group-hover:-translate-x-0.5 transition-transform" />
        Retour au catalogue
      </NuxtLink>
      
      <div v-if="!project" class="card p-10 text-center animate-fade-in">
        <h1 class="text-2xl font-extrabold">Sujet introuvable</h1>
        <p class="mt-2 text-sm text-[#718078]">Ce sujet n’existe pas dans le catalogue.</p>
        <NuxtLink class="btn-primary mt-5" to="/projects">
          Voir les sujets
        </NuxtLink>
      </div>
      
      <template v-else>
        <!-- Project Header -->
        <div class="card project-header overflow-hidden shadow-soft">
          <div class="bg-[#174b35] px-6 py-8 text-white sm:px-10 sm:py-10">
            <div class="mb-5 flex flex-wrap items-center gap-2">
              <span class="rounded-full bg-white/15 px-3 py-1 text-xs font-bold backdrop-blur-sm">{{ project.reference }}</span>
              <span class="rounded-full bg-[#d3f0dc] px-3 py-1 text-xs font-bold text-[#185d39]">{{ project.status }}</span>
            </div>
            <p class="text-xs font-bold uppercase tracking-[.15em] text-[#a9d8ba]">{{ project.domain }}</p>
            <h1 class="mt-3 max-w-3xl text-3xl font-extrabold leading-tight sm:text-4xl">
              {{ project.title }}
            </h1>
            <p class="mt-4 max-w-2xl text-sm leading-6 text-white/75">
              Fiche descriptive d’un sujet de fin d’études — année universitaire {{ project.academic_year }}.
            </p>
          </div>
          
          <div class="grid gap-0 md:grid-cols-[1fr_300px]">
            <!-- Project Details -->
            <section class="project-section p-6 sm:p-10">
              <h2 class="text-lg font-extrabold">À propos du sujet</h2>
              <p class="mt-3 text-sm leading-7 text-[#66756b]">{{ project.description }}</p>
              
              <div class="mt-8 grid gap-4 sm:grid-cols-2">
                <div class="rounded-xl border border-[#e7ece8] p-4 hover:shadow-soft transition-shadow">
                  <div class="mb-2 flex items-center gap-2 text-[#28784f]">
                    <Users :size="17" />
                    <span class="text-xs font-bold uppercase tracking-wide">Encadrement</span>
                  </div>
                  <p class="font-bold">{{ project.supervisor }}</p>
                  <p class="mt-1 text-xs text-[#849087]">Encadrant</p>
                </div>
                
                <div class="rounded-xl border border-[#e7ece8] p-4 hover:shadow-soft transition-shadow">
                  <div class="mb-2 flex items-center gap-2 text-[#28784f]">
                    <GraduationCap :size="17" />
                    <span class="text-xs font-bold uppercase tracking-wide">Spécialité</span>
                  </div>
                  <p class="font-bold">{{ project.specialty }}</p>
                  <p class="mt-1 text-xs text-[#849087]">Formation concernée</p>
                </div>
                
                <div class="rounded-xl border border-[#e7ece8] p-4 hover:shadow-soft transition-shadow">
                  <div class="mb-2 flex items-center gap-2 text-[#28784f]">
                    <Code2 :size="17" />
                    <span class="text-xs font-bold uppercase tracking-wide">Type de projet</span>
                  </div>
                  <p class="font-bold">{{ project.project_type }}</p>
                </div>
                
                <div class="rounded-xl border border-[#e7ece8] p-4 hover:shadow-soft transition-shadow">
                  <div class="mb-2 flex items-center gap-2 text-[#28784f]">
                    <CalendarDays :size="17" />
                    <span class="text-xs font-bold uppercase tracking-wide">Année académique</span>
                  </div>
                  <p class="font-bold">{{ project.academic_year }}</p>
                </div>
              </div>
              
              <h2 class="mt-8 text-lg font-extrabold">Compétences recommandées</h2>
              <div class="mt-3 flex flex-wrap gap-2">
                <span 
                  v-for="skill in project.required_skills.split(', ')" 
                  :key="skill" 
                  class="rounded-full border border-[#dce8df] bg-[#f5faf6] px-3 py-1.5 text-xs font-semibold text-[#42644e] hover:bg-[#e8f5ec] transition-colors"
                >
                  {{ skill }}
                </span>
              </div>
            </section>
            
            <!-- Sidebar -->
            <aside class="project-sidebar border-t border-[#e7ece8] bg-[#fafcfb] p-6 sm:p-8 md:border-l md:border-t-0">
              <p class="eyebrow">Disponibilité</p>
              <div class="mt-3 flex items-baseline gap-2">
                <span class="text-4xl font-extrabold" :class="project.available_places ? 'text-[#18794e]' : 'text-[#9b6c23]'">
                  {{ project.available_places }}
                </span>
                <span class="text-sm text-[#7b887f]">place(s) disponible(s)</span>
              </div>
              
              <div class="mt-5 h-2 overflow-hidden rounded-full bg-[#e7ece8]">
                <div 
                  class="h-full rounded-full bg-[#218451] transition-all duration-500" 
                  :style="{ width: `${project.available_places / 3 * 100}%` }"
                ></div>
              </div>
              <p class="mt-2 text-xs text-[#7b887f]">Capacité disponible pour le projet.</p>
              
              <button 
                v-if="!done" 
                class="btn-primary mt-7 w-full" 
                :disabled="!project.available_places || project.status !== 'Ouvert'"
                :class="(!project.available_places || project.status !== 'Ouvert') ? 'opacity-40 cursor-not-allowed' : 'hover:shadow-soft transition-shadow'"
                @click="confirmOpen = true"
              >
                Choisir ce sujet
              </button>
              
              <div v-else class="mt-7 rounded-xl bg-[#e6f5ec] p-3 text-sm font-bold text-[#176b43] flex items-center justify-center gap-2">
                <CheckCircle2 :size="17" />
                Sujet sélectionné
              </div>
              
              <p class="mt-3 text-center text-[11px] leading-5 text-[#8a968e]">
                Votre sélection a été enregistrée.<br />
                Contactez votre responsable pour finaliser.
              </p>
              

            </aside>
          </div>
        </div>
        
        <div v-if="notice" role="status" class="mt-4 flex items-center gap-2 rounded-xl bg-[#e6f5ec] p-4 text-sm font-semibold text-[#176b43] animate-fade-in">
          <CheckCircle2 :size="18" />
          {{ notice }}
        </div>
      </template>
    </main>
    
    <!-- Confirmation Modal -->
    <div 
      v-if="confirmOpen && project" 
      class="fixed inset-0 z-50 flex items-center justify-center bg-[#14271c]/45 p-4 animate-fade-in"
      @click.self="confirmOpen = false"
    >
      <section role="dialog" aria-modal="true" class="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl animate-scale-in">
        <h2 class="text-xl font-extrabold">Confirmer votre choix</h2>
        <p class="mt-2 text-sm leading-6 text-[#718078]">Confirmez-vous la sélection de ce sujet ?</p>
        <p class="my-4 rounded-xl bg-[#f4f8f5] p-3 text-sm font-bold">{{ project.title }}</p>
        <div class="flex justify-end gap-3">
          <button class="btn-secondary" @click="confirmOpen = false">Annuler</button>
          <button class="btn-primary" @click="choose">Confirmer</button>
        </div>
      </section>
    </div>
  </div>
</template>
