<script setup lang="ts">
import { UserRound, LockKeyhole } from 'lucide-vue-next'
import { ref } from 'vue'
import { useSession } from '../composables/useSession'

const { signIn, incrementCounter } = useSession()
const username = ref<string>('')
const password = ref<string>('')
const remember = ref(false)
const errors = ref<string[]>([])
const busy = ref(false)
const toast = ref('')

async function submit() {
  errors.value = []
  await incrementCounter()
  if (!username.value.trim()) errors.value.push("Veuillez saisir un nom d'utilisateur.")
  if (!password.value.trim()) errors.value.push("Veuillez saisir un mot de passe.")
  if (username.value !== 'etudiant' || password.value !== 'CAMPUS-2026') {
    errors.value.push("Identifiants incorrects.")
    return
  }
  busy.value = true
  await signIn(username.value)
  return navigateTo('/projects')
}

async function sso() {
  errors.value = []
  await incrementCounter()
  busy.value = true
  await signIn('Étudiant SSO')
  return navigateTo('/projects')
}
</script>

<template>
  <main class="min-h-screen bg-[#f5f5f5] flex flex-col">
    <!-- Header with PROGRES logo -->
    <header class="bg-white py-6 px-4">
      <div class="max-w-4xl mx-auto text-center">
        <div class="flex items-center justify-center gap-4 mb-4">
          <img src="https://imgs.search.brave.com/A1bWpRz7YOX82F1ffjGzpP01tenqUgUzWeak3RM_RDo/rs:fit:200:200:1:0/g:ce/aHR0cHM6Ly95dDMu/Z29vZ2xldXNlcmNv/bnRlbnQuY29tL2g0/VWdFWHc1VGRGMWcw/M1NZeXBBc0tBOGxK/SDJEckdXNWt4cHRT/VUdydWN3UTZpaGZH/QndRVWpucklWV28x/NTJPdERMVmVLX2xB/PXM5MDAtYy1rLWMw/eDAwZmZmZmZmLW5v/LXJq" alt="PROGRES Logo" class="h-20" />
          <div class="text-left">
            <img src="https://imgs.search.brave.com/7-P5RA6k2M5DkCDnZ0GnYbQsu5ZjqOMZjJpsk0Z-SL8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9wbmcu/cG5ndHJlZS5jb20v/cG5nLXZlY3Rvci8y/MDIyMTExOC9vdXJt/aWQvcG5ndHJlZS1h/bGdlcmlhLWZsYWct/cG5nLWltYWdlXzY0/NjA3OTQucG5n" alt="Algerian Flag" class="h-16 mb-2" />
            <div class="text-xs text-gray-600 leading-tight">
              وزارة التعليم العالي والبحث العلمي<br />
              Ministère de l'Enseignement Supérieur et de la Recherche Scientifique
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div class="flex-1 flex items-center justify-center py-8 px-4">
      <div class="w-full max-w-md">
        <!-- Form Container -->
        <div class="bg-white rounded-lg shadow-lg p-8">
          <!-- Form Header -->
          <div class="text-center mb-8">
            <h1 class="text-xl font-bold text-gray-800">Progiciel de Gestion Intégré</h1>
            <h2 class="text-lg text-gray-600">Formation et Vie Etudiante</h2>
          </div>

          <!-- Form -->
          <form class="space-y-5" @submit.prevent="submit">
            <!-- Username Field -->
            <div class="text-left">
              <label class="block text-sm font-medium text-gray-700 mb-2">matricule</label>
              <div class="relative">
                <input 
                  v-model="username"
                  type="text"
                  autocomplete="off"
                  placeholder=""
                  class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <UserRound 
                  :size="20" 
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
            </div>

            <!-- Password Field -->
            <div class="text-left">
              <label class="block text-sm font-medium text-gray-700 mb-2">Mot de passe</label>
              <div class="relative">
                <input 
                  v-model="password"
                  type="password"
                  autocomplete="off"
                  placeholder=""
                  class="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <LockKeyhole 
                  :size="20" 
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
            </div>

            <!-- Error Messages -->
            <div v-if="errors.length" class="p-3 bg-red-50 border border-red-200 rounded-md">
              <p v-for="error in errors" :key="error" class="text-sm text-red-600">{{ error }}</p>
            </div>

            <!-- Buttons Row -->
            <div class="flex gap-4">
                <button 
                type="button" 
                @click="sso"
                :disabled="busy"
                class="flex-1 bg-[#4CAF50] hover:bg-[#45a049] text-white font-medium py-3 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"

              >
                Se connecter
               
              </button>
              <button 
                type="submit" 
                :disabled="busy"
                class="flex-1 bg-[#4CAF50] hover:bg-[#45a049] text-white font-medium py-3 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                 Se connecter avec SSO
              </button>
            
            </div>

            <!-- Remember Me Checkbox -->
            <div class="flex items-center">
              <input 
                v-model="remember" 
                type="checkbox" 
                id="remember"
                class="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <label for="remember" class="ml-2 text-sm text-gray-600">Rester connecté</label>
            </div>
          </form>
        </div>

        <!-- Forgot Password Link -->
        <div class="mt-4 text-center">
          <button 
            type="button"
            @click="toast='Contactez le service informatique pour la récupération de mot de passe.'"
            class="text-sm text-gray-600 hover:text-green-600 hover:underline"
          >
            Mot de passe oublié ?
          </button>
        </div>


      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-white py-4 px-4 text-center text-xs text-gray-500">
      <p>
        Copyright 2026 Ministère de l'Enseignement Supérieur et de la Recherche Scientifique<br />
        version publiée le {{ new Date().toLocaleDateString('fr-FR') }} {{ new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) }}
      </p>
    </footer>
  </main>
</template>

<style scoped>
/* Custom scrollbar for the page */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
