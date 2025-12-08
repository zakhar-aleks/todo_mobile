import {
	View,
	Text,
	FlatList,
	ActivityIndicator,
	Pressable,
	StyleSheet,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useGetTasksQuery } from "./store/TaskApi";
import Todo from "./Todo";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types/NavigationTypes";
import Navigation from "./Navigation";

type TasksProps = NativeStackScreenProps<RootStackParamList, "Tasks">;

const Tasks = ({ navigation }: TasksProps) => {
	const { data: tasks, isLoading, error } = useGetTasksQuery();
	const insets = useSafeAreaInsets();

	if (isLoading) return <ActivityIndicator size="large" />;
	if (error) return <Text>Error fetching tasks.</Text>;

	const renderHeader = () => (
		<View
			style={[
				styles.headerContainer,
				{
					paddingTop: insets.top + 15,
				},
			]}
		>
			<View style={styles.topRow}>
				<Text style={styles.helloText}>Hello there</Text>
				<Pressable
					onPress={() => navigation.navigate("Add Task")}
					style={({ pressed }) => [
						styles.buttonContainer,
						pressed && styles.pressed,
					]}
				>
					<Text style={styles.buttonText}>+ Add task</Text>
				</Pressable>
			</View>
			<Text style={styles.taskCountText}>
				You have {tasks?.length || 0} task here
			</Text>
		</View>
	);

	const renderEmptyList = () => (
		<View style={styles.emptyContainer}>
			<Text style={styles.emptyText}>
				There are no tasks{"\n"}at the moment
			</Text>
		</View>
	);

	return (
		<View style={styles.screen}>
			<FlatList
				data={tasks}
				keyExtractor={item => item.id}
				ListHeaderComponent={renderHeader}
				ListEmptyComponent={renderEmptyList}
				renderItem={({ item }) => (
					<View style={styles.todoWrapper}>
						<Pressable
							onPress={() =>
								navigation.navigate("Task Details", {
									taskId: item.id,
								})
							}
						>
							<Todo
								title={item.title}
								id={item.id}
								done={item.done}
							/>
						</Pressable>
					</View>
				)}
				contentContainerStyle={styles.listContent}
			/>
			<Navigation />
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		width: "100%",
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
		marginBottom: 29,
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

	listContent: {
		paddingBottom: 100,
		flexGrow: 1,
	},
	todoWrapper: {
		width: "100%",
		alignItems: "center",
	},
	emptyContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 20,
		marginTop: 50,
	},
	emptyText: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#000000",
		textAlign: "center",
		lineHeight: 28,
	},
});

export default Tasks;
