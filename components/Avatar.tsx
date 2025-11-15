import { check, request, RESULTS, PERMISSIONS } from "react-native-permissions";
import {
	Alert,
	View,
	Image,
	TouchableOpacity,
	Platform,
	StyleSheet,
	Text,
} from "react-native";
import { launchImageLibrary, Asset } from "react-native-image-picker";

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

interface AvatarProps {
	value: Asset | null;
	onChange: (file: Asset | null) => void;
	error?: string;
}

const Avatar = ({ value, onChange, error }: AvatarProps) => {
	const handleDeletePress = () => {
		onChange(null);
	};

	const openGallery = async () => {
		const result = await launchImageLibrary({
			mediaType: "photo",
			quality: 1,
			selectionLimit: 1,
		});

		if (result.didCancel || result.errorCode) {
			return;
		}

		if (result.assets && result.assets.length > 0) {
			const selectedImage = result.assets[0];
			onChange(selectedImage);
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
					value ? { uri: value.uri } : require("./assets/NoPhoto.png")
				}
				style={[styles.avatarImage, !!error && styles.errorBorder]}
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

			{error && <Text style={styles.errorText}>{error}</Text>}
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
	errorBorder: {
		borderColor: "#FF5A5A",
	},
	errorText: {
		color: "#FF5A5A",
		fontSize: 12,
		position: "absolute",
		bottom: -20,
	},
});

export default Avatar;
