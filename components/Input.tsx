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
import PasswordEye from "./assets/PasswordEye";
import CrossedEye from "./assets/CrossedEye";

interface InputProps extends TextInputProps {
	label: string;
	hasEye?: boolean;
	error?: string;
	borderColor?: string;
	textColor?: string;
	inputTextColor?: string;
}

const Input = ({
	label,
	hasEye = false,
	error,
	borderColor,
	textColor,
	inputTextColor,
	...props
}: InputProps) => {
	const [isSecure, setIsSecure] = useState(props.secureTextEntry);

	return (
		<View>
			<Text style={[styles.text, textColor && { color: textColor }]}>
				{label}
			</Text>
			<View
				style={[
					styles.inputWrapper,
					borderColor && { borderColor: borderColor },
					!!error && styles.errorBorder,
				]}
			>
				<TextInput
					style={[
						styles.input,
						inputTextColor && { color: inputTextColor },
					]}
					{...props}
					secureTextEntry={hasEye ? isSecure : props.secureTextEntry}
					placeholderTextColor="#999"
				/>
				{hasEye && (
					<TouchableOpacity onPress={() => setIsSecure(!isSecure)}>
						{isSecure ? <CrossedEye /> : <PasswordEye />}
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
