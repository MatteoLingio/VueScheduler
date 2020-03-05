export default class DateUtils {
  public static getfullDate(date: Date): string {
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  }

  public static getHour(date: Date): string {
    return `${date.getHours()}:00`;
  }

  public static buildTimeMap(timeSlots: any[]): object {
    const obj: any = {};
    timeSlots.forEach((timeSlot) => {
      obj[timeSlot] = [];
    });
    return obj;
  }

  public static getMinutesFromHours(dS: Date | string, dE: Date | string) {
    const date1: any = new Date(dS);
    const date2: any = new Date(dE);
    return Math.round((date2 - date1) / 60000);
  }

  public static getHoursDiff(dS: Date | string, dE: Date | string) {
    const date1: any = new Date(dS);
    const date2: any = new Date(dE);
    return Math.abs(date2 - date1) / 36e5;
  }

  public static getRightHour(d: string, m: string) {
    const d1 = new Date(d);
    const d2 = new Date(d1.setHours(parseInt(m, 10)));
    return new Date(d2.setMinutes(0)).toISOString();
  }
}
