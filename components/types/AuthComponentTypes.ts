export interface ApiError {
	data?: {
		error?: string;
	};
}

export interface AssetFile {
	type: string;
	uri?: string;
	name?: string;
}
