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

let userSetting = {
  ticket: {
    max_upload_size: 10,
    allowed_file_ext: ".jpg,.png,.txt"
  },
  general: {
    file_upload_max_size: 10,
    allowed_ext: ".jpg,.png,.txt",
    logo: "",
    favicon: ""
  },
  locale: {
    date_format: "DD/MM/YY",
    time_format: "24 Hours",
    default_language: "en",
  },

};

export const getFormattedDate = (date) => {
  return moment(date).format(userSetting.locale.date_format);
};
export const getFormattedTime = (time) => {
  return time;
};

export const getFileExtension = () => {
  return userSetting.general.allowed_ext;
};

export const getFileSize = () => {
  return parseInt(userSetting.general.file_upload_max_size) * 1024 * 1024;
};

export const getTicketFileSize = () => {
  return parseInt(userSetting.ticket.max_upload_size) * 1024 * 1024;
};

export const getTicketFileExtension = () => {
  return userSetting.ticket.allowed_file_ext;
};

export const getCompanyLogo = () => {
  return userSetting.general.logo;
};
