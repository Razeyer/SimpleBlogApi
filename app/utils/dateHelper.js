function isDateValid(d) {
    if (Object.prototype.toString.call(d) === "[object Date]") {
        // it is a date
        if (isNaN(d.getTime())) {  // d.valueOf() could also work
          return false;
        } else {
          return true;
        }
    }
    return false;
}

module.exports = {
  isDateValid
}