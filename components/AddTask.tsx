import React from "react";
import { check, request, RESULTS, PERMISSIONS } from "react-native-permissions";
import {
	Alert,
	Platform,
	Pressable,
	StyleSheet,
	Text,
	View,
	Image,
	FlatList,
	StatusBar,
	ActivityIndicator,
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
import { useCreateTaskMutation } from "./store/TaskApi";

const validationSchema = yup.object().shape({
	title: yup.string().required("Title is required").min(2, "Min 2 chars"),
	description: yup.string(),
	media: yup.array().of(yup.mixed<Asset>()).notRequired(),
});

type AddTaskProps = NativeStackScreenProps<RootStackParamList, "Add Task">;
type AddTaskSchemaType = yup.InferType<typeof validationSchema>;

const getGalleryPermission = () => {
	if (Platform.OS === "ios") return PERMISSIONS.IOS.PHOTO_LIBRARY;
	if (Platform.OS === "android") {
		return Platform.Version >= 33
			? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
			: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
	}
	return null;
};

const AddTask = ({ navigation }: AddTaskProps) => {
	const [create, { isLoading }] = useCreateTaskMutation();

	const {
		control,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm<AddTaskSchemaType>({
		resolver: yupResolver(validationSchema) as any,
		defaultValues: {
			title: "",
			description: "",
			media: [],
		},
	});

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

	const removeImage = (indexToRemove: number) => {
		const currentImages = watch("media") || [];
		const filtered = currentImages.filter(
			(_, index) => index !== indexToRemove,
		);
		setValue("media", filtered);
	};

	const onSubmit: SubmitHandler<AddTaskSchemaType> = async data => {
		try {
			const formData = new FormData();

			formData.append("title", data.title);
			formData.append("description", data.description || "");

			if (data.media && data.media.length > 0) {
				data.media.forEach(file => {
					const fileData = {
						uri: file?.uri,
						type: file?.type || "image/jpeg",
						name: file?.fileName || `image_${Date.now()}.jpg`,
					};
					formData.append("files", fileData as any);
				});
			}

			await create(formData as any).unwrap();

			navigation.navigate("Tasks");
		} catch (err: any) {
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
				Alert.alert("Error", err.data.error);
				return;
			}

			console.log(err);
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
					<Pressable
						style={styles.backButton}
						onPress={() => navigation.navigate("Tasks")}
					>
						<BackArrow width={24} height={24} color="#FFF" />
					</Pressable>
					<Text style={styles.headerTitle}>Add new task</Text>
					<View style={{ width: 24 }} />
				</View>
			</SafeAreaView>

			<View style={styles.contentContainer}>
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

				<View style={styles.mediaContainer}>
					<FlatList
						data={selectedImages as Asset[]}
						horizontal
						showsHorizontalScrollIndicator={false}
						keyExtractor={(item, index) =>
							(item.uri || "img") + index
						}
						ListHeaderComponent={<AddPhotoButton />}
						contentContainerStyle={styles.listContent}
						renderItem={({ item, index }) => (
							<View style={styles.imageWrapper}>
								<Image
									source={{ uri: item.uri }}
									style={styles.thumbnail}
								/>

								<Pressable
									style={styles.deleteButton}
									onPress={() => removeImage(index)}
								>
									<DeleteIcon />
								</Pressable>
							</View>
						)}
					/>
				</View>
				<View style={{ flex: 1 }} />

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
			</View>
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
	},
	headerTitle: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#FFFFFF",
	},
	backButton: {
		padding: 5,
	},
	contentContainer: {
		flex: 1,
		padding: 20,
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
	mediaContainer: {
		height: 120,
	},
	listContent: {
		alignItems: "center",
		paddingRight: 10,
	},
	addPhotoBtn: {
		width: 100,
		height: 100,
		backgroundColor: "#F8D94F",
		borderRadius: 12,
		justifyContent: "center",
		alignItems: "center",
		marginRight: 12,
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
	},
	saveBtnText: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#000",
	},
});

export default AddTask;
