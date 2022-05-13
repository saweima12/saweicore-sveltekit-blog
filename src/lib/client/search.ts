  const checkMatch = (fieldId:string, matchObj:any , callback: Function): boolean => {
    if (Array.isArray(matchObj))
      return matchObj.some((item: any) => checkMatch(fieldId, item, callback));

    if (matchObj.hasOwnProperty("matchLevel")) {
      if (matchObj.matchLevel == "full") {
        callback({ ...matchObj, fieldId: fieldId});
        return true;
      }
    }
    return false;
  }

export const findMatchFull = (_highlightField: Record<string, any>) => {
  let result: Record<string, any> = {};
  // deinfe check method.
  Object.entries(_highlightField).some(([matchField, matchObj]) => {
    return checkMatch(matchField, matchObj, (value: any) => result = value);
  });

  console.log(result);

  return result || {};
};
