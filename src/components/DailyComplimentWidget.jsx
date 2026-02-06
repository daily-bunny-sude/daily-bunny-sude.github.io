import React, { useEffect, useState } from 'react';
import { Box, Text, VStack, Flex, Icon } from '@chakra-ui/react';
import { Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import compliments from '../data/compliments.json';
import { getDailyItem } from '../utils/rotation';

const MotionBox = motion.create(Box);

const DailyComplimentWidget = () => {
    const [dailyCompliment, setDailyCompliment] = useState("");

    useEffect(() => {
        setDailyCompliment(getDailyItem(compliments));
    }, []);

    return (
        <MotionBox
            w="full"
            className="glass-card"
            p={8}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ y: -5, boxShadow: "0 12px 40px 0 rgba(255, 182, 193, 0.4)" }}
            position="relative"
            overflow="hidden"
        >
            {/* Subtle glow effect */}
            <Box
                position="absolute"
                top="-10%"
                right="-10%"
                w="100px"
                h="100px"
                bg="brand.100"
                filter="blur(40px)"
                borderRadius="full"
            />

            <VStack spacing={6} align="start">
                <Icon as={Quote} w={10} h={10} color="rose.500" opacity={0.3} />
                <Text
                    fontSize={{ base: "xl", md: "2xl" }}
                    fontFamily="'Playfair Display', serif"
                    color="gray.800"
                    fontWeight="semibold"
                    lineHeight="shorter"
                >
                    {dailyCompliment}
                </Text>
                <Box w="40px" h="4px" bg="rose.500" borderRadius="full" />
            </VStack>
        </MotionBox>
    );
};

export default DailyComplimentWidget;
