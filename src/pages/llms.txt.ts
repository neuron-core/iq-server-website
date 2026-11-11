import type { APIRoute } from 'astro';
import {
  COMPETITORS,
  EVENTS_PER_SECOND,
  HEADLINE_P99,
  LOST_ON_RECONNECT,
  THROUGHPUT_MULTIPLE,
} from '../consts/benchmark';
import { ARCHITECTURES, FRONTEND_PROTOCOLS, LANGUAGES } from '../consts/product';
import { CONTACT, NAV, PAGES, SITE_NAME } from '../consts/site';
import { formatNumber, listAnd, listOr } from '../utils/format';

// /llms.txt, as proposed at llmstxt.org: a Markdown summary of the site for language models.

const about: Record<string, string> = {
  [PAGES.home]: `What ${SITE_NAME} is, how stream replay works, and how to integrate it.`,
  [PAGES.performance]: `Benchmark against ${listAnd(COMPETITORS)}: throughput, latency, scaling and memory.`,
  [PAGES.cloud]: 'Offering LLM streaming as a managed, multi-tenant service, with a sizing and cost example.',
};

export const GET: APIRoute = ({ site }) => {
  const url = (path: string) => new URL(path, site).href;

  const body = `# ${SITE_NAME}

> ${SITE_NAME} is a streaming server built for one job: carrying the tokens of an LLM answer from your application backend to your users’ browsers, in real time, over Server-Sent Events.

- Your backend publishes each chunk of model output over a plain HTTP request, one JSON line per event, from any language: ${listAnd(LANGUAGES)}, or anything that speaks HTTP.
- Browsers read the stream with the built-in EventSource, with no SDK. IQ relays events exactly as sent, so it works with ${listOr([...FRONTEND_PROTOCOLS, 'your own format'])}.
- Replay: IQ keeps each answer in memory while it is being written. A browser that reconnects resumes from the exact event it missed. ${LOST_ON_RECONNECT} events were lost on reconnect in the benchmark.
- Performance: ${formatNumber(EVENTS_PER_SECOND.oneCpu)} events per second on one CPU, ${formatNumber(EVENTS_PER_SECOND.twoCpus)} on two, and a p99 latency of ${HEADLINE_P99.ms} ms at ${HEADLINE_P99.runs} concurrent agent runs: more than ${THROUGHPUT_MULTIPLE}× the throughput of general-purpose servers (${listAnd(COMPETITORS)}) on the same CPU.
- Multi-tenant: separate credentials, limits and live counters for every app on the same servers.
- One Docker image for ${listAnd(ARCHITECTURES)}. No database, no Redis, no disk and no message broker.

## Pages

${NAV.map(({ href, label }) => `- [${label}](${url(href)}): ${about[href]}`).join('\n')}

## Contact

- [${CONTACT.label}](${CONTACT.href}): Ask about running ${SITE_NAME}, or about running the benchmark on your own infrastructure.
`;

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
