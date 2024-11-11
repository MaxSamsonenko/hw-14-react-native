import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
	View,
	Image,
	Text,
	TouchableOpacity,
	StyleSheet,
	KeyboardAvoidingView,
	TouchableWithoutFeedback,
	Keyboard,
	Platform,
} from "react-native";

import Input from "../components/Input";
import Button from "../components/Button";

const LoginScreen: React.FC = () => {
	const navigation = useNavigation();
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

	const onLogin = () => {
		console.log(` Email: ${email}, password: ${password}`);
		setEmail("");
		setPassword("");
	};

	const showBtn = (
		<TouchableOpacity
			onPress={() => setPasswordVisible(!passwordVisible)}
			style={styles.showBtn}
		>
			<Text style={styles.showBtnText}>
				{passwordVisible ? "Сховати" : "Показати"}
			</Text>
		</TouchableOpacity>
	);

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={styles.container}>
				<Image
					source={require("../assets/images/bg-image.jpg")}
					style={[StyleSheet.absoluteFillObject, styles.image]}
					resizeMode="cover"
				/>
				<KeyboardAvoidingView
					style={styles.formWrapper}
					behavior={Platform.OS === "ios" ? "padding" : undefined}
					keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
				>
					<View style={styles.formContainer}>
						<Text style={styles.title}>Увійти</Text>

						<View style={styles.inputsContainer}>
							<Input
								placeholder="Адреса електронної пошти"
								value={email}
								onChangeText={setEmail}
								textContentType="emailAddress"
								keyboardType="email-address"
							/>

							<Input
								placeholder="Пароль"
								outerStyles={styles.passwordContainer}
								showBtn={showBtn}
								value={password}
								onChangeText={setPassword}
								secureTextEntry={!passwordVisible}
							/>
						</View>

						<Button onPress={onLogin}>
							<Text style={styles.buttonText}>Увійти</Text>
						</Button>

						<TouchableOpacity
							onPress={() => navigation.navigate("Registration")}
						>
							<Text style={styles.linkText}>
								Немає аккаунту? Зареєструватися
							</Text>
						</TouchableOpacity>
					</View>
				</KeyboardAvoidingView>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#f0f0f0",
	},
	image: {
		height: "100%",
		width: "100%",
	},
	formWrapper: {
		flex: 1,
		justifyContent: "center",
	},
	formContainer: {
		position: "absolute",
		bottom: 0,
		width: "100%",
		height: "60%",
		alignItems: "center",
		backgroundColor: "#FFFFFF",
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		paddingLeft: 16,
		paddingRight: 16,
		overflow: "visible",
	},

	title: {
		fontFamily: "Roboto-Medium",
		fontSize: 30,
		marginTop: 32,
	},
	inputsContainer: {
		display: "flex",
		gap: 16,
		width: "100%",
		marginTop: 32,
		marginBottom: 43,
	},
	input: {
		width: "100%",
		height: 50,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: "#ccc",
		padding: 16,
		backgroundColor: "#E8E8E8",
		fontSize: 16,
	},
	passwordContainer: {
		position: "relative",
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 15,
	},
	showBtn: {
		position: "absolute",
		right: 16,
		top: 16,
	},
	showBtnText: {
		fontFamily: "Roboto-Regular",
		color: "#1B4371",
		fontSize: 16,
	},
	button: {
		backgroundColor: "#FF6C00",
		width: "100%",
		alignItems: "center",
		borderRadius: 100,
		paddingBottom: 16,
		paddingTop: 16,
	},
	buttonText: {
		color: "#fff",
		fontSize: 16,
	},
	linkText: {
		color: "#1B4371",
		marginTop: 16,
		fontSize: 16,
	},
});
