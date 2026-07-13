import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'co.za.rroi.app',
  appName: 'RROI',
  webDir: 'public',
  server: {
    url: 'https://www.rroi.co.za',
    cleartext: false
  }
};

export default config;