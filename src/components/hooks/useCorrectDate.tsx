import { getUnixTime } from 'date-fns'

function useCorrectDate(arr: any) {
  const arrTable = arr;
  const sep = ['/', '.'];
  const monthNames = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

  arrTable.forEach((row: any) => {
    const date = row.date.replace(/\s+/g, '');
    const regTestCyrillic = /[а-яА-ЯёЁ]/g.test(date);

    if (regTestCyrillic) {
      for (let i = 0; i < monthNames.length; i++) {
        if (~date.indexOf(monthNames[i])) {
          const dateWithMonths = row.date.split(' ');
          const monthIndex = i;
          row.date = getUnixTime(new Date(dateWithMonths[2], monthIndex, dateWithMonths[0]));
        }
      }
    } else {
      for (let sepInd = 0; sepInd < sep.length; sepInd++) {
        const dividedDate = date.split(sep[sepInd]);
        if (dividedDate.length > 1) {
          row.date = getUnixTime(new Date(dividedDate[2], dividedDate[1] - 1, dividedDate[0]));
        }
      }
    }
  });
  return arrTable;
}

export default useCorrectDate;
