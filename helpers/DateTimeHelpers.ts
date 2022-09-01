const DateTimeHelpers = {
  hoursToMs: (hours: number): number => hours * 3600000,
  toString: (ms?: number): string => {
    if (ms === undefined) {
      return "No time limit";
    }
    const days = Math.floor(ms / 86400000);
    ms -= days * 86400000;
    const hours = Math.floor(ms / 3600000);
    ms -= hours * 3600000;
    const minutes = Math.floor(ms / 60000);
    let ret = "";
    if (days !== 0) {
      const toAppend = days === 1 ? " day " : " days ";
      ret += days + toAppend;
    }
    if (hours !== 0) {
      const toAppend = hours === 1 ? " hour " : " hours ";
      ret += hours + toAppend;
    }
    if (minutes !== 0) {
      const toAppend = minutes === 1 ? " minute " : " minutes ";
      ret += minutes + toAppend;
    }
    ret.trimEnd();
    return ret;
  },
};

export default DateTimeHelpers;
