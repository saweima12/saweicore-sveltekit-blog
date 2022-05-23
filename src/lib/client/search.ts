import type { MatchItem } from '$lib/types'

const checkMatch = (fieldId:string, matchObj:any , callback: Function): boolean => {
  if (Array.isArray(matchObj))
    return matchObj.some((item: any) => checkMatch(fieldId, item, callback));

  if (matchObj.hasOwnProperty("matchLevel")) {
    if (matchObj.matchLevel == "full") {
      callback({ attach: matchObj, field: fieldId});
      return true;
    }
  } else {
    Object.values(matchObj).some((item: any) => checkMatch(fieldId, item, callback));
  }
  return false;
}

export const findMatchFull = (hit: Record<string, any>): MatchItem => {
  let result: MatchItem = {};
  // deinfe check method.
  Object.entries(hit._highlightResult).some(([matchField, matchObj]) => {
    return checkMatch(matchField, matchObj, (value: any) => result = value);
  });


  if (result.field) {
    result.link = hit.permalink;

    const htmltagPtn = /(&nbsp;|<([^>]+)>)/ig
    // process attach to value
    if (result.field == "tags")
      result.value = hit.tags;

    if (result.field == "headings") {
      const text = result.attach.value.replace(htmltagPtn, "");
      const headings: Array<{text:string, id:string}> = hit.headings;
      const id = headings.find(item => item.text == text)?.id;

      result.link = `${hit.permalink}#${id}`;
    }

    result.value = result.value || result.attach.value;
    return result
  }

  return {};
};
