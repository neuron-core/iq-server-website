import { ONE_CPU, RUN, type Measure } from './benchmark';

/** Concurrent agent runs IQ-Stream serves on one CPU. */
export const RUNS_ON_ONE_CPU = 2_000;

/** Concurrent runs before which every general-purpose server falls behind. */
export const GENERAL_PURPOSE_LIMIT = 300;

/** Example plans, as limits on concurrent answers per app. */
export const PLANS = [
  { name: 'Starter app', concurrentAnswers: 50 },
  { name: 'Enterprise app', concurrentAnswers: 5_000 },
];

// Sizing example: an AI product with this many agent runs streaming at once.
const CONCURRENT_RUNS = 5_000;
const UTILIZATION_PCT = 70;
const VCPU_MONTHLY_PRICE = 30;

const eventsPerSecond = Math.floor((CONCURRENT_RUNS * RUN.events) / RUN.seconds / 1_000) * 1_000;

function size({ cpuPerEventUs, p99Ms }: Measure) {
  const busyCpus = (eventsPerSecond * cpuPerEventUs) / 1_000_000;
  const vCpus = Math.round(busyCpus / (UTILIZATION_PCT / 100));
  return { cpuPerEventUs, p99Ms, busyCpus, vCpus, monthlyCost: vCpus * VCPU_MONTHLY_PRICE };
}

export const SIZING = {
  concurrentRuns: CONCURRENT_RUNS,
  utilizationPct: UTILIZATION_PCT,
  vCpuMonthlyPrice: VCPU_MONTHLY_PRICE,
  eventsPerRunPerSecond: Math.round(RUN.events / RUN.seconds),
  eventsPerSecond,
  iq: size(ONE_CPU[300].iq),
  // The fastest general-purpose server tested, at a load it still kept up with.
  generalPurpose: size(ONE_CPU[100].mercure),
};
