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

export interface updateProfileInput {
	name: string;
	avatar?: string;
}

export interface deleteProfileAvatarResult {
	deleted: boolean;
}
