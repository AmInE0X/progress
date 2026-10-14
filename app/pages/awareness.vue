<script setup lang="ts">
import { ShieldCheck, Globe, LockKeyhole, MailWarning, CircleCheck, ExternalLink, GraduationCap, SearchCheck } from 'lucide-vue-next'
import { gsap } from 'gsap'

const steps = [
  { n: '01', title: 'Vérifiez le domaine', text: 'Lisez le nom de domaine de droite à gauche avant de vous connecter. Méfiez-vous des fautes subtiles, des sous-domaines trompeurs et des caractères ressemblants.' },
  { n: '02', title: 'HTTPS ne suffit pas', text: 'Le cadenas indique que la connexion est chiffrée vers ce site, pas que le site est légitime. Vérifiez le domaine et le certificat, et accédez au portail depuis un favori officiel.' },
  { n: '03', title: 'Ne partagez jamais vos secrets', text: 'Un mot de passe ou un code à usage unique ne doit pas être communiqué à une page dont vous n’avez pas vérifié l’authenticité. Ne réutilisez pas vos identifiants universitaires sur un site tiers.' },
  { n: '04', title: 'Signalez le doute', text: 'Ne cliquez plus sur les liens suspects. Prévenez le service informatique ou l’équipe de sécurité via un canal officiel, et transmettez l’URL suspecte sans saisir d’informations.' }
]

// Animations
onMounted(() => {
  gsap.from('.awareness-header', {
    opacity: 0,
    y: 30,
    duration: 0.6,
    ease: 'power3.out'
  })
  
  gsap.from('.awareness-card', {
    opacity: 0,
    y: 20,
    duration: 0.5,
    stagger: 0.1,
    ease: 'power2.out',
    delay: 0.2
  })
  
  gsap.from('.awareness-section', {
    opacity: 0,
    y: 20,
    duration: 0.5,
    stagger: 0.1,
    ease: 'power2.out',
    delay: 0.4
  })
})
</script>

<template>
  <div class="min-h-screen bg-[#f5f7f5]">
    <PortalHeader />
    
    <main class="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:py-12">
      <!-- Header -->
      <div class="awareness-header mb-8 overflow-hidden rounded-3xl bg-[#174b35] p-7 text-white sm:p-10 shadow-soft">
        <div class="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
          <ShieldCheck :size="30" />
        </div>
        <p class="text-xs font-extrabold uppercase tracking-[.18em] text-[#a9d8ba]">Sensibilisation à la cybersécurité</p>
        <h1 class="mt-3 max-w-3xl text-3xl font-extrabold leading-tight sm:text-4xl">
          Repérer le phishing avant qu’il ne soit trop tard.
        </h1>
        <p class="mt-4 max-w-2xl text-sm leading-7 text-white/75">
          Apprenez à identifier les tentatives de phishing et protégez vos informations.
        </p>
      </div>
      
      <!-- Info Banner -->
      <div class="awareness-card mb-6 rounded-2xl border border-[#cde7d4] bg-[#eaf6ee] p-5 shadow-soft">
        <div class="flex gap-3">
          <CircleCheck :size="22" class="mt-0.5 shrink-0 text-[#18794e]" />
          <div>
            <h2 class="font-extrabold text-[#245d3c]">Pourquoi cette information est-elle importante ?</h2>
            <p class="mt-1 text-sm leading-6 text-[#4f6e59]">
              Les pages de phishing imitent souvent des services familiers pour inciter à agir vite. 
              Soyez toujours vigilant lorsque vous recevez des liens ou des demandes de connexion inattendues.
            </p>
          </div>
        </div>
      </div>
      
      <!-- Cards Grid -->
      <div class="grid gap-5 md:grid-cols-2">
        <article class="awareness-card card p-6 sm:p-7 shadow-soft hover:shadow-strong transition-shadow">
          <div class="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#fff1df] text-[#a36d1e]">
            <MailWarning :size="22" />
          </div>
          <h2 class="text-xl font-extrabold">Qu’est-ce que le phishing ?</h2>
          <p class="mt-3 text-sm leading-7 text-[#6d7b72]">
            Le phishing (hameçonnage) est une tentative de tromper une personne pour lui faire révéler des informations, 
            ouvrir une pièce jointe dangereuse ou effectuer une action. Le message peut se faire passer pour une université, 
            une banque ou un service informatique.
          </p>
          <div class="mt-4 rounded-xl bg-[#faf7f0] p-4 text-xs leading-5 text-[#82663a]">
            <strong>Signaux d’alerte :</strong> urgence inhabituelle, adresse incohérente, fautes, demande de code de connexion ou lien inattendu.
          </div>
        </article>
        
        <article class="awareness-card card p-6 sm:p-7 shadow-soft hover:shadow-strong transition-shadow">
          <div class="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#eaf1ff] text-[#4a67a8]">
            <Globe :size="22" />
          </div>
          <h2 class="text-xl font-extrabold">Portails copiés et faux domaines</h2>
          <p class="mt-3 text-sm leading-7 text-[#6d7b72]">
            Une copie visuelle peut reproduire un logo, des couleurs et des formulaires familiers. 
            Les attaquants peuvent utiliser un domaine proche de l’original pour faire baisser la vigilance. 
            Le design seul ne prouve jamais l’authenticité.
          </p>
          <div class="mt-4 rounded-xl bg-[#f3f6fc] p-4 text-xs leading-5 text-[#526a9b]">
            <strong>Réflexe :</strong> tapez vous-même l’adresse connue ou utilisez un favori déjà vérifié plutôt qu’un lien reçu.
          </div>
        </article>
      </div>
      
      <!-- Steps Section -->
      <section class="awareness-section card mt-5 p-6 sm:p-8 shadow-soft">
        <h2 class="text-xl font-extrabold">4 réflexes à adopter</h2>
        <div class="mt-6 space-y-5">
          <div v-for="s in steps" :key="s.n" class="flex gap-4 group">
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e8f5ec] text-sm font-extrabold text-[#18794e] transition-transform group-hover:scale-110">
              {{ s.n }}
            </div>
            <div>
              <h3 class="font-extrabold">{{ s.title }}</h3>
              <p class="mt-1 text-sm leading-6 text-[#718078]">{{ s.text }}</p>
            </div>
          </div>
        </div>
      </section>
      
      <!-- What to do Section -->
      <section class="awareness-section card mt-5 p-6 sm:p-8 shadow-soft">
        <div class="flex items-start gap-3">
          <div class="rounded-xl bg-[#e8f5ec] p-3 text-[#18794e] flex-shrink-0">
            <LockKeyhole :size="22" />
          </div>
          <div>
            <h2 class="text-xl font-extrabold">Que faire si vous avez saisi des informations ?</h2>
            <ul class="mt-3 space-y-2 text-sm leading-6 text-[#6d7b72]">
              <li>• Contactez immédiatement le service informatique officiel.</li>
              <li>• Changez le mot de passe depuis le vrai portail, en utilisant une adresse vérifiée.</li>
              <li>• Révoquez les sessions actives et signalez toute activité inhabituelle si cette option existe.</li>
              <li>• Ne transférez pas le message suspect à d’autres étudiants sans avertissement.</li>
            </ul>
          </div>
        </div>
      </section>
      
      <!-- Footer CTA -->
      <div class="awareness-card mt-7 flex flex-col justify-between gap-4 rounded-2xl border border-[#dce8df] bg-white p-5 sm:flex-row sm:items-center shadow-soft">
        <div class="flex items-center gap-3">
          <GraduationCap :size="23" class="text-[#18794e]" />
          <div>
            <p class="font-extrabold">Fin de la sensibilisation</p>
            <p class="mt-1 text-xs text-[#7a877f]">Restez vigilant face aux tentatives de phishing.</p>
          </div>
        </div>
        <NuxtLink to="/projects" class="btn-primary group">
          Retour aux sujets 
          <SearchCheck :size="17" class="group-hover:translate-x-0.5 transition-transform" />
        </NuxtLink>
      </div>
    </main>
    
    <footer class="border-t border-[#e4eae5] bg-white px-5 py-6 text-center text-xs text-[#8b968f]">
      CAMPUS+ · Sensibilisation à la cybersécurité
    </footer>
  </div>
</template>
