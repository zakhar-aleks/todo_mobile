import React, { useState, useCallback } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types/NavigationTypes";
import { useGetAllTasksQuery } from "./store/TaskApi";
import {
	ActivityIndicator,
	FlatList,
	Pressable,
	StyleSheet,
	View,
	Text,
	StatusBar,
} from "react-native";
import {
	SafeAreaView,
	useSafeAreaInsets,
} from "react-native-safe-area-context";
import Navigation from "./Navigation";

type CommonTasksProps = NativeStackScreenProps<
	RootStackParamList,
	"Common Tasks"
>;

const CommonTasks = ({ navigation }: CommonTasksProps) => {
	const [page, setPage] = useState(1);
	const {
		data: tasksResponse,
		isLoading,
		isFetching,
	} = useGetAllTasksQuery({ page: page, tasksPerPage: 9 });
	const insets = useSafeAreaInsets();
	const headerOverlap = insets.top + 15;

	const tasksList = tasksResponse?.tasks || [];

	const hasMore = tasksList.length >= page * 9;

	const loadMore = useCallback(() => {
		if (isFetching || isLoading || !hasMore) return;

		setPage(prev => prev + 1);
	}, [isFetching, isLoading, hasMore]);

	const renderHeader = () => (
		<View style={styles.headerWrapper}>
			<SafeAreaView
				edges={["top", "left", "right"]}
				style={styles.headerSafeArea}
			>
				<View style={styles.headerContainer}>
					<View style={styles.headerTitleWrapper}>
						<Text style={styles.headerTitle}>Common Tasks</Text>
					</View>
				</View>
			</SafeAreaView>
		</View>
	);

	const renderEmptyList = () => (
		<View style={styles.emptyContainer}>
			<Text style={styles.emptyText}>
				There are no tasks{"\n"}at the moment
			</Text>
		</View>
	);

	if (isLoading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color="#6871EE" />
			</View>
		);
	}

	return (
		<View style={styles.mainContainer}>
			<StatusBar barStyle="light-content" backgroundColor="#6871EE" />
			{renderHeader()}
			<FlatList
				data={tasksList}
				keyExtractor={(item, index) => `${item.id}-${index}`}
				ListEmptyComponent={renderEmptyList}
				contentContainerStyle={[
					styles.listContent,
					{ paddingTop: headerOverlap },
				]}
				ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
				showsVerticalScrollIndicator={false}
				onEndReached={loadMore}
				onEndReachedThreshold={0.2}
				renderItem={({ item }) => (
					<View style={styles.itemWrapper}>
						<Pressable style={styles.card}>
							<Text style={styles.cardTitle}>{item.title}</Text>
						</Pressable>
					</View>
				)}
			/>
			<Navigation />
		</View>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		backgroundColor: "#F2F2F2",
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#F2F2F2",
	},
	headerWrapper: {
		backgroundColor: "#F2F2F2",
		marginBottom: 10,
		height: 50,
		zIndex: 999,
	},
	headerSafeArea: {
		backgroundColor: "#6871EE",
		borderBottomLeftRadius: 30,
		borderBottomRightRadius: 30,
		paddingBottom: 15,
		elevation: 5,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 4,
	},
	headerContainer: {
		height: 50,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingHorizontal: 16,
	},
	headerTitleWrapper: {
		justifyContent: "center",
		alignItems: "center",
	},
	headerTitle: {
		fontSize: 22,
		fontWeight: "bold",
		color: "#FFFFFF",
	},
	listContent: {
		paddingTop: 0,
		paddingBottom: 100,
	},
	itemWrapper: {
		paddingHorizontal: 20,
		width: "100%",
	},
	card: {
		backgroundColor: "#FFFFFF",
		borderRadius: 15,
		paddingVertical: 20,
		paddingHorizontal: 20,
		width: "100%",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.05,
		shadowRadius: 5,
		elevation: 2,
	},
	cardTitle: {
		fontSize: 16,
		fontWeight: "bold",
		color: "#000000",
	},
	footerLoader: {
		height: 60,
		paddingVertical: 20,
		alignItems: "center",
		justifyContent: "center",
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

export default CommonTasks;
