export default class Event {
  private height: number;
  private margin: number;

  constructor(
    private id: string,
    private start: string,
    private end: string,
    private title: string,
    private color: string,
    private customProps: object,
  ) {
    this.id = id;
    this.start = start;
    this.end = end;
    this.title = title;
    this.color = color || '';
    this.height = 0;
    this.margin = 0;
    this.customProps = customProps || {};
  }

  public getStart(): string {
    return this.start;
  }

  public getEnd(): string {
    return this.end;
  }

  public setEventPosition(margin: number, height: number): void {
    this.margin = margin;
    this.height = height;
  }
}
