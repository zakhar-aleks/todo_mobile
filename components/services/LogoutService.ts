import { TokenService } from "./TokenService";

const logout = (navigate: Function) => {
	TokenService.deleteToken();

	navigate("Sign In");
};

export default logout;
