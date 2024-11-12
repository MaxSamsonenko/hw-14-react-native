import React from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";

import * as Location from "expo-location";
import { useRoute } from "@react-navigation/native";

const MapScreen: React.FC = () => {
	const route = useRoute();

	const { post } = route.params || {};
	console.log("in comments", post);
	return (
		<View style={styles.container}>
			<MapView
				style={styles.map}
				initialRegion={{
					latitude: post.latitude,
					longitude: post.longitude,
					latitudeDelta: 0.0922,
					longitudeDelta: 0.0421,
				}}
			>
				<Marker
					draggable={true}
					title="I am here"
					coordinate={{ latitude: post.latitude, longitude: post.longitude }}
					description="Hello"
				/>
			</MapView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	map: {
		width: "100%",
		height: "100%",
	},
});

export default MapScreen;
