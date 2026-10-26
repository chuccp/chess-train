const BAIDU_ANALYTICS_URL =
  'https://hm.baidu.com/hm.js?5fcd56298c9c1d2e3828a11e52ad2cd7';

function isPrivateIpv4(hostname: string): boolean {
  const parts = hostname.split('.');
  if (parts.length !== 4 || parts.some((part) => !/^\d{1,3}$/.test(part))) return false;
  const octets = parts.map(Number);
  if (octets.some((part) => part > 255)) return false;
  const [first, second] = octets;
  if (first === undefined || second === undefined) return false;
  return (
    first === 0 ||
    first === 10 ||
    first === 127 ||
    (first === 169 && second === 254) ||
    (first === 172 && second >= 16 && second <= 31) ||
    (first === 192 && second === 168)
  );
}

export function isLocalDevelopmentHost(hostname: string): boolean {
  const normalized = hostname.trim().toLowerCase().replace(/^\[|\]$/g, '');
  return (
    normalized === 'localhost' ||
    normalized.endsWith('.localhost') ||
    normalized === '::1' ||
    normalized.endsWith('.local') ||
    isPrivateIpv4(normalized)
  );
}

export function initializeBaiduAnalytics({
  production,
  hostname,
}: {
  production: boolean;
  hostname: string;
}): void {
  if (!production || isLocalDevelopmentHost(hostname)) return;

  const analyticsWindow = window as unknown as { _hmt?: unknown[] };
  analyticsWindow._hmt ??= [];
  const script = document.createElement('script');
  script.async = true;
  script.src = BAIDU_ANALYTICS_URL;
  document.head.appendChild(script);
}
