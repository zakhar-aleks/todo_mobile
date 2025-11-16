import { ScrollView, StyleSheet, Image, Text } from "react-native";
import Input from "./Input";

const SignIn = () => {
	return (
		<ScrollView
			style={{ flex: 1, backgroundColor: "#6871EE" }}
			contentContainerStyle={styles.container}
		>
			<Image source={require("./assets/Logo.png")} style={styles.logo} />
			<Text style={styles.welcomeText}>Welcome!</Text>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#6871EE",
		gap: 30,
		paddingTop: 78,
	},

	welcomeText: {
		fontSize: 32,
		fontFamily: "Inter",
		fontWeight: 700,
		color: "#FFFFFF",
	},

	logo: {
		width: 174,
		height: 88,
	},
});

export default SignIn;
