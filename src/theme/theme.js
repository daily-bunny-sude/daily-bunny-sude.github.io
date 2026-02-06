import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    config: {
        initialColorMode: 'light',
        useSystemColorMode: false,
    },
    styles: {
        global: {
            body: {
                bg: 'transparent', // Handled by index.css gradient/orbs
            },
        },
    },
    fonts: {
        heading: "'Playfair Display', serif",
        body: "'Outfit', sans-serif",
    },
    colors: {
        brand: {
            50: '#FFF5F7',
            100: '#FED7E2',
            200: '#FBB6CE',
            300: '#F687B3',
            400: '#ED64A6',
            500: '#D53F8C',
            600: '#B83280',
            700: '#97266D',
            800: '#702459',
            900: '#521B41',
        },
        rose: {
            50: '#FFF1F2',
            100: '#FFE4E6',
            500: '#F43F5E',
            600: '#E11D48',
        }
    },
    components: {
        Heading: {
            baseStyle: {
                fontWeight: 'bold',
                letterSpacing: '-0.02em',
            },
            variants: {
                'romantic': {
                    fontFamily: "'Playfair Display', serif",
                    fontStyle: 'italic',
                }
            }
        },
        Text: {
            baseStyle: {
                lineHeight: 'tall',
            }
        },
        Button: {
            baseStyle: {
                borderRadius: 'full',
            },
        },
    },
});

export default theme;
