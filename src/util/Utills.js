import moment from "moment";

export const canEdit = () => {
  return true;
};
export const canAdd = () => {
  return true;
};
export const canDelete = () => {
  return false;
};
const dateFormat = "DD/MM/YY";

export const getFormattedDate = (date) => {
  return moment(date).format(dateFormat);
};
export const getFormattedTime = (time) => {
  return time;
};
