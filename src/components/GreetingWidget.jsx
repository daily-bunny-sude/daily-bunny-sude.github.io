import React, { useState, useEffect } from 'react';
import { Box, Text, VStack, Heading, Image, Flex, Icon } from '@chakra-ui/react';
import { Rabbit } from 'lucide-react';
import { motion } from 'framer-motion';

const nicknames = ["My Angel", "My Everything", "My Heart", "Bunny", "My Beloved"];

const getTurkeyGreeting = () => {
    // Get current time in Istanbul
    const turkeyDate = new Date().toLocaleString("en-US", { timeZone: "Europe/Istanbul" });
    const hour = new Date(turkeyDate).getHours();

    if (hour >= 5 && hour < 12) return "Good Morning";
    if (hour >= 12 && hour < 18) return "Good Afternoon";
    if (hour >= 18 && hour < 22) return "Good Evening";
    return "Good Night";
};

const MotionDiv = motion.create('div');
const MotionBox = motion.create(Box);

const GreetingWidget = () => {
    const [greeting, setGreeting] = useState(getTurkeyGreeting());
    const [nickname, setNickname] = useState("");

    useEffect(() => {
        const updateGreeting = () => {
            setGreeting(getTurkeyGreeting());
        };

        const interval = setInterval(updateGreeting, 60000);
        updateGreeting();

        const dayOfYear = Math.floor((new Date() - new Date(new Date().getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
        setNickname(nicknames[dayOfYear % nicknames.length]);

        return () => clearInterval(interval);
    }, []);

    return (
        <VStack spacing={6} pt={8} pb={4} w="full" textAlign="center" position="relative">
            <MotionDiv
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
            >
                <Heading
                    fontSize={{ base: "5xl", md: "8xl" }}
                    variant="romantic"
                    color="rose.600"
                    lineHeight="1"
                    mb={2}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    gap={4}
                >
                    <Box textAlign="center">
                        {greeting}, <br /> {nickname}
                    </Box>
                    <Icon as={Rabbit} w={{ base: 10, md: 16 }} h={{ base: 10, md: 16 }} color="rose.300" />
                </Heading>
            </MotionDiv>

            <MotionDiv
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 1 }}
            >
                <Text fontSize="2xl" color="gray.600" fontWeight="light" fontStyle="italic">
                    Your daily dose of love, just for you.
                </Text>
            </MotionDiv>

            {/* Small floating flower nearby */}
            <MotionBox
                position="absolute"
                top="-20px"
                right="10%"
                animate={{ y: [0, 10, 0], rotate: [0, 15, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                pointerEvents="none"
            >
                <Image src="/watercolor_flowers_accent.svg" width="60px" opacity={0.4} />
            </MotionBox>
        </VStack>
    );
};

export default GreetingWidget;
