const serializeId = (value) => {
  return (
    value
      .toLowerCase()
      .trim()
      // remove html tags
      .replace(/<[!\/a-z].*?>/gi, '')
      // remove unwanted chars
      .replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, '')
      .replace(/\s/g, '-')
  );
};


export const headingClassName = (className) => {
  const renderer = {
    heading(text, level) {
      const id = serializeId(text);
      return `<h${level} id="${id}" class="${className}">${text}</h${level}>`
    }
  }

  return {
    renderer
  }
}
