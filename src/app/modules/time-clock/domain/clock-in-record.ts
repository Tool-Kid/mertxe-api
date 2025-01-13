interface ClockInRecordProps {
  id: number;
  clockInAt: string;
  clockOutAt: string;
}

export class ClockInRecord implements ClockInRecordProps {
  id: number;
  clockInAt: string;
  clockOutAt: string;

  constructor(props: ClockInRecordProps) {
    this.id = props.id;
    this.clockInAt = props.clockInAt;
    this.clockOutAt = props.clockOutAt;
  }
}
