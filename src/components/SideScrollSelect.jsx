import { Box, Center } from "@chakra-ui/react";
import React, { useState } from "react";

export default function SideScrollSelect(props) {	
	const init_scroll_offset = 50;
	const side_length = 80;
	const gap = 10;

	const [scroll_pos, set_scroll_pos] = useState(init_scroll_offset);

	const calc_focus_idx = (scroll_offset) => (scroll_offset - init_scroll_offset) / (side_length + gap);

	const calc_dist_from_focus = (scroll_offset, idx) => Math.abs(calc_focus_idx(scroll_offset) - idx);

	const get_scroll_top = () => document.getElementById("sideScrollBox").scrollTop;

	const scroll_handler = () => {
		if (Math.abs(get_scroll_top() - scroll_pos) > 25) {
			set_scroll_pos(get_scroll_top());
			props.select_handler(Math.round(calc_focus_idx(get_scroll_top())));
		}
	}

	return (
		<Center w="100%" h={`${2 * init_scroll_offset}px`}>
			<Box 
				id="sideScrollBox"
				h={props.width ? `${props.width}vw` : "100vw"} 
				py={props.width ? `${props.width / 2}vw` : "50vw"}
				transform="rotate(-90deg)" 
				overflowY="scroll" 
				sx={{ "scrollSnapType": "y mandatory" }}
				onScroll={scroll_handler}
			>
				{props.categories.map((category, idx) => (
					<Center 
						transform="rotate(90deg)"
						w={`${side_length}px`} 
						h={`${side_length}px`} 
						m={`${gap}px`} 
						key={`category-${idx}`}
					>
						<Center 
							w="100%"
							h="100%"
							bg={`${category}.300`}
							transition=".3s ease-out"
							// transform={`scale(${1 - .1 * calc_dist_from_focus(scroll_pos, idx)})`}
							opacity={`${1 - .4 * calc_dist_from_focus(scroll_pos, idx)}`}
							sx={{
								"scrollSnapAlign": "center",
								"clipPath": "polygon(0 50%, 50% 0, 100% 50%, 50% 100%)"
							}}
						>
							{category}
						</Center>
					</Center>
				))}
			</Box>
		</Center>
	);
}