import { ref, computed } from 'vue'
import { useSupabaseClient } from '#imports'

export type Project = {
  id: string; reference: string; title: string; description: string; domain: string;
  specialty: string; supervisor: string; available_places: number; project_type: string;
  required_skills: string; academic_year: string; status: string
}

export const projects: Project[] = [
  { id:'p-001', reference:'PFE-2026-001', title:'Assistant intelligent basé sur le RAG pour questions académiques', description:'Conception d’un assistant qui répond aux questions académiques à partir de documents de cours, avec citations et évaluation de la fiabilité des réponses.', domain:'Intelligence artificielle', specialty:'Intelligence artificielle', supervisor:'Dr. Nadia Benali', available_places:2, project_type:'Application IA', required_skills:'Python, NLP, bases de données, API', academic_year:'2025–2026', status:'Ouvert' },
  { id:'p-002', reference:'PFE-2026-002', title:'Plateforme web de suivi des projets de fin d’études', description:'Développement d’une plateforme de gestion des propositions, des équipes, des encadrements et des livrables.', domain:'Développement web', specialty:'Génie logiciel', supervisor:'M. Karim Haddad', available_places:3, project_type:'Application web', required_skills:'Vue.js, Nuxt, SQL, conception UI/UX', academic_year:'2025–2026', status:'Ouvert' },
  { id:'p-003', reference:'PFE-2026-003', title:'Sensibilisation au phishing par environnement contrôlé', description:'Création d’un environnement local pour expliquer les signaux d’alerte des pages frauduleuses et mesurer les apprentissages.', domain:'Cybersécurité', specialty:'Réseaux et sécurité', supervisor:'Dr. Samir Kaci', available_places:2, project_type:'Étude + prototype', required_skills:'HTTP, sécurité web, UX, rédaction', academic_year:'2025–2026', status:'Ouvert' },
  { id:'p-004', reference:'PFE-2026-004', title:'Tableau de bord de visualisation de données universitaires', description:'Exploration et visualisation de données de scolarité pour faciliter la lecture des indicateurs institutionnels.', domain:'Data science', specialty:'Data science', supervisor:'Mme. Lina Amrane', available_places:1, project_type:'Analyse de données', required_skills:'Python, SQL, statistiques, visualisation', academic_year:'2025–2026', status:'Ouvert' },
  { id:'p-005', reference:'PFE-2026-005', title:'Système de gestion des stages et conventions', description:'Application de gestion du cycle de stage : demandes, validation, conventions et suivi des échéances.', domain:'Systèmes d’information', specialty:'Génie logiciel', supervisor:'M. Yacine Boudiaf', available_places:0, project_type:'Application métier', required_skills:'UML, SQL, développement web', academic_year:'2025–2026', status:'Complet' },
  { id:'p-006', reference:'PFE-2026-006', title:'Détection d’anomalies dans des journaux réseau', description:'Étude de méthodes statistiques et d’apprentissage automatique sur un jeu de journaux.', domain:'Cybersécurité', specialty:'Réseaux et sécurité', supervisor:'Dr. Samir Kaci', available_places:2, project_type:'Prototype de recherche', required_skills:'Python, réseaux, ML, analyse de données', academic_year:'2025–2026', status:'Ouvert' },
  { id:'p-007', reference:'PFE-2026-007', title:'Application mobile de planification des révisions', description:'Prototype de planification personnalisée des révisions avec rappels et suivi de progression.', domain:'Développement web', specialty:'Génie logiciel', supervisor:'Mme. Lina Amrane', available_places:2, project_type:'Application multiplateforme', required_skills:'JavaScript, API, UX, tests', academic_year:'2025–2026', status:'Ouvert' },
  { id:'p-008', reference:'PFE-2026-008', title:'Classification de documents arabes et français', description:'Comparaison de représentations textuelles pour classer un corpus académique bilingue.', domain:'Intelligence artificielle', specialty:'Intelligence artificielle', supervisor:'Dr. Nadia Benali', available_places:1, project_type:'Recherche appliquée', required_skills:'Python, NLP, évaluation de modèles', academic_year:'2025–2026', status:'Ouvert' },
  { id:'p-009', reference:'PFE-2026-009', title:'Conception d’un mini ERP pour une association étudiante', description:'Modélisation et réalisation de modules simples pour les adhésions, activités, inventaire et reporting.', domain:'Systèmes d’information', specialty:'Génie logiciel', supervisor:'M. Karim Haddad', available_places:2, project_type:'Application métier', required_skills:'Modélisation, SQL, API REST', academic_year:'2025–2026', status:'Ouvert' }
]

const sessionKey = 'campus-session'
export const sessionActive = ref(false)
export const selectedProjectId = ref('')
export const studentAlias = ref('')
export const sessionNotice = ref('')
export const count =ref(0)

export function useSession() {
  const supabase = useSupabaseClient()
  const selectedProject = computed(() => projects.find(p => p.id === selectedProjectId.value))
  async function incrementCounter() {
    count.value++
    const { error } = await supabase
      .from('chamo')
      .upsert({ id: 1, count: count.value })
    if (error) console.error('Counter update failed:', error)
  }
  async function signIn(alias: string) {
    await incrementCounter()
    studentAlias.value = alias.trim()
    sessionActive.value = true
    if (import.meta.client) sessionStorage.setItem(sessionKey, 'active')
  }
  function signOut() {
    sessionActive.value = false
    selectedProjectId.value = ''
    if (import.meta.client) sessionStorage.removeItem(sessionKey)
    return navigateTo('/login')
  }
  async function restore() {
    if (import.meta.client) {
      if (sessionStorage.getItem(sessionKey) === 'active') sessionActive.value = true
      const { data, error } = await supabase.from('chamo').select('count').eq('id', 1).single()
      if (error) console.error('Counter load failed:', error)
      if (data) count.value = data.count
    }
  }
  return { projects, selectedProject, selectedProjectId, signIn, signOut, restore, studentAlias, count, incrementCounter }
}
