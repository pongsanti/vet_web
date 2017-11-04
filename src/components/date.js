import moment from 'moment';

const PICKER_DATE_FORMAT = 'DD/MM/YYYY';
const PICKER_TIME_FORMAT = 'HH:mm';

const POST_DATE_FORMAT = 'YYYY-MM-DD HH:mm:00';
const DATE_FORMAT = 'DD/MM/YYYY hh:mm';

const serializePostData = (moment_date) => moment_date.format(POST_DATE_FORMAT);
const parseDate = (date_string) => moment(date_string, DATE_FORMAT);
const parseDateToDateObject = (date_string) => parseDate(date_string).toDate();
const duration = (datea, dateb) => moment.duration(dateb - datea);
const durationHumanize = (datea, dateb) => duration(datea, dateb).humanize();

export {PICKER_DATE_FORMAT, PICKER_TIME_FORMAT,
  serializePostData, parseDate, parseDateToDateObject,
duration, durationHumanize};