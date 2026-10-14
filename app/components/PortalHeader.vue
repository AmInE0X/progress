<script setup lang="ts">
import { GraduationCap, LayoutDashboard, BookOpenCheck, ShieldCheck, LogOut, Menu, X } from 'lucide-vue-next'
import { useSession, studentAlias } from '~/composables/useSession'
import { gsap } from 'gsap'

const { signOut } = useSession()
const route = useRoute()
const open = ref(false)
const links = [
  { to:'/projects', label:'Sujets de PFE', icon:LayoutDashboard },
  { to:'/awareness', label:'Cyber-vigilance', icon:ShieldCheck }
]

// Header animation
onMounted(() => {
  gsap.from('.header-content', {
    opacity: 0,
    y: -20,
    duration: 0.4,
    ease: 'power2.out'
  })
})
</script>

<template>
  <header class="sticky top-0 z-30 border-b border-[#e1e8e3] bg-white/95 backdrop-blur transition-all duration-200">
    <div class="header-content mx-auto flex max-w-[1400px] items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
      <NuxtLink to="/projects" class="flex items-center gap-3 group">
        <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#e7f4eb] text-[#18794e] shadow-soft transition-transform group-hover:scale-105">
          <GraduationCap :size="23" />
        </div>
        <div>
          <div class="text-sm font-extrabold tracking-tight text-[#20372a]">CAMPUS<span class="text-[#238453]">+</span></div>
          <div class="text-[10px] font-semibold tracking-wider text-[#78877d]">PORTAIL PFE</div>
        </div>
      </NuxtLink>
      
      <nav class="hidden items-center gap-1 md:flex">
        <NuxtLink 
          v-for="link in links" 
          :key="link.to" 
          :to="link.to" 
          class="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 hover:shadow-soft"
          :class="route.path.startsWith(link.to) ? 'bg-[#eaf5ee] text-[#176b43]' : 'text-[#647168] hover:bg-gray-50'"
        >
          <component :is="link.icon" :size="16" />
          {{ link.label }}
        </NuxtLink>
      </nav>
      
      <div class="hidden items-center gap-3 md:flex">
        <div class="text-right">
          <div class="text-sm font-bold">{{ studentAlias }}</div>
          <div class="text-xs text-[#78877d]">Session active</div>
        </div>
        <div class="flex h-9 w-9 items-center justify-center rounded-full bg-[#e6eee8] text-sm font-extrabold text-[#276a48] shadow-soft">
          {{ studentAlias.split(' ').map(n => n[0]).join('').toUpperCase() }}
        </div>
        <button 
          class="rounded-lg p-2 text-[#718078] hover:bg-gray-100 hover:text-[#18794e] transition-all duration-200 shadow-soft hover:shadow-md"
          aria-label="Quitter la session" 
          @click="signOut()"
        >
          <LogOut :size="18" />
        </button>
      </div>
      
      <button 
        class="rounded-lg p-2 md:hidden hover:bg-gray-100 transition-colors"
        :aria-label="open ? 'Fermer le menu' : 'Ouvrir le menu'" 
        @click="open = !open"
      >
        <component :is="open ? X : Menu" />
      </button>
    </div>
    
    <div v-if="open" class="border-t border-[#e4eae5] bg-white px-4 py-3 shadow-soft md:hidden">
      <NuxtLink 
        v-for="link in links" 
        :key="link.to" 
        :to="link.to" 
        class="flex items-center gap-2 rounded-lg px-3 py-3 text-sm transition-colors hover:bg-gray-50"
        @click="open=false"
      >
        <component :is="link.icon" :size="17" />
        {{ link.label }}
      </NuxtLink>
      <button 
        class="flex items-center gap-2 px-3 py-3 text-sm text-red-700 hover:bg-red-50 transition-colors rounded-lg"
        @click="signOut()"
      >
        <LogOut :size="17" />
        Quitter
      </button>
    </div>
  </header>
</template>
