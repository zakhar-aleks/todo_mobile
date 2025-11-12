import { StatusBar, useColorScheme, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const App = () => {
	const isDarkMode = useColorScheme() === "dark";

	return (
		<SafeAreaProvider>
			<StatusBar
				barStyle={isDarkMode ? "light-content" : "dark-content"}
			/>
			<Text>Todo Mobile</Text>
		</SafeAreaProvider>
	);
};

export default App;
