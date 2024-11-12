import { createStackNavigator } from "@react-navigation/stack";

import LoginScreen from "./LoginScreen";
import RegistrationScreen from "./RegistrationScreen";

const AuthStack = createStackNavigator();

const AuthStackScreen = () => (
	<AuthStack.Navigator
		initialRouteName="Login"
		screenOptions={{
			headerShown: false,
		}}
	>
		<AuthStack.Screen name="Login" component={LoginScreen} />
		<AuthStack.Screen name="Registration" component={RegistrationScreen} />
	</AuthStack.Navigator>
);

export default AuthStackScreen;
