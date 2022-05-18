export const CustomClassifierHandle = async ({options, pages}) => {
  let _classifiedPages = [];
  let { id, params } = options;

  console.log(`::: Run CustomClassifierHandle -  ${id} :::`);
  pages.map((page) => {
    const { sourcePath } = page;
    if (!sourcePath.includes(params.path)) return;

    _classifiedPages.push(page);
  });

  return { pages: _classifiedPages };
}
