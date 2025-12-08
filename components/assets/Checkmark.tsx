import * as React from "react";
import Svg, { G, Mask, Path, Defs, ClipPath, SvgProps } from "react-native-svg";

interface IconProps extends SvgProps {
	color?: string;
}

const Checkmark = ({ color, ...props }: IconProps) => {
	const fillColor = props.fill || color || "#323232";

	return (
		<Svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...props}>
			<G clipPath="url(#clip0_15_190)">
				<Mask
					id="a"
					style={{
						maskType: "luminance",
					}}
					maskUnits="userSpaceOnUse"
					x={0}
					y={0}
					width={32}
					height={32}
				>
					<Path d="M32 0H0v32h32V0z" fill="#fff" />
				</Mask>
				<G mask="url(#a)">
					<Path
						d="M26.36 6.707l1.867 1.866L11.24 25.56l-7.467-7.467 1.867-1.866 5.6 5.6 15.12-15.12zm0-3.774l-15.12 15.12-5.6-5.6L0 18.093l11.24 11.24L32 8.573l-5.64-5.64z"
						fill={fillColor}
					/>
				</G>
			</G>
			<Defs>
				<ClipPath id="clip0_15_190">
					<Path fill="#fff" d="M0 0H32V32H0z" />
				</ClipPath>
			</Defs>
		</Svg>
	);
};

export default Checkmark;
