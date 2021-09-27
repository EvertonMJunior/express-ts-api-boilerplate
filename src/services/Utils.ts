import mime from "mime-types";
import moment from "moment";
import Diacritics from "diacritic";

function enumerateBetweenDates(startTimestamp, endTimestamp, unit, format?) {
  startTimestamp = moment(startTimestamp);
  endTimestamp = moment(endTimestamp);

  let now = startTimestamp;
  let results = [];

  while (now.isBefore(endTimestamp) || now.isSame(endTimestamp)) {
    results.push({
      x: format ? moment(now).format(format) : now.valueOf(),
      timestamp: now.valueOf(),
    });
    now.add(1, unit);
  }

  return results;
}

function verifyString(string, { allowEmpty = false } = {}) {
  return (
    string !== undefined &&
    string !== null &&
    typeof string === "string" &&
    (!allowEmpty ? string.trim().length > 0 : true)
  );
}

function verifyEmail(email: string) {
  const emailRegex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
  return verifyString(email) && emailRegex.test(email);
}

function verifyNumber(number) {
  return number !== undefined && number !== null && !isNaN(+number);
}

function verifyPhone(phone: string) {
  const phoneRegex = /^(?:(55\d{2})|\d{2})[6-9]\d{8}$/gm;
  return verifyString(phone) && phoneRegex.test(phone);
}

function verifyArray(array, type, { allowEmpty = false } = {}) {
  return (
    array !== undefined &&
    array !== null &&
    Array.isArray(array) &&
    (!allowEmpty ? array.length > 0 : true) &&
    array.every((item) => typeof item === type)
  );
}

function verifyDate(dateString) {
  if (!verifyString(dateString)) {
    return false;
  }
  const date = moment(dateString);
  return date.isValid();
}

function titleCase(str: string) {
  let words = str.toLowerCase().replace(/\s+/g, " ").trim().split(" ");

  for (let i = 0; i < words.length; i++) {
    let word = words[i];
    if (word.match(/^\d/g) || word.match(/$\d/g)) {
      words[i] = word.toUpperCase();
    } else {
      words[i] = word.charAt(0).toUpperCase() + word.slice(1);
    }
  }
  let result = words.join(" ").trim();

  // make expections lowercase
  let exceptions = ["De", "Da", "Do", "Dos", "Das"];
  for (let i = 0; i < exceptions.length; i++) {
    const exception = exceptions[i];
    let regex = new RegExp(`(\\s(${exception})\\s)`, "g");
    result = result.replace(regex, (_, p1) => p1.toLowerCase());
  }

  return result;
}

function replaceAt(array, index, value) {
  const ret = array.slice(0);
  ret[index] = value;
  return ret;
}

export {
  enumerateBetweenDates,
  verifyString,
  verifyEmail,
  verifyPhone,
  verifyNumber,
  verifyArray,
  verifyDate,
  titleCase,
  replaceAt,
};
