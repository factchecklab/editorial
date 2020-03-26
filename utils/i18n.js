/**
 * This function returns the supplied text with spacing added at the beginning
 * and/or the end, according to the current locale. This helps to provide
 * spacing around interpolated values for language that does not use space to
 * separate words.
 */
export const crossLanguageInterpolate = (text, locale) => {
  if (locale.startsWith('zh')) {
    // Add a space to the beginning and/or the end of a string, if the
    // first/last character is alphanumeric.
    return text.replace(/^([\w])/, ' $1').replace(/([\w])$/, '$1 ')
  }
  return text
}
