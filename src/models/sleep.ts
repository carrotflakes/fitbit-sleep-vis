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
    return this.startTime.toISOString().slice(0, 10);
  }

  get endDate(): string {
    return this.endTime.toISOString().slice(0, 10);
  }
}
