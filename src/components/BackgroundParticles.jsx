import React, { useEffect, useState } from 'react';
import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const NUM_PARTICLES = 15;
const COLORS = ['#FED7E2', '#FBB6CE', '#F687B3', '#E9D8FD', '#FFF5F7'];

const MotionDiv = motion.create('div');

const BackgroundParticles = () => {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        const newParticles = Array.from({ length: NUM_PARTICLES }).map((_, i) => ({
            id: i,
            size: Math.random() * 200 + 50, // 50px to 250px
            initialX: Math.random() * 100, // vw
            initialY: Math.random() * 100, // vh
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            duration: Math.random() * 20 + 15, // 15s to 35s
            delay: Math.random() * 5,
        }));
        setParticles(newParticles);
    }, []);

    return (
        <Box position="fixed" top={0} left={0} w="100%" h="100%" zIndex={-2} overflow="hidden" pointerEvents="none">
            {particles.map((p) => (
                <MotionDiv
                    key={p.id}
                    style={{
                        position: 'absolute',
                        left: `${p.initialX}%`,
                        top: `${p.initialY}%`,
                        width: p.size,
                        height: p.size,
                        borderRadius: '50%',
                        backgroundColor: p.color,
                        filter: 'blur(60px)',
                        opacity: 0.5,
                    }}
                    animate={{
                        x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
                        y: [0, Math.random() * 100 - 50, Math.random() * 100 - 50, 0],
                        scale: [1, 1.2, 0.8, 1],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "easeInOut",
                        delay: p.delay
                    }}
                />
            ))}
        </Box>
    );
};

export default BackgroundParticles;
