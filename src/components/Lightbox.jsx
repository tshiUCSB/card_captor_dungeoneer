import {
	Box,
	Button,
	Center,
	Image,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalCloseButton,
	Text,
	useDisclosure
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import Barcode from "./Barcode";

export default function LightBox(props) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [is_flipped, set_is_flipped] = useState(false);

	const close_handler = () => {
		props.reset_display();
		set_is_flipped(false);
		onClose();
	}

	const toggle_flip = () => {
		set_is_flipped(!is_flipped);
	}

	useEffect(() => {
		if (props.card_idx != null) {
			onOpen();
		}
	}, [props.card_idx, onOpen]);

	return (
		<Modal isOpen={isOpen} onClose={close_handler}>
			<ModalOverlay />
			<Button 
				bg="transparent" 
				color="white" 
				opacity=".5" 
				pos="fixed" 
				right="5px" 
				top="5px" 
				fontSize="1.5em"
				onClick={close_handler}
			>
				x
			</Button>
			<ModalContent bg="transparent">
				<Center 
					w="100vw"
					h="140vw"
					sx={{"perspective": "1000px"}}
				>
					<Center 
						w="100%"
						h="100%"
						transform={is_flipped ? "rotateY(-180deg)" : "none"}
						transition="transform .8s"
						sx={{"transformStyle": "preserve-3d"}}
						onClick={toggle_flip}
					>
						<Image 
							src={`${process.env.PUBLIC_URL}/assets/images/cards/${props.card_idx < 10 ? `0${props.card_idx}` : props.card_idx}.png`}
							alt={`Item#${props.card_idx}`} 
							w="100%"
							pos="absolute"
							sx={{"backfaceVisibility": "hidden"}}
						/>
						<Center 
							w="100%" 
							h="100%" 
							bg="#ffffff"
							pos="absolute"
							transform="rotateY(180deg)"
							sx={{"backfaceVisibility": "hidden"}}
						>
							<Box w="100%" transform="rotate(90deg)">
								<Barcode card_idx={props.card_idx} ranges={props.ranges} />
							</Box>
							<Text pos="absolute" bottom="0" w="100%" textAlign="center" color="black">RIGHT</Text>
						</Center>
					</Center>
				</Center>
			</ModalContent>
		</Modal>
	);
}