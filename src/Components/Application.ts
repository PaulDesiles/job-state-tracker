// export enum ApplicationState {
//   Todo,
//   Sent,
//   MeetingScheduled,
//   Waiting,
//   Accepted,
//   Refused
// }

export interface ApplicationData {
  name: string,
  state: string
}

export interface Application extends ApplicationData {
	id: number
}