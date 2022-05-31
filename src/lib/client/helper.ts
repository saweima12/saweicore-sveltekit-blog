export const getTitleStr = (config: Record<string, any>): string => {
	return `${config.title} - ${config.summary}`;
};

export const isExternal = (link: string): boolean => {
	return !/^\//.test(link);
};
