import React, { useState, useEffect, useRef } from 'react';
import {
    Box,
    VStack,
    HStack,
    Text,
    Icon,
    Button,
    CircularProgress,
    CircularProgressLabel,
    Heading,
    Flex,
    ScaleFade,
    SimpleGrid,
    IconButton,
    Input
} from '@chakra-ui/react';
import { Flower, Wind, Sparkles, Coffee, Timer, Play, X, Plus, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MotionBox = motion.create(Box);

const SoftFocusWidget = ({ onFocusChange, onTimeUpdate }) => {
    const [isActive, setIsActive] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const [totalTime, setTotalTime] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const [customMin, setCustomMin] = useState("");
    const timerRef = useRef(null);

    const durations = [
        { label: "10 min", value: 10 * 60, sub: "To Start" },
        { label: "20 min", value: 20 * 60, sub: "Mini Focus" },
        { label: "30 min", value: 30 * 60, sub: "Deep Session" }
    ];

    // Fix: Move parent state update to an effect that reacts to timeLeft changes
    useEffect(() => {
        onTimeUpdate(timeLeft);
    }, [timeLeft, onTimeUpdate]);

    useEffect(() => {
        if (isActive && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft <= 0 && isActive) {
            handleFinish();
        }
        return () => clearInterval(timerRef.current);
    }, [isActive, timeLeft]);

    const startFocus = (seconds) => {
        if (!seconds || seconds <= 0) return;
        setTimeLeft(seconds);
        setTotalTime(seconds);
        setIsActive(true);
        setIsFinished(false);
        onFocusChange(true);
    };

    const handleCustomStart = () => {
        const mins = parseInt(customMin);
        if (mins > 0) {
            startFocus(mins * 60);
            setCustomMin("");
        }
    };

    const handleFinish = () => {
        setIsActive(false);
        setIsFinished(true);
        clearInterval(timerRef.current);
    };

    const stopFocus = () => {
        setIsActive(false);
        setIsFinished(false);
        setTimeLeft(0);
        onFocusChange(false);
    };

    const addExtraTime = () => {
        const extraTime = 5 * 60;
        setTimeLeft(extraTime);
        setTotalTime(extraTime);
        setIsActive(true);
        setIsFinished(false);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const progress = totalTime > 0 ? ((totalTime - timeLeft) / totalTime) * 100 : 0;

    return (
        <MotionBox
            w="full"
            className="glass-card"
            p={6}
            layout
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            position="relative"
            zIndex={1001}
        >
            <VStack spacing={6} align="stretch">
                <HStack justify="space-between">
                    <HStack spacing={2} color="rose.500">
                        <Icon as={Flower} w={5} h={5} />
                        <Heading size="xs" textTransform="uppercase" letterSpacing="widest">Soft Focus</Heading>
                    </HStack>
                    {(isActive || isFinished) && (
                        <IconButton
                            aria-label="Stop"
                            icon={<X size={16} />}
                            variant="ghost"
                            size="sm"
                            onClick={stopFocus}
                            borderRadius="full"
                        />
                    )}
                </HStack>

                <AnimatePresence mode="wait">
                    {!isActive && !isFinished && (
                        <MotionBox
                            key="selection"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <VStack spacing={5} align="stretch">
                                <Text fontSize="xs" color="gray.400" fontWeight="medium">GENTLE START</Text>
                                <SimpleGrid columns={3} spacing={3}>
                                    {durations.map((d) => (
                                        <Button
                                            key={d.value}
                                            variant="outline"
                                            borderColor="rose.50"
                                            bg="whiteAlpha.400"
                                            h="auto"
                                            py={4}
                                            onClick={() => startFocus(d.value)}
                                            _hover={{ bg: "rose.50", borderColor: "rose.100" }}
                                            display="flex"
                                            flexDirection="column"
                                            gap={1}
                                        >
                                            <Text fontSize="sm" fontWeight="bold" color="rose.600">{d.label}</Text>
                                            <Text fontSize="10px" color="gray.400" fontWeight="normal">{d.sub}</Text>
                                        </Button>
                                    ))}
                                </SimpleGrid>

                                <Box pt={2}>
                                    <HStack spacing={2} bg="rose.50" p={2} borderRadius="xl">
                                        <Input
                                            placeholder="Decide yourself..."
                                            variant="unstyled"
                                            size="sm"
                                            fontSize="xs"
                                            px={2}
                                            value={customMin}
                                            onChange={(e) => setCustomMin(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleCustomStart()}
                                        />
                                        <IconButton
                                            aria-label="Start custom"
                                            icon={<ChevronRight size={14} />}
                                            size="xs"
                                            colorScheme="rose"
                                            borderRadius="full"
                                            onClick={handleCustomStart}
                                        />
                                    </HStack>
                                </Box>
                            </VStack>
                        </MotionBox>
                    )}

                    {isActive && (
                        <MotionBox
                            key="timer"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                        >
                            <VStack spacing={6} py={4}>
                                <Box position="relative">
                                    <CircularProgress
                                        value={progress}
                                        color="rose.300"
                                        size="160px"
                                        thickness="4px"
                                        trackColor="rose.50"
                                    >
                                        <CircularProgressLabel>
                                            <Text fontSize="2xl" fontWeight="light" color="gray.600">
                                                {formatTime(timeLeft)}
                                            </Text>
                                        </CircularProgressLabel>
                                    </CircularProgress>
                                    <MotionBox
                                        position="absolute"
                                        top="-10px"
                                        left="-10px"
                                        right="-10px"
                                        bottom="-10px"
                                        borderRadius="full"
                                        border="1px solid"
                                        borderColor="rose.100"
                                        animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
                                        transition={{ duration: 3, repeat: Infinity }}
                                        pointerEvents="none"
                                    />
                                </Box>
                                <Text fontSize="sm" color="gray.400" fontStyle="italic">
                                    Breathe in, breathe out...
                                </Text>
                            </VStack>
                        </MotionBox>
                    )}

                    {isFinished && (
                        <MotionBox
                            key="finished"
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                        >
                            <VStack spacing={6} py={4} textAlign="center">
                                <Icon as={Sparkles} w={10} h={10} color="rose.400" />
                                <VStack spacing={1}>
                                    <Text fontSize="md" fontWeight="bold" color="gray.700">That was a beautiful focus session.</Text>
                                    <Text fontSize="sm" color="gray.500">Shall we take a little break?</Text>
                                </VStack>
                                <HStack spacing={4}>
                                    <Button
                                        leftIcon={<Plus size={16} />}
                                        colorScheme="rose"
                                        variant="outline"
                                        size="sm"
                                        borderRadius="full"
                                        onClick={addExtraTime}
                                    >
                                        +5 min
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        borderRadius="full"
                                        onClick={stopFocus}
                                    >
                                        End Session
                                    </Button>
                                </HStack>
                            </VStack>
                        </MotionBox>
                    )}
                </AnimatePresence>
            </VStack>
        </MotionBox>
    );
};

export default SoftFocusWidget;
