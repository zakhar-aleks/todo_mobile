import * as React from "react";
import Svg, { G, Path, Defs, ClipPath, SvgProps } from "react-native-svg";

const PasswordEye = (props: SvgProps) => {
	return (
		<Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
			<G clipPath="url(#clip0_43_40)" fill="#fff">
				<Path d="M23.27 9.419C21.72 6.893 18.193 2.655 12 2.655c-6.192 0-9.72 4.238-11.271 6.764a4.908 4.908 0 000 5.162c1.55 2.526 5.079 6.764 11.27 6.764 6.193 0 9.72-4.238 11.272-6.764a4.908 4.908 0 000-5.162zm-1.704 4.115c-1.332 2.166-4.347 5.81-9.566 5.81-5.22 0-8.234-3.644-9.566-5.81a2.918 2.918 0 010-3.068C3.766 8.3 6.78 4.655 12 4.655s8.234 3.64 9.566 5.81a2.919 2.919 0 010 3.069z" />
				<Path d="M12 7a5 5 0 100 10 5 5 0 000-10zm0 8a3 3 0 110-6.001 3 3 0 010 6z" />
			</G>
			<Defs>
				<ClipPath id="clip0_43_40">
					<Path fill="#fff" d="M0 0H24V24H0z" />
				</ClipPath>
			</Defs>
		</Svg>
	);
};

export default PasswordEye;
