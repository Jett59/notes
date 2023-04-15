import * as React from 'react';
import { Note } from './note';
import { Button, Stack } from '@mui/material';
import { Add } from '@mui/icons-material';

export default function NoteSelector({ notes, newNote: addNote, openNote }: { notes: Note[], newNote: () => void, openNote: (index: number) => void }) {
    return (
        <Stack
            direction="column"
            spacing={2}
            padding={2}
        >
            <Button
                endIcon={<Add />}
                variant="outlined"
                onClick={() => addNote()}
                accessKey='n'
            >
                Add Note
            </Button>
            {notes.map((note, index) => (
                <Button
                    key={index}
                    fullWidth
                    variant="outlined"
                    onClick={() => openNote(index)}
                >
                    {note.name === 'New note' && note.content !== ''
                        ? note.content.split('\n')[0]
                        : note.name
                    }
                </Button>
            ))}
        </Stack>
    );
}
