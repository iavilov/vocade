import { TranslationLanguage } from '@/types/settings';

export const getLocaleForLanguage = (language: TranslationLanguage): string => {
    switch (language) {
        case 'en': return 'en-US';
        case 'uk': return 'uk-UA';
        case 'de': return 'de-DE';
        case 'ru': return 'ru-RU';
        default: return 'en-US';
    }
};

export const formatDate = (date: Date, language: TranslationLanguage): string => {
    const locale = getLocaleForLanguage(language);
    const day = date.getDate();
    // Using toLocaleString can be inconsistent across engines (JSC vs V8), but usually fine for simple months
    // We want: "9. JAN" or "9. Jan" depending on style. User logic was uppercase short month.
    const month = date.toLocaleString(locale, { month: 'short' }).toUpperCase().replace('.', '');
    return `${day}. ${month}`;
};
