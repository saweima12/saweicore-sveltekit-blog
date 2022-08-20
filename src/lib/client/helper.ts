export const getTitleStr = (config: Record<string, any>): string => {
	return `${config.title} - ${config.summary}`;
};

export const isExternal = (link: string): boolean => {
	return !/^\//.test(link);
};

export const waitImageLoad = (imgElements: Array<HTMLImageElement>) => {
  return Promise.all(
    imgElements.map(async (img) => {
      if (img.complete) return Promise.resolve(true);
      return new Promise(resolve => {
          img.addEventListener('load', () => resolve(true));
          img.addEventListener('error', () => resolve(false));
      })
    })
  )

}
