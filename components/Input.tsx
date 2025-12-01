import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	Image,
	TextInputProps,
} from "react-native";

interface InputProps extends TextInputProps {
	label: string;
	hasEye?: boolean;
	error?: string;
}

const Input = ({ label, hasEye = false, error, ...props }: InputProps) => {
	const [isSecure, setIsSecure] = useState(props.secureTextEntry);

	return (
		<View>
			<Text style={styles.text}>{label}</Text>
			<View style={[styles.inputWrapper, !!error && styles.errorBorder]}>
				<TextInput
					style={styles.input}
					{...props}
					secureTextEntry={hasEye ? isSecure : props.secureTextEntry}
					placeholderTextColor="#999"
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
			{error && <Text style={styles.errorText}>{error}</Text>}
		</View>
	);
};

const styles = StyleSheet.create({
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
	errorBorder: {
		borderColor: "#FF5A5A",
	},
	errorText: {
		color: "#FF5A5A",
		fontSize: 12,
		marginTop: 4,
		marginLeft: 5,
	},
});

export default Input;
