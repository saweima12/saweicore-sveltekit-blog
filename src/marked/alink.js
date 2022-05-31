const externalPtn = /^(?:https?|ftp|sftp|smtp|mailto):\/?\/?/
export const customALink = (options, extFunc) => {
    const renderer = {
      link(link, title, text) {
        // define default options
        const externalOpt = options?.external || true;
        const attrs = [];

        const isExternal = externalPtn.test(link);

        if (isExternal && externalOpt) {
          attrs.push({key: "target", value:"_blank"});
          attrs.push({key: "rel", value: `noreferrer noopenner`})
        }

        const attrs_str = attrs.map(item => `${item.key}="${item.value}"`).join(' ');
        const rtn = `<a href="${link}" ${attrs_str}>${text}</a>`
        return rtn
      }
    }

    return {
      renderer
    }
};
