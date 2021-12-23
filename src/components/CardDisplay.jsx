import { Box, Image, SimpleGrid } from "@chakra-ui/react";

export default function CardDisplay(props) {
	let img_list = []
	for(let i = props.start_idx; i <= props.end_idx; i++) {
		let img_name = i < 10 ? `0${i}` : i;
		img_list.push(<Image src={`${process.env.PUBLIC_URL}/assets/images/cards/${img_name}.png`} 
			alt={`Item#${img_name}`} 
			key={`card#${img_name}`} 
			onClick={() => props.display_card_handler(i)}
		/>);
	}

	return (
		<SimpleGrid columns={3} spacing="10px" w="100%">
			{img_list}
		</SimpleGrid>
	);
}