import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";
import MessageSvg from "./Svg/MessageSvg";
import MapPinSvg from "./Svg/MapPinSvg";

const PostCard: React.FC = ({ post }) => {
	const navigation = useNavigation();

	return (
		<View style={styles.container}>
			<View style={styles.imgWrapper}>
				<Image
					source={{ uri: post.photo }}
					style={[StyleSheet.absoluteFillObject, styles.image]}
					resizeMode="cover"
				/>
			</View>
			<Text>{post.name}</Text>
			<View style={styles.commsMapWrapper}>
				<View style={styles.commsWrapper}>
					<TouchableOpacity
						onPress={() => navigation.navigate("Comments", { post: post })}
					>
						<MessageSvg />
					</TouchableOpacity>

					<Text>{post?.commentsCount}</Text>
				</View>
				<View style={styles.mapWrapper}>
					<TouchableOpacity
						onPress={() =>
							navigation.navigate("Map", {
								post: post,
							})
						}
					>
						<MapPinSvg />
					</TouchableOpacity>
					<Text>{post.address}</Text>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		display: "flex",
		gap: 8,
		marginBottom: 32,
	},
	imgWrapper: {
		height: 240,
	},
	image: {
		width: "100%",
		height: "100%",
		borderRadius: 8,
	},
	commsMapWrapper: {
		display: "flex",
		flexDirection: "row",
	},
	commsWrapper: {
		display: "flex",
		flexDirection: "row",
		gap: 6,
	},
	mapWrapper: {
		display: "flex",
		flexDirection: "row",
		gap: 4,
		marginLeft: "auto",
	},
});

export default PostCard;
