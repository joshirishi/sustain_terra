import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export function AccordionItem({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-line">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-4 px-0 text-left font-medium text-ink hover:text-forest transition-colors"
        aria-expanded={open}
      >
        {title}
        <ChevronDown
          size={20}
          className={`shrink-0 text-moss transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>
      {open && <div className="pb-4 text-[0.95rem] leading-relaxed text-slate whitespace-pre-wrap">{children}</div>}
    </div>
  );
}
