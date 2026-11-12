/**
 * StoryHero.tsx: Opening for /story. Same look as Hero, but the title,
 * subtitle and intro come from story.ts so the audience is named up front.
 */

import { component$ } from "@builder.io/qwik";

interface StoryHeroProps {
  title: string;
  subtitle: string;
  intro: string[];
}

export const StoryHero = component$<StoryHeroProps>((props) => {
  return (
    <header class="relative flex flex-col items-center lg:items-start justify-center text-center lg:text-left px-6 lg:px-12 py-16 overflow-hidden h-full">
      <div
        class="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(30, 58, 138, 0.15) 0%, transparent 60%)",
        }}
      />

      <img
        src="/data/assets/logos/Terra-studio-light.png"
        alt="Terra Studio"
        class="h-8 mb-8"
      />

      <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-none max-w-4xl">
        {props.title}
      </h1>

      <p class="mt-6 text-lg sm:text-xl md:text-2xl text-slate-300 max-w-2xl leading-relaxed font-light">
        {props.subtitle}
      </p>

      <div class="mt-8 max-w-xl text-base text-slate-100 leading-relaxed space-y-4">
        {props.intro.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    </header>
  );
});
