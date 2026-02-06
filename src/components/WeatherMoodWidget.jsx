import React, { useState, useEffect } from 'react';
import {
    Box,
    Text,
    Flex,
    Icon,
    Spinner,
    VStack,
    HStack,
    Heading,
} from '@chakra-ui/react';
import { Sun, Cloud, CloudRain, Snowflake, CloudLightning, CloudDrizzle, CloudFog, MapPin, AlertTriangle, CalendarDays, Umbrella, ThermometerSnowflake, Waves } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import weatherMessages from '../data/weatherMessages.json';

const MotionBox = motion.create(Box);

const getWeatherIcon = (condition) => {
    switch (condition) {
        case 'Clear': return Sun;
        case 'Clouds': return Cloud;
        case 'Rain': return CloudRain;
        case 'Snow': return Snowflake;
        case 'Thunderstorm': return CloudLightning;
        case 'Drizzle': return CloudDrizzle;
        case 'Mist':
        case 'Fog': return CloudFog;
        default: return Sun;
    }
};

const getWeatherAdvice = (condition, temp) => {
    if (condition === 'Rain' || condition === 'Drizzle' || condition === 'Thunderstorm') {
        return { text: "Taking an umbrella would be wise today, my love.", icon: Umbrella };
    }
    if (temp < 10) {
        return { text: "It's cold out there, please dress warmly for me.", icon: ThermometerSnowflake };
    }
    if (condition === 'Clear' && temp > 20) {
        return { text: "A perfect day for a walk in the sun.", icon: Sun };
    }
    if (condition === 'Clouds') {
        return { text: "A bit gloomy, but your smile brightens everything.", icon: Cloud };
    }
    return { text: "Stay safe and comfortable today.", icon: Waves };
};

const WeatherMoodWidget = () => {
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllWeatherData = async () => {
            const dummy = "121f74c0d5ac41a4ddf635eb18d4b706";
            const lat = 38.6191; // Manisa
            const lon = 27.4289;

            if (!dummy) {
                setTimeout(() => {
                    setWeather({ temp: 8, condition: 'Rain', city: 'Manisa' });
                    setForecast([
                        { dt_txt: '2026-02-07 15:00:00', condition: 'Rain', temp: 7 },
                        { dt_txt: '2026-02-08 09:00:00', condition: 'Clouds', temp: 12 },
                        { dt_txt: '2026-02-08 12:00:00', condition: 'Clear', temp: 15 },
                    ]);
                    setLoading(false);
                }, 1000);
                return;
            }

            try {
                const currentRes = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${dummy}`);
                const currentData = await currentRes.json();

                const forecastRes = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${dummy}`);
                const forecastData = await forecastRes.json();

                setWeather({
                    temp: Math.round(currentData.main.temp),
                    condition: currentData.weather[0].main,
                    city: 'Manisa'
                });

                setForecast(forecastData.list.map(item => ({
                    dt_txt: item.dt_txt,
                    condition: item.weather[0].main,
                    temp: Math.round(item.main.temp)
                })));
            } catch (err) {
                console.error("Weather fetch error", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAllWeatherData();
    }, []);

    const findNextGoodWeather = () => {
        if (!forecast) return null;
        return forecast.find(f => f.condition === 'Clear' || f.condition === 'Clouds');
    };

    const isWeatherBad = weather && (['Rain', 'Snow', 'Thunderstorm', 'Drizzle'].includes(weather.condition) || weather.temp < 10);
    const nextGood = findNextGoodWeather();
    const advice = weather ? getWeatherAdvice(weather.condition, weather.temp) : null;

    if (loading) return (
        <Flex justify="center" align="center" h="100%" className="glass-card" p={10}>
            <Spinner color="rose.500" />
        </Flex>
    );

    return (
        <MotionBox
            w="full"
            h="full"
            className="glass-card"
            p={8}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
        >
            <VStack spacing={6} align="stretch" h="full">
                <HStack justify="space-between" mb={2}>
                    <HStack color="rose.500">
                        <Icon as={MapPin} w={4} h={4} />
                        <Text fontSize="sm" fontWeight="bold" letterSpacing="widest" textTransform="uppercase">Manisa</Text>
                    </HStack>
                    <Box bg="rose.50" px={3} py={1} borderRadius="full">
                        <Text fontSize="lg" fontWeight="extrabold" color="rose.600">{weather?.temp}°C</Text>
                    </Box>
                </HStack>

                <Flex align="center" gap={5}>
                    <Box p={4} borderRadius="2xl" bg="white" color="rose.500" shadow="md">
                        <Icon as={getWeatherIcon(weather?.condition)} w={10} h={10} />
                    </Box>
                    <VStack align="start" spacing={0}>
                        <Text fontSize="sm" color="gray.400" fontWeight="bold">Current Mood</Text>
                        <Text fontSize="xl" color="gray.800" fontWeight="medium">
                            {weatherMessages[weather?.condition] || weatherMessages['default']}
                        </Text>
                    </VStack>
                </Flex>

                {advice && (
                    <Box bg="whiteAlpha.600" p={4} borderRadius="xl" border="1px solid" borderColor="whiteAlpha.800">
                        <HStack spacing={3}>
                            <Icon as={advice.icon} color="rose.400" w={5} h={5} />
                            <Text fontSize="sm" color="gray.700" fontWeight="medium">
                                {advice.text}
                            </Text>
                        </HStack>
                    </Box>
                )}

                <AnimatePresence>
                    {isWeatherBad && (
                        <MotionBox
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            bg="rose.50"
                            p={5}
                            borderRadius="2xl"
                            border="1px solid"
                            borderColor="rose.100"
                        >
                            <VStack align="start" spacing={3}>
                                <HStack color="rose.600">
                                    <Icon as={AlertTriangle} w={5} h={5} />
                                    <Text fontWeight="bold" fontSize="sm">Weather Advisory</Text>
                                </HStack>
                                <Text fontSize="sm" color="rose.700">
                                    It's a bit {weather?.condition.toLowerCase()} today. Stay cozy, my one and only.
                                </Text>
                                {nextGood && (
                                    <HStack pt={2} color="gray.600">
                                        <Icon as={CalendarDays} w={4} h={4} />
                                        <Text fontSize="xs" fontWeight="bold">
                                            Skies expected to clear by {new Date(nextGood.dt_txt).toLocaleDateString(undefined, { weekday: 'short', hour: 'numeric' })}
                                        </Text>
                                    </HStack>
                                )}
                            </VStack>
                        </MotionBox>
                    )}
                </AnimatePresence>
            </VStack>
        </MotionBox>
    );
};

export default WeatherMoodWidget;
