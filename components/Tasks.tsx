import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { useGetTasksQuery } from "./store/TaskApi";

const Tasks = () => {
	const { data: tasks, isLoading, error } = useGetTasksQuery();

	if (isLoading) {
		return <ActivityIndicator size="large" />;
	}

	if (error) {
		return <Text>Error fetching tasks.</Text>;
	}

	return (
		<View>
			<Text style={{ fontSize: 20, fontWeight: "bold" }}>Tasks</Text>

			<FlatList
				data={tasks}
				keyExtractor={item => item.id}
				renderItem={({ item }) => <Text>{item.title}</Text>}
			/>
		</View>
	);
};

export default Tasks;
