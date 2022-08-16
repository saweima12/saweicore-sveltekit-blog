import type { PageLoad } from './$types';
import { dataAPI } from '$lib/client';

export const load: PageLoad = async ({ fetch }) => {
	// cache taglist.
	const apiUrl = dataAPI.getTagList();
	const response = await fetch(apiUrl);
	const { tagList } = await response.json();

	return {
    tagList: tagList
  };
};
