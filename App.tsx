import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { StatusBar, useColorScheme, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
<<<<<<< HEAD
import type { RootStackParamList } from "./components/NavigationTypes";
import { Provider } from "react-redux";
import { store } from "./components/redux/store.ts";
=======
import type { RootStackParamList } from "./components/types/NavigationTypes";
import { Provider } from "react-redux";
import { store } from "./components/store/store";

>>>>>>> c7245fa1b015d28cc682707d324a08a7f2a78a9a
const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
	const isDarkMode = useColorScheme() === "dark";

	return (
		<NavigationContainer>
<<<<<<< HEAD
			<SafeAreaProvider style={styles.container}>
				<Provider store={store}>
=======
			<Provider store={store}>
				<SafeAreaProvider style={styles.container}>
>>>>>>> c7245fa1b015d28cc682707d324a08a7f2a78a9a
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
					</Stack.Navigator>
<<<<<<< HEAD
				</Provider>
			</SafeAreaProvider>
=======
				</SafeAreaProvider>
			</Provider>
>>>>>>> c7245fa1b015d28cc682707d324a08a7f2a78a9a
		</NavigationContainer>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});

export default App;
