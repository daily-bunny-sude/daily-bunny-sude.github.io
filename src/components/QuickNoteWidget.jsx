import React, { useState, useEffect } from 'react';
import {
    Box,
    Input,
    VStack,
    Text,
    HStack,
    Icon,
    IconButton,
    Tag,
    TagLabel,
    Flex,
    Heading,
    UnorderedList,
    ListItem
} from '@chakra-ui/react';
import { StickyNote, Plus, Trash2, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MotionBox = motion.create(Box);
const MotionListItem = motion.create(ListItem);

const QuickNoteWidget = () => {
    const [notes, setNotes] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [showSavedToast, setShowSavedToast] = useState(false);

    // Load from localStorage on mount
    useEffect(() => {
        const savedNotes = localStorage.getItem('daily_quick_notes');
        if (savedNotes) {
            try {
                setNotes(JSON.parse(savedNotes));
            } catch (e) {
                setNotes([]);
            }
        }
    }, []);

    const saveToLocal = (newNotes) => {
        localStorage.setItem('daily_quick_notes', JSON.stringify(newNotes));
    };

    const handleAddNote = (e) => {
        if (e.key === 'Enter' || e.type === 'click') {
            if (inputValue.trim() === "") return;

            const newNote = {
                id: Date.now(),
                text: inputValue.trim()
            };

            const updatedNotes = [newNote, ...notes];
            setNotes(updatedNotes);
            saveToLocal(updatedNotes);
            setInputValue("");

            setShowSavedToast(true);
            setTimeout(() => setShowSavedToast(false), 2000);
        }
    };

    const handleDeleteNote = (id) => {
        const updatedNotes = notes.filter(n => n.id !== id);
        setNotes(updatedNotes);
        saveToLocal(updatedNotes);
    };

    return (
        <MotionBox
            w="full"
            h="full"
            className="glass-card"
            p={6}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            display="flex"
            flexDirection="column"
        >
            <VStack align="stretch" spacing={4} h="full">
                <HStack justify="space-between">
                    <HStack spacing={2} color="rose.500">
                        <Icon as={StickyNote} w={5} h={5} />
                        <Heading size="xs" textTransform="uppercase" letterSpacing="widest">Notes For You</Heading>
                    </HStack>
                    <AnimatePresence>
                        {showSavedToast && (
                            <Tag
                                size="sm"
                                colorScheme="green"
                                borderRadius="full"
                                as={motion.div}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <Icon as={CheckCircle2} size={12} mr={1} />
                                <TagLabel fontSize="xs">Added</TagLabel>
                            </Tag>
                        )}
                    </AnimatePresence>
                </HStack>

                <HStack spacing={2}>
                    <Input
                        placeholder="Add a quick note..."
                        variant="unstyled"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleAddNote}
                        fontSize="md"
                        color="gray.700"
                        fontWeight="light"
                        fontStyle="italic"
                        py={2}
                        _placeholder={{ color: "gray.300", fontStyle: "italic" }}
                    />
                    <IconButton
                        aria-label="Add note"
                        icon={<Plus size={18} />}
                        variant="ghost"
                        colorScheme="rose"
                        onClick={handleAddNote}
                        borderRadius="full"
                        size="sm"
                    />
                </HStack>

                <Box h="1px" bg="rose.50" />

                <Box flex="1" overflowY="auto" pr={2} maxH="200px" sx={{
                    '&::-webkit-scrollbar': { width: '4px' },
                    '&::-webkit-scrollbar-track': { background: 'transparent' },
                    '&::-webkit-scrollbar-thumb': { background: '#FED7E2', borderRadius: '10px' }
                }}>
                    <UnorderedList spacing={3} styleType="none" ml={0}>
                        <AnimatePresence initial={false}>
                            {notes.length === 0 ? (
                                <Text fontSize="xs" color="gray.300" textAlign="center" py={4} fontStyle="italic">
                                    No notes yet, write something sweet...
                                </Text>
                            ) : (
                                notes.map((note) => (
                                    <MotionListItem
                                        key={note.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        layout
                                    >
                                        <HStack justify="space-between" p={2} borderRadius="lg" _hover={{ bg: "whiteAlpha.400" }} transition="all 0.2s">
                                            <Text fontSize="sm" color="gray.600" fontWeight="medium">
                                                {note.text}
                                            </Text>
                                            <IconButton
                                                aria-label="Delete note"
                                                icon={<Trash2 size={14} />}
                                                variant="ghost"
                                                color="gray.300"
                                                _hover={{ color: "rose.400", bg: "transparent" }}
                                                onClick={() => handleDeleteNote(note.id)}
                                                size="xs"
                                            />
                                        </HStack>
                                    </MotionListItem>
                                ))
                            )}
                        </AnimatePresence>
                    </UnorderedList>
                </Box>
            </VStack>
        </MotionBox>
    );
};

export default QuickNoteWidget;
