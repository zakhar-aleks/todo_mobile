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
	useGetProfileQuery,
	useUpdateProfileMutation,
} from "./store/ProfileApi";
import { TokenService } from "./services/TokenService";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types/NavigationTypes";
import { useEffect, useState } from "react";
import Navigation from "./Navigation";

type ProfileProps = NativeStackScreenProps<RootStackParamList, "Profile">;
interface UserAvatarInterface {
	uri: string | null;
	type: string | null;
	fileName: string | null;
}
const Profile = ({ navigation }: ProfileProps) => {
	const { data: profile, isLoading, error } = useGetProfileQuery();
	const [updateProfile, { isLoading: isUpdate }] = useUpdateProfileMutation();
	const [userName, setUserName] = useState("");
	const [userAvatar, setUserAvatar] = useState<UserAvatarInterface>({
		uri: null,
		type: null,
		fileName: null,
	});

	useEffect(() => {
		if (profile) {
			setUserName(profile?.name);
			setUserAvatar({
				uri: profile?.avatar || null,
				type: null,
				fileName: null,
			});
		}
	}, [profile]);
	const handleErr = (err: any) => {
		if (err?.status === 401) {
			TokenService.deleteToken();

			navigation.navigate("Sign In");
		} else if (err?.status == 500) {
			Alert.alert(err.status);
		}
	};
	useEffect(() => {
		handleErr(error);
	}, [error]);
	const handleUpdate = async () => {
		try {
			const formData = new FormData();
			formData.append("name", userName);
			//if (userAvatar.uri && userAvatar.uri !== profile?.avatar) {
			formData.append("avatar", {
				uri: userAvatar.uri,
				type: userAvatar.type || "image/jpeg",
				fileName: userAvatar.fileName || "Avatar.jpg",
			} as any);
			//}
			//Alert.alert(JSON.stringify(formData));
			await updateProfile(formData).unwrap();

			Alert.alert("Success", "Profile updated!");
		} catch (error) {
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
				<Avatar
					value={userAvatar.uri ? { uri: userAvatar.uri } : null}
					onChange={file => {
						if (file) {
							setUserAvatar({
								uri: file.uri || null,
								type: file.type || null,
								fileName: file.fileName || null,
							});
						}
					}}
					error={undefined}
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
					<View style={styles.inputWrapper}>
						<TextInput
							value={userName}
							style={styles.input}
							onChangeText={setUserName}
							placeholderTextColor="#999"
						/>
					</View>
					<View style={{ marginTop: 85, gap: 15 }}>
						<AppButton
							title={"Update"}
							disabled={isUpdate}
							onPress={handleUpdate}
						/>
						<AppButton
							title={"Logout"}
							disabled={false}
							onPress={() => {
								Alert.alert("Logout", "Are you sure?", [
									{
										text: "Cancel",
										onPress: () => {
											null;
										},
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
	buttonContainer: {
		gap: 11,
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
