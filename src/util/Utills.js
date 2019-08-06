const moment = require('moment-timezone');
const timeZone = moment.tz.guess();


export const canEdit = () => {
  return true;
};

export const canAdd = () => {
  return true;
};

export const canDelete = () => {
  return false;
};

const convertToGMT = (date) => {
  return date.replace(" ", "T").concat("Z")
};

export const getFormattedDate = (date) => {
  return moment.tz(convertToGMT(date), timeZone).format(userSetting.locale.date_format.toUpperCase());
};

export const getFormattedTime = (time) => {
  const is24Hr = userSetting.locale.time_format === "24 Hours";
  if (is24Hr) {
    return moment(convertToGMT(time)).tz(timeZone).format("HH:mm");
  }
  return moment(convertToGMT(time)).tz(timeZone).format("hh:mm A");
};

export const getFormattedDateTime = (timeStamp) => {
  return getFormattedDate(timeStamp) + " " + getFormattedTime(timeStamp);
};






