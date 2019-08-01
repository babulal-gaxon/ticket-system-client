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
    date_format: "dd/mm/yy",
    time_format: "24 Hours",
    default_language: "en",
  },

};

export const getFormattedDate = (date) => {
  return moment(date).format(userSetting.dateFormat);
};
export const getFormattedTime = (time) => {
  return time;
};

export const getFileExtension = () => {
  return userSetting.general.allowed_ext;
};

export const getFileSize = () => {
  return userSetting.general.file_upload_max_size;
};

export const getTicketFileSize = () => {
  return userSetting.ticket.max_upload_size;
};

export const getTicketFileExtension = () => {
  return userSetting.ticket.max_upload_size;
};

export const getCompanyLogo = () => {
  return userSetting.general.logo;
};
