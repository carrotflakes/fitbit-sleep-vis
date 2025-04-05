import { showDate } from "./date";

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
}
