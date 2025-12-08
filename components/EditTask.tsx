import React, { useEffect, useState } from "react";
import { check, request, RESULTS, PERMISSIONS } from "react-native-permissions";
import {
	Alert,
	Platform,
	Pressable,
	StyleSheet,
	Text,
	View,
	Image,
	StatusBar,
	ActivityIndicator,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import { launchImageLibrary, Asset } from "react-native-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DeleteIcon from "./assets/DeleteIcon";
import BackArrow from "./assets/BackArrow";
import Input from "./Input";
import { RootStackParamList } from "./types/NavigationTypes";
import {
	useChangeTaskDoneStatusMutation,
	useDeleteTaskMutation,
	useGetTaskByIdQuery,
	useUpdateTaskMutation,
} from "./store/TaskApi";
import Checkmark from "./assets/Checkmark";

const validationSchema = yup.object().shape({
	title: yup.string().required("Title is required").min(2, "Min 2 chars"),
	description: yup.string(),
	media: yup.array().of(yup.mixed<Asset>()).notRequired(),
});

type EditTaskProps = NativeStackScreenProps<RootStackParamList, "Edit Task">;
type EditTaskSchemaType = yup.InferType<typeof validationSchema>;

const getGalleryPermission = () => {
	if (Platform.OS === "ios") return PERMISSIONS.IOS.PHOTO_LIBRARY;
	if (Platform.OS === "android") {
		return Platform.Version >= 33
			? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
			: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
	}
	return null;
};

const EditTask = ({ navigation, route }: EditTaskProps) => {
	const { taskId } = route.params;
	const {
		data: tasks,
		isLoading,
		isFetching,
	} = useGetTaskByIdQuery(
		{ taskId: taskId },
		{ refetchOnMountOrArgChange: true },
	);
	const [update] = useUpdateTaskMutation();
	const [deleteTask] = useDeleteTaskMutation();
	const [serverImages, setServerImages] = useState<any[]>([]);
	const [changeTaskStatus] = useChangeTaskDoneStatusMutation();
	const [isDone, setIsDone] = useState(false);

	const {
		control,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm<EditTaskSchemaType>({
		resolver: yupResolver(validationSchema) as any,
		defaultValues: {
			title: "",
			description: "",
			media: [],
		},
	});

	useEffect(() => {
		if (tasks) {
			setIsDone(tasks.done);
			setValue("title", tasks.title);
			setValue("description", tasks.description || "");

			if (tasks.files && Array.isArray(tasks.files)) {
				setServerImages(tasks.files);
			}
		}
	}, [tasks, setValue]);

	if (isLoading || isFetching) {
		return (
			<View
				style={[
					styles.mainContainer,
					{ justifyContent: "center", alignItems: "center" },
				]}
			>
				<ActivityIndicator size="large" color="#6871EE" />
			</View>
		);
	}

	const selectedImages = watch("media") || [];

	const openGallery = async () => {
		const result = await launchImageLibrary({
			mediaType: "photo",
			quality: 0.8,
			selectionLimit: 0,
		});

		if (result.assets && result.assets.length > 0) {
			const currentImages = watch("media") || [];
			setValue("media", [...currentImages, ...result.assets], {
				shouldValidate: true,
			});
		}
	};

	const handleAddPhotoPress = async () => {
		const permission = getGalleryPermission();
		if (!permission) return;
		const status = await check(permission);

		if (status === RESULTS.GRANTED) {
			openGallery();
		} else if (status === RESULTS.DENIED) {
			const newStatus = await request(permission);
			if (newStatus === RESULTS.GRANTED) {
				openGallery();
			} else {
				Alert.alert(
					"Access Denied",
					"Access to the file system is denied. Enable it in Settings and restart the app",
				);
			}
		} else if (status === RESULTS.BLOCKED) {
			Alert.alert(
				"Access Denied",
				"Access to the file system is denied. Enable it in Settings and restart the app",
			);
		}
	};

	const displayServerImages = serverImages.map(img => ({
		...img,
		uri: img.image,
		isServer: true,
	}));

	const displayNewImages = selectedImages.map(img => ({
		...img,
		isServer: false,
	}));

	const allImages = [...displayServerImages, ...displayNewImages];

	const removeImage = (indexToRemove: number) => {
		if (indexToRemove < serverImages.length) {
			const updatedServerImages = serverImages.filter(
				(_, index) => index !== indexToRemove,
			);
			setServerImages(updatedServerImages);
		} else {
			const newImageIndex = indexToRemove - serverImages.length;
			const currentNewImages = watch("media") || [];
			const filtered = currentNewImages.filter(
				(_, index) => index !== newImageIndex,
			);
			setValue("media", filtered);
		}
	};

	const onSubmit: SubmitHandler<EditTaskSchemaType> = async data => {
		try {
			const formData = new FormData();

			formData.append("title", data.title);
			formData.append("description", data.description || "");

			const existingIds = serverImages.map(img => img.id);
			formData.append("existingFileIds", JSON.stringify(existingIds));

			if (data.media && data.media.length > 0) {
				data.media.forEach(file => {
					if (!file?.uri) return;

					const fileExtension =
						file.fileName?.split(".").pop() || "jpg";
					const uniqueName = `photo_${Date.now()}_${Math.random()
						.toString(36)
						.slice(2)}.${fileExtension}`;

					const fileToUpload = {
						uri:
							Platform.OS === "android"
								? file?.uri
								: file?.uri.replace("file://", ""),
						type: file?.type || "image/jpeg",
						name: uniqueName,
					};

					formData.append("files", fileToUpload as any);
				});
			}

			await update({ taskId: taskId, credentials: formData }).unwrap();
			navigation.navigate("Tasks");
		} catch (err: any) {
			console.log("FULL ERROR:", JSON.stringify(err, null, 2));
			if (err?.status === 401) {
				navigation.reset({
					index: 0,
					routes: [{ name: "Login" as any }],
				});
				return;
			}

			if (err?.data?.errors) {
				const errorsData = err.data.errors;
				let errorMsg = "";
				if (Array.isArray(errorsData)) {
					errorMsg = errorsData.join("\n");
				} else if (typeof errorsData === "object") {
					errorMsg = Object.values(errorsData).flat().join("\n");
				} else {
					errorMsg = String(errorsData);
				}
				Alert.alert("Error", errorMsg);
				return;
			}

			if (err?.data?.error) {
				Alert.alert("Error", JSON.stringify(err.data.error, null, 2));
				return;
			}
			Alert.alert("Error", "Something went wrong. Please try again.");
		}
	};

	const AddPhotoButton = () => (
		<Pressable onPress={handleAddPhotoPress} style={styles.addPhotoBtn}>
			<Text style={styles.addPhotoText}>Add{"\n"}Photo +</Text>
		</Pressable>
	);

	return (
		<View style={styles.mainContainer}>
			<StatusBar barStyle="light-content" backgroundColor="#6D61F2" />
			<SafeAreaView style={styles.headerSafeArea}>
				<View style={styles.headerContainer}>
					<View style={styles.headerTitleWrapper}>
						<Text style={styles.headerTitle}>Edit Task</Text>
					</View>
					<Pressable
						style={styles.backButton}
						onPress={() => navigation.navigate("Tasks")}
					>
						<BackArrow width={24} height={24} color="#FFF" />
					</Pressable>
					<Pressable
						onPress={() => {
							navigation.navigate("Tasks");
							deleteTask({ taskId: taskId });
						}}
					>
						<Text style={styles.deleteHeaderText}>delete</Text>
					</Pressable>
				</View>
			</SafeAreaView>

			<ScrollView
				contentContainerStyle={styles.scrollContent}
				showsVerticalScrollIndicator={false}
			>
				<View style={styles.formContainer}>
					<View style={styles.inputWrapper}>
						<Controller
							control={control}
							name="title"
							render={({
								field: { onChange, onBlur, value },
							}) => (
								<Input
									label="Task title"
									onBlur={onBlur}
									onChangeText={onChange}
									value={value}
									error={errors.title?.message}
									borderColor="#4D4D4D"
									textColor="#4D4D4D"
									inputTextColor="#000000"
								/>
							)}
						/>
					</View>
					<View style={styles.inputWrapper}>
						<Controller
							control={control}
							name="description"
							render={({
								field: { onChange, onBlur, value },
							}) => (
								<Input
									label="Task description"
									onBlur={onBlur}
									onChangeText={onChange}
									value={value}
									error={errors.description?.message}
									borderColor="#4D4D4D"
									textColor="#4D4D4D"
									inputTextColor="#000000"
								/>
							)}
						/>
					</View>
				</View>

				<View style={styles.checkboxContainer}>
					<Text style={styles.checkboxLabel}>Done</Text>
					<TouchableOpacity
						style={styles.checkbox}
						onPress={() => {
							const newStatus = !isDone;
							setIsDone(newStatus);
							changeTaskStatus({
								taskId: taskId,
								done: newStatus,
							});
						}}
					>
						{isDone && (
							<View style={styles.innerCheck}>
								<Checkmark
									width={18}
									height={18}
									color="#FFFFFF"
								/>
							</View>
						)}
					</TouchableOpacity>
				</View>

				<View style={styles.imagesGrid}>
					<AddPhotoButton />
					{allImages.map((item, index) => (
						<View
							key={(item.id || item.uri) + index}
							style={styles.imageWrapper}
						>
							<Image
								source={{ uri: item.uri }}
								style={styles.thumbnail}
							/>
							<Pressable
								style={styles.deleteButton}
								onPress={() => removeImage(index)}
							>
								<DeleteIcon color="#6871EE" />
							</Pressable>
						</View>
					))}
				</View>

				<View style={{ flex: 1, minHeight: 40 }} />

				<Pressable
					style={[styles.saveBtn, isLoading && { opacity: 0.7 }]}
					onPress={handleSubmit(onSubmit)}
					disabled={isLoading}
				>
					{isLoading ? (
						<ActivityIndicator color="#000" />
					) : (
						<Text style={styles.saveBtnText}>Save</Text>
					)}
				</Pressable>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		backgroundColor: "#FFFFFF",
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
	deleteHeaderText: {
		fontSize: 16,
		color: "#FFFFFF",
		fontWeight: "400",
	},
	backButton: {
		padding: 5,
	},
	scrollContent: {
		padding: 20,
		paddingBottom: 40,
		flexGrow: 1,
	},
	formContainer: {
		marginBottom: 20,
	},
	inputWrapper: {
		marginBottom: 15,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	imagesGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		alignItems: "flex-start",
		marginTop: 10,
	},
	addPhotoBtn: {
		width: 100,
		height: 100,
		backgroundColor: "#F8D94F",
		borderRadius: 12,
		justifyContent: "center",
		alignItems: "center",
		marginRight: 12,
		marginBottom: 12,
		elevation: 2,
	},
	addPhotoText: {
		fontSize: 14,
		fontWeight: "bold",
		color: "#000",
		textAlign: "center",
	},
	imageWrapper: {
		position: "relative",
		marginRight: 12,
		marginBottom: 12,
	},
	thumbnail: {
		width: 100,
		height: 100,
		borderRadius: 12,
		backgroundColor: "#ccc",
	},
	deleteButton: {
		position: "absolute",
		bottom: 5,
		right: 5,
		backgroundColor: "#FFF",
		width: 28,
		height: 28,
		borderRadius: 14,
		justifyContent: "center",
		alignItems: "center",
		elevation: 3,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.2,
		shadowRadius: 1,
	},
	saveBtn: {
		backgroundColor: "#F8D94F",
		height: 55,
		borderRadius: 12,
		justifyContent: "center",
		alignItems: "center",
		elevation: 3,
		marginTop: 20,
	},
	saveBtnText: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#000",
	},
	checkboxContainer: {
		flexDirection: "row",
		justifyContent: "flex-end",
		alignItems: "center",
		marginBottom: 10,
	},
	checkboxLabel: {
		fontSize: 16,
		color: "#000000",
		marginRight: 8,
	},
	checkbox: {
		width: 24,
		height: 24,
		borderRadius: 6,
		borderWidth: 2,
		borderColor: "#000000",
		justifyContent: "center",
		alignItems: "center",
	},
	innerCheck: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: 24,
		height: 24,
		backgroundColor: "#6871EE",
		borderRadius: 6,
	},
});

export default EditTask;
