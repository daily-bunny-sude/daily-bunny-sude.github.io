import {
  Box,
  Container,
  VStack,
  Icon,
  Text,
  Flex,
  Grid,
  GridItem,
  Image,
  Heading
} from '@chakra-ui/react';
import BackgroundParticles from './components/BackgroundParticles';
import GreetingWidget from './components/GreetingWidget';
import DailyComplimentWidget from './components/DailyComplimentWidget';
import WeatherMoodWidget from './components/WeatherMoodWidget';
import QuickNoteWidget from './components/QuickNoteWidget';
import MoralSupportWidget from './components/MoralSupportWidget';
import SoftFocusWidget from './components/SoftFocusWidget';
import ComfortClosingWidget from './components/ComfortClosingWidget';
import HeartBurst from './components/HeartBurst';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import { Heart, CloudRain, Flower } from 'lucide-react';

const MotionBox = motion.create(Box);

// Gentle Rain Effect for Focus Mode
const RainEffect = () => {
  const drops = useMemo(() => Array.from({ length: 100 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    duration: 4 + Math.random() * 4,
    delay: Math.random() * 5
  })), []);

  return (
    <Box position="absolute" top={0} left={0} right={0} bottom={0} pointerEvents="none" overflow="hidden">
      {drops.map(drop => (
        <MotionBox
          key={drop.id}
          position="absolute"
          top="-40px"
          left={drop.left}
          w="1.5px"
          h="12px"
          bg="#FB7185"
          borderRadius="full"
          opacity={0.4}
          animate={{ y: ['0vh', '110vh'] }}
          transition={{
            duration: drop.duration,
            repeat: Infinity,
            ease: "linear",
            delay: drop.delay
          }}
        />
      ))}
    </Box>
  );
};

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [showHeartTips, setShowHeartTips] = useState(true);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [focusTimeLeft, setFocusTimeLeft] = useState(0);

  const handleAppClick = () => {
    if (showHeartTips) setShowHeartTips(false);
  };

  const formatFocusTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Box position="relative" onClick={handleAppClick} minH="100vh" overflowX="hidden" pb={20}>
      <BackgroundParticles />

      {/* Focus Mode Overlay Effect */}
      <AnimatePresence>
        {isFocusMode && (
          <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            position="fixed"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg="rgba(255, 255, 255, 0.85)"
            backdropFilter="blur(25px)"
            zIndex={1000}
            pointerEvents="none"
          >
            <RainEffect />

            <Flex direction="column" align="center" justify="center" h="full" w="full" position="relative">
              <VStack spacing={8} zIndex={1002}>
                <MotionBox
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Text
                    fontSize="9xl"
                    fontWeight="thin"
                    color="#F43F5E" // Solid rose-500 hex
                    fontFamily="'Outfit', sans-serif"
                    letterSpacing="tight"
                    textShadow="0 10px 40px rgba(244, 63, 94, 0.2)"
                  >
                    {formatFocusTime(focusTimeLeft)}
                  </Text>
                </MotionBox>
                <Text fontSize="xl" color="gray.500" letterSpacing="0.2em" textTransform="uppercase">
                  drifting through time, in peace...
                </Text>
              </VStack>

              {/* Enhanced Aesthetic Floating Elements (Flowers) */}
              <Box position="absolute" top="10%" left="10%" opacity={0.4} className="floating-slow">
                <Icon as={Flower} w={12} h={12} color="#FDA4AF" />
              </Box>
              <Box position="absolute" top="25%" right="15%" opacity={0.3} className="floating-slow" style={{ animationDelay: '1s' }}>
                <Icon as={Flower} w={16} h={16} color="#FCE7F3" />
              </Box>
              <Box position="absolute" bottom="20%" left="20%" opacity={0.4} className="floating-slow" style={{ animationDelay: '2s' }}>
                <Icon as={Flower} w={10} h={10} color="#FECDD3" />
              </Box>
              <Box position="absolute" bottom="10%" right="10%" opacity={0.5} className="floating-slow" style={{ animationDelay: '1.5s' }}>
                <Icon as={Flower} w={14} h={14} color="#FDA4AF" />
              </Box>
              <Box position="absolute" top="50%" left="5%" opacity={0.2} className="floating-slow" style={{ animationDelay: '3s' }}>
                <Icon as={Flower} w={8} h={8} color="#FBCFE8" />
              </Box>
              <Box position="absolute" top="40%" right="5%" opacity={0.25} className="floating-slow" style={{ animationDelay: '2.5s' }}>
                <Icon as={Flower} w={10} h={10} color="#FDA4AF" />
              </Box>
            </Flex>
          </MotionBox>
        )}
      </AnimatePresence>

      {/* Progress Bar */}
      <motion.div
        style={{
          scaleX,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(to r, #F43F5E, #FB7185)',
          transformOrigin: '0%',
          zIndex: 1000
        }}
      />

      {/* Heart Burst Animation Layer */}
      <HeartBurst />

      {/* High-Aesthetic Floral Overlay */}
      <Box
        position="fixed"
        top="-50px"
        left="-100px"
        opacity={0.6}
        zIndex={0}
        pointerEvents="none"
        as={MotionBox}
        animate={{ rotate: [-2, 2, -2] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={isFocusMode ? { filter: 'blur(10px)', opacity: 0.05 } : {}}
      >
        <Image src="/src/assets/watercolor_flowers_asset.png" w="450px" alt="" filter="blur(2px)" />
      </Box>

      {/* Main Content Container */}
      <Container
        maxW="container.xl"
        py={12}
        position="relative"
        zIndex={1}
      >
        <VStack spacing={16} align="stretch">
          <MotionBox style={isFocusMode ? { filter: 'blur(15px)', opacity: 0.05, pointerEvents: 'none' } : {}}>
            <GreetingWidget />
          </MotionBox>

          <Grid templateColumns="repeat(12, 1fr)" gap={8}>
            {/* Row 1, Left: Main Highlight */}
            <GridItem colSpan={{ base: 12, md: 8 }}>
              <VStack spacing={8} h="full">
                <Box w="full" style={isFocusMode ? { filter: 'blur(15px)', opacity: 0.05, pointerEvents: 'none' } : {}}>
                  <DailyComplimentWidget />
                </Box>

                <SimpleGrid columns={2} spacing={8} w="full">
                  <Box style={isFocusMode ? { filter: 'blur(15px)', opacity: 0.05, pointerEvents: 'none' } : {}}>
                    <QuickNoteWidget />
                  </Box>
                  <Box style={isFocusMode ? { filter: 'blur(15px)', opacity: 0.05, pointerEvents: 'none' } : {}}>
                    <MoralSupportWidget />
                  </Box>
                </SimpleGrid>
              </VStack>
            </GridItem>

            {/* Right Bar: Spans height */}
            <GridItem colSpan={{ base: 12, md: 4 }} rowSpan={{ base: 1, md: 2 }}>
              <VStack spacing={8} h="full">
                <Box w="full" style={isFocusMode ? { filter: 'blur(15px)', opacity: 0.05, pointerEvents: 'none' } : {}}>
                  <WeatherMoodWidget />
                </Box>
                <SoftFocusWidget
                  onFocusChange={setIsFocusMode}
                  onTimeUpdate={setFocusTimeLeft}
                />
              </VStack>
            </GridItem>
          </Grid>

          <MotionBox style={isFocusMode ? { filter: 'blur(15px)', opacity: 0.05, pointerEvents: 'none' } : {}}>
            <ComfortClosingWidget />
          </MotionBox>
        </VStack>
      </Container>

      {/* Click Hint */}
      {showHeartTips && !isFocusMode && (
        <Box
          position="fixed"
          bottom={8}
          left={8}
          zIndex={10}
          as={MotionBox}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3 }}
          pointerEvents="none"
        >
          <VStack spacing={2} align="start">
            <Icon as={Heart} color="#FDA4AF" w={6} h={6} className="pulse" />
            <Text fontSize="xs" color="gray.300" letterSpacing="widest" fontWeight="semibold">CLICK ANYWHERE</Text>
          </VStack>
        </Box>
      )}

      {/* Footer Text */}
      {!isFocusMode && (
        <Flex align="center" direction="column" mt={20}>
          <Text
            fontSize="sm"
            color="gray.400"
            letterSpacing="0.4em"
            textTransform="uppercase"
            mb={4}
          >
            Specially Created for You
          </Text>
          <Box h="1.5px" w="200px" bgGradient="linear(to-r, transparent, rose.200, transparent)" />
        </Flex>
      )}
    </Box>
  );
}

// Simple grid mock for App to match the structure
const SimpleGrid = ({ children, columns, spacing, ...props }) => (
  <Box display="grid" gridTemplateColumns={{ base: "1fr", md: `repeat(${columns}, 1fr)` }} gap={spacing} {...props}>
    {children}
  </Box>
);

export default App;
