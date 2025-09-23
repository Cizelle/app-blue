import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import hi from './locales/hi.json';

// TypeScript-friendly async language detector
const languageDetector: any = {
  type: 'languageDetector',
  async: true, // runtime property, TypeScript doesn't enforce
  detect: async (callback: (language: string) => void) => {
    try {
      const language = await AsyncStorage.getItem('user-language');
      callback(language || 'en'); // fallback to English
    } catch (error) {
      console.error('Failed to detect language from AsyncStorage', error);
      callback('en');
    }
  },
  init: () => {},
  cacheUserLanguage: async (language: string) => {
    try {
      await AsyncStorage.setItem('user-language', language);
    } catch (error) {
      console.error('Failed to cache language to AsyncStorage', error);
    }
  },
};

i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      hi: { translation: hi },
    },
    lng: 'en',          // default language
    fallbackLng: 'en',  // fallback language
    interpolation: {
      escapeValue: false, // React already escapes
    },
  });

export default i18n;
