export function getCurrentDate(): string {
  return new Date().toLocaleDateString();
}

export function getMinDateCalendar(): string {
  let minDate: string = '';
  let minDay: number = 0;
  let minMonth: number = 0;
  let minYear: number = 0;
  let getLastDayOfMonth: number = 0;
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  if(currentDay >= 5) {
    minYear = currentYear;
    minMonth = currentMonth;
    minDay = currentDay - 5 + 1;
  } else {
    if(currentMonth === 1) {
      minMonth = 12;
      minYear = currentYear - 1;
    } else {
      minYear = currentYear;
      minMonth = currentMonth - 1;
    }
    const restDays = currentDay - 5;
    getLastDayOfMonth = new Date(currentYear, currentMonth, 0).getDate();
    minDay = getLastDayOfMonth - (restDays * -1);
  }

  minDate = new Date (`${minYear}-${minMonth}-${minDay}`).toISOString().substring(0, 10);

  return minDate;
}

export function getMaxDateCalendar(): string {
  let maxDate: string = '';
  let maxDay: number = 0;
  let maxMonth: number = 0;
  let maxYear: number = 0;
  let getLastDayOfMonth: number = 0;
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  getLastDayOfMonth = new Date(currentYear, currentMonth, 0).getDate();
  if((currentDay + 7) <= getLastDayOfMonth) {
    maxYear = currentYear;
    maxMonth = currentMonth;
    maxDay = currentDay + 7;
  } else {
    if(currentMonth === 12) {
      maxMonth = 1;
      maxYear = currentYear + 1;
    } else {
      maxYear = currentYear;
      maxMonth = currentMonth + 1 ;
    }
    const restDays = (getLastDayOfMonth - currentDay);
    maxDay = 7 - restDays;
  }

  maxDate = new Date (`${maxYear}-${maxMonth}-${maxDay}`).toISOString().substring(0, 10);

  return maxDate;
}

export function getHours (unixTime: number): string {
  return new Date(unixTime * 1000).toUTCString();
}

export function formatString (timezone: string): string {
  const arrayStr = timezone.split('/')
  const country = arrayStr[arrayStr.length - 2].replaceAll('_', ' ');
  const zone = arrayStr[arrayStr.length - 1].replaceAll('_', ' ');

  return `${country} - ${zone}`;
}