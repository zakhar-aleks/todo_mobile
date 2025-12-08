import React from "react";
import {
	StyleSheet,
	Text,
	View,
	Image,
	StatusBar,
	ActivityIndicator,
	ScrollView,
	Pressable,
	Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types/NavigationTypes";
import { useDeleteTaskMutation, useGetTaskByIdQuery } from "./store/TaskApi";
import BackArrow from "./assets/BackArrow";

type TaskDetailsProps = NativeStackScreenProps<
	RootStackParamList,
	"Task Details"
>;

const TaskDetails = ({ navigation, route }: TaskDetailsProps) => {
	const { taskId } = route.params as { taskId: string };

	const {
		data: task,
		isLoading,
		isFetching,
	} = useGetTaskByIdQuery(
		{ taskId: taskId },
		{ refetchOnMountOrArgChange: true },
	);

	const [deleteTask] = useDeleteTaskMutation();

	const handleDelete = async () => {
		Alert.alert(
			"Delete Task",
			"Are you sure you want to delete this task?",
			[
				{ text: "Cancel", style: "cancel" },
				{
					text: "Delete",
					style: "destructive",
					onPress: async () => {
						try {
							await deleteTask({ taskId }).unwrap();
							navigation.goBack();
						} catch (error) {
							Alert.alert("Error", "Failed to delete task");
						}
					},
				},
			],
		);
	};

	if (isLoading || isFetching) {
		return (
			<View style={[styles.mainContainer, styles.centerContent]}>
				<ActivityIndicator size="large" color="#6871EE" />
			</View>
		);
	}

	if (!task) {
		return (
			<View style={[styles.mainContainer, styles.centerContent]}>
				<Text>Task not found</Text>
			</View>
		);
	}

	return (
		<View style={styles.mainContainer}>
			<StatusBar barStyle="light-content" backgroundColor="#6871EE" />
			<SafeAreaView style={styles.headerSafeArea}>
				<View style={styles.headerContainer}>
					<Pressable
						style={styles.backButton}
						onPress={() => navigation.goBack()}
					>
						<BackArrow width={24} height={24} color="#FFF" />
					</Pressable>
					<View style={styles.headerTitleWrapper}>
						<Text style={styles.headerTitle}>Task Details</Text>
					</View>
					<View style={{ width: 24 }} />
				</View>
			</SafeAreaView>

			<ScrollView contentContainerStyle={styles.scrollContent}>
				<Text style={styles.titleText}>{task.title}</Text>
				<Text style={styles.descriptionText}>
					{task.description
						? task.description
						: "No description provided"}
				</Text>
				<View style={styles.statusContainer}>
					<View
						style={[
							styles.statusBadge,
							task.done
								? { backgroundColor: "#008001" }
								: { backgroundColor: "#3D78F0" },
						]}
					>
						<Text style={styles.statusText}>
							{task.done ? "DONE" : "IN PROGRESS"}
						</Text>
					</View>
				</View>
				{task.files && task.files.length > 0 && (
					<View style={styles.imagesGrid}>
						{task.files.map((file: any, index: number) => (
							<Image
								key={file.id || index}
								source={{ uri: file.image }}
								style={styles.thumbnail}
							/>
						))}
					</View>
				)}
			</ScrollView>
			<View style={styles.footerContainer}>
				<Pressable style={styles.footerButton} onPress={handleDelete}>
					<Text style={styles.buttonText}>Delete</Text>
				</Pressable>

				<Pressable
					style={styles.footerButton}
					onPress={() => navigation.navigate("Edit Task", { taskId })}
				>
					<Text style={styles.buttonText}>Edit</Text>
				</Pressable>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	centerContent: {
		justifyContent: "center",
		alignItems: "center",
	},
	headerSafeArea: {
		backgroundColor: "#6871EE",
		borderBottomLeftRadius: 17,
		borderBottomRightRadius: 17,
	},
	headerContainer: {
		height: 60,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 16,
		position: "relative",
	},
	headerTitleWrapper: {
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		justifyContent: "center",
		alignItems: "center",
		zIndex: -1,
	},
	headerTitle: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#FFFFFF",
	},
	backButton: {
		padding: 5,
	},
	scrollContent: {
		padding: 20,
		paddingBottom: 100,
	},
	titleText: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#000000",
		marginBottom: 8,
	},
	descriptionText: {
		fontSize: 16,
		color: "#888888",
		marginBottom: 16,
	},
	statusContainer: {
		flexDirection: "row",
		marginBottom: 20,
	},
	statusBadge: {
		backgroundColor: "#6871EE",
		paddingVertical: 8,
		paddingHorizontal: 16,
		borderRadius: 8,
	},
	statusText: {
		color: "#FFFFFF",
		fontWeight: "bold",
		fontSize: 14,
		textTransform: "uppercase",
	},
	imagesGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 12,
	},
	thumbnail: {
		width: 100,
		height: 100,
		borderRadius: 12,
		backgroundColor: "#ccc",
		marginBottom: 12,
	},
	footerContainer: {
		position: "absolute",
		bottom: 40,
		left: 20,
		right: 20,
		flexDirection: "row",
		justifyContent: "space-between",
	},
	footerButton: {
		backgroundColor: "#F8D94F",
		height: 55,
		borderRadius: 12,
		justifyContent: "center",
		alignItems: "center",
		width: "48%",
		elevation: 3,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 2,
	},
	buttonText: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#000",
	},
});

export default TaskDetails;
