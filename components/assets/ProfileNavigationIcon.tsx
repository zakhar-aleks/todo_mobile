import * as React from "react";
import Svg, { G, Mask, Path, Defs, ClipPath, SvgProps } from "react-native-svg";

const ProfileNavigationIcon = ({ color = "#323232", ...props }: SvgProps) => {
	return (
		<Svg width={36} height={36} viewBox="0 0 36 36" fill="none" {...props}>
			<G clipPath="url(#clip0_2_39)">
				<Mask
					id="a"
					style={{
						maskType: "luminance",
					}}
					maskUnits="userSpaceOnUse"
					x={-5}
					y={-5}
					width={45}
					height={45}
				>
					<Path d="M40-5H-5v45h45V-5z" fill="#fff" />
				</Mask>
				<G mask="url(#a)">
					<Path
						d="M17.5 17.5c4.144 0 7.5-3.356 7.5-7.5s-3.356-7.5-7.5-7.5A7.498 7.498 0 0010 10c0 4.144 3.356 7.5 7.5 7.5zm0-11.25A3.761 3.761 0 0121.25 10a3.761 3.761 0 01-3.75 3.75A3.761 3.761 0 0113.75 10a3.761 3.761 0 013.75-3.75zm0 13.125c-5.006 0-15 2.512-15 7.5v3.75A1.88 1.88 0 004.375 32.5h26.25a1.88 1.88 0 001.875-1.875v-3.75c0-4.988-9.994-7.5-15-7.5zm11.25 9.375H6.25v-1.856c.375-1.35 6.188-3.769 11.25-3.769 5.063 0 10.875 2.419 11.25 3.75v1.875z"
						fill={color}
					/>
				</G>
			</G>
			<Defs>
				<ClipPath id="clip0_2_39">
					<Path fill="#fff" d="M0 0H36V36H0z" />
				</ClipPath>
			</Defs>
		</Svg>
	);
};

export default ProfileNavigationIcon;
