export const getTitleStr = (config: Record<string, any>): string => {
    return `${config.title} - ${config.description}`;
}

export const isExternal = (link: string): boolean => {
  return !(/^\//.test(link))
}
