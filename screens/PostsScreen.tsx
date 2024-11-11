import { useEffect, useState } from "react";
import {
	StyleSheet,
	View,
	Text,
	Image,
	SafeAreaView,
	ScrollView,
} from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";

// import { comments, Post } from "./comments";
import PostCard from "../components/PostCard";

// type RootStackParamList = {
// 	Posts: {
// 		username: string;
// 		email: string;
// 	};
// };

const PostsScreen: React.FC = () => {
	const route = useRoute<RouteProp<RootStackParamList, "Posts">>();
	console.log(route);
	const { from, data } = route.params || {};
	console.log("from: ", from, "data: ", data);
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		if (from === "CreatePosts" && data) {
			setPosts((prevPosts) => [...prevPosts, data]);
		}
	}, [from, data]);

	console.log(posts);
	return (
		<View style={styles.mainContainer}>
			<View style={styles.avatarNameWrapper}>
				<View style={styles.avatar}>
					<Image
						resizeMode="cover"
						source={require("../assets/images/user-icon.png")}
						style={[StyleSheet.absoluteFillObject, styles.userAvatar]}
					/>
				</View>
				<View>
					<Text style={styles.nameText}>{data?.username}</Text>
					<Text style={styles.emailText}>{data?.email}</Text>
				</View>
			</View>
			<SafeAreaView style={styles.container}>
				<ScrollView>
					{posts.length === 0 ? (
						<Text> There are no posts to view</Text>
					) : (
						posts.map((post) => <PostCard post={post} key={post.id} />)
					)}
				</ScrollView>
			</SafeAreaView>
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
});

export default PostsScreen;
