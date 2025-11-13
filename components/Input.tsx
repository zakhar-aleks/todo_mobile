import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	Image,
} from "react-native";

interface InputProps {
	label: string;
	isPassword?: boolean;
	hasEye?: boolean;
}

const Input = ({ label, isPassword = false, hasEye = false }: InputProps) => {
	const [isSecure, setIsSecure] = useState(hasEye);

	return (
		<View style={styles.container}>
			<Text style={styles.text}>{label}</Text>
			<View style={styles.inputWrapper}>
				<TextInput
					style={styles.input}
					secureTextEntry={hasEye ? isSecure : isPassword}
				/>
				{hasEye && (
					<TouchableOpacity onPress={() => setIsSecure(!isSecure)}>
						<Image
							source={require("./assets/PasswordEye.png")}
							style={{ width: 24, height: 24 }}
						/>
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginTop: 32,
	},
	text: {
		color: "#C4C8F9",
		fontSize: 14,
		fontWeight: 400,
		fontFamily: "Inter",
	},
	inputWrapper: {
		flexDirection: "row",
		alignItems: "center",
		height: 48,
		width: 301,
		backgroundColor: "transparent",
		borderWidth: 1,
		borderRadius: 15,
		borderColor: "#FFFFFF",
		marginTop: 6,
		paddingHorizontal: 13,
	},
	input: {
		flex: 1,
		color: "#FFFFFF",
		height: "100%",
	},
});

export default Input;
