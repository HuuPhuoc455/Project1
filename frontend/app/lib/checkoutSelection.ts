const STORAGE_KEY = 'smarthub_checkout_item_ids';

export function setCheckoutItemIds(itemIds: string[]) {
  if (typeof window === 'undefined') return;
  window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(itemIds));
}

export function getCheckoutItemIds(): string[] {
  if (typeof window === 'undefined') return [];

  try {
    const value = JSON.parse(window.sessionStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(value) && value.every((itemId) => typeof itemId === 'string')
      ? value
      : [];
  } catch {
    return [];
  }
}

export function clearCheckoutItemIds() {
  if (typeof window === 'undefined') return;
  window.sessionStorage.removeItem(STORAGE_KEY);
}
