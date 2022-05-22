import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

export const siteConfig: Writable<Record<string, any>> = writable({});
export const themeMode = writable("light");
export const isMaskShow = writable(false);
export const isNavMenuShow = writable(false);
export const isSearBoxShow = writable(false);
export const lightBoxContent = writable("");
