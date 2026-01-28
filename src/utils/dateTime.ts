export const formatDate = (ms: number) => {
  const date = new Date(ms);
  const day = date.getDate();
  const year = date.getFullYear();
  const month = date.getMonth();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const time = formatTime((hours * 3600 + minutes * 60 + seconds) * 1000);

  return `${day}/${month + 1}/${year} ${time}`;
};

export const formatTime = (ms: number, hasNegative: boolean = false) => {
  if (!hasNegative && ms < 0) {
    return '00:00:00';
  }

  let output: string = hasNegative && ms < 0 ? '-' : '';

  ms = Math.abs(ms);

  const seconds: number = Math.floor((ms / 1000) % 60);
  const minutes: number = Math.floor((ms / (1000 * 60)) % 60);
  const hours: number = Math.floor(ms / (1000 * 60 * 60));

  output +=
    String(hours).padStart(2, '0') +
    ':' +
    String(minutes).padStart(2, '0') +
    ':' +
    String(seconds).padStart(2, '0');

  return output;
};

export const getRelativeDate = (str: string) => {
  const now = new Date();

  switch (str.toLowerCase()) {
    case 'today':
      return now;
    case 'tomorrow':
      now.setDate(now.getDate() + 1);
      break;
    case 'yesterday':
      now.setDate(now.getDate() - 1);
      break;
    default:
      throw new Error('Relative date - unsupported format');
  }

  return now;
};

export const isDstObserved = (d: Date) => {
  let jan = new Date(d.getFullYear(), 0, 1).getTimezoneOffset();
  let jul = new Date(d.getFullYear(), 6, 1).getTimezoneOffset();

  return Math.max(jan, jul) !== d.getTimezoneOffset();
};

export const convertUTCtoLocalMS = (dateUTC: Date) => {
  // it's in minutes
  let offset = dateUTC.getTimezoneOffset();

  // if (isDstObserved(dateUTC)) {
  //   offset += 60;
  // }

  //Temp fix
  // offset += 60;

  return dateUTC.getTime() - offset * 60 * 1000;
};

export const formatTimeIntoText = (totalSeconds: number) => {
  if (totalSeconds === 0) {
    return '0 seconds';
  }

  const seconds: number = Math.floor(totalSeconds % 60);
  const minutes: number = Math.floor((totalSeconds / 60) % 60);
  const hours: number = Math.floor(totalSeconds / (60 * 60));

  let output = '';

  if (hours > 0) {
    output += `${hours} hours`;
  }

  if (minutes > 0) {
    output += `${hours > 0 ? ', ' : ''}${minutes} minutes`;
  }

  if (seconds > 0) {
    output += `${hours > 0 || minutes > 0 ? ', ' : ''}${seconds} seconds`;
  }

  return output;
};
