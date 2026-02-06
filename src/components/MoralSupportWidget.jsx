import React from 'react';
import {
    Box,
    VStack,
    Text,
    Icon,
    Heading,
    Divider
} from '@chakra-ui/react';
import { Sparkles, Heart, Star, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const MotionBox = motion.create(Box);

const supportMessages = [
    {
        title: "You are enough",
        text: "Just as you are, in this very moment. You don't need to do more to be loved.",
        icon: Heart,
        color: "rose.400"
    },
    {
        title: "Strength",
        text: "You have handled 100% of your bad days so far. You're doing great, my love.",
        icon: ShieldCheck,
        color: "blue.400"
    },
    {
        title: "Keep Going",
        text: "Every small step counts. I'm so proud of how far you've come.",
        icon: Star,
        color: "amber.400"
    }
];

const MoralSupportWidget = () => {
    return (
        <MotionBox
            w="full"
            h="full"
            className="glass-card"
            p={6}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            display="flex"
            flexDirection="column"
        >
            <VStack align="stretch" spacing={5} h="full">
                <Box>
                    <Heading size="xs" color="rose.500" textTransform="uppercase" letterSpacing="widest" mb={1}>
                        Safe Space
                    </Heading>
                    <Text fontSize="xs" color="gray.400" fontWeight="medium">LITTLE REMINDERS</Text>
                </Box>

                <VStack align="stretch" spacing={4} flex="1" justify="center">
                    {supportMessages.map((m, i) => (
                        <Box key={i} position="relative" pl={8}>
                            <Icon
                                as={m.icon}
                                position="absolute"
                                left={0}
                                top={1}
                                color={m.color}
                                w={5}
                                h={5}
                                opacity={0.8}
                            />
                            <VStack align="start" spacing={0}>
                                <Text fontSize="sm" fontWeight="bold" color="gray.700">
                                    {m.title}
                                </Text>
                                <Text fontSize="xs" color="gray.500" fontStyle="italic" lineHeight="tall">
                                    "{m.text}"
                                </Text>
                            </VStack>
                            {i < supportMessages.length - 1 && (
                                <Box h="1px" bg="gray.50" mt={4} />
                            )}
                        </Box>
                    ))}
                </VStack>
            </VStack>
        </MotionBox>
    );
};

export default MoralSupportWidget;
