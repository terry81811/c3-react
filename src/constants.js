"use strict";

let scopedKeyMirror = function(scope, obj) {
  let rtn = {};
  let key;

  for (key in obj) {
    let scopedKey = `${scope.toUpperCase()}_${key}`;
    if (!obj.hasOwnProperty(key)) {
      continue;
    }
    rtn[key] = scopedKey;
  }

  return rtn;
};

module.exports = {
  ActTypes: {
    Data: scopedKeyMirror("DATA", {
      NEW_DATA: null,
      ADD_ENTRY: null,
      REMOVE_ENTRY: null,
      REMOVE_DATA: null
    }),
  },

  CHANGE_EVENT: "change"
};
