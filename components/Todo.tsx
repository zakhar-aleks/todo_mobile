import { Text, View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import DeleteIcon from "./assets/DeleteIcon";
import EditIcon from "./assets/EditIcon";
import { useDeleteTaskMutation } from "./store/TaskApi";
import { RootStackParamList } from "./types/NavigationTypes";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

interface TodoProps {
	title: string;
	id: string;
}

interface ApiError {
	status?: number;
	data?: {
		error?: string;
		errors?: string[];
	};
}

type NavigationType = NativeStackNavigationProp<RootStackParamList>;

const Todo = ({ title, id }: TodoProps) => {
	const [deleteTask, { isLoading, error }] = useDeleteTaskMutation();
	const navigation = useNavigation<NavigationType>();

	const handleDeleteError = (err: ApiError) => {
		if (err.status === 401) {
			navigation.navigate("Sign In");
			return;
		}

		let errorMessage = "An unexpected error occurred";

		if (err.data?.errors && Array.isArray(err.data.errors)) {
			errorMessage = err.data.errors.join("\n");
		} else if (err.data?.error) {
			errorMessage = err.data.error;
		}

		Alert.alert("Error", errorMessage);
	};

	const showConfirmDialog = () => {
		Alert.alert("Delete Todo", "Are you sure?", [
			{
				text: "Cancel",
				onPress: () => console.log("Deletion cancelled"),
				style: "cancel",
			},
			{
				text: "OK",
				onPress: async () => {
					try {
						await deleteTask({ taskId: id }).unwrap();

						console.log("Task deleted successfully");
					} catch (err: any) {
						handleDeleteError(err);
					}
				},
			},
		]);
	};

	return (
		<View style={styles.card}>
			<TouchableOpacity style={styles.checkbox} />
			<Text style={styles.title} numberOfLines={1}>
				{title}
			</Text>
			<View style={styles.buttonsContainer}>
				<TouchableOpacity
					style={styles.iconButton}
					onPress={() => showConfirmDialog()}
				>
					<DeleteIcon />
				</TouchableOpacity>
				<TouchableOpacity
					style={[
						styles.iconButton,
						{ opacity: 0.5, filter: "grayscale(100%)" },
					]}
					disabled={true}
				>
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
