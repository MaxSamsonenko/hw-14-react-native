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
	Alert,
} from "react-native";

import * as ImagePicker from "expo-image-picker";

import { registerDB } from "../utils/auth";

import Input from "../components/Input";
import Button from "../components/Button";
import AddBtnSvg from "../components/Svg/AddBtnSvg";
import { useDispatch } from "react-redux";

type RootStackParamList = {
	Login: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<
	RootStackParamList,
	"Login"
>;

const RegistrationScreen: React.FC = () => {
	const navigation = useNavigation<LoginScreenNavigationProp>();
	const [displayName, setDisplayName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
	const [avatar, setAvatar] = useState<string | null>(null);
	const dispatch = useDispatch();

	const onRegister = async () => {
		if (email === "" && password === "") {
			Alert.alert("Please fill in the form");
			return;
		}
		try {
			await registerDB({ email, password, displayName, avatar }, dispatch);
		} catch (error) {
			Alert.alert("REGISTRATION FAILED");
			console.log(error);
			return;
		}

		setDisplayName("");
		setEmail("");
		setPassword("");
		setAvatar(null);
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

	const pickImage = async () => {
		try {
			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.Images, // Ensure this is correct for your version of expo-image-picker
				allowsEditing: true,
				aspect: [4, 3],
				quality: 1,
			});

			console.log(result);

			if (!result.canceled) {
				setAvatar(result.assets[0].uri);
			}
		} catch (error) {
			console.error("Error picking image:", error); // Handle the error here
		}
	};

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
							{avatar && (
								<Image source={{ uri: avatar }} style={styles.avatarImage} />
							)}
							<TouchableOpacity style={styles.avatarBtn} onPress={pickImage}>
								<AddBtnSvg />
							</TouchableOpacity>
						</View>

						<Text style={styles.title}>Реєстрація</Text>

						<View style={styles.inputsContainer}>
							<Input
								placeholder="Логін"
								value={displayName}
								onChangeText={setDisplayName}
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
	avatarImage: {
		height: "100%",
		width: "100%",
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
