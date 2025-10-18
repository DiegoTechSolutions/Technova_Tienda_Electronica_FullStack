// src/utils/storage.js
export const loadJSON = (key, fallback = null) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

export const saveJSON = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const incrCounter = (key) => {
  const curr = Number(localStorage.getItem(key) || "0");
  const next = curr + 1;
  localStorage.setItem(key, String(next));
  return next;
};
