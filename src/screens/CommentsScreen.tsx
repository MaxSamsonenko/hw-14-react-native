import {
	StyleSheet,
	View,
	Text,
	TextInput,
	Image,
	ScrollView,
	TouchableWithoutFeedback,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import SendBtnSvg from "../components/Svg/SendBtnSvg";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addCommentToFirestore } from "../utils/firestore";
import { addCommentToPost } from "../redux/reducers/postsSlice";
import { RootState } from "../redux/store/store";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native-paper";

const CommentsScreen: React.FC = () => {
	const userCurrent = useSelector((state: RootState) => state.user.userInfo);
	const [loading, setLoading] = useState<boolean>(false);

	const route = useRoute();
	const dispatch = useDispatch();
	const [commentText, setCommentText] = useState("");

	const { post } = route.params || {};
	const postsCurrent = useSelector((state: RootState) =>
		state.posts.posts.find((p) => p.id === post.id)
	);

	const formatDate = (date: Date): string => {
		const day = date.getDate().toString().padStart(2, "0");
		const month = date.toLocaleString("en-US", { month: "long" });
		const year = date.getFullYear();
		const hours = date.getHours().toString().padStart(2, "0");
		const minutes = date.getMinutes().toString().padStart(2, "0");

		return `${day} ${month} ${year} | ${hours}:${minutes}`;
	};

	const handleAddComment = async () => {
		if (!userCurrent) {
			console.error("User not logged in");
			return;
		}
		if (!commentText.trim()) return;
		setLoading(true);
		const newComment = {
			id: Date.now().toString(),
			userId: userCurrent.uid,
			comment: commentText.trim(),
			datePosted: formatDate(new Date()),
			own: true,
		};

		try {
			await addCommentToFirestore(post.id, newComment);
			dispatch(addCommentToPost({ postId: post.id, comment: newComment }));
			setCommentText("");
		} catch (error) {
			console.error("Error adding comment:", error);
		} finally {
			setLoading(false);
		}
	};
	return (
		<>
			{loading && (
				<View style={styles.loaderOverlay}>
					<ActivityIndicator size="large" color="#FF6C00" />
				</View>
			)}
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={styles.container}>
					<KeyboardAvoidingView
						style={styles.formWrapper}
						behavior={Platform.OS === "ios" ? "padding" : undefined}
						keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
					>
						<View style={styles.imageContainer}>
							<Image
								source={{ uri: post["photo"] }}
								style={styles.image}
								resizeMode="cover"
							/>
						</View>
						<View style={styles.commentsContainer}>
							<ScrollView>
								<View style={styles.commentContainer}>
									{postsCurrent?.comments.length !== 0 ? (
										postsCurrent?.comments.map((comment) => (
											<View
												key={comment.id}
												style={[
													styles.commentContainer,
													comment.own ? styles.rowReverse : styles.row,
												]}
											>
												<View style={styles.avatarContainer}>
													<Image
														style={styles.avatar}
														source={{
															uri: userCurrent?.avatar
																? userCurrent.avatar
																: "https://example.com/no-avatar.png",
														}}
														resizeMode="cover"
													/>
												</View>
												<View
													style={[
														styles.textContainer,
														comment.own ? styles.myComment : styles.comment,
													]}
												>
													<Text style={styles.text}>{comment.comment}</Text>
													<Text style={styles.date}>{comment.datePosted}</Text>
												</View>
											</View>
										))
									) : (
										<Text>No Comments Yet</Text>
									)}
								</View>
							</ScrollView>
						</View>
						<View style={styles.input}>
							<TextInput
								style={[styles.textInput]}
								placeholder="Коментувати..."
								placeholderTextColor="#BDBDBD"
								value={commentText}
								onChangeText={setCommentText}
							/>
							<View style={styles.button}>
								<TouchableOpacity onPress={handleAddComment}>
									<SendBtnSvg />
								</TouchableOpacity>
							</View>
						</View>
					</KeyboardAvoidingView>
				</View>
			</TouchableWithoutFeedback>
		</>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 32,
		paddingLeft: 16,
		paddingRight: 16,
		backgroundColor: "#FFFFFF",
		gap: 32,
	},
	formWrapper: {
		flex: 1,
		justifyContent: "center",
	},
	imageContainer: {
		marginBottom: 32,
	},
	image: {
		width: "100%",
		height: 240,
		borderRadius: 8,
	},
	commentsContainer: { flex: 1 },
	commentContainer: {
		gap: 16,
	},
	row: {
		flexDirection: "row",
	},
	rowReverse: {
		flexDirection: "row-reverse",
	},
	avatarContainer: {
		width: 28,
		height: 28,
	},
	avatar: {
		width: "100%",
		height: "100%",
		borderRadius: 50,
	},
	textContainer: {
		flex: 1,
		padding: 16,
		backgroundColor: "rgba(0,0,0,0.03)",
	},
	comment: {
		borderTopRightRadius: 6,
		borderBottomRightRadius: 6,
		borderBottomLeftRadius: 6,
	},
	myComment: {
		borderTopLeftRadius: 6,
		borderBottomRightRadius: 6,
		borderBottomLeftRadius: 6,
	},
	text: {
		fontSize: 13,
	},
	date: {
		fontSize: 10,
		marginLeft: "auto",
		color: "#BDBDBD",
	},
	input: {
		position: "relative",
		width: "100%",
		height: 50,
		borderRadius: 100,
		borderWidth: 1,
		borderColor: "#ccc",
		paddingLeft: 16,
		paddingRight: 16,
		backgroundColor: "#E8E8E8",
		fontSize: 16,
		fontWeight: 500,
		marginBottom: 16,
		marginTop: 16,
	},
	textInput: {
		padding: 16,
	},
	button: {
		position: "absolute",
		top: 8,
		right: 8,
	},
	loaderOverlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		justifyContent: "center",
		alignItems: "center",
		zIndex: 10,
	},
});

export default CommentsScreen;
