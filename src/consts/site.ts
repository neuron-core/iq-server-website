export const SITE_NAME = 'IQ-Stream';

/** What the product is, in one sentence: for llms.txt and structured data. */
export const SITE_SUMMARY = `${SITE_NAME} is a streaming server built for one job: carrying the tokens of an LLM answer from your application backend to your users’ browsers, in real time, over Server-Sent Events.`;

/** The social preview card, served from public/. Keep the size in step with the file. */
export const COVER = {
  path: '/cover.png',
  type: 'image/png',
  width: 1719,
  height: 901,
  alt: 'IQ-Stream: Stream LLM tokens. Nothing else. Better than anything else. 42,000 events per second on one CPU, 0 events lost on reconnect.',
};

export const CONTACT = {
  label: 'Talk to us',
  href: 'https://form.typeform.com/to/Ba6XOU1t',
};

export const PAGES = {
  home: '/',
  performance: '/performance/',
  cloud: '/cloud-providers/',
};

export const NAV = [
  { href: PAGES.home, label: 'Home' },
  { href: PAGES.performance, label: 'Performance' },
  { href: PAGES.cloud, label: 'For cloud providers' },
];
