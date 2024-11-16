// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
	apiKey: "AIzaSyBLiawxmFUv6TsGSrLCOL8u7CnQHxwKVX0",
	authDomain: "photo-app-fd88d.firebaseapp.com",
	databaseURL: "<https://photo-app-fd88d.firebaseio.com>",
	projectId: "photo-app-fd88d",
	storageBucket: "photo-app-fd88d.appspot.com",
	messagingSenderId: "938808823310",
	appId: "app-id",
	// measurementId: "G-measurement-id",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
	persistence: getReactNativePersistence(AsyncStorage),
});

// export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
