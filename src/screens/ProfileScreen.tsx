import React from "react";
import {
	StyleSheet,
	View,
	Text,
	Image,
	TouchableOpacity,
	SafeAreaView,
	ScrollView,
} from "react-native";
import RemoveBtnSvg from "../components/Svg/RemoveBtnSvg";
import LogoutSvg from "../components/Svg/LogoutSvg";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import PostCard from "../components/PostCard";

const ProfileScreen: React.FC = () => {
	const userCurrent = useSelector((state: RootState) => state.user.userInfo);
	const postsCurrent = useSelector((state: RootState) => state.posts.posts);
	const isLoading = !userCurrent?.avatar || postsCurrent === null;
	return (
		<View style={styles.container}>
			<Image
				source={require("../assets/images/bg-image.jpg")}
				style={[StyleSheet.absoluteFillObject, styles.image]}
				resizeMode="cover"
			/>
			<View style={styles.formContainer}>
				<View style={styles.avatar}>
					<Image
						source={{ uri: userCurrent?.avatar }}
						style={styles.avatarImage}
					/>
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

				<Text style={styles.title}>{userCurrent?.displayName}</Text>
				<>
					{isLoading && (
						<View style={styles.loaderOverlay}>
							<ActivityIndicator size="large" color="#FF6C00" />
						</View>
					)}
					{/* <View style={styles.mainContainer}> */}
					<SafeAreaView style={styles.container}>
						{postsCurrent ? (
							<ScrollView>
								{postsCurrent.length === 0 ? (
									<Text> There are no posts to view</Text>
								) : (
									postsCurrent.map((post) => (
										<PostCard post={post} key={post.id} />
									))
								)}
							</ScrollView>
						) : (
							<ActivityIndicator animating={true} color={MD2Colors.red800} />
						)}
					</SafeAreaView>
					{/* </View> */}
				</>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		paddingLeft: 16,
		paddingRight: 16,
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	container: {
		flex: 1,
		width: "100%",
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
	avatarImage: {
		width: "100%",
		height: "100%",
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
	loaderOverlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		justifyContent: "center",
		alignItems: "center",
		zIndex: 10,
	},
});

export default ProfileScreen;
