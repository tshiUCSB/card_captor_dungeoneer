import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
} from '@chakra-ui/react';
import theme from "./theme";
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';

import CardDisplay from "./components/CardDisplay";
import Lightbox from "./components/Lightbox";
import SideScrollSelect from "./components/SideScrollSelect";
import Background from "./assets/bg_img_dim.png";

function App() {
  const CATEGORIES = ["melee", "range", "armor", "skin", "pet"];
  const RANGES = [1, 16, 28, 41, 53, 61];

  const [selected_category, set_selected_category] = useState(0);
  const [lightbox_card, set_lightbox_card] = useState(null);

  return (
    <ChakraProvider theme={theme}>
      <Box 
        w="100vw" 
        minH="100vh" 
        backgroundImage={`url(${Background})`} 
        backgroundAttachment="fixed"
        backgroundPosition="center"
        backgroundSize="cover"
      >
        <Box 
          w="100vw" pos="fixed"
          bgGradient="linear(to-b, black, rgba(0, 0, 0, 0))"
        >
          <SideScrollSelect 
            select_handler={set_selected_category} 
            categories={CATEGORIES}
          />
        </Box>
        <Box w="100vw" py="120px" px="15px">
          <CardDisplay 
            category={CATEGORIES[selected_category]}
            start_idx={RANGES[selected_category]}
            end_idx={RANGES[selected_category + 1] - 1} 
            display_card_handler={set_lightbox_card}
          />
        </Box>

        <Lightbox 
          card_idx={lightbox_card} 
          reset_display={() => set_lightbox_card(null)}
          ranges={RANGES}
        />

        {/*
          <Box textAlign="center" fontSize="xl">
            <Grid minH="100vh" p={3}>
              <ColorModeSwitcher justifySelf="flex-end" />
              <VStack spacing={8}>
                <Logo h="40vmin" pointerEvents="none" />
                <Text>
                  Edit <Code fontSize="xl">src/App.js</Code> and save to reload.
                </Text>
                <Link
                  color="teal.500"
                  href="https://chakra-ui.com"
                  fontSize="2xl"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Learn Chakra
                </Link>
              </VStack>
            </Grid>
          </Box>
        */}
      </Box>
    </ChakraProvider>
  );
}

export default App;
