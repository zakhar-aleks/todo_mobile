import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types/NavigationTypes";
import TasksNavigationIcon from "./assets/TasksNavigationIcon";
import ProfileNavigationIcon from "./assets/ProfileNavigationIcon";
import CommonTasksNavigationIcon from "./assets/CommonTasksNavigationIcon";

type NavigationType = NativeStackNavigationProp<RootStackParamList>;

const Navigation = () => {
	const navigation = useNavigation<NavigationType>();
	const route = useRoute();
	const isActive = (routeName: string) => route.name === routeName;

	return (
		<View style={styles.navigationContainer}>
			<Pressable
				onPress={() => navigation.navigate("Tasks")}
				style={[
					styles.navItem,
					isActive("Tasks") && styles.activeNavItem,
				]}
			>
				<TasksNavigationIcon
					color={isActive("Tasks") ? "#FFFFFF" : "#000000"}
				/>
			</Pressable>
			<Pressable
				onPress={() => navigation.navigate("Profile")}
				style={[
					styles.navItem,
					isActive("Profile") && styles.activeNavItem,
				]}
			>
				<ProfileNavigationIcon
					color={isActive("Profile") ? "#FFFFFF" : "#000000"}
				/>
			</Pressable>
			<Pressable
				onPress={() => navigation.navigate("Common Tasks")}
				style={[
					styles.navItem,
					isActive("Common Tasks") && styles.activeNavItem,
				]}
			>
				<CommonTasksNavigationIcon
					color={isActive("Common Tasks") ? "#FFFFFF" : "#000000"}
				/>
			</Pressable>
		</View>
	);
};

const styles = StyleSheet.create({
	navigationContainer: {
		flexDirection: "row",
		width: "100%",
		height: 80,
		justifyContent: "center",
		alignItems: "center",
		gap: 40,
		paddingHorizontal: 33,
		backgroundColor: "#FFFFFF",
	},
	navItem: {
		width: 50,
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 25,
		backgroundColor: "transparent",
	},
	activeNavItem: {
		backgroundColor: "#6871EE",
		shadowColor: "#6871EE",
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.3,
		shadowRadius: 4.65,
		elevation: 8,
	},
	disabledItem: {
		opacity: 0.5,
	},
});

export default Navigation;
