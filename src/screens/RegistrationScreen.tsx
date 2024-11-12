import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
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
import AddBtnSvg from "../components/Svg/AddBtnSvg";

// type RootStackParamList = {
// 	Home: {
// 		screen: "HomeTabs";
// 		params: {
// 			screen: "Posts" | "CreatePosts" | "Profile";
// 			params: {
// 				username: string;
// 				email: string;
// 			};
// 		};
// 	};
// 	Login: undefined;
// };
// type NavigationProps = StackNavigationProp<RootStackParamList>;

const RegistrationScreen: React.FC = () => {
	const navigation = useNavigation();
	const [username, setUsername] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

	const onRegister = () => {
		navigation.navigate("Home", {
			screen: "HomeTabs",
			params: {
				screen: "Posts",
				params: { from: "Register", data: { username, email } },
			},
		});

		setUsername("");
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
						<View style={styles.avatar}>
							<TouchableOpacity
								style={styles.avatarBtn}
								onPress={() => console.log("Photo added")}
							>
								<AddBtnSvg />
							</TouchableOpacity>
						</View>

						<Text style={styles.title}>Реєстрація</Text>

						<View style={styles.inputsContainer}>
							<Input
								placeholder="Логін"
								value={username}
								onChangeText={setUsername}
								textContentType="username"
								importantForAutofill="no"
							/>
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

						<Button onPress={onRegister}>
							<Text style={styles.buttonText}>Зареєструватися</Text>
						</Button>

						<TouchableOpacity onPress={() => navigation.navigate("Login")}>
							<Text style={styles.linkText}>Вже є акаунт? Увійти</Text>
						</TouchableOpacity>
					</View>
				</KeyboardAvoidingView>
			</View>
		</TouchableWithoutFeedback>
	);
};

export default RegistrationScreen;

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
		height: "68%",
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
	avatarBtnText: {
		justifyContent: "center",
		alignItems: "center",
		alignContent: "center",
		color: "#FF6C00",
		fontSize: 24,
	},
	title: {
		fontFamily: "Roboto-Medium",
		fontSize: 30,
		marginTop: 92,
	},
	inputsContainer: {
		display: "flex",
		gap: 16,
		width: "100%",
		marginTop: 32,
		marginBottom: 43,
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
