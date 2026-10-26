import { describe, expect, it } from 'vitest';
import { isLocalDevelopmentHost } from './analytics';

describe('Baidu analytics host detection', () => {
  it.each([
    'localhost',
    'app.localhost',
    '127.0.0.1',
    '127.10.0.8',
    '0.0.0.0',
    '10.0.0.2',
    '172.16.5.3',
    '172.31.255.10',
    '192.168.1.20',
    '169.254.10.1',
    '::1',
    '[::1]',
    'chess.local',
  ])('treats %s as local', (hostname) => {
    expect(isLocalDevelopmentHost(hostname)).toBe(true);
  });

  it.each([
    'example.com',
    'cao.github.io',
    '172.32.0.1',
    '192.169.1.1',
  ])('allows production host %s', (hostname) => {
    expect(isLocalDevelopmentHost(hostname)).toBe(false);
  });
});
