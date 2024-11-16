import { useEffect, useRef, useState } from "react";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useNavigation } from "@react-navigation/native";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../redux/reducers/postsSlice";
import { addPostToFirestore } from "../utils/firestore";

import Button from "../components/Button";

import CameraSvg from "../components/Svg/CameraSvg";
import MapPinSvg from "../components/Svg/MapPinSvg";
import TrashSvg from "../components/Svg/TrashSvg";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootState } from "../redux/store/store";

type RootStackParamList = {
	Posts: {
		from: string;
		data: {
			id: string;
			photo: string;
			name: string;
			address: string;
			latitude: number;
			longitude: number;
		};
	};
	CreatePosts: undefined;
};

type NavigationProps = StackNavigationProp<RootStackParamList, "Posts">;

const CreatePostScreen: React.FC = () => {
	const userCurrent = useSelector((state: RootState) => state.user.userInfo);
	const dispatch = useDispatch();
	const navigation = useNavigation<NavigationProps>();
	const [facing, setFacing] = useState<CameraType>("back");
	const [permission, requestPermission] = useCameraPermissions();
	const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);

	const [location, setLocation] = useState<Location.LocationObject | null>(
		null
	);
	const [errorMsg, setErrorMsg] = useState<string | null>(null);
	const [photoName, setPhotoName] = useState("");
	const [address, setAddress] = useState("");

	const cameraRef = useRef<CameraView>();

	useEffect(() => {
		(async () => {
			let data = await Location.requestForegroundPermissionsAsync();
			if (data.status !== "granted") {
				setErrorMsg("Permission to access location was denied");
				return;
			}

			let location = await Location.getCurrentPositionAsync({});
			setLocation(location);
		})();
	}, []);

	if (!permission) {
		return <View />;
	}

	if (!permission.granted) {
		return (
			<View>
				<Text>We need your permission to show the camera</Text>
				<Button onPress={requestPermission}>
					<Text>Get Permission</Text>
				</Button>
			</View>
		);
	}

	const takePicture = async () => {
		if (cameraRef.current) {
			try {
				const options = { quality: 0.5, base64: true, skipProcessing: true };
				const photo = await cameraRef.current.takePictureAsync(options);
				if (photo?.uri) {
					setCapturedPhoto(photo.uri);
				} else {
					console.log("No photo captured");
				}
			} catch (error) {
				console.log("Error taking picture:", error);
			}
		}
	};

	const retakePicture = () => {
		setCapturedPhoto(null);
		setPhotoName("");
		setAddress("");
	};

	console.log("the location in create posts: ", location);

	const publishPicture = async () => {
		if (capturedPhoto && photoName && address && location) {
			try {
				const { latitude, longitude } = location.coords;

				const newPost = {
					photo: capturedPhoto,
					name: photoName,
					address: address,
					latitude,
					longitude,
					userId: userCurrent.uid,
				};

				const postId = await addPostToFirestore(newPost);

				dispatch(
					addPost({
						id: postId,
						...newPost,
					})
				);
				navigation.navigate("Posts", {
					from: "CreatePosts",
					data: { id: postId, ...newPost },
				});
				console.log("Post uploaded successfully with ID:", postId);
			} catch (error) {
				console.error("Error publishing post:", error);
			}
		}
	};

	return (
		<View style={styles.container}>
			<View>
				{capturedPhoto ? (
					<View style={styles.previewContainer}>
						<Image source={{ uri: capturedPhoto }} style={styles.preview} />
					</View>
				) : (
					<CameraView
						style={styles.camera}
						facing={facing}
						mirror={false}
						ref={cameraRef}
					>
						<TouchableOpacity style={styles.camContainer} onPress={takePicture}>
							<CameraSvg fill="#FFFFFF" />
						</TouchableOpacity>
					</CameraView>
				)}
				{capturedPhoto ? (
					<Text style={styles.subText}>Редагувати фото</Text>
				) : (
					<Text style={styles.subText}>Завантажте фото</Text>
				)}
			</View>
			<View style={styles.inputContainer}>
				<View style={styles.input}>
					<TextInput
						value={photoName}
						onChangeText={setPhotoName}
						style={styles.textInput}
						placeholder="Назва..."
						placeholderTextColor="#BDBDBD"
					/>
				</View>
				<View style={[styles.input, styles.locationInput]}>
					<MapPinSvg />

					<TextInput
						value={address}
						onChangeText={setAddress}
						style={styles.textInput}
						placeholder="Місцевість..."
						placeholderTextColor="#BDBDBD"
					/>
				</View>
			</View>
			<Button
				onPress={publishPicture}
				disabled={!capturedPhoto || !photoName || !address}
			>
				<Text
					style={[
						styles.btnText,
						capturedPhoto && photoName && address
							? styles.btnTextEnabled
							: null,
					]}
				>
					Опубліковати
				</Text>
			</Button>

			<Button
				onPress={retakePicture}
				outerStyles={[
					styles.deleteBtn,
					capturedPhoto && styles.deleteBtnActive,
				]}
			>
				<TrashSvg fill={capturedPhoto ? "#FFFFFF" : "#BDBDBD"} />
			</Button>
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
		justifyContent: "center",
	},
	camera: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		height: 240,
		backgroundColor: "#E8E8E8",
		borderRadius: 8,
		marginBottom: 8,
	},
	camContainer: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		width: 60,
		height: 60,
		borderRadius: 50,
		backgroundColor: "#FFFFFF",
		opacity: 0.7,
	},
	subText: {
		fontSize: 16,
		color: "#BDBDBD",
	},
	inputContainer: {
		gap: 16,
	},
	input: {
		width: "100%",
		height: 50,
		borderBottomWidth: 1,
		borderBottomColor: "#E8E8E8",
		paddingLeft: 16,
		paddingRight: 16,
		fontSize: 16,
	},
	locationInput: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
	},
	textInput: {
		flex: 1,
		fontSize: 16,
		paddingVertical: 0,
	},
	btn: {
		backgroundColor: "#F6F6F6",
	},
	btnText: {
		color: "#BDBDBD",
	},
	deleteBtn: {
		justifyContent: "center",
		backgroundColor: "#F6F6F6",
		width: 70,
		height: 40,
		alignItems: "center",
		borderRadius: 100,
		paddingBottom: 8,
		paddingTop: 8,
		paddingLeft: 23,
		paddingRight: 23,
		marginTop: "auto",
		marginLeft: "auto",
		marginRight: "auto",
		marginBottom: 34,
	},
	deleteBtnActive: {
		backgroundColor: "#FF6C00",
	},
	btnTextEnabled: { color: "#FFFFFF" },
	message: {
		textAlign: "center",
		paddingBottom: 10,
	},
	previewContainer: {
		position: "relative",
		width: "100%",
		height: 240,
	},
	preview: { width: "100%", height: "100%", borderRadius: 8 },
	retakeBtn: {
		flexDirection: "row",
	},
	retakeBtnText: {
		color: "#000000",
	},
});

export default CreatePostScreen;
