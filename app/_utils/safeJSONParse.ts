export function safeJSONParse<T>(str: string): T | null {
  try {
    return JSON.parse(str);
  } catch (e) {
    console.error("JSON parsing error:", e);
    console.log(str);
    return null;
  }
}
