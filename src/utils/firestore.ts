import {
	collection,
	addDoc,
	doc,
	getDoc,
	setDoc,
	updateDoc,
	arrayUnion,
} from "firebase/firestore";
import { db } from "../../config";
import { UserInfo } from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

interface UserData {
	uid: string;
	email: string;
	displayName?: string | null;
}

interface PostData {
	photo: string;
	name: string;
	address: string;
	latitude: number;
	longitude: number;
	userId: string;
	createdAt: Date;
}

interface Comment {
	id: string;
	userId: string;
	comment: string;
	datePosted: string;
}

export const addUser = async (userId: string, userData: UserData) => {
	try {
		await setDoc(doc(db, "users", userId), userData);
		console.log("User added:", userId);
	} catch (error) {
		console.error("Error adding user:", error);
	}
};

export const getUser = async (userId: string) => {
	const docRef = doc(db, "users", userId);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		console.log("user data:", docSnap.data());
	} else {
		console.log("no such doc");
	}
};

export const updateUserInFirestore = async (user: any) => {
	try {
		await setDoc(doc(db, "users", user.uid), user, { merge: true });
		console.log("user data saved to firestore");
	} catch (error) {
		console.error(error);
	}
};

//posts
export const addPostToFirestore = async (postData: PostData) => {
	try {
		const postsCollection = collection(db, "posts");
		const docRef = await addDoc(postsCollection, postData);
		console.log("Post added with ID:", docRef.id);
		return docRef.id;
	} catch (error) {
		console.error("Error adding post:", error);
		throw error;
	}
};

export const addCommentToFirestore = async (
	postId: string,
	comment: Comment
) => {
	try {
		const postDocRef = doc(db, "posts", postId);
		await updateDoc(postDocRef, {
			comments: arrayUnion(comment),
		});
		console.log("Comment added to post:", postId);
	} catch (error) {
		console.error("Error adding comment:", error);
		throw error;
	}
};
