import { Capacitor } from '@capacitor/core';

export const IS_NATIVE: boolean = (() => {
  const platform = Capacitor.getPlatform();

  return platform === 'ios' || platform === 'android';
})();

export const DATABASES = {
  RECORDS: 'records',
};
