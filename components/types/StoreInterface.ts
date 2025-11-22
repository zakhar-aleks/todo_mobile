export interface user {
	id: number;
	email: string;
	name: string;
	avatar?: string | null;
}

export interface registrationInput {
	email: string;
	name: string;
	password: string;
	avatar?: string;
}

export interface registrationResult {
	token: string;
	user: user;
}

export interface tokenState {
	value: string | null;
}
