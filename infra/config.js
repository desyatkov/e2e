export const config = {
  args: ['--no-sandbox', '--disable-setuid-sandbox'],
  ignoreHTTPSErrors: true,
  dumpio: false,
  headless: true,
  slowMo: 0,
  isDevTools: false,
  launchTimeout: 10000,
  waitingTimeout: 10000,
  viewportWidth: 1280,
  viewportHeight: 800,
};

export const userAgent = {
  USER_AGENT_IPHONE: 'Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A5376e Safari/8536.25'
};
