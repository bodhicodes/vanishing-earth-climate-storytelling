/**
 * ActionCards.tsx: Three concrete actions for the ending, each a card
 * with a visible link.
 */

import { component$ } from "@builder.io/qwik";

interface Action {
  label: string;
  body: string;
  href: string;
  linkText: string;
}

interface ActionCardsProps {
  actions: Action[];
}

export const ActionCards = component$<ActionCardsProps>((props) => {
  return (
    <ol class="grid gap-4 sm:grid-cols-3 list-none p-0 text-left">
      {props.actions.map((action, i) => (
        <li
          key={action.href}
          class="flex flex-col rounded-lg border border-slate-700 bg-slate-900/60 p-5"
        >
          <span class="text-xs font-mono tracking-widest text-slate-300 mb-2">
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 class="font-serif text-lg text-white mb-2">{action.label}</h3>
          <p class="text-sm text-slate-300 leading-relaxed flex-1">
            {action.body}
          </p>
          <a
            href={action.href}
            target="_blank"
            rel="noopener noreferrer"
            class="mt-4 text-sm text-white underline decoration-slate-500 underline-offset-2 hover:decoration-white"
          >
            {action.linkText}
          </a>
        </li>
      ))}
    </ol>
  );
});
