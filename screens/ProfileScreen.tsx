import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import RemoveBtnSvg from "../components/Svg/RemoveBtnSvg";
import LogoutSvg from "../components/Svg/LogoutSvg";

const ProfileScreen: React.FC = () => {
	return (
		<View style={styles.container}>
			<Image
				source={require("../assets/images/bg-image.jpg")}
				style={[StyleSheet.absoluteFillObject, styles.image]}
				resizeMode="cover"
			/>
			<View style={styles.formContainer}>
				<View style={styles.avatar}>
					<TouchableOpacity
						style={styles.avatarBtn}
						onPress={() => console.log("Photo added")}
					>
						<RemoveBtnSvg />
					</TouchableOpacity>
				</View>
				<View style={styles.logoutBtn}>
					<LogoutSvg />
				</View>

				<Text style={styles.title}>User name</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f0f0f0",
	},
	image: {
		height: "100%",
		width: "100%",
	},
	formContainer: {
		position: "absolute",
		bottom: 0,
		width: "100%",
		height: "84%",
		alignItems: "center",
		backgroundColor: "#FFFFFF",
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		paddingLeft: 16,
		paddingRight: 16,
		overflow: "visible",
	},
	avatar: {
		position: "absolute",
		top: -60,
		width: 120,
		height: 120,
		backgroundColor: "#F6F6F6",
		borderRadius: 16,
	},
	avatarBtn: {
		position: "absolute",
		bottom: 14,
		right: -12,
	},
	title: {
		fontFamily: "Roboto-Medium",
		fontSize: 30,
		marginTop: 92,
	},
	logoutBtn: {
		marginTop: 22,
		marginLeft: "auto",
	},
});

export default ProfileScreen;
