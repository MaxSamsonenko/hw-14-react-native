import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Comment {
	id: string;
	userId: string;
	comment: string;
	datePosted: string;
}

interface Post {
	id: string;
	photo: string;
	name: string;
	address: string;
	latitude: number;
	longitude: number;
	userId: string;
	comments: Comment[];
}

interface PostsState {
	posts: Post[];
}

const initialState: PostsState = {
	posts: [],
};

const postsSlice = createSlice({
	name: "posts",
	initialState,
	reducers: {
		addPost(state, action: PayloadAction<Post>) {
			state.posts.push(action.payload);
		},
		setPosts(state, action: PayloadAction<Post[]>) {
			state.posts = action.payload;
		},
		addCommentToPost(
			state,
			action: PayloadAction<{ postId: string; comment: Comment }>
		) {
			const { postId, comment } = action.payload;
			const post = state.posts.find((p) => p.id === postId);
			if (post) {
				post.comments = [...post.comments, comment];
			}
		},
	},
});

export const { addPost, setPosts, addCommentToPost } = postsSlice.actions;

export default postsSlice.reducer;
