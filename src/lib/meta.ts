import { useEffect } from 'react';

const SUFFIX = 'Sustain Terra Green Ventures';

/** Per-route title and description. The app is client-rendered, so this runs on navigation. */
export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = `${title} — ${SUFFIX}`;
    let tag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!tag) {
      tag = document.createElement('meta');
      tag.name = 'description';
      document.head.appendChild(tag);
    }
    tag.content = description;
  }, [title, description]);
}
