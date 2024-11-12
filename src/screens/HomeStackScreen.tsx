import { createStackNavigator } from "@react-navigation/stack";
import HomeTabNavigator from "../navigation/HomeTabNavigator";
import CommentsScreen from "./CommentsScreen";
import MapScreen from "./MapScreen";

const HomeStack = createStackNavigator();

const HomeStackScreen = () => (
	<HomeStack.Navigator>
		<HomeStack.Screen
			name="HomeTabs"
			component={HomeTabNavigator}
			options={{ headerShown: false }}
		/>
		<HomeStack.Screen name="Comments" component={CommentsScreen} />
		<HomeStack.Screen name="Map" component={MapScreen} />
	</HomeStack.Navigator>
);

export default HomeStackScreen;
