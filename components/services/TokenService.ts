import * as Keychain from "react-native-keychain";

const SERVICE_KEY = "app_access_token";

export const TokenService = {
	saveToken: async (token: string) => {
		try {
			await Keychain.setGenericPassword("user_token", token, {
				service: SERVICE_KEY,
				accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
			});
			console.log("Token saved successfully");
		} catch (error) {
			console.error("Could not save token", error);
		}
	},

	getToken: async () => {
		try {
			const credentials = await Keychain.getGenericPassword({
				service: SERVICE_KEY,
			});

			if (credentials) {
				return credentials.password;
			} else {
				console.log("No credentials stored");
				return null;
			}
		} catch (error) {
			console.error("Could not load credentials", error);
			return null;
		}
	},

	deleteToken: async () => {
		try {
			await Keychain.resetGenericPassword({ service: SERVICE_KEY });
			console.log("Token deleted successfully");
		} catch (error) {
			console.error("Could not delete token", error);
		}
	},
};
