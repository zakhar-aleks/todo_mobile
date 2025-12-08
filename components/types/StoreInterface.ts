export interface user {
	id: number;
	email: string;
	name: string;
	avatar?: string | null;
}

export type registrationInput = FormData;

export interface registrationResult {
	token: string;
	user: user;
}

export interface loginInput {
	email: string;
	password: string;
}

export interface loginResult {
	token: string;
	user: user;
}

export interface tokenState {
	value: string | null;
}

export interface profileState {
	profile: {
		email: string;
		name: string;
		avatar?: string;
	};
}

export interface getProfileResult {
	email: string;
	name: string;
	avatar?: string;
}

export interface updateProfileResult {
	email: string;
	name: string;
	avatar?: string;
}

export type updateProfileInput = FormData;

export interface deleteProfileAvatarResult {
	deleted: boolean;
}

export interface Task {
	id: string;
	title: string;
	description?: string;
	done: boolean;
	files?: File[];
}

export interface taskState {
	tasks: Task[];
}

export type getTasksResult = Task[];

export interface getTaskByIdInput {
	taskId: string;
	credentials?: string;
}

export type createTaskInput = FormData;

export interface File {
	id: string;
	image: string;
	taskId: string;
}

export interface createTaskResult {
	title: string;
	description?: string;
	files?: File[] | null;
}

export interface updateTaskInput {
	credentials: FormData;
	taskId: string;
}

export interface changeTaskDoneStatusInput {
	taskId: string;
	done: boolean;
}

export interface deleteTaskInput {
	taskId: string;
	credentials?: string;
}

export interface deleteTaskResult {
	deleted: true;
}
