import { useState } from "react";
import {
	StyleSheet,
	TextInput,
	View,
	StyleProp,
	ViewStyle,
	TextInputProps,
} from "react-native";
import { FC } from "react";

type Props = {
	placeholder?: string;
	outerStyles?: StyleProp<ViewStyle>;
	showBtn?: React.ReactNode;
	placeholderTextColor?: string;
} & TextInputProps;

const Input: FC<Props> = ({
	placeholder,
	outerStyles,
	showBtn,
	placeholderTextColor = "#BDBDBD",
	...textInputProps
}) => {
	const [isFocused, setIsFocused] = useState<boolean>(false);

	const onFocus = () => {
		setIsFocused(true);
	};
	const onBlur = () => {
		setIsFocused(false);
	};
	return (
		<View style={[styles.input, outerStyles, isFocused && styles.focused]}>
			<TextInput
				style={[styles.textInput]}
				placeholder={placeholder}
				placeholderTextColor={placeholderTextColor}
				onFocus={onFocus}
				onBlur={onBlur}
				{...textInputProps}
			/>
			{showBtn}
		</View>
	);
};

const styles = StyleSheet.create({
	input: {
		width: "100%",
		height: 50,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: "#ccc",
		paddingLeft: 16,
		paddingRight: 16,
		backgroundColor: "#E8E8E8",
		fontSize: 16,
	},
	textInput: {
		flex: 1,
		fontSize: 16,
		paddingVertical: 0,
	},
	focused: {
		backgroundColor: "#FFFFFF",
		borderColor: "#FF6C00",
	},
});

export default Input;
