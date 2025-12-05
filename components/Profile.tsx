import Avatar from "./Avatar";
import {
	StyleSheet,
	View,
	ScrollView,
	TextInput,
	Text,
	Alert,
	ActivityIndicator,
} from "react-native";
import AppButton from "./AppButton";
import {
	useDeleteProfileAvatarMutation,
	useGetProfileQuery,
	useUpdateProfileMutation,
} from "./store/ProfileApi";
import { TokenService } from "./services/TokenService";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types/NavigationTypes";
import Navigation from "./Navigation";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useEffect } from "react";

type ProfileProps = NativeStackScreenProps<RootStackParamList, "Profile">;

interface AssetFile {
	uri: string;
	type: string;
	fileName?: string;
}

const validationSchema = yup.object().shape({
	name: yup.string().required("Name is required").min(2, "Min 2 chars"),
	avatar: yup
		.mixed()
		.nullable()
		.test("fileType", "Unsupported file format", value => {
			if (!value) return true;
			return ["image/jpeg", "image/png", "image/jpg"].includes(
				(value as AssetFile).type,
			);
		}),
});

type ProfileSchemaType = yup.InferType<typeof validationSchema>;

const Profile = ({ navigation }: ProfileProps) => {
	const { data: profile, isLoading, error } = useGetProfileQuery();
	const [updateProfile, { isLoading: isUpdate }] = useUpdateProfileMutation();
	const [deleteAvatar] = useDeleteProfileAvatarMutation();

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<ProfileSchemaType>({
		resolver: yupResolver(validationSchema) as any,
		defaultValues: {
			name: "",
			avatar: null,
		},
	});

	useEffect(() => {
		if (profile) {
			reset({
				name: profile.name || "",
				avatar: null,
			});
		}
	}, [profile, reset]);

	const onSubmit: SubmitHandler<ProfileSchemaType> = async data => {
		try {
			const formData = new FormData();
			formData.append("name", data.name);

			if (data.avatar) {
				const file = data.avatar as AssetFile;
				const fileToUpload = {
					uri: file.uri,
					type: file.type || "image/jpeg",
					name: file.fileName || "avatar.jpg",
				};

				console.log("Uploading new avatar:", fileToUpload);
				formData.append("avatar", fileToUpload as any);
			}

			await updateProfile(formData as any).unwrap();

			Alert.alert("Success", "Profile updated!");
		} catch (error) {
			console.error(error);
			Alert.alert("Error", "Failed to update profile");
		}
	};

	if (isLoading === true || !profile) {
		return (
			<ActivityIndicator
				size="large"
				color="#6871ee"
				style={{ flex: 1 }}
			/>
		);
	}

	return (
		<>
			<ScrollView
				style={{ flex: 1, backgroundColor: "#f0f0f0" }}
				contentContainerStyle={styles.container}
				keyboardShouldPersistTaps="handled"
			>
				<View style={styles.header}>
					<Text
						style={{
							color: "white",
							fontSize: 24,
							fontFamily: "Inter",
							fontWeight: 700,
						}}
					>
						Profile
					</Text>
				</View>

				<Controller
					control={control}
					name="avatar"
					render={({ field: { onChange, value } }) => {
						const imageToShow = value
							? value
							: profile?.avatar
							? { uri: profile.avatar }
							: null;

						console.log("Profile Avatar URL:", profile?.avatar);
						console.log(
							"Image source passed to component:",
							imageToShow,
						);

						return (
							<Avatar
								value={imageToShow as any}
								onChange={onChange}
								error={errors.avatar?.message as string}
								onDelete={() => deleteAvatar()}
							/>
						);
					}}
				/>

				<View style={styles.inputContainer}>
					<Text style={styles.text}>Email</Text>
					<View style={styles.inputWrapper}>
						<TextInput
							value={profile?.email}
							editable={false}
							style={styles.input}
							placeholderTextColor="#999"
						/>
					</View>

					<Text style={styles.text}>Name</Text>

					<Controller
						control={control}
						name="name"
						render={({ field: { onChange, onBlur, value } }) => (
							<View
								style={[
									styles.inputWrapper,
									errors.name && { borderColor: "red" },
								]}
							>
								<TextInput
									value={value}
									style={styles.input}
									onChangeText={onChange}
									onBlur={onBlur}
									placeholderTextColor="#999"
								/>
							</View>
						)}
					/>
					{errors.name && (
						<Text
							style={{
								color: "red",
								fontSize: 12,
								marginLeft: 5,
							}}
						>
							{errors.name.message}
						</Text>
					)}

					<View style={{ marginTop: 85, gap: 15 }}>
						<AppButton
							title={"Update"}
							disabled={isUpdate}
							onPress={handleSubmit(onSubmit)}
						/>
						<AppButton
							title={"Logout"}
							disabled={false}
							onPress={() => {
								Alert.alert("Logout", "Are you sure?", [
									{
										text: "Cancel",
										onPress: () => null,
									},
									{
										text: "Sure",
										onPress: () => {
											TokenService.deleteToken();
											navigation.navigate("Sign In");
										},
									},
								]);
							}}
						/>
					</View>
				</View>
			</ScrollView>
			<Navigation />
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#f0f0f0",
	},
	inputContainer: {
		flexDirection: "column",
	},
	input: {
		flex: 1,
		color: "#000000",
		height: "100%",
	},
	inputWrapper: {
		flexDirection: "row",
		alignItems: "center",
		height: 48,
		width: 301,
		backgroundColor: "transparent",
		borderWidth: 1,
		borderRadius: 15,
		borderColor: "#616161",
		marginTop: 6,
		paddingHorizontal: 13,
	},
	text: {
		color: "#616161",
		fontSize: 14,
		fontWeight: 400,
		fontFamily: "Inter",
	},
	header: {
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		minHeight: 100,
		borderBottomLeftRadius: 17,
		borderBottomRightRadius: 17,
		backgroundColor: "#6871ee",
	},
});

export default Profile;
