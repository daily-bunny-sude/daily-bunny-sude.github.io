import React from 'react';
import { Box, Heading, Text, VStack } from '@chakra-ui/react';
import FlowerAnimation from '../components/FlowerAnimation';
import ValentineEnvelope from '../components/ValentineEnvelope';
import { motion } from 'framer-motion';
import { Heart, Flower } from 'lucide-react';
import { Icon } from '@chakra-ui/react';

const MagicFountain = () => {
    // Create more particles for a fuller effect
    const particles = [...Array(12)];

    return (
        <Box
            position="absolute"
            bottom="0"
            left="50%"
            transform="translateX(-50%)"
            w="2px"
            h="2px"
            zIndex={1}
            pointerEvents="none"
        >
            {particles.map((_, i) => (
                <motion.div
                    key={i}
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                    }}
                    initial={{
                        opacity: 0,
                        scale: 0.2,
                        x: 0,
                        y: 0
                    }}
                    animate={{
                        opacity: [0, 0.6, 0.6, 0],
                        scale: [0.2, 1.2, 1.5, 1],
                        y: -800, // Rise up high
                        x: (i % 2 === 0 ? 1 : -1) * (Math.random() * 400 + 50) * (i / 12 + 0.5), // Fan out
                        rotate: Math.random() * 360
                    }}
                    transition={{
                        duration: 8 + Math.random() * 4, // Very slow motion
                        repeat: Infinity,
                        delay: i * 0.8,
                        ease: "easeOut"
                    }}
                >
                    <Icon
                        as={i % 3 === 0 ? Heart : Flower}
                        color={i % 2 === 0 ? "rose.200" : "pink.100"}
                        w={6}
                        h={6}
                        filter="blur(0.5px)"
                    />
                </motion.div>
            ))}
        </Box>
    );
};

const ValentinePage = () => {
    return (
        <Box
            minH="100vh"
            bg="black"
            position="relative"
            overflow="hidden"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
        >
            {/* Magic Fountain of Hearts and Flowers */}
            <MagicFountain />

            {/* Background Glow */}
            <Box
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                w="100%"
                h="100%"
                bgGradient="radial(circle, rgba(244, 63, 94, 0.15) 0%, transparent 70%)"
                pointerEvents="none"
            />

            <VStack spacing={12} zIndex={5} textAlign="center" px={4}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <Heading
                        fontSize={{ base: "4xl", md: "6xl" }}
                        fontWeight="thin"
                        color="#FECDD3"
                        fontFamily="'Outfit', sans-serif"
                        letterSpacing="widest"
                    >
                        HAPPY VALENTINE'S DAY
                    </Heading>
                </motion.div>

                {/* The Envelope Component */}
                <ValentineEnvelope />

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5, delay: 1.5 }}
                >
                    <Text
                        fontSize="lg"
                        color="rose.100"
                        letterSpacing="0.3em"
                        textTransform="uppercase"
                        opacity={0.8}
                    >
                        FOR MY BUNNY
                    </Text>
                </motion.div>
            </VStack>

            {/* Flower Animations on both sides */}
            <FlowerAnimation position="left" />
            <FlowerAnimation position="right" />
        </Box>
    );
};

export default ValentinePage;
