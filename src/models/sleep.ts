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

  get startDate(): string {
    return `${this.startTime.getFullYear()}-${(this.startTime.getMonth() + 1 + "").padStart(2, "0")}-${(this.startTime.getDate() + "").padStart(2, "0")}`;
  }

  get endDate(): string {
    return `${this.endTime.getFullYear()}-${(this.endTime.getMonth() + 1 + "").padStart(2, "0")}-${(this.endTime.getDate() + "").padStart(2, "0")}`;
  }
}
