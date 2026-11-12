/**
 * story.ts: The /story edition of Vanishing Earth.
 *
 * This file is a story layer on top of ecosystems.ts. The ecosystem file
 * supplies each place's name, subtitle, paragraphs, stats, threshold bar and
 * globe. This file supplies the opening, the messenger quotes, the response
 * blocks and the ending for one named audience. Quotes are copied exactly
 * from the linked page.
 */

import type { Ecosystem } from "./ecosystems";

export interface Source {
  label: string;
  url: string;
  retrieved?: string;
}

export interface Messenger {
  /** Exact words, from a published source */
  quote: string;
  name: string;
  /** e.g. "Coral reef ecologist, lead author of the study" */
  role: string;
  /** Where they said it; the link must open */
  source: Source;
}

export interface Response {
  /** A named place */
  place: string;
  /** One or two sentences */
  whatWasDone: string;
  /** Only when the source states a result */
  result?: string;
  source: Source;
}

export interface StorySection {
  ecosystemId: Ecosystem["id"];
  /** Story Spine label, for authors only (not rendered) */
  beat: "Every day" | "One day" | "Because of that" | "Until finally";
  messenger: Messenger;
  response: Response;
  globeLabel: string;
}

export interface StoryAction {
  label: string;
  body: string;
  href: string;
  linkText: string;
}

export interface Story {
  audience: string;
  valueFrame: string;
  opening: { title: string; subtitle: string; intro: string[] };
  sections: StorySection[];
  ending: {
    title: string;
    paragraphs: string[];
    actions: StoryAction[];
  };
}

export const story: Story = {
  audience:
    "A reader who already cares about nature loss and feels there is nothing they can do about it.",
  valueFrame:
    "Stewardship: protecting what people depend on, such as food, coastlines and rainfall.",

  opening: {
    title: "Vanishing Earth",
    subtitle: "Five places that look after us, and who is looking after them",
    intro: [
      "This story is for you if you already care about nature and have wondered whether anything you do could matter. The five ecosystems ahead supply things many of us rely on: food from the sea, rain for farms, protection from storms and a stable climate.",
      "Each section shows what is changing, how far it has gone and where people have made a difference. The last page offers three things you can do.",
    ],
  },

  sections: [
    // ── Coral reefs ────────────────────────────────────────────────────────
    {
      ecosystemId: "coral-reefs",
      beat: "Every day",
      globeLabel:
        "Globe centred on the Great Barrier Reef, Australia, with hatched shading over reef regions in the Pacific, Caribbean and Red Sea",
      messenger: {
        quote:
          "The 3D structure of the reef is basically the city where these animals live",
        name: "Ines Lange",
        role: "Coral reef ecologist and lead author of the Current Biology study",
        source: {
          label: "Grist, 26 Mar 2024",
          url: "https://grist.org/science/coral-reefs-can-rebuild-in-just-four-years-with-a-star-and-a-little-care",
        },
      },
      response: {
        place: "Spermonde Archipelago, South Sulawesi, Indonesia",
        whatWasDone:
          "From 2018 the Mars Coral Reef Restoration Program worked with local communities to place steel \"reef stars\" with coral fragments attached on reef damaged by blast fishing.",
        result:
          "A 2024 study in Current Biology found that growth at sites established four years earlier matched that of healthy, undamaged coral nearby.",
        source: {
          label: "Grist, 26 Mar 2024",
          url: "https://grist.org/science/coral-reefs-can-rebuild-in-just-four-years-with-a-star-and-a-little-care",
        },
      },
    },

    // ── Amazon ─────────────────────────────────────────────────────────────
    {
      ecosystemId: "amazon-rainforest",
      beat: "One day",
      globeLabel:
        "Globe centred on the Amazon basin in South America, with hatched shading over the basin and the Guiana Shield",
      messenger: {
        quote:
          "The Amazon is one of the most important biodiversity hotspots on the planet.",
        name: "Carina Hoorn",
        role: "Associate professor, Institute for Biodiversity and Ecosystem Dynamics, University of Amsterdam",
        source: {
          label: "University of Amsterdam, 12 Nov 2021",
          url: "https://ibed.uva.nl/content/news/2021/11/amazon-approaches-catastrophic-potential-tipping-point.html",
        },
      },
      response: {
        place: "The Brazilian Legal Amazon",
        whatWasDone:
          "Brazil's space research institute, INPE, tracks clearing across the Legal Amazon by satellite through its PRODES programme and publishes the result each year.",
        result:
          "PRODES recorded 6,518 km² of clearing between August 2023 and July 2024, a drop of 28.09 percent from the year before. The source does not say what caused the drop.",
        source: {
          label: "INPE technical note on PRODES 2024",
          url: "https://data.inpe.br/biomasbr/wp-content/uploads/sites/3/2025/07/Nota_tecnica_PRODES_2024_consolidada.pdf",
        },
      },
    },

    // ── Arctic sea ice ─────────────────────────────────────────────────────
    {
      ecosystemId: "arctic-sea-ice",
      beat: "Because of that",
      globeLabel:
        "Globe centred on the North Pole, with hatched shading over the Arctic Ocean ice cap and Greenland",
      messenger: {
        quote:
          "Because the first ice-free day is likely to happen earlier than the first ice-free month, we want to be prepared.",
        name: "Céline Heuzé",
        role: "Co-author of the Nature Communications study, University of Gothenburg",
        source: {
          label: "ScienceDaily, 3 Dec 2024",
          url: "https://www.sciencedaily.com/releases/2024/12/241203154440.htm",
        },
      },
      response: {
        place: "Pikialasorsuaq, the North Water polynya between Canada and Greenland",
        whatWasDone:
          "In October 2023 Canada and Greenland signed a Letter of Intent to cooperate on the Pikialasorsuaq, with a joint steering committee of Inuit and government representatives from both countries. Oceans North notes that the letter does not itself establish protection, so this is a commitment in progress.",
        source: {
          label: "Fisheries and Oceans Canada, 19 Oct 2023",
          url: "https://www.canada.ca/en/fisheries-oceans/news/2023/10/canada-and-greenland-join-forces-for-the-conservation-of-the-pikialasorsuaq-arctic-polynya.html",
        },
      },
    },

    // ── Mangroves ──────────────────────────────────────────────────────────
    {
      ecosystemId: "mangroves",
      beat: "Because of that",
      globeLabel:
        "Globe centred on South and Southeast Asia, with hatched shading over mangrove coasts including the Sundarbans, Myanmar, Sumatra, Borneo and East Africa",
      messenger: {
        quote:
          "The news that mangroves are expanding gives a huge boost to our ambition for these wonderful and critical ecosystems.",
        name: "Mark Spalding",
        role: "The Nature Conservancy",
        source: {
          label: "The Nature Conservancy, 30 Sep 2026",
          url: "https://www.nature.org/en-us/newsroom/state-of-the-worlds-mangroves-2026/",
        },
      },
      response: {
        place: "Gazi Bay, Kenya (Mikoko Pamoja)",
        whatWasDone:
          "In 2010 residents of Gazi Bay, who had lost about 20 percent of their mangroves to timber harvesting, started Mikoko Pamoja with Plan Vivo and the Association for Coastal Ecosystem Services. Guards protect the forest, villagers plant new trees, and income from carbon credits pays for school books and clean-water pumps.",
        result:
          "The Commonwealth case study reports 117 hectares protected and 9,880 credits generated from 2014 to 2018.",
        source: {
          label: "Commonwealth case study, Gazi Bay",
          url: "https://thecommonwealth.org/case-study/case-study-community-led-mangrove-restoration-and-conservation-gazi-bay-kenya-lessons",
        },
      },
    },

    // ── Grasslands ─────────────────────────────────────────────────────────
    {
      ecosystemId: "grasslands",
      beat: "Because of that",
      globeLabel:
        "Globe centred on Africa, with hatched shading over East African, West African and southern African savanna and grassland regions",
      messenger: {
        quote:
          "Grasslands are the most converted, most threatened, and least protected of the world’s major vegetation types.",
        name: "Dirac Twidwell",
        role: "Professor, University of Nebraska-Lincoln, and science advisor to Working Lands for Wildlife",
        source: {
          label: "Working Lands for Wildlife, 27 Jun 2022",
          url: "https://www.wlfw.org/ask-an-expert-dr-dirac-twidwell-saving-the-last-grasslands/",
        },
      },
      response: {
        place: "American Prairie, central Montana",
        whatWasDone:
          "The nonprofit American Prairie has assembled 353,000 acres toward a connected reserve and released 73 bison in 2014.",
        result:
          "The herd is now about 1,000 bison, according to High Country News, which also reports opposition from some local ranchers.",
        source: {
          label: "High Country News",
          url: "https://www.hcn.org/?p=119244",
        },
      },
    },
  ],

  ending: {
    title: "What you can do",
    paragraphs: [
      "These five places affect one another, and every one of them has people working on it. Here are three ways to join them.",
    ],
    actions: [
      {
        label: "Join a reef survey team",
        body: "Reef Check trains volunteers to survey coral reefs and kelp forests, and takes members and donations.",
        href: "https://www.reefcheck.org/",
        linkText: "Visit Reef Check",
      },
      {
        label: "Look up mangroves near you",
        body: "Global Mangrove Watch maps mangrove extent and change. Search a coastline you know and see what the satellite record shows.",
        href: "https://www.globalmangrovewatch.org/",
        linkText: "Open Global Mangrove Watch",
      },
      {
        label: "Ask a local land trust one question",
        body: "Ask which grassland or wetland parcels near you are still unprotected, and what it would take to protect one.",
        href: "https://landtrustalliance.org/land-trusts",
        linkText: "Find a land trust",
      },
    ],
  },
};
