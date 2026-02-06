import React, { useState, useEffect } from 'react';
import { Box, Text, VStack, Heading, Icon, Flex } from '@chakra-ui/react';
import { Sparkles, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MotionBox = motion.create(Box);

const ComfortClosingWidget = () => {
    const [message, setMessage] = useState("");

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12)
            setMessage("Hope your morning starts with a small smile.");
        else if (hour < 18)
            setMessage("Hope your day is going well so far — you deserve that.");
        else
            setMessage("Hope you end the day feeling good about it.");

    }, []);

    return (
        <VStack py={20} spacing={4}>
            <AnimatePresence mode="wait">
                <MotionBox
                    key={message}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <Icon as={Sparkles} w={8} h={8} color="rose.500" />
                </MotionBox>
            </AnimatePresence>

            <MotionBox
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5 }}
                textAlign="center"
            >
                <Text
                    fontSize="2xl"
                    fontFamily="'Playfair Display', serif"
                    fontStyle="italic"
                    color="rose.600"
                    px={4}
                >
                    "{message}"
                </Text>

                <Flex align="center" justify="center" mt={8} gap={3}>
                    <Box h="1px" w="40px" bg="rose.200" />
                    <Icon as={Heart} w={4} h={4} color="rose.400" fill="currentColor" />
                    <Box h="1px" w="40px" bg="rose.200" />
                </Flex>
            </MotionBox>
        </VStack>
    );
};

export default ComfortClosingWidget;
