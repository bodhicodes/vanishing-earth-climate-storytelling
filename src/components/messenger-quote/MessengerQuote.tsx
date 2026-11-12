/**
 * MessengerQuote.tsx: A short quote from a named person, with a link to
 * the page where they said it. Quotes must be exact and published.
 */

import { component$ } from "@builder.io/qwik";

interface MessengerQuoteProps {
  quote: string;
  name: string;
  role: string;
  sourceLabel: string;
  sourceUrl: string;
  color: string;
}

export const MessengerQuote = component$<MessengerQuoteProps>((props) => {
  return (
    <figure
      class="max-w-2xl mx-auto mb-16 border-l-2 pl-5 sm:pl-6"
      style={{ borderColor: props.color }}
    >
      <blockquote class="font-serif text-xl sm:text-2xl text-white leading-snug">
        &ldquo;{props.quote}&rdquo;
      </blockquote>
      <figcaption class="mt-4 text-sm text-slate-200">
        <span class="font-medium text-white">{props.name}</span>
        <span>, {props.role}</span>
        <a
          href={props.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          class="block mt-1 text-xs text-slate-300 underline decoration-slate-500 underline-offset-2 hover:text-white transition-colors"
        >
          {props.sourceLabel}
        </a>
      </figcaption>
    </figure>
  );
});
