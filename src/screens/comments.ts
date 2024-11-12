type Comment = {
	id: string;
	avatar: string;
	own: boolean;
	comment: string;
	datePosted: string;
};

export type Post = {
	id: string;
	thumb: string;
	title: string;
	comments: Comment[];
	commentsCount: number;
	location: string;
	likesCount: number;
};

export const comments: Post[] = [
	{
		id: "11",
		thumb: "../assets/images/landscape-post.png",
		title: "Ліс",
		comments: [
			{
				id: "1",
				avatar: "",
				own: true,
				comment:
					"This forest looks like something out of a fairy tale! The tranquility here must be amazing.",
				datePosted: "2024-10-23",
			},
			{
				id: "2",
				avatar: "",
				own: false,
				comment: "The lush greenery is so refreshing. Nature at its finest!",
				datePosted: "2024-09-15",
			},
			{
				id: "3",
				avatar: "",
				own: false,
				comment:
					"I could get lost here for hours just enjoying the peaceful atmosphere.",
				datePosted: "2024-11-01",
			},
			{
				id: "4",
				avatar: "",
				own: true,
				comment:
					"This forest looks like something out of a fairy tale! The tranquility here must be amazing.",
				datePosted: "2024-10-23",
			},
			{
				id: "5",
				avatar: "",
				own: false,
				comment: "The lush greenery is so refreshing. Nature at its finest!",
				datePosted: "2024-09-15",
			},
			{
				id: "6",
				avatar: "",
				own: false,
				comment:
					"I could get lost here for hours just enjoying the peaceful atmosphere.",
				datePosted: "2024-11-01",
			},
			{
				id: "7",
				avatar: "",
				own: true,
				comment:
					"This forest looks like something out of a fairy tale! The tranquility here must be amazing.",
				datePosted: "2024-10-23",
			},
			{
				id: "8",
				avatar: "",
				own: false,
				comment: "The lush greenery is so refreshing. Nature at its finest!",
				datePosted: "2024-09-15",
			},
			{
				id: "9",
				avatar: "",
				own: false,
				comment:
					"I could get lost here for hours just enjoying the peaceful atmosphere.",
				datePosted: "2024-11-01",
			},
		],
		commentsCount: 8,
		location: "Ivano-Frankivs'k region, Ukraine",
		likesCount: 67,
	},
	{
		id: "21",
		thumb: "../assets/images/sunset-post.png",
		title: "Захід на морі",
		comments: [
			{
				id: "1",
				avatar: "",
				own: false,
				comment: "What a breathtaking sunset! The colors are simply magical.",
				datePosted: "2024-08-10",
			},
			{
				id: "2",
				avatar: "",
				own: true,
				comment:
					"This sunset is absolutely stunning, like a painting in the sky.",
				datePosted: "2024-07-30",
			},
			{
				id: "3",
				avatar: "",
				own: false,
				comment:
					"Wow, I wish I could be there in person. The golden hues are incredible!",
				datePosted: "2024-09-04",
			},
		],
		commentsCount: 35,
		location: "Crimea Black Sea region, Ukraine",
		likesCount: 13,
	},
	{
		id: "31",
		thumb: "../assets/images/venice-house-post.png",
		title: "Будиночок у Венеції",
		comments: [
			{
				id: "1",
				avatar: "",
				own: false,
				comment:
					"This building holds so much history. I wonder what stories it could tell!",
				datePosted: "2024-06-18",
			},
			{
				id: "2",
				avatar: "",
				own: false,
				comment:
					"I love the architecture! There's something so timeless about old buildings like this.",
				datePosted: "2024-09-27",
			},
			{
				id: "3",
				avatar: "",
				own: true,
				comment:
					"You can really feel the character of this place through the weathered stones. Beautiful!",
				datePosted: "2024-10-05",
			},
		],
		commentsCount: 200,
		location: "Venice, Italy",
		likesCount: 153,
	},
];
