import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import DeleteIcon from "./assets/DeleteIcon";
import EditIcon from "./assets/EditIcon";
import { useDeleteTaskMutation } from "./store/TaskApi";

interface TodoProps {
	title: string;
	id: string;
}

const Todo = ({ title, id }: TodoProps) => {
	const [deleteTask, { isLoading, error }] = useDeleteTaskMutation();

	return (
		<View style={styles.card}>
			<TouchableOpacity style={styles.checkbox} />
			<Text style={styles.title} numberOfLines={1}>
				{title}
			</Text>
			<View style={styles.buttonsContainer}>
				<TouchableOpacity
					style={styles.iconButton}
					onPress={() => deleteTask({ taskId: id })}
				>
					<DeleteIcon />
				</TouchableOpacity>
				<TouchableOpacity style={styles.iconButton}>
					<EditIcon />
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
