import React, { useState, useEffect } from 'react';
import { Box, Icon } from '@chakra-ui/react';
import { Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MotionBox = motion.create(Box);

const HeartBurst = () => {
    const [hearts, setHearts] = useState([]);

    useEffect(() => {
        const handleClick = (e) => {
            const { clientX: x, clientY: y } = e;
            const newHearts = Array.from({ length: 12 }).map((_, i) => ({
                id: Math.random(),
                x,
                y,
                angle: (i / 12) * (Math.PI * 2) + (Math.random() - 0.5),
                scale: 0.5 + Math.random() * 0.8,
                speed: 80 + Math.random() * 100
            }));
            setHearts((prev) => [...prev, ...newHearts]);
        };

        // Listen to global click event
        window.addEventListener('click', handleClick);
        return () => {
            window.removeEventListener('click', handleClick);
        };
    }, []);

    return (
        <Box
            position="fixed"
            top={0}
            left={0}
            right={0}
            bottom={0}
            zIndex={9999}
            pointerEvents="none"
        >
            <AnimatePresence>
                {hearts.map((heart) => (
                    <MotionBox
                        key={heart.id}
                        position="absolute"
                        left={`${heart.x}px`}
                        top={`${heart.y}px`}
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{
                            x: Math.cos(heart.angle) * heart.speed,
                            y: Math.sin(heart.angle) * heart.speed + 50, // Gravity effect
                            scale: 0,
                            opacity: 0,
                        }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        onAnimationComplete={() => {
                            setHearts((prev) => prev.filter((h) => h.id !== heart.id));
                        }}
                    >
                        <Icon as={Heart} color="#E11D48" fill="#E11D48" w={6} h={6} />
                    </MotionBox>
                ))}
            </AnimatePresence>
        </Box>
    );
};

export default HeartBurst;
