import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { StatusBar, useColorScheme, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { RootStackParamList } from "./components/types/NavigationTypes";
import { Provider } from "react-redux";
import { store } from "./components/store/store.ts";
import Tasks from "./components/Tasks.tsx";
import Profile from "./components/Profile.tsx";
const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
	const isDarkMode = useColorScheme() === "dark";

	return (
		<NavigationContainer>
			<SafeAreaProvider style={styles.container}>
				<Provider store={store}>
					<StatusBar
						barStyle={isDarkMode ? "light-content" : "dark-content"}
					/>

					<Stack.Navigator>
						<Stack.Screen
							name="Sign In"
							component={SignIn}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="Sign Up"
							component={SignUp}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="Tasks"
							component={Tasks}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="Profile"
							component={Profile}
							options={{ headerShown: false }}
						/>
					</Stack.Navigator>
				</Provider>
			</SafeAreaProvider>
		</NavigationContainer>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default App;
