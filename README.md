# CAMPUS+ — Portail de sélection de PFE

Application Nuxt 4 pour la gestion des projets de fin d'études universitaires. Ce portail permet aux étudiants de consulter et de sélectionner des sujets de PFE.

## Fonctionnalités

- Page de connexion en français avec authentification locale.
- Catalogue de sujets : recherche, filtres, pagination, détails et sélection avec confirmation.
- Page de sensibilisation à la cybersécurité.
- Mise en page responsive et composants accessibles.
- Schéma Supabase, données de départ et RLS.
- Mode local : les projets et la sélection sont conservés en mémoire/session locale uniquement.

## Prérequis

- Node.js 20 ou plus récent
- npm
- (Optionnel) un projet Supabase pour préparer la couche de données

## Démarrer en local

```bash
npm install
cp .env.example .env
npm run dev
```

Ouvrir l’URL locale affichée par Nuxt, généralement `http://localhost:3000`.

## Identifiants

- Identifiant : `etudiant`
- Mot de passe : `CAMPUS-2026`
- Code : `123456`

La vérification est locale. Les champs ne sont ni envoyés à un serveur, ni écrits dans des logs ou dans une base.

## Supabase (optionnel)

1. Créez un projet Supabase.
2. Dans le SQL Editor, exécutez `supabase/migrations/202610130001_initial_schema.sql`.
3. Exécutez ensuite `supabase/seed.sql`.
4. Copiez l’URL du projet et la clé anon dans `.env` selon `.env.example`.

Le mode local actuel n’écrit pas les sélections dans Supabase. Pour une extension, créez une route serveur Nuxt qui valide strictement la session, l’alias et l’identifiant de projet, applique une limitation de débit, et utilise uniquement une clé serveur gardée côté serveur.

## Limites de sécurité

- Ce n’est pas un système d’authentification institutionnel ou un service de candidature officiel.
- Pas de SSO réel, pas de collecte de mots de passe, pas de collecte de codes 2FA, pas de transfert d’identifiants.
- Le « rester connecté » n’est pas utilisé pour conserver des secrets.
- Les sélections sont locales et non officielles.
- Le SQL autorise la lecture des projets, mais n’accorde pas d’écriture directe sur les sélections.
- Ne déployez pas ce système en public comme une page de connexion institutionnelle officielle.

## Structure

```text
app/
  app.vue
  assets/css/main.css
  components/PortalHeader.vue
  composables/useSession.ts
  pages/
    index.vue
    login.vue
    awareness.vue
    projects/index.vue
    projects/[id].vue
supabase/
  migrations/202610130001_initial_schema.sql
  seed.sql
.env.example
nuxt.config.ts
package.json
```
