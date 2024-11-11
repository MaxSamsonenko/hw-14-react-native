import { View, Text, StyleSheet } from "react-native";
import PlusSvg from "./Svg/PlusSvg";

const CreatePostTab: React.FC = () => {
	return (
		<View style={styles.button}>
			<PlusSvg />
		</View>
	);
};

const styles = StyleSheet.create({
	button: {
		justifyContent: "center",
		backgroundColor: "#FF6C00",
		height: 40,
		alignItems: "center",
		borderRadius: 100,
		paddingBottom: 8,
		paddingTop: 8,
		paddingLeft: 23,
		paddingRight: 23,
	},
	text: {
		color: "#FFFFFF",
	},
});

export default CreatePostTab;
