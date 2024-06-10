import * as React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import { useEffect } from "react";

const labels = {
	0.5: "(20)",
	1: "(20)",
	1.5: "(20)",
	2: "(20)",
	2.5: "(20)",
	3: "(25)",
	3.5: "(225)",
	4: "(10)",
	4.5: "(20)",
	5: "(25)",
};

function getLabelText(value) {
	return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

export default function MyRatingBar({ rating }) {
	const [value, setValue] = React.useState(2);
	const [hover, setHover] = React.useState(-1);

	const sizeStars = 15; // Tamaño de las estrellas

	useEffect(() => {
		if (rating) setValue(rating);
	}, [rating]);

	return (
		<Box
			sx={{
				width: 200,
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				pt: 0.5,
				mr: 1,
				marginLeft: "auto", // Esto alineará el Box a la derecha
			}}
		>
			<Rating
				sx={{ marginLeft: "auto" }}
				readOnly
				name='hover-feedback'
				value={value}
				precision={0.1}
				getLabelText={getLabelText}
				onChange={(event, newValue) => {
					setValue(newValue);
				}}
				onChangeActive={(event, newHover) => {
					setHover(newHover);
				}}
				emptyIcon={<StarIcon style={{ fontSize: sizeStars, opacity: 0.55 }} fontSize='inherit' />}
				icon={<StarIcon style={{ fontSize: sizeStars }} />}
			/>
			{value !== null && (
				<Box
					sx={{
						ml: 1,
						display: "flex",
						alignItems: "center",
						fontSize: "0.8rem", // Tamaño de fuente ajustado
					}}
				>
					{labels[hover !== -1 ? hover : value]}
				</Box>
			)}
		</Box>
	);
}
