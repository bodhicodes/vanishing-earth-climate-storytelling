/**
 * story/index.tsx: /story: Vanishing Earth, written for one audience.
 *
 * PLANNING (done before any copy was written)
 *
 * Audience:    A reader who already cares about nature loss and feels there
 *              is nothing they can do about it.
 * Action:      Pick one of three concrete steps: support a named reef
 *              programme, check a local mangrove coastline, or ask a local
 *              land trust one question.
 * Value frame: Stewardship. Protect what people depend on: food, coastlines
 *              and rainfall.
 * Messenger:   One named, quoted person per section, each with a link to the
 *              page where the words were published.
 * Distance:    Each section names a real place and a real organisation. The
 *              ending asks about the reader's own coast or land.
 *
 * Story Spine
 *   Every day         The opening and the coral section: what these places do
 *                     for us.
 *   One day           The Amazon: something changes.
 *   Because of that   Arctic, mangroves, grasslands: how far it has gone, and
 *                     where people are responding.
 *   Until finally     The ending: three actions with links.
 *
 * DATA FLOW
 * ecosystems.ts (name, subtitle, paragraphs, stats, bar, globe) + story.ts
 * (opening, messengers, responses, ending)
 *   -> StorySectionView -> Globe, ThresholdBar, MessengerQuote, ResponseBlock
 */

import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { ecosystems } from "~/data/ecosystems";
import { story } from "~/data/story";
import type { StorySection } from "~/data/story";
import { Nav } from "~/components/nav/Nav";
import { StoryHero } from "~/components/hero/StoryHero";
import { OverviewGlobe } from "~/components/overview-globe/OverviewGlobe";
import { Globe } from "~/components/globe/Globe";
import { ThresholdBar } from "~/components/threshold-bar/ThresholdBar";
import { ScrollSection } from "~/components/scroll-section/ScrollSection";
import { MessengerQuote } from "~/components/messenger-quote/MessengerQuote";
import { ResponseBlock } from "~/components/response-block/ResponseBlock";
import { ActionCards } from "~/components/action-cards/ActionCards";

const linkClass =
  "underline decoration-slate-500 underline-offset-2 hover:text-white transition-colors";

const StorySectionView = component$(
  (props: { section: StorySection; index: number }) => {
    const sec = props.section;
    const eco = ecosystems.find((e) => e.id === sec.ecosystemId)!;
    const isVisible = useSignal(false);
    const sectionRef = useSignal<HTMLElement>();

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(({ cleanup }) => {
      const el = sectionRef.value;
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) isVisible.value = true;
        },
        { threshold: 0.1 },
      );
      observer.observe(el);
      cleanup(() => observer.disconnect());
    });

    return (
      <ScrollSection id={eco.id} color={eco.globe.color}>
        <div ref={sectionRef}>
          <div class="mb-12">
            <Globe
              center={eco.globe.center}
              color={eco.globe.color}
              glowColor={eco.globe.glowColor}
              highlightBounds={eco.globe.highlightBounds}
              regions={eco.globe.regions}
              pattern={eco.globe.pattern}
              isVisible={isVisible.value}
              ariaLabel={`${sec.globeLabel}. Drag to rotate.`}
            />
          </div>

          <div class="text-center mb-12">
            <span
              class="inline-block text-xs font-mono tracking-widest uppercase mb-4"
              style={{ color: eco.globe.color }}
            >
              {String(props.index + 1).padStart(2, "0")}
            </span>
            <h2 class="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white leading-tight">
              {eco.name}
            </h2>
            <p class="mt-3 text-lg text-slate-100 italic">{eco.subtitle}</p>
          </div>

          <div class="space-y-6 mb-16">
            {eco.paragraphs.map((paragraph, i) => (
              <p
                key={i}
                class={[
                  "text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto",
                  "transition-all duration-700 ease-out",
                  isVisible.value
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4",
                ]}
                style={{ transitionDelay: `${400 + i * 200}ms` }}
              >
                {paragraph}
              </p>
            ))}
          </div>


          {/* ── Key statistics ──────────────────────────────────────── */}
          <div class="flex flex-wrap justify-center gap-6 sm:gap-4 max-w-lg mx-auto mb-16">
            {eco.stats.map((stat, i) => (
              <div
                key={i}
                class={[
                  "text-center transition-all duration-700 ease-out flex-1 min-w-[120px] sm:min-w-0",
                  isVisible.value
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4",
                ]}
                style={{ transitionDelay: `${800 + i * 150}ms` }}
              >
                <div
                  class="text-2xl sm:text-3xl font-bold font-mono"
                  style={{ color: eco.globe.color }}
                >
                  {stat.value}
                </div>
                <div class="text-sm text-slate-100 mt-1 leading-tight">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* ── Threshold bar ───────────────────────────────────────── */}
          <div class="mb-16">
            <ThresholdBar
              label={eco.threshold.label}
              currentValue={eco.threshold.currentValue}
              tippingRange={eco.threshold.tippingRange}
              unit={eco.threshold.unit}
              color={eco.globe.color}
              isVisible={isVisible.value}
            />
          </div>

          <MessengerQuote
            quote={sec.messenger.quote}
            name={sec.messenger.name}
            role={sec.messenger.role}
            sourceLabel={sec.messenger.source.label}
            sourceUrl={sec.messenger.source.url}
            color={eco.globe.color}
          />

          <ResponseBlock
            place={sec.response.place}
            whatWasDone={sec.response.whatWasDone}
            result={sec.response.result}
            sourceLabel={sec.response.source.label}
            sourceUrl={sec.response.source.url}
            color={eco.globe.color}
          />
        </div>
      </ScrollSection>
    );
  },
);

export default component$(() => {
  return (
    <main class="bg-slate-950 text-white min-h-screen">
      <Nav />

      <div class="relative min-h-screen flex flex-col items-stretch pt-16">
        <div class="max-w-6xl mx-auto w-full flex-1 flex flex-col lg:flex-row items-stretch">
          <div class="flex-1 flex items-center min-w-0">
            <StoryHero
              title={story.opening.title}
              subtitle={story.opening.subtitle}
              intro={story.opening.intro}
            />
          </div>
          <div class="flex-1 flex items-center justify-center min-w-0 lg:pr-8 pb-32 lg:pb-8">
            <OverviewGlobe />
          </div>
        </div>

        <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-10">
          <span class="text-[10px] tracking-[0.25em] uppercase text-slate-100 animate-pulse">
            Scroll
          </span>
          <div class="w-[18px] h-[28px] rounded-full border border-slate-700 flex justify-center pt-[5px]">
            <div
              class="w-[3px] h-[6px] bg-slate-200 rounded-full"
              style={{ animation: "scrollDot 1.8s ease-in-out infinite" }}
            />
          </div>
        </div>
      </div>

      {story.sections.map((section, i) => (
        <StorySectionView key={section.ecosystemId} section={section} index={i} />
      ))}

      <footer class="py-32 px-6 text-center">
        <div class="max-w-3xl mx-auto">
          <h2 class="text-3xl sm:text-4xl font-serif font-bold text-white mb-8">
            {story.ending.title}
          </h2>

          {story.ending.paragraphs.map((p, i) => (
            <p key={i} class="text-lg text-slate-100 leading-relaxed mb-6 max-w-2xl mx-auto">
              {p}
            </p>
          ))}
          <div class="mb-12" />

          <ActionCards actions={story.ending.actions} />

          <div class="border-t border-slate-800 pt-8 mt-20 text-sm text-slate-200">
            <div class="flex flex-wrap items-center justify-center gap-y-2 gap-x-4 mt-6 text-xs text-slate-300">
              <a href="/" class={linkClass}>
                Original edition
              </a>
              <a href="/about" class={linkClass}>
                About this project
              </a>
              <a
                href="https://github.com/bodhicodes/vanishing-earth-climate-storytelling"
                target="_blank"
                rel="noopener noreferrer"
                class={linkClass}
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
});

export const head: DocumentHead = {
  title: "Vanishing Earth: the story edition",
  meta: [
    {
      name: "description",
      content:
        "Five ecosystems near tipping points, written for readers who care and feel helpless, with a place in each where people are making a difference.",
    },
    { property: "og:type", content: "website" },
    { property: "og:title", content: "Vanishing Earth: the story edition" },
    {
      property: "og:description",
      content:
        "Five ecosystems, named places where people are making a difference, and three things you can do.",
    },
    {
      property: "og:image",
      content: "https://vanishing-earth.vercel.app/og-image.svg",
    },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Vanishing Earth: the story edition" },
    {
      name: "twitter:description",
      content:
        "Five ecosystems, named places where people are making a difference, and three things you can do.",
    },
    {
      name: "twitter:image",
      content: "https://vanishing-earth.vercel.app/og-image.svg",
    },
  ],
};
