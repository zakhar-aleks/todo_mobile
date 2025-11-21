import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

interface AppButtonProps {
	title: string;
	disabled: boolean;
	onPress: () => void;
}

const AppButton = ({ title, disabled, onPress }: AppButtonProps) => {
	return (
		<Pressable
			onPress={onPress}
			disabled={disabled}
			style={({ pressed }) => [
				styles.container,
				pressed && styles.pressed,
			]}
		>
			<Text style={styles.text}>{title}</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	container: {
		width: 301,
		height: 56,
		borderRadius: 15,
		backgroundColor: "#F8D94F",
		justifyContent: "center",
		alignItems: "center",
	},

	pressed: {
		opacity: 0.75,
		transform: [{ scale: 0.98 }],
	},
	text: {
		color: "#000000",
		fontSize: 18,
		fontWeight: 600,
		fontFamily: "Inter",
	},
});

export default AppButton;
