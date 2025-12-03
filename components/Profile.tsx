import Avatar from "./Avatar";
import {
	StyleSheet,
	View,
	ScrollView,
	TextInput,
	Text,
	Alert,
} from "react-native";
import AppButton from "./AppButton";
import { useGetProfileQuery } from "./store/ProfileApi";
import { TokenService } from "./services/TokenService";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./types/NavigationTypes";

type ProfileProps = NativeStackScreenProps<RootStackParamList, "Profile">;

const Profile = ({ navigation }: ProfileProps) => {
	const errors = "";
	const { data: profile, isLoading } = useGetProfileQuery();

	return (
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
				value={profile?.avatar ? { uri: profile?.avatar } : null}
				onChange={() => null}
				error={errors as string}
			/>
			<View style={styles.inputContainer}>
				<Text style={styles.text}>Email</Text>
				<View style={styles.inputWrapper}>
					<TextInput
						value={profile?.email}
						style={styles.input}
						placeholderTextColor="#999"
					/>
				</View>
				<Text style={styles.text}>Name</Text>
				<View style={styles.inputWrapper}>
					<TextInput
						value={profile?.name}
						style={styles.input}
						placeholderTextColor="#999"
					/>
				</View>
				<View style={{ marginTop: 85, gap: 15 }}>
					<AppButton
						title={"Update"}
						disabled={true}
						onPress={() => null}
					/>
					<AppButton
						title={"Logout"}
						disabled={false}
						onPress={() => {
							TokenService.deleteToken();

							navigation.navigate("Sign In");
						}}
					/>
				</View>
			</View>
		</ScrollView>
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
