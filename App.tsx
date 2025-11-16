import SignIn from "./components/SignIn";
import { StatusBar, useColorScheme, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const App = () => {
	const isDarkMode = useColorScheme() === "dark";

	return (
		<SafeAreaProvider style={styles.container}>
			<StatusBar
				barStyle={isDarkMode ? "light-content" : "dark-content"}
			/>
			<SignIn />
		</SafeAreaProvider>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default App;
