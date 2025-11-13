import { useState } from "react";
import { check, request, RESULTS, PERMISSIONS } from "react-native-permissions";
import {
	Alert,
	View,
	Image,
	TouchableOpacity,
	Platform,
	StyleSheet,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";

const getGalleryPermission = () => {
	if (Platform.OS === "ios") {
		return PERMISSIONS.IOS.PHOTO_LIBRARY;
	}
	if (Platform.OS === "android") {
		if (Platform.Version >= 33) {
			return PERMISSIONS.ANDROID.READ_MEDIA_IMAGES;
		}

		return PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
	}

	return null;
};

const Avatar = () => {
	const [avatar, setAvatar] = useState<string | null>(null);

	const handleDeletePress = () => {
		setAvatar(null);
	};

	const openGallery = async () => {
		const result = await launchImageLibrary({
			mediaType: "photo",
			quality: 1,
			selectionLimit: 1,
		});

		if (result.didCancel) {
			return;
		}

		if (result.errorCode) {
			Alert.alert(result.errorMessage!);
			return;
		}

		if (result.assets && result.assets.length > 0) {
			const selectedImage = result.assets[0];

			setAvatar(selectedImage.uri!);
		}
	};

	const handleEditPress = async () => {
		const permission = getGalleryPermission();
		if (!permission) return;

		const status = await check(permission);

		if (status === RESULTS.GRANTED) {
			openGallery();
		} else if (status === RESULTS.DENIED) {
			const newStatus = await request(permission);
			if (newStatus === RESULTS.GRANTED) {
				openGallery();
			}
		} else if (status === RESULTS.BLOCKED) {
			Alert.alert(
				"Access Denied",
				"Access to the file system is denied. Enable it in Settings and restart the app",
			);
		}
	};

	return (
		<View style={styles.container}>
			<Image
				source={
					avatar ? { uri: avatar } : require("./assets/NoPhoto.png")
				}
				style={styles.avatarImage}
			/>
			<TouchableOpacity
				style={[styles.iconButton, styles.deleteButton]}
				onPress={handleDeletePress}
			>
				<Image
					source={require("./assets/DeleteIcon.png")}
					style={styles.icon}
				/>
			</TouchableOpacity>
			<TouchableOpacity
				style={[styles.iconButton, styles.editButton]}
				onPress={handleEditPress}
			>
				<Image
					source={require("./assets/EditIcon.png")}
					style={styles.icon}
				/>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: 140,
		height: 120,
		position: "relative",
		alignSelf: "center",
		marginVertical: 30,
	},
	avatarImage: {
		width: 120,
		height: 120,
		borderRadius: 60,
		backgroundColor: "#F0F0F0",
	},

	iconButton: {
		position: "absolute",
		width: 36,
		height: 36,
		borderRadius: 18,
		justifyContent: "center",
		alignItems: "center",
		elevation: 5,
	},
	deleteButton: {
		bottom: 0,
		left: 0,
	},
	editButton: {
		bottom: 0,
		right: 20,
	},
	icon: {
		width: 36,
		height: 36,
	},
});

export default Avatar;
