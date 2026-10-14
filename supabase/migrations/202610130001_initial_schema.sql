-- CAMPUS+ fictional university demo schema
create extension if not exists pgcrypto;

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique,
  title text not null,
  description text not null default '',
  domain text not null,
  specialty text not null,
  supervisor text not null,
  available_places integer not null default 0 check (available_places >= 0),
  project_type text not null,
  required_skills text not null default '',
  academic_year text not null,
  status text not null default 'Ouvert' check (status in ('Ouvert','Complet','Fermé')),
  created_at timestamptz not null default now()
);

create table if not exists public.demo_selections (
  id uuid primary key default gen_random_uuid(),
  demo_session_id text not null check (length(demo_session_id) between 8 and 100),
  project_id uuid not null references public.projects(id) on delete restrict,
  student_alias text not null check (length(student_alias) between 1 and 80),
  selection_status text not null default 'Sélectionné' check (selection_status in ('Sélectionné','Annulé')),
  created_at timestamptz not null default now()
);

create index if not exists projects_domain_idx on public.projects(domain);
create index if not exists projects_specialty_idx on public.projects(specialty);
create index if not exists demo_selections_session_idx on public.demo_selections(demo_session_id);

alter table public.projects enable row level security;
alter table public.demo_selections enable row level security;

-- Publicly readable only because every row is fictional demonstration content.
create policy "Anyone can read fictional projects"
  on public.projects for select
  using (true);

-- No direct client insert/update/delete policies for selections.
-- Use a server-side validated endpoint or keep selection in local demo state.
-- Never use the service-role key in the browser.
