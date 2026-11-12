/**
 * SourceLine.tsx: Small muted citation shown directly under a number.
 */

import { component$ } from "@builder.io/qwik";

interface SourceLineProps {
  label: string;
  url: string;
  /** Optional extra text before the link, e.g. "Source:" is the default */
  prefix?: string;
  class?: string;
}

export const SourceLine = component$<SourceLineProps>((props) => {
  return (
    <p class={["text-xs text-slate-300 leading-snug", props.class]}>
      {props.prefix ?? "Source:"}{" "}
      <a
        href={props.url}
        target="_blank"
        rel="noopener noreferrer"
        class="underline decoration-slate-500 underline-offset-2 hover:text-white transition-colors"
      >
        {props.label}
      </a>
    </p>
  );
});
