/**
 * ResponseBlock.tsx: "What's working": one named place, what was done
 * there, the result (only when the source states one), and a source link.
 */

import { component$ } from "@builder.io/qwik";
import { SourceLine } from "~/components/source-line/SourceLine";

interface ResponseBlockProps {
  place: string;
  whatWasDone: string;
  result?: string;
  sourceLabel: string;
  sourceUrl: string;
  color: string;
}

export const ResponseBlock = component$<ResponseBlockProps>((props) => {
  return (
    <div class="max-w-2xl mx-auto mb-16 rounded-lg border border-slate-800 bg-slate-900/60 p-6">
      <h3
        class="text-xs font-mono tracking-widest uppercase mb-3"
        style={{ color: props.color }}
      >
        What&rsquo;s working
      </h3>
      <p class="font-serif text-xl text-white mb-3">{props.place}</p>
      <p class="text-base text-slate-300 leading-relaxed">
        {props.whatWasDone}
      </p>
      {props.result && (
        <p class="mt-3 text-base text-slate-100 leading-relaxed">
          {props.result}
        </p>
      )}
      <SourceLine
        class="mt-4"
        label={props.sourceLabel}
        url={props.sourceUrl}
      />
    </div>
  );
});
