export type Item = {
    value: number | string;
    name: string;
    example: string;
};

export type I18nText = {
    'en-US': string;
    'zh-Hans': string;
    zh_Hant: string;
};

export const languages = [
    {
        value: 'en-US',
        name: 'English (United States)',
        example: 'Hello!',
        supported: true
    },
    {
        value: 'zh-Hans',
        name: '简体中文',
        example: '你好',
        supported: true
    },
    {
        value: 'zh-Hant',
        name: '繁體中文',
        example: '你好',
        supported: true
    }
];

export const LanguagesSupported = languages
    .filter((item) => item.supported)
    .map((item) => item.value);

export const getLanguage = (locale: string) => {
    if (locale === 'zh-Hans') return locale.replace('-', '_');

    return LanguagesSupported[0].replace('-', '_');
};
