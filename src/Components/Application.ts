export enum ApplicationState {
  Todo = 1,
  Sent,
  MeetingScheduled,
  Waiting,
  Accepted,
  Refused
}

export function getStateIcon(state: ApplicationState | number): string {
	switch (state) {
		case ApplicationState.Todo: return '☕';
		case ApplicationState.Sent: return '📨';
		case ApplicationState.MeetingScheduled: return '🎤';
		case ApplicationState.Waiting: return '😱';
		case ApplicationState.Accepted: return '🎉';
		case ApplicationState.Refused: return '💩';
		default: return '';
	}
}

export interface ApplicationData {
  name: string,
  state: ApplicationState,
  link?: string,
  applicationDate?: Date,
  nextMeeting?: Date,
}

export interface Application extends ApplicationData {
	id: number
}