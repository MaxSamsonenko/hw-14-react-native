import Svg, { Path } from "react-native-svg";

const MapPinSvg: React.FC = () => {
	return (
		<Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M20 10.3636C20 16.0909 12 21 12 21C12 21 4 16.0909 4 10.3636C4 6.29681 7.58172 3 12 3C16.4183 3 20 6.29681 20 10.3636V10.3636Z"
				stroke="#BDBDBD"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M12 14C13.6569 14 15 12.6569 15 11C15 9.34315 13.6569 8 12 8C10.3431 8 9 9.34315 9 11C9 12.6569 10.3431 14 12 14Z"
				stroke="#BDBDBD"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	);
};

export default MapPinSvg;
