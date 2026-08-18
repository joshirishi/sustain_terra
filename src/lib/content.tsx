import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import snapshot from '@/data/content.json';
import { supabase } from '@/lib/supabase';
import type { Content } from '@/lib/types';

/**
 * The JSON snapshot (built by `pnpm sync:content`) paints immediately, then the
 * live database refreshes it. Editors change copy in Supabase; the site follows
 * without a deploy, and still renders if the database is unreachable.
 */
const ContentContext = createContext<Content>(snapshot as Content);

const TABLES = [
  'stats',
  'core_values',
  'services',
  'programs',
  'team_members',
  'testimonials',
  'policies',
  'policy_faqs',
  'differentiators',
] as const;

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<Content>(snapshot as Content);

  useEffect(() => {
    const db = supabase;
    if (!db) return;
    let cancelled = false;

    (async () => {
      const results = await Promise.all(
        TABLES.map((t) => db.from(t).select('*').order('sort_order', { ascending: true })),
      );
      if (cancelled) return;

      const next = { ...(snapshot as Content) };
      results.forEach((res, i) => {
        if (!res.error && res.data?.length) {
          const table = TABLES[i];
          // For team_members, merge with seed data to fill in missing photo_url
          if (table === 'team_members') {
            const seedTeam = (snapshot as Content).team_members;
            const liveTeam = res.data as typeof seedTeam;
            (next as Record<string, unknown>)[table] = liveTeam.map((live) => {
              const seed = seedTeam.find((s) => s.id === live.id);
              return {
                ...live,
                photo_url: live.photo_url || seed?.photo_url,
              };
            });
          } else {
            (next as Record<string, unknown>)[table] = res.data;
          }
        }
      });
      setContent(next);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}

export const useContent = () => useContext(ContentContext);
