import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
	colors: {
		melee: {
			300: "#7c1416",
			800: "#ec1d25",
		},
		range: {
			300: "#4e235e",
			800: "#b44f9f",
		},
		armor: {
			300: "#0f3458",
			800: "#4898d5",
		},
		skin: {
			300: "#ac982e",
			800: "#f9ea09",
		},
		pet: {
			300: "#1e4826",
			800: "#6dbe45",
		},
	},
});

export default theme;