import { showDate } from "./date";

const ONE_DAY_MS = 1000 * 60 * 60 * 24;

export class Sleep {
  public startTime: Date;
  public endTime: Date;

  constructor(
    startTime: Date,
    endTime: Date
  ) {
    this.startTime = startTime;
    this.endTime = endTime;
  }

  get startDateStr(): string {
    return showDate(this.startTime);
  }

  get endDateStr(): string {
    return showDate(this.endTime);
  }

  hitDates() {
    const base = new Date("2000/01/01").getTime();
    const dates: Date[] = [];

    let start = ((this.startTime.getTime() - base) / ONE_DAY_MS | 0) * ONE_DAY_MS + base;
    const end = this.endTime.getTime();

    while (start < end) {
      dates.push(new Date(start));
      start += ONE_DAY_MS;
    }

    return dates;
  }

  splitByDate() {
    const base = new Date("2000/01/01").getTime();
    const sleeps: Sleep[] = [];

    let start = this.startTime.getTime();
    const end = this.endTime.getTime();

    while (((start - base) / ONE_DAY_MS | 0) < ((end - base) / ONE_DAY_MS | 0)) {
      const newStart = ((start - base) / ONE_DAY_MS + 1 | 0) * ONE_DAY_MS + base;
      sleeps.push(new Sleep(new Date(start), new Date(newStart)));
      start = newStart;
    }

    sleeps.push(new Sleep(new Date(start), this.endTime));

    return sleeps;
  }
}
