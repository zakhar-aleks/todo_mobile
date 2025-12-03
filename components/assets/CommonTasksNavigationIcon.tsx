import * as React from "react";
import Svg, { Mask, Path, G, SvgProps } from "react-native-svg";

const CommonTasksNavigationIcon = (props: SvgProps) => {
	return (
		<Svg width={45} height={45} viewBox="0 0 45 45" fill="none" {...props}>
			<Mask
				id="a"
				style={{
					maskType: "luminance",
				}}
				maskUnits="userSpaceOnUse"
				x={0}
				y={0}
				width={45}
				height={45}
			>
				<Path d="M45 0H0v45h45V0z" fill="#fff" />
			</Mask>
			<G mask="url(#a)">
				<Path
					d="M26.25 11.25V7.5h-7.5v3.75h7.5zM7.5 16.875V33.75a1.88 1.88 0 001.875 1.875h26.25A1.88 1.88 0 0037.5 33.75V16.875A1.88 1.88 0 0035.625 15H9.375A1.88 1.88 0 007.5 16.875zm30-5.625A3.737 3.737 0 0141.25 15v20.625a3.737 3.737 0 01-3.75 3.75h-30a3.737 3.737 0 01-3.75-3.75L3.769 15c0-2.081 1.65-3.75 3.731-3.75H15V7.5a3.737 3.737 0 013.75-3.75h7.5A3.737 3.737 0 0130 7.5v3.75h7.5z"
					fill="#323232"
				/>
			</G>
		</Svg>
	);
};

export default CommonTasksNavigationIcon;
