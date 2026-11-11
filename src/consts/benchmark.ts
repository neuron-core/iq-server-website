import { SITE_NAME } from './site';

export const MERCURE = 'Mercure';
export const REVERB = 'Laravel Reverb';
export const REVERB_SHORT = 'Reverb';
export const SOKETI = 'Soketi';
export const COMPETITORS = [MERCURE, REVERB, SOKETI];

export const MACHINE = 'Intel Core Ultra 7 155H';

/** One simulated agent run, as streamed in every test. */
export const RUN = {
  protocol: 'AG-UI',
  events: 429,
  seconds: 10,
  toolPauseSeconds: 1.5,
  toolResultKb: 8,
  disconnects: 'one browser in ten',
};

export type ServerKey = 'iq' | 'mercure' | 'mercureHistory' | 'reverb' | 'soketi';

export interface Measure {
  /** Share of events delivered, in percent. */
  delivered: number;
  cpuPerEventUs: number;
  p99Ms: number;
  /** Share of events lost on reconnect, in percent. Not measured below DELIVERY_THRESHOLD. */
  lostPct?: number;
}

export type Load = Record<ServerKey, Measure>;

/** Below this delivery rate the backlog hides reconnect losses, so they are not reported. */
export const DELIVERY_THRESHOLD = 90;

export const ONE_CPU_SERVERS: Record<ServerKey, string> = {
  iq: SITE_NAME,
  mercure: MERCURE,
  mercureHistory: `${MERCURE} with history`,
  reverb: REVERB,
  soketi: SOKETI,
};

export const TWO_CPU_SERVERS: Record<ServerKey, string> = {
  iq: `${SITE_NAME} cluster`,
  mercure: MERCURE,
  mercureHistory: `${MERCURE} with history`,
  reverb: `${REVERB}, scaled out with Redis`,
  soketi: `${SOKETI}, scaled out with Redis`,
};

/** Results by number of concurrent runs, on one CPU. */
export const ONE_CPU = {
  100: {
    iq: { delivered: 100, cpuPerEventUs: 57.5, p99Ms: 0.97, lostPct: 0 },
    mercure: { delivered: 100, cpuPerEventUs: 203.4, p99Ms: 658, lostPct: 0.94 },
    mercureHistory: { delivered: 16, cpuPerEventUs: 527.6, p99Ms: 20_630 },
    reverb: { delivered: 55, cpuPerEventUs: 424.8, p99Ms: 7_970 },
    soketi: { delivered: 98, cpuPerEventUs: 198.4, p99Ms: 921, lostPct: 1.3 },
  },
  300: {
    iq: { delivered: 100, cpuPerEventUs: 49.0, p99Ms: 2.4, lostPct: 0 },
    mercure: { delivered: 34, cpuPerEventUs: 224.6, p99Ms: 14_730 },
    mercureHistory: { delivered: 3.9, cpuPerEventUs: 868.1, p99Ms: 26_680 },
    reverb: { delivered: 20, cpuPerEventUs: 396.8, p99Ms: 20_220 },
    soketi: { delivered: 42, cpuPerEventUs: 182.8, p99Ms: 11_620 },
  },
  1000: {
    iq: { delivered: 98.9, cpuPerEventUs: 23.5, p99Ms: 168, lostPct: 0 },
    mercure: { delivered: 14, cpuPerEventUs: 167.1, p99Ms: 22_770 },
    mercureHistory: { delivered: 1.5, cpuPerEventUs: 603.9, p99Ms: 27_220 },
    reverb: { delivered: 5.4, cpuPerEventUs: 428.8, p99Ms: 24_650 },
    soketi: { delivered: 12, cpuPerEventUs: 199.9, p99Ms: 22_330 },
  },
} satisfies Record<number, Load>;

/** Results by number of concurrent runs, on two CPUs. */
export const TWO_CPUS = {
  200: {
    iq: { delivered: 100, cpuPerEventUs: 59.1, p99Ms: 1.1, lostPct: 0 },
    mercure: { delivered: 96, cpuPerEventUs: 228.8, p99Ms: 851, lostPct: 0.9 },
    mercureHistory: { delivered: 7.3, cpuPerEventUs: 830.1, p99Ms: 24_650 },
    reverb: { delivered: 20, cpuPerEventUs: 1_136.2, p99Ms: 19_440 },
    soketi: { delivered: 52, cpuPerEventUs: 445.6, p99Ms: 8_460 },
  },
  600: {
    iq: { delivered: 100, cpuPerEventUs: 47.5, p99Ms: 2.7, lostPct: 0 },
    mercure: { delivered: 32, cpuPerEventUs: 239.4, p99Ms: 16_590 },
    mercureHistory: { delivered: 3.0, cpuPerEventUs: 623.7, p99Ms: 26_680 },
    reverb: { delivered: 8.6, cpuPerEventUs: 910.5, p99Ms: 24_170 },
    soketi: { delivered: 12, cpuPerEventUs: 635.9, p99Ms: 22_330 },
  },
} satisfies Record<number, Load>;

/** IQ's p99 latency at a load every general-purpose server had already fallen behind on. */
export const HEADLINE_P99 = { runs: 300, ms: ONE_CPU[300].iq.p99Ms };

export const EVENTS_PER_SECOND = { oneCpu: 42_000, twoCpus: 76_000 };

/** IQ relays more than this many times the events per CPU of a general-purpose server. */
export const THROUGHPUT_MULTIPLE = 7;

/** What IQ moved on two CPUs, as a multiple of what each competitor moved. */
export const TWO_CPU_MULTIPLE = { mercure: 9, soketi: 17, reverb: 35 };

export const LOST_ON_RECONNECT = 0;

/** Events of one run a browser lost on reconnect, with servers that keep nothing. */
export const LOST_WITHOUT_REPLAY = { min: 45, max: 56 };

/** Mercure with history never relayed more than this many events per second. */
export const MERCURE_HISTORY_PEAK = 780;

export const MERCURE_TWO_CPUS = { eventsPerSecond: 8_300, gainFromSecondCpu: 1.4 };

/** How much more CPU per event Mercure costs with history on. */
export const HISTORY_CPU_COST = 2.6;

/** Best result of any general-purpose server at 1,000 concurrent runs on one CPU. */
export const BEST_GENERAL_PURPOSE_AT_1000 = { eventsPerSecond: 6_000, secondsLate: 20 };

/** Times less CPU per event than general-purpose servers. */
export const CPU_ADVANTAGE = {
  atLightLoad: { runs: 100, min: 3.4, max: 3.5 },
  overall: { min: 3.4, max: 9 },
} as const;

export const MEMORY = {
  perRunKib: { min: 80, max: 95 },
  containerGb: 2,
  answers: 1_400,
  tokensPerAnswer: 4_000,
};
