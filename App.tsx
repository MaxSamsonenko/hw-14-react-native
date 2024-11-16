import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { PersistGate } from "redux-persist/integration/react";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./src/redux/store/store";

import { Text } from "react-native";
import AuthStackScreen from "./src/screens/AuthStackScreen";
import HomeStackScreen from "./src/screens/HomeStackScreen";

import "react-native-gesture-handler";
import { authStateChanged } from "./src/utils/auth";
// import { onAuthStateChanged } from "firebase/auth";

SplashScreen.preventAutoHideAsync();
const MainStack = createStackNavigator();

const MainStackScreen = () => {
	const userCurrent = useSelector((state) => state.user.userInfo);
	return (
		<MainStack.Navigator>
			{userCurrent ? (
				<MainStack.Screen
					name="Home"
					component={HomeStackScreen}
					options={{ headerShown: false }}
				/>
			) : (
				<MainStack.Screen
					name="Auth"
					component={AuthStackScreen}
					options={{ headerShown: false }}
				/>
			)}
		</MainStack.Navigator>
	);
};

export default function App() {
	const [fontsLoaded] = useFonts({
		"Roboto-Regular": require("./src/assets/fonts/Roboto-Regular.ttf"),
		"Roboto-Bold": require("./src/assets/fonts/Roboto-Bold.ttf"),
		"Roboto-Light": require("./src/assets/fonts/Roboto-Light.ttf"),
		"Roboto-Medium": require("./src/assets/fonts/Roboto-Medium.ttf"),
	});

	useEffect(() => {
		if (fontsLoaded) {
			SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	if (!fontsLoaded) {
		return null;
	}

	return (
		<Provider store={store.store}>
			<PersistGate
				loading={<Text>Loading...</Text>}
				persistor={store.persistor}
			>
				<AuthListener />
			</PersistGate>
		</Provider>
	);
}

const AuthListener = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		authStateChanged(dispatch);
	}, [dispatch]);

	return (
		<NavigationContainer>
			<MainStackScreen />
		</NavigationContainer>
	);
};
