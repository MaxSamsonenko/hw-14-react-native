import {
	StyleSheet,
	View,
	Text,
	TextInput,
	Image,
	ScrollView,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import SendBtnSvg from "../components/Svg/SendBtnSvg";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addCommentToFirestore } from "../utils/firestore";
import { addCommentToPost } from "../redux/reducers/postsSlice";
import { RootState } from "../redux/store/store";
import { TouchableOpacity } from "react-native-gesture-handler";

const CommentsScreen: React.FC = () => {
	const userCurrent = useSelector((state: RootState) => state.user.userInfo);
	const route = useRoute();
	const dispatch = useDispatch();
	const [commentText, setCommentText] = useState("");

	const { post } = route.params || {};
	console.log("in comments", post);
	const handleAddComment = async () => {
		if (!commentText.trim()) return;

		const newComment = {
			id: Date.now().toString(),
			userId: userCurrent.uid,
			comment: commentText.trim(),
			datePosted: new Date().toISOString(),
		};

		try {
			// Add comment to Firestore
			await addCommentToFirestore(post.id, newComment);

			// Dispatch comment to Redux
			dispatch(addCommentToPost({ postId: post.id, comment: newComment }));

			setCommentText(""); // Clear input
		} catch (error) {
			console.error("Error adding comment:", error);
		}
	};
	return (
		<View style={styles.container}>
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
						{post?.comments ? (
							post.comments.map((comment) => (
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
											source={require("../assets/images/avatar1.png")}
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
		</View>
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
	imageContainer: {},
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
	avatar: {},
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
	},
	textInput: {
		padding: 16,
	},
	button: {
		position: "absolute",
		top: 8,
		right: 8,
	},
});

export default CommentsScreen;
