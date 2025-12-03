import * as React from "react";
import Svg, { Mask, Path, G, SvgProps } from "react-native-svg";

const DeleteIcon = (props: SvgProps) => {
	return (
		<Svg width={22} height={22} viewBox="0 0 22 22" fill="none" {...props}>
			<Mask
				id="a"
				style={{
					maskType: "luminance",
				}}
				maskUnits="userSpaceOnUse"
				x={0}
				y={0}
				width={22}
				height={22}
			>
				<Path d="M22 0H0v22h22V0z" fill="#fff" />
			</Mask>
			<G mask="url(#a)">
				<Path
					d="M5.5 17.417c0 1.008.825 1.833 1.833 1.833h7.334a1.839 1.839 0 001.833-1.833V8.25a1.839 1.839 0 00-1.833-1.833H7.333A1.839 1.839 0 005.5 8.25v9.167zM8.25 8.25h5.5a.92.92 0 01.917.917V16.5a.92.92 0 01-.917.917h-5.5a.92.92 0 01-.917-.917V9.167a.92.92 0 01.917-.917zm5.958-4.583l-.65-.651a.925.925 0 00-.642-.266H9.084c-.238 0-.477.1-.642.266l-.65.65H5.5a.92.92 0 00-.917.917.92.92 0 00.917.917h11a.92.92 0 00.917-.917.92.92 0 00-.917-.916h-2.292z"
					fill="#6871EE"
				/>
			</G>
		</Svg>
	);
};

export default DeleteIcon;
