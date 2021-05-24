export default class Helper {
  //檢查指定對象是否有存在指定的屬性
  static isNotNullAndUndefined(obj, props = []) {
    let bIsNullorUndefined = obj === null || obj === undefined;
    let curObj = null;

    if (!bIsNullorUndefined) {
      curObj = obj;
      if (props !== null) {
        for (let idx = 0; idx < props.length; idx++) {
          bIsNullorUndefined =
            curObj[props[idx]] === null || curObj[props[idx]] === undefined;
          curObj = curObj[props[idx]]; // Set the curObj[props[idx]] to curObj so that it will recursive down the depth of the object

          if (bIsNullorUndefined) break;
        }
      }
    }

    return !bIsNullorUndefined;
  }

  //返回特定屬性的值，如果指定的值不存在，則會返回default value
  static carefullyGetValue(obj, props = [], defaultValue = '') {
    let bIsNullorUndefined = obj === null || obj === undefined;
    let curObj = null;

    if (!bIsNullorUndefined) {
      curObj = obj;
      if (props !== null) {
        for (let idx = 0; idx < props.length; idx++) {
          bIsNullorUndefined =
            curObj[props[idx]] === null || curObj[props[idx]] === undefined;
          curObj = curObj[props[idx]]; // Set the curObj[props[idx]] to curObj so that it will recursive down the depth of the object

          if (bIsNullorUndefined) break;
        }
      }
    }

    if (bIsNullorUndefined) return defaultValue;
    else return curObj;
  }

  //指定第一個英文文字為大寫
  static capitalize(str) {
    if (typeof str !== 'string') return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
