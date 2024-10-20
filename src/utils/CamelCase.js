import { camelCase, mapKeys } from 'lodash';

// Helper function to convert all keys of an object to camelCase using Lodash
export const keysToCamelCase = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map((item) => keysToCamelCase(item));
  } else if (obj !== null && typeof obj === 'object') {
    return mapKeys(obj, (value, key) => camelCase(key));
  }
  return obj;
};
