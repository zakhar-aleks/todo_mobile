import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";

const EditIcon = (props: SvgProps) => {
	return (
		<Svg width={22} height={22} viewBox="0 0 22 22" fill="none" {...props}>
			<Path
				d="M12.888 8.268l.844.844-8.305 8.305h-.844v-.844l8.305-8.305zm3.3-5.518a.917.917 0 00-.641.266l-1.678 1.677 3.438 3.438 1.677-1.678a.913.913 0 000-1.292L16.84 3.016a.9.9 0 00-.65-.266zm-3.3 2.924L2.75 15.813v3.437h3.438L16.325 9.112l-3.438-3.438z"
				fill="#6871EE"
			/>
		</Svg>
	);
};

export default EditIcon;
