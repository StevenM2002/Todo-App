const DateTimeHelpers = {
  hoursToMs: (hours: number): number => hours * 3600000,
  timeComponents: (
    ms: number,
  ): {days: number; hours: number; minutes: number; seconds: number} => {
    if (ms < 0) ms *= -1;
    const days = Math.floor(ms / 86400000);
    ms -= days * 86400000;
    const hours = Math.floor(ms / 3600000);
    ms -= hours * 3600000;
    const minutes = Math.floor(ms / 60000);
    ms -= minutes * 60000;
    const seconds = Math.floor(ms / 1000);
    return {
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    };
  },
  toSimpleString: (ms?: number) => {
    if (ms === undefined) {
      return null;
    }
    const {days, hours, minutes, seconds} = DateTimeHelpers.timeComponents(ms);
    let numTimeComponents = 0;
    let ret = "";
    if (days !== 0) {
      const toAppend = days === 1 ? " day " : " days ";
      numTimeComponents++;
      ret += days + toAppend;
      if (numTimeComponents === 2) return ret;
    }
    if (hours !== 0) {
      const toAppend = hours === 1 ? " hour " : " hours ";
      numTimeComponents++;
      ret += hours + toAppend;
      if (numTimeComponents === 2) return ret;
    }
    if (minutes !== 0) {
      const toAppend = minutes === 1 ? " minute " : " minutes ";
      numTimeComponents++;
      ret += minutes + toAppend;
      if (numTimeComponents === 2) return ret;
    }
    if (seconds !== 0) {
      const toAppend = seconds === 1 ? " second " : " seconds ";
      numTimeComponents++;
      ret += seconds + toAppend;
      if (numTimeComponents === 2 || numTimeComponents === 1) return ret;
    } else {
      numTimeComponents++;
      if (numTimeComponents === 2) return ret;
    }
  },
  toString: (ms?: number) => {
    if (ms === undefined) {
      return null;
    }
    const {days, hours, minutes, seconds} = DateTimeHelpers.timeComponents(ms);
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
    if (seconds !== 0) {
      const toAppend = seconds === 1 ? " second " : " seconds ";
      ret += seconds + toAppend;
    }
    ret.trimEnd();
    return ret;
  },
};

export default DateTimeHelpers;
