// src/utils/formatText.ts

/**
 * Converts snake_case or UPPER_SNAKE_CASE to readable format
 * Example: PRICE_UPDATED → Price Updated
 */
export const formatReadableText = (text: string): string => {
  if (!text) return ''
  
  return text
    .toLowerCase()
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

/**
 * Converts to Title Case with proper acronym handling
 * Example: PRICE_UPDATED → Price Updated
 * Example: SKU_UPDATED → SKU Updated
 */
export const formatActionText = (text: string): string => {
  if (!text) return ''
  
  const words = text.toLowerCase().split('_')
  
  return words.map(word => {
    // Keep common acronyms in uppercase
    const acronyms = ['SKU', 'ID', 'API', 'URL', 'HTTP', 'JSON', 'XML', 'PDF', 'CSV']
    if (acronyms.includes(word.toUpperCase())) {
      return word.toUpperCase()
    }
    return word.charAt(0).toUpperCase() + word.slice(1)
  }).join(' ')
}

/**
 * Converts to Sentence case
 * Example: PRICE_UPDATED → Price updated
 */
export const formatSentenceCase = (text: string): string => {
  if (!text) return ''
  
  const readable = formatReadableText(text)
  return readable.charAt(0).toUpperCase() + readable.slice(1).toLowerCase()
}