import {MEDIA_BASE_URL} from "../constants/ActionTypes";

const moment = require('moment-timezone');
const timeZone = moment.tz.guess();
moment.tz.setDefault("Africa/Bissau");
console.log("timeZone", timeZone, moment.tz.guess());
let userSetting = {
  "ticket": {
    "enable_service_selection": "1",
    "enable_department_selection": "1",
    "ticket_reply_order": "asc",
    "allowed_file_ext": ".png,.jpg,.jpeg,.gif,.docx,.doc, .text",
    "max_upload_size": "20",
    "notify_raise": "1",
    "notify_reply": "1",
    "notify_status_change": "1",
    "notify_priority_change": "1",
    "notify_on_archive": "1",
    "ticket_status_close": "5",
    "default_status_reply": "1"
  },
  "locale": {
    "date_format": "DD/MM/YY",
    "time_format": "24 Hours",
    "default_language": "en",
    "allow_language_selection": "0"
  },
  "general": {
    "name": "G-axon",
    "email": "demo@example.com",
    "cpp_url": "http://localhost:3001",
    "website": "http://www.g-axon.com",
    "phone": "9460670620",
    "allowed_ext": ".jpg",
    "file_upload_max_size": "10",
    "favicon": "22",
    "logo": "24",
    "url": "http://www.g-axon.com"
  },
  "general_address": {
    "company_address": "1"
  },
  "customer": {
    "theme": "Dark",
    "country": "103",
    "registration_enable": "1",
    "register_verification": "1",
    "allow_primary_contact_view": "1",
    "delete_own_files": "1"
  }
};
export const canEdit = () => {
  return true;
};
export const canAdd = () => {
  return true;
};
export const canDelete = () => {
  return false;
};

export const updateDateFormat = (dateFormat) => {
  userSetting.locale.date_format = dateFormat;
};

export const updateLocaleSetting = (locale) => {
  userSetting.locale = locale;
};
export const updateGeneralSetting = (general) => {
  userSetting.general = general;
};
export const updateTicketSetting = (locale) => {
  userSetting.ticket = locale;
};

export const setUserSetting = (setting) => {
  userSetting = setting;
};

const convertToGMT = (date) => {
  console.log("date=>>", date);
  return date.replace(" ", "T").replace(".000000", "Z")
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

export const isServiceSelectionEnable = () => {
  return parseInt(userSetting.ticket.enable_service_selection) === 1;
};
export const isDepartmentSelectionEnable = () => {
  return parseInt(userSetting.ticket.enable_department_selection) === 1;
};
export const isProductSelectionEnable = () => {
  return parseInt(userSetting.ticket.enable_service_selection) === 1;
};

export const getCompanyLogo = () => {
  return userSetting.general.company_logo && userSetting.general.company_logo.src ? MEDIA_BASE_URL + userSetting.general.company_logo.src : null;
};

export const setCompanyFavIcon = () => {
  const favIcon = userSetting.general.company_favicon && userSetting.general.company_favicon.src ? MEDIA_BASE_URL + userSetting.general.company_favicon.src : null;

  if (favIcon) {
    let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = favIcon;
    document.getElementsByTagName('head')[0].appendChild(link);
  }
};




