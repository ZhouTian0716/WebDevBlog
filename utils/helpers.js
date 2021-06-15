const moment = require("moment");

module.exports = {
  format_time: (date) => {
    return date.toLocaleTimeString();
  },
  // The custom helper 'format_date' takes in a timestamp
  format_date: (date) => {
    // We need to add one to the month since it is returned as a zero-based value
    return moment(date).format("DD/MM/YYYY");
  },
};
