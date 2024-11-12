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

const CommentsScreen: React.FC = () => {
	const route = useRoute();

	const { post } = route.params || {};
	console.log("in comments", post);
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
				/>
				<View style={styles.button}>
					<SendBtnSvg />
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
