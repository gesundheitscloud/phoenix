import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'phoenix',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    CapacitorSQLite: {
      iosKeychainPrefix: 'phoenix',
      iosIsEncryption: true,
      androidIsEncryption: true,
    },
  },
};

export default config;
