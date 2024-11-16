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
// import { updateUserInFirestore } from "./firestore";

interface AuthCredentials {
	email: string;
	password: string;
	displayName: string;
}

export const registerDB = async (
	{ email, password, displayName }: AuthCredentials,
	dispatch: AppDispatch
) => {
	try {
		const credentials = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);

		const user = credentials.user;

		await addUser(user.uid, {
			email: user.email || "",
			uid: user.uid,
			displayName: displayName,
		});

		dispatch(
			setUserInfo({
				uid: user.uid,
				email: user.email,
				displayName: displayName,
			})
		);
	} catch (error) {
		console.log("SignUp error", error);
	}
};

export const loginDB = async (
	{ email, password }: AuthCredentials,
	dispatch: AppDispatch
) => {
	try {
		const credentials = await signInWithEmailAndPassword(auth, email, password);
		const user = credentials.user;
		console.log(user);

		const userDocRef = doc(db, "users", user.uid);
		const userDoc = await getDoc(userDocRef);

		if (!userDoc.exists()) {
			throw new Error("User data not found in Firestore.");
		}

		const userData = userDoc.data();

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
			})
		);

		dispatch(setPosts(userPosts));

		return user;
	} catch (error) {
		console.log("Error login in", error);
		throw error;
	}
};

export const logoutDB = async (dispatch: AppDispatch) => {
	try {
		await signOut(auth);
		dispatch(clearUserInfo());
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
