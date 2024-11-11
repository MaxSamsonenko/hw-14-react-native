import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AuthStackScreen from "./screens/AuthStackScreen";
import HomeStackScreen from "./screens/HomeStackScreen";

import "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();
const MainStack = createStackNavigator();

const MainStackScreen = () => (
	<MainStack.Navigator>
		<MainStack.Screen
			name="Auth"
			component={AuthStackScreen}
			options={{ headerShown: false }}
		/>
		<MainStack.Screen
			name="Home"
			component={HomeStackScreen}
			options={{ headerShown: false }}
		/>
	</MainStack.Navigator>
);

export default function App() {
	const [fontsLoaded] = useFonts({
		"Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
		"Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
		"Roboto-Light": require("./assets/fonts/Roboto-Light.ttf"),
		"Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
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
		<NavigationContainer>
			<MainStackScreen />
		</NavigationContainer>
		// <NavigationContainer>
		// 	<MainStack.Navigator
		// initialRouteName="Login"
		// screenOptions={{
		// 	headerShown: false,
		// }}
		// 	>
		// 		<MainStack.Screen name="Registration" component={RegistrationScreen} />
		// 		<MainStack.Screen name="Login" component={LoginScreen} />
		// 		<MainStack.Screen name="Home" component={BottomTabNavigator} />
		// 		<MainStack.Screen name="Comments" component={CommentsScreen} />
		// 	</MainStack.Navigator>
		// </NavigationContainer>
	);
}
