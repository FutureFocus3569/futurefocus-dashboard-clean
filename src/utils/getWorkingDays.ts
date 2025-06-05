export default function getWorkingDaysInMonth(year: number, month: number): number {
    let count = 0;
    const date = new Date(year, month, 1);
  
    while (date.getMonth() === month) {
      const day = date.getDay();
      if (day !== 0 && day !== 6) {
        count++;
      }
      date.setDate(date.getDate() + 1);
    }
  
    return count;
  }
  