import Svg, { Path, Rect } from "react-native-svg";

const GridSvg: React.FC = () => {
	return (
		<Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
			<Rect width="24" height="24" fill="white" />
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M3 3H10V10H3V3Z"
				stroke="#212121"
				strokeOpacity="0.8"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M14 3H21V10H14V3Z"
				stroke="#212121"
				strokeOpacity="0.8"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M14 14H21V21H14V14Z"
				stroke="#212121"
				strokeOpacity="0.8"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M3 14H10V21H3V14Z"
				stroke="#212121"
				strokeOpacity="0.8"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
};

export default GridSvg;
