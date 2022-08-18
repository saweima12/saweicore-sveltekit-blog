import { json } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';
import { pathMap, slugMap, classifiedSet } from 'markedpage';

export const GET: RequestHandler = async ({ url }) => {

  const _pathMap = await pathMap();
  const _slugMap = await slugMap();
  return json({
    pathMap: _pathMap,
    slugMap: _slugMap,

  })
};
