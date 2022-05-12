export const findMatchFull = (_highlightField: Record<string, any>) => {
  let result: Record<string, any> = {};
  // deinfe check method.
  const checkMatch = (fieldId:string, matchObj:any ) => {
    if (Array.isArray(matchObj))
      matchObj.forEach((item) => checkMatch(fieldId, matchObj));

    if (matchObj.hasOwnProperty("matchLevel")) {
      if (matchObj.matchlevel == "full") {
        return matchObj;
      }
    }
    return null;
  }

  Object.entries(_highlightField).map( ([matchField, matchObj]) => {
    if (matchObj.matchLevel == 'full')
      result = { ...matchObj, matchField: matchField }
  });

  return result;
}
