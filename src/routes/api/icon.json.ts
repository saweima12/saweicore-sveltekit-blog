import fs from 'fs';
import path from 'path';
import type { RequestHandler } from '@sveltejs/kit'



export const get : RequestHandler = async({  }) => {

  const icons = import.meta.glob("/src/icons/**/*.svelte");

  const iconMap: Record<string, string> = {};

  await Promise.all((Object.entries(icons).map(async ([sourcePath, iconAsync]) => {
    const iconSlug = path.basename(sourcePath).replace('.svelte', '');
    const icon = (await iconAsync()).default;
    const iconHtml = icon.render().html;
    iconMap[iconSlug] = iconHtml;
  })));

  return {
    body: iconMap
  }
}
