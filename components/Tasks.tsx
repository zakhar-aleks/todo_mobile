import {
	View,
	Text,
	FlatList,
	ActivityIndicator,
	Pressable,
	StyleSheet,
} from "react-native";
import { useGetTasksQuery } from "./store/TaskApi";
import Todo from "./Todo";

const Tasks = () => {
	const { data: tasks, isLoading, error } = useGetTasksQuery();

	if (isLoading) {
		return <ActivityIndicator size="large" />;
	}

	if (error) {
		return <Text>Error fetching tasks.</Text>;
	}

	return (
		<View style={styles.screen}>
			<View style={styles.headerContainer}>
				<View style={styles.topRow}>
					<Text style={styles.helloText}>Hello there</Text>
					<Pressable
						style={({ pressed }) => [
							styles.buttonContainer,
							pressed && styles.pressed,
						]}
					>
						<Text style={styles.buttonText}>+ Add task</Text>
					</Pressable>
				</View>
				<Text style={styles.taskCountText}>
					You have {tasks?.length || 0} tasks here
				</Text>
			</View>
			<View style={styles.todoContainer}>
				<FlatList
					data={tasks}
					keyExtractor={item => item.id}
					renderItem={({ item }) => <Todo title={item.title} />}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		backgroundColor: "#F2F2F2",
	},

	headerContainer: {
		width: "100%",
		height: 148,
		borderBottomLeftRadius: 30,
		borderBottomRightRadius: 30,
		backgroundColor: "#6871EE",
		paddingHorizontal: 20,
		paddingTop: 22,
	},

	topRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 8,
	},

	helloText: {
		fontSize: 14,
		fontFamily: "Inter",
		color: "#E1E1E1",
		fontWeight: "400",
	},

	taskCountText: {
		fontSize: 24,
		fontFamily: "Inter",
		fontWeight: "bold",
		color: "#FFFFFF",
		marginTop: 4,
	},

	buttonContainer: {
		width: 111,
		height: 36,
		borderRadius: 12,
		backgroundColor: "#F8D94F",
		justifyContent: "center",
		alignItems: "center",
	},

	pressed: {
		opacity: 0.75,
		transform: [{ scale: 0.98 }],
	},

	buttonText: {
		fontSize: 12,
		fontWeight: "800",
		fontFamily: "Inter",
	},

	todoContainer: {
		display: "flex",
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 29,
	},
});

export default Tasks;
