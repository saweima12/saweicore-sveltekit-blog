import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

export const viewId = {
  navMenu: "navMenu",
  searchView: "searchView"
}

const cViewStack = () => {
  const { subscribe, set, update }: Writable<Array<string>> = writable([]);
  return {
    subscribe,
    push: (id: string) => update(obj => {
      return obj.includes(id) ? obj : obj = [id, ...obj];
    }),
    remove: (id: string) => update(obj => obj = obj.filter(value => value != id)),
    reset: () => set([])
  }
};

export const siteConfig: Writable<Record<string, any>> = writable({});
export const themeMode: Writable<string> = writable("light");
export const lightBoxView: Writable<Record<string,any>> = writable({content: ""});
export const viewStack = cViewStack();
