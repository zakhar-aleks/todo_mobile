import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";

const Todo = ({ title }: { title: string }) => {
	return (
		<View style={styles.card}>
			<TouchableOpacity style={styles.checkbox} />
			<Text style={styles.title} numberOfLines={1}>
				{title}
			</Text>
			<View style={styles.buttonsContainer}>
				<TouchableOpacity style={styles.iconButton}>
					<Image
						source={require("./assets/DeleteIcon.png")}
						style={{ width: 30, height: 30 }}
					/>
				</TouchableOpacity>

				<TouchableOpacity style={styles.iconButton}>
					<Image
						source={require("./assets/EditIcon.png")}
						style={{ width: 30, height: 30 }}
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	card: {
		width: 310,
		height: 46,
		backgroundColor: "#FFFFFF",
		borderRadius: 12,
		paddingVertical: 14,
		paddingHorizontal: 16,
		marginBottom: 12,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
	},

	checkbox: {
		width: 24,
		height: 24,
		borderRadius: 8,
		borderWidth: 2,
		borderColor: "#000000",
		marginRight: 12,
	},

	title: {
		flex: 1,
		fontSize: 16,
		fontWeight: "bold",
		color: "#000000",
		fontFamily: "Inter",
	},

	buttonsContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},

	iconButton: {
		width: 36,
		height: 36,
		borderRadius: 18,
		backgroundColor: "#F2F3FF",
		justifyContent: "center",
		alignItems: "center",
	},
});

export default Todo;
