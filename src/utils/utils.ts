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