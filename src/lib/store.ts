import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

export const siteConfig: Writable<Record<string, any>> = writable({});
export const themeMode: Writable<string> = writable("light");
export const isMaskShow: Writable<boolean> = writable(false);
export const isNavMenuShow: Writable<boolean> = writable(false);
export const isSearBoxShow: Writable<boolean> = writable(false);
export const lightBoxContent: Writable<string> = writable("");
