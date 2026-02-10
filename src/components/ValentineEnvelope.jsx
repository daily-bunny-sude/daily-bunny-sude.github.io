import React, { useState } from 'react';
import { Box, Text, VStack, Icon, Image } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Flower, X } from 'lucide-react';

const MotionBox = motion.create(Box);
const MotionVStack = motion.create(VStack);
const MotionImage = motion.create(Image);

const FloatingParticles = () => {
    return (
        <Box position="absolute" top="0" left="0" w="full" h="full" pointerEvents="none" zIndex={15}>
            {[...Array(6)].map((_, i) => (
                <MotionBox
                    key={i}
                    position="absolute"
                    initial={{
                        opacity: 0,
                        scale: 0.5,
                        x: Math.random() * 200 - 100,
                        y: 0
                    }}
                    animate={{
                        opacity: [0, 1, 0],
                        scale: [0.5, 1, 0.5],
                        y: -300,
                        x: (Math.random() * 200 - 100) + (i % 2 === 0 ? 50 : -50)
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2
                    }}
                >
                    <Icon
                        as={i % 2 === 0 ? Heart : Flower}
                        color={i % 3 === 0 ? "#FDA4AF" : "#FECDD3"}
                        w={4}
                        h={4}
                    />
                </MotionBox>
            ))}
        </Box>
    );
};

const Explosion = () => {
    return (
        <Box position="absolute" top="50%" left="50%" zIndex={25} pointerEvents="none">
            {[...Array(20)].map((_, i) => (
                <MotionBox
                    key={`exp-${i}`}
                    position="absolute"
                    initial={{ scale: 0, opacity: 1, x: 0, y: 0 }}
                    animate={{
                        scale: [0, 1.2, 0.5],
                        opacity: [1, 1, 0],
                        x: (Math.random() - 0.5) * 800,
                        y: (Math.random() - 0.5) * 800,
                        rotate: Math.random() * 720
                    }}
                    transition={{ duration: 2, ease: "easeOut", delay: 0.2 }}
                >
                    <Icon
                        as={i % 2 === 0 ? Heart : Flower}
                        color={i % 3 === 0 ? "#FB7185" : "#F472B6"} // Vibrant pinks
                        fill={i % 2 === 0 ? "#FB7185" : "transparent"}
                        w={6}
                        h={6}
                    />
                </MotionBox>
            ))}
        </Box>
    );
};

const ValentineEnvelope = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Envelope dimensions
    const envelopeWidth = { base: "300px", md: "460px" };
    const envelopeHeight = { base: "200px", md: "300px" };

    return (
        <MotionVStack
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 3.5, duration: 1 }}
            spacing={8}
            position="relative"
            zIndex={20}
        >
            <Box position="relative" w={envelopeWidth} h={envelopeHeight} style={{ perspective: '1200px' }}>

                {/* Explosion effect when open */}
                {isOpen && <Explosion />}

                {/* Floating Elements when open */}
                {isOpen && <FloatingParticles />}

                {/* Backdrop overlay when open */}
                <AnimatePresence>
                    {isOpen && (
                        <MotionBox
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            position="fixed"
                            top="0"
                            left="0"
                            w="100vw"
                            h="100vh"
                            bg="rgba(0,0,0,0.7)"
                            backdropFilter="blur(8px)"
                            zIndex={30}
                            onClick={() => setIsOpen(false)}
                        />
                    )}
                </AnimatePresence>

                {/* The Letter */}
                <AnimatePresence>
                    {isOpen && (
                        <MotionBox
                            initial={{
                                x: "-50%",
                                y: "100%", // Start from envelope position (approx)
                                opacity: 0,
                                scale: 0.5,
                                zIndex: 1
                            }}
                            animate={{
                                x: "-50%",
                                y: ["50vh", "-60vh", "-50%"], // Fly up high, then settle at exact center
                                scale: [0.5, 1, 1],
                                opacity: [0, 1, 1],
                                zIndex: 50
                            }}
                            exit={{ x: "-50%", y: "100%", opacity: 0, scale: 0.5 }}
                            transition={{
                                duration: 2.2,
                                times: [0, 0.4, 1],
                                ease: "circOut"
                            }}
                            position="fixed"
                            top="50%"
                            left="50%"
                            w={{ base: "90vw", md: "500px" }}
                            maxH="80vh"
                            bg="white"
                            boxShadow="0 20px 60px rgba(0,0,0,0.3)"
                            p={{ base: 6, md: 10 }}
                            borderRadius="3xl"
                            border="2px solid"
                            borderColor="rose.50"
                            display="flex"
                            flexDirection="column"
                            overflow="visible" // Allow decorations to peek out
                        >
                            {/* Close Button at Top Right */}
                            <Box
                                position="absolute"
                                top="-10px"
                                right="-10px"
                                zIndex={75}
                                cursor="pointer"
                                onClick={() => setIsOpen(false)}
                                as={motion.div}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                bg="white"
                                w="32px"
                                h="32px"
                                borderRadius="full"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                boxShadow="0 4px 12px rgba(0,0,0,0.15)"
                                border="1px solid"
                                borderColor="rose.100"
                            >
                                <Icon as={X} w={5} h={5} color="#F43F5E" />
                            </Box>

                            {/* Decorative Sparkles - NOW PINK */}
                            <Box position="absolute" top="-10px" left="-10px" zIndex={60}>
                                <MotionBox
                                    animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                                    transition={{ duration: 3, repeat: Infinity }}
                                >
                                    <Icon as={Flower} color="pink.400" w={8} h={8} />
                                </MotionBox>
                            </Box>
                            <Box position="absolute" bottom="-10px" right="-10px" zIndex={60}>
                                <MotionBox
                                    animate={{ rotate: -360, scale: [1, 1.2, 1] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                >
                                    <Icon as={Flower} color="pink.400" w={8} h={8} />
                                </MotionBox>
                            </Box>

                            {/* Animated Glitters/Stars inside the letter */}
                            {[...Array(4)].map((_, i) => (
                                <MotionBox
                                    key={`star-${i}`}
                                    position="absolute"
                                    top={i < 2 ? "10%" : "85%"}
                                    left={i % 2 === 0 ? "5%" : "90%"}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                                >
                                    <Icon as={Heart} fill="rose.100" color="rose.100" w={3} h={3} />
                                </MotionBox>
                            ))}

                            <VStack
                                spacing={8}
                                w="full"
                                align="center"
                                position="relative"
                                zIndex={55}
                                overflowY="auto"
                                px={4}
                                py={2}
                                css={{
                                    '&::-webkit-scrollbar': {
                                        width: '4px',
                                    },
                                    '&::-webkit-scrollbar-track': {
                                        background: 'transparent',
                                    },
                                    '&::-webkit-scrollbar-thumb': {
                                        background: '#FDA4AF',
                                        borderRadius: '24px',
                                    },
                                }}
                            >
                                <Box w="full">
                                    <VStack align="start" spacing={4}>
                                        <Text color="#F43F5E" fontFamily="'Playfair Display', serif" fontSize="3xl" fontStyle="italic">
                                            To My Bunny,
                                        </Text>
                                        <Box w="80px" h="2px" bgGradient="linear(to-r, rose.400, transparent)" borderRadius="full" />
                                    </VStack>
                                </Box>

                                <VStack spacing={6} align="start" w="full">
                                    <Text color="gray.600" fontSize="lg" lineHeight="1.8" fontFamily="'Outfit', sans-serif">
                                        Even though we haven’t known each other for a long time, talking to you every single day and thinking about you fills me with an overwhelming kind of happiness. There’s something about you that quietly takes over my thoughts   in the best possible way.
                                    </Text>
                                    <Text color="gray.600" fontSize="lg" lineHeight="1.8" fontFamily="'Outfit', sans-serif">
                                        Everything about you is beautiful, and I still don’t quite know how to explain <i>you</i> to yourself. I wish you could see yourself, even just for a moment, through my eyes   because then you would finally understand how extraordinary you truly are. And even if you don’t see it yet, you can be sure of this: I will always do everything I can to make you feel it.
                                    </Text>
                                    <Text color="gray.600" fontSize="lg" lineHeight="1.8" fontFamily="'Outfit', sans-serif">
                                        When I talk to you, I feel completely safe. You are my safe place   the place where I can be fully myself without hesitation or fear. I feel comfortable, understood, calm… and genuinely happy. Talking to you never feels like enough; the more we talk, the more I want to keep going.
                                    </Text>
                                    <Text color="gray.600" fontSize="lg" lineHeight="1.8" fontFamily="'Outfit', sans-serif">
                                        And every time I see you, even through a screen, my heart starts racing. Your beauty is impossible to contain in words   if I tried, it wouldn’t fit into books. There is something about you that feels unreal, as if you exist beyond the ordinary limits of this world. You are so rare, so striking, that you challenge my entire sense of reality. Nothing about you is ordinary, and nothing could ever compare to you.
                                    </Text>
                                    <Text color="gray.600" fontSize="lg" lineHeight="1.8" fontFamily="'Outfit', sans-serif">
                                        Even though there is distance between us, and even though we haven’t met in person yet, it has never felt like a barrier to me. Because what we share feels real, deep, and sincere   and distance doesn’t take that away. If anything, it makes every word, every moment, and every feeling even more meaningful. I already feel close to you in all the ways that truly matter.
                                    </Text>
                                    <Text color="gray.600" fontSize="lg" lineHeight="1.8" fontFamily="'Outfit', sans-serif">
                                        This Valentine’s Day isn’t just about hearts or date on the calendar. It’s about you   the way you make me feel, the way you exist in my life, and the quiet but powerful connection we’re building. No matter the distance, you matter to me more than you know.
                                    </Text>
                                </VStack>

                                {/* QR Code Section */}
                                <VStack spacing={3} w="full" pt={4} borderTop="1px dashed" borderColor="rose.100">
                                    <MotionBox
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 1.5, duration: 0.8 }}
                                    >
                                        <Image
                                            src="/src/assets/qrcode.png"
                                            alt="QR Code"
                                            w="140px"
                                            h="140px"
                                            borderRadius="lg"
                                            boxShadow="lg"
                                        />
                                    </MotionBox>
                                    <Text color="rose.300" fontSize="xs" letterSpacing="0.2em" textTransform="uppercase">
                                        Scan for your surprise
                                    </Text>
                                </VStack>

                                <Box w="full" textAlign="right" pt={4}>
                                    <Text color="rose.400" textAlign="center" fontWeight="600" fontSize="xl" fontFamily="'Playfair Display', serif">
                                        I Love You ❤️
                                    </Text>
                                    <Text color="#F43F5E" fontWeight="bold" fontSize="lg" fontFamily="'Outfit', sans-serif">
                                        Erberk
                                    </Text>
                                </Box>
                            </VStack>
                        </MotionBox>
                    )}
                </AnimatePresence>

                {/* Envelope Back */}
                <Box
                    position="absolute"
                    bottom="0"
                    w="full"
                    h="full"
                    bg="#FECDD3"
                    borderRadius="2xl"
                    boxShadow="0 15px 40px rgba(0,0,0,0.15)"
                    zIndex={0}
                />

                {/* Envelope Front Flaps */}
                <Box
                    position="absolute"
                    bottom="0"
                    w="full"
                    h="full"
                    zIndex={2}
                    overflow="hidden"
                    borderRadius="2xl"
                    pointerEvents="none"
                >
                    {/* Bottom flap triangle */}
                    <Box
                        position="absolute"
                        bottom="0"
                        left="0"
                        borderStyle="solid"
                        borderWidth={{ base: "0 150px 110px 150px", md: "0 230px 140px 230px" }}
                        borderColor={`transparent transparent #FDA4AF transparent`}
                    />
                    {/* Left flap triangle */}
                    <Box
                        position="absolute"
                        top="0"
                        left="0"
                        borderStyle="solid"
                        borderWidth={{ base: "100px 0 100px 150px", md: "150px 0 150px 230px" }}
                        borderColor={`transparent transparent transparent #FBCFE8`}
                    />
                    {/* Right flap triangle */}
                    <Box
                        position="absolute"
                        top="0"
                        right="0"
                        borderStyle="solid"
                        borderWidth={{ base: "100px 150px 100px 0", md: "150px 230px 150px 0" }}
                        borderColor={`transparent #FBCFE8 transparent transparent`}
                    />
                </Box>

                {/* Top Flap */}
                <MotionBox
                    position="absolute"
                    top="0"
                    left="0"
                    w="full"
                    h="full"
                    transformOrigin="top"
                    initial={false}
                    animate={{ rotateX: isOpen ? -160 : 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    zIndex={isOpen ? 0 : 3}
                    style={{ transformStyle: 'preserve-3d' }}
                >
                    <Box
                        position="absolute"
                        top="0"
                        left="0"
                        borderStyle="solid"
                        borderWidth={{ base: "110px 150px 0 150px", md: "160px 230px 0 230px" }}
                        borderColor={`#FBCFE8 transparent transparent transparent`}
                        borderRadius="2xl"
                        boxShadow={isOpen ? "none" : "0 8px 20px rgba(0,0,0,0.1)"}
                        style={{ backfaceVisibility: 'hidden' }}
                    />
                    <Box
                        position="absolute"
                        top="0"
                        left="0"
                        borderStyle="solid"
                        borderWidth={{ base: "110px 150px 0 150px", md: "160px 230px 0 230px" }}
                        borderColor={`#FECDD3 transparent transparent transparent`}
                        transform="rotateX(180deg)"
                        style={{ backfaceVisibility: 'hidden' }}
                    />
                </MotionBox>

                {/* Address Labels (Visible when closed) */}
                {!isOpen && (
                    <Box
                        position="absolute"
                        top="0"
                        left="0"
                        w="full"
                        h="full"
                        zIndex={4}
                        pointerEvents="none"
                        p={{ base: 4, md: 8 }}
                        fontFamily="'Playfair Display', serif"
                    >
                        <MotionBox
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 0.7, x: 0 }}
                            transition={{ delay: 4.5, duration: 1 }}
                        >
                            <VStack align="start" spacing={0} color="rose.800">
                                <Text fontSize="xs" fontWeight="bold" opacity={0.6}>FROM:</Text>
                                <Text fontSize={{ base: "sm", md: "md" }}>Erberk</Text>
                                <Text fontSize="xs" fontWeight="bold" opacity={0.6} mt={2}>DATE:</Text>
                                <Text fontSize={{ base: "xs", md: "sm" }}>14.02.2026</Text>
                            </VStack>
                        </MotionBox>

                        <MotionBox
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 4.8, duration: 1 }}
                            position="absolute"
                            top={{ base: 4, md: 8 }}
                            right={{ base: 4, md: 8 }}
                        >
                            <VStack align="end" spacing={0} color="rose.900" textAlign="right">
                                <Text fontSize="xs" fontWeight="bold" opacity={0.6}>TO:</Text>
                                <Text
                                    fontSize={{ base: "sm", md: "md" }}
                                    fontWeight="bold"
                                    letterSpacing="wider"
                                    fontStyle="italic"
                                >
                                    Sude
                                </Text>
                            </VStack>
                        </MotionBox>
                    </Box>
                )}

                {/* Heart Seal */}
                {!isOpen && (
                    <Box
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        zIndex={10}
                    >
                        <MotionBox
                            cursor="pointer"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setIsOpen(true)}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            position="relative"
                        >
                            <Box
                                position="absolute"
                                w="64px"
                                h="64px"
                                bg="white"
                                borderRadius="full"
                                opacity={0.8}
                                boxShadow="0 0 20px rgba(255,255,255,0.6)"
                            />
                            <Icon as={Heart} w={10} h={10} color="#E11D48" fill="#E11D48" position="relative" />
                        </MotionBox>
                    </Box>
                )}
            </Box>

            {!isOpen && (
                <MotionBox
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.4, 0.9, 0.4] }}
                    transition={{ repeat: Infinity, duration: 2.5 }}
                >
                    <Text color="rose.200" letterSpacing="0.4em" fontSize="xs" textTransform="uppercase">
                        Tap the heart to reveal your letter
                    </Text>
                </MotionBox>
            )}

            {isOpen && (
                <MotionBox
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5 }}
                >
                    <Text
                        cursor="pointer"
                        color="rose.300"
                        fontSize="sm"
                        textDecoration="underline"
                        onClick={() => setIsOpen(false)}
                        fontFamily="'Outfit', sans-serif"
                    >
                        Close envelope
                    </Text>
                </MotionBox>
            )}
        </MotionVStack>
    );
};

export default ValentineEnvelope;
