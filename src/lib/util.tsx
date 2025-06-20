export const isSsr = (): boolean => typeof window === "undefined";

export function isOn(el: any | undefined): boolean {
  let elType = typeof el;
  if (elType === "undefined" || el === null) return false;

  // string check
  if (el instanceof String) elType = "string";

  switch (elType) {
    case "string":
      return el.length > 0;
    case "object": // array | object
      return Array.isArray(el) ? el.length > 0 : !isEmpty(el);
    default:
      return true;
  }
}

export function isEmpty(el: any): boolean {
  for (const prop in el) if (Object.hasOwn(el, prop)) return false;

  return true;
}

export const isDev = (): boolean => {
  return process.env.NODE_ENV === "development";
};
