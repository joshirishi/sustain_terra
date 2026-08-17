// Pulls every content table out of Supabase into src/data/content.json.
// The JSON snapshot is what the site renders on first paint; the client then
// refreshes from the live database. Run after editing content in the dashboard.
import { writeFileSync, readFileSync } from 'node:fs';

const env = Object.fromEntries(
  readFileSync(new URL('../.env.local', import.meta.url), 'utf8')
    .split('\n')
    .filter((l) => l.includes('='))
    .map((l) => [l.slice(0, l.indexOf('=')).trim(), l.slice(l.indexOf('=') + 1).trim()]),
);

const url = env.VITE_SUPABASE_URL;
const key = env.VITE_SUPABASE_PUBLISHABLE_KEY;

const TABLES = {
  stats: 'sort_order',
  core_values: 'sort_order',
  services: 'sort_order',
  programs: 'sort_order',
  team_members: 'sort_order',
  testimonials: 'sort_order',
  differentiators: 'sort_order',
};

const out = {};
for (const [table, order] of Object.entries(TABLES)) {
  const res = await fetch(`${url}/rest/v1/${table}?select=*&order=${order}.asc`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` },
  });
  if (!res.ok) throw new Error(`${table}: ${res.status} ${await res.text()}`);
  out[table] = await res.json();
  console.log(`${table.padEnd(16)} ${out[table].length} rows`);
}

writeFileSync(new URL('../src/data/content.json', import.meta.url), JSON.stringify(out, null, 2) + '\n');
console.log('\nwrote src/data/content.json');
