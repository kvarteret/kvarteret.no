export function IsEnglish() {
  const url = typeof window !== 'undefined' ? window.location.pathname : ''
  return url && url.startsWith('/en')
}

export function UrlLanguageCode() {
  if (IsEnglish()) return 'en'
  return 'no'
}

export function getTranslation(translations) {
  const urlCode = UrlLanguageCode()
  return translations.filter((x) => x.languages_code.url_code == urlCode)[0]
}

export function getTranslatedUrl(path) {
  const urlCode = UrlLanguageCode()
  return urlCode + '/' + path
}
