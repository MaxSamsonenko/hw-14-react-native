import Svg, { Path } from "react-native-svg";

const UserSvg: React.FC = () => {
	return (
		<Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
			<Path
				d="M20 21V19C20 16.7909 18.2091 15 16 15H8C5.79086 15 4 16.7909 4 19V21"
				stroke="#212121"
				strokeOpacity="0.8"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
				stroke="#212121"
				strokeOpacity="0.8"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
};

export default UserSvg;
