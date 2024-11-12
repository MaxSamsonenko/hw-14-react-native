import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";

import { StyleSheet } from "react-native";

import PostsScreen from "../screens/PostsScreen";
import CreatePostScreen from "../screens/CreatePostScreen";
import ProfileScreen from "../screens/ProfileScreen";
import CreatePostTab from "../components/CreatePostTab";
import Button from "../components/Button";
import GridSvg from "../components/Svg/GridSvg";
import LogoutSvg from "../components/Svg/LogoutSvg";
import ArrowSvg from "../components/Svg/ArrowSvg";
import UserSvg from "../components/Svg/UserSvg";

const Tab = createBottomTabNavigator();

const HomeTabNavigator = () => {
	const navigation = useNavigation();
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				headerRightContainerStyle: { paddingRight: 16 },
				headerLeftContainerStyle: { paddingLeft: 16 },
				tabBarStyle:
					route.name === "CreatePosts"
						? { display: "none" }
						: { height: 83, gap: 31, paddingBottom: 34, paddingTop: 9 },
			})}
		>
			<Tab.Screen
				name="Posts"
				component={PostsScreen}
				options={{
					title: "Публікації",
					tabBarShowLabel: false,
					tabBarIcon: () => <GridSvg />,
					headerTitleAlign: "center",
					headerRight: () => (
						<Button
							outerStyles={styles.logoutBtn}
							onPress={() => navigation.navigate("Auth")}
						>
							<LogoutSvg />
						</Button>
					),
				}}
			/>
			<Tab.Screen
				name="CreatePosts"
				component={CreatePostScreen}
				options={{
					title: "Створити публікацію",
					tabBarShowLabel: false,
					tabBarIcon: () => <CreatePostTab />,
					headerTitleAlign: "center",
					headerLeft: () => (
						<Button
							outerStyles={styles.logoutBtn}
							onPress={() => navigation.navigate("Posts")}
						>
							<ArrowSvg />
						</Button>
					),
				}}
			/>
			<Tab.Screen
				name="Profile"
				component={ProfileScreen}
				options={{
					headerShown: false,
					tabBarShowLabel: false,
					tabBarIcon: () => <UserSvg />,
					headerTitleAlign: "center",
				}}
			/>
		</Tab.Navigator>
	);
};

const styles = StyleSheet.create({
	logoutBtn: {
		backgroundColor: "none",
		width: 24,
	},
});

export default HomeTabNavigator;
