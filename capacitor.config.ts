import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'www.rroi.co.za',
  appName: 'RROI',
  webDir: 'public',
  server: {
    url: 'https://www.rroi.co.za',
    cleartext: false
  }
};

export default config;