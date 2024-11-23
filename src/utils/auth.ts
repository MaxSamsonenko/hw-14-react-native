import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	updateProfile,
	User,
	signOut,
	AuthCredential,
} from "firebase/auth";

import { auth, db } from "../../config";
import { setUserInfo, clearUserInfo } from "../redux/reducers/userSlice";
import { clearPosts } from "../redux/reducers/postsSlice";
import { AppDispatch } from "../redux/store/store";
import { err } from "react-native-svg";
import { addUser } from "./firestore";
import {
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	where,
} from "firebase/firestore";
import { setPosts } from "../redux/reducers/postsSlice";
import { Alert } from "react-native";
import { uploadPhotoToStorage } from "./helpers";
// import { updateUserInFirestore } from "./firestore";

interface AuthCredentials {
	email: string;
	password: string;
	displayName: string;
	avatar: string;
}

export const registerDB = async (
	{ email, password, displayName, avatar }: AuthCredentials,
	dispatch: AppDispatch
) => {
	try {
		const credentials = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);

		const user = credentials.user;

		const avatarURI = await uploadPhotoToStorage(avatar);

		await addUser(user.uid, {
			email: user.email || "",
			uid: user.uid,
			displayName: displayName,
			avatar: avatarURI,
		});

		dispatch(
			setUserInfo({
				uid: user.uid,
				email: user.email,
				displayName: displayName,
				avatar: avatarURI,
			})
		);
	} catch (error) {
		console.log("SignUp error", error);
		// console.log("message", error.message);
	}
};

export const loginDB = async (
	{ email, password }: AuthCredentials,
	dispatch: AppDispatch
) => {
	try {
		const credentials = await signInWithEmailAndPassword(auth, email, password);
		const user = credentials.user;
		// console.log(user);

		const userDocRef = doc(db, "users", user.uid);
		const userDoc = await getDoc(userDocRef);
		console.log("in loginDB:", userDoc);

		if (!userDoc.exists()) {
			throw new Error("User data not found in Firestore.");
		}

		const userData = userDoc.data();
		console.log("in loginDB:", userData);

		const postsCollectionRef = collection(db, "posts");
		const userPostsQuery = query(
			postsCollectionRef,
			where("userId", "==", user.uid)
		);
		const postsSnapshot = await getDocs(userPostsQuery);

		const userPosts = postsSnapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));

		dispatch(
			setUserInfo({
				uid: user.uid,
				email: user.email,
				displayName: userData.displayName,
				avatar: userData.avatar,
			})
		);

		dispatch(setPosts(userPosts));

		return user;
	} catch (error) {
		Alert.alert("Error login in");
		console.log("Error login in", error);
		throw error;
	}
};

export const logoutDB = async (dispatch: AppDispatch) => {
	try {
		await signOut(auth);
		dispatch(clearUserInfo());
		dispatch(clearPosts());
	} catch (error) {
		console.log("sign out error", error);
	}
};

export const authStateChanged = (dispatch: AppDispatch) => {
	onAuthStateChanged(auth, (user) => {
		console.table("Auth state changed:", user);
		if (user) {
			dispatch(
				setUserInfo({
					uid: user.uid,
					email: user.email,
					displayName: user.displayName,
					avatar: user.avatar,
				})
			);
		} else {
			dispatch(clearUserInfo());
		}
	});
};

export const updateUserProfile = async (update: {
	displayName?: string;
	photoURL?: string;
}) => {
	const user = auth.currentUser;
	if (user) {
		try {
			await updateProfile(user, update);
		} catch (error) {
			console.log("Error updating profile");
			throw error;
		}
	}
};
