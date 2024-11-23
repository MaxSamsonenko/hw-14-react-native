import { useEffect, useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	Image,
	SafeAreaView,
	ScrollView,
} from "react-native";

import { ActivityIndicator, MD2Colors } from "react-native-paper";

import PostCard from "../components/PostCard";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store/store";

const PostsScreen: React.FC = () => {
	const userCurrent = useSelector((state: RootState) => state.user.userInfo);
	const postsCurrent = useSelector((state: RootState) => state.posts.posts);
	console.log("in posts:", postsCurrent);
	console.log("in posts screen:", userCurrent);

	const isLoading = !userCurrent?.avatar || postsCurrent === null;

	return (
		<>
			{isLoading && (
				<View style={styles.loaderOverlay}>
					<ActivityIndicator size="large" color="#FF6C00" />
				</View>
			)}
			<View style={styles.mainContainer}>
				<View style={styles.avatarNameWrapper}>
					<View style={styles.avatar}>
						{userCurrent && (
							<Image
								resizeMode="cover"
								source={{ uri: userCurrent.avatar }}
								style={[StyleSheet.absoluteFillObject, styles.userAvatar]}
							/>
						)}
					</View>
					<View>
						<Text style={styles.nameText}>{userCurrent?.displayName}</Text>
						<Text style={styles.emailText}>{userCurrent?.email}</Text>
					</View>
				</View>
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
			</View>
		</>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		paddingLeft: 16,
		paddingRight: 16,
		flex: 1,
		backgroundColor: "#FFFFFF",
	},
	avatarNameWrapper: {
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		marginTop: 32,
		marginBottom: 32,
	},
	avatar: {
		height: 60,
		width: 60,
	},
	userAvatar: {
		height: "100%",
		width: "100%",
		borderRadius: 16,
	},
	nameText: {
		fontSize: 13,
		fontWeight: "700",
	},
	emailText: {
		fontSize: 11,
		color: "#212121",
	},
	container: {
		flex: 1,
	},
	loaderOverlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		justifyContent: "center",
		alignItems: "center",
		zIndex: 10,
	},
});

export default PostsScreen;
