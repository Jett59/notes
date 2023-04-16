import * as React from 'react';
import { Note } from './note';
import { Button, IconButton, Stack, Tooltip } from '@mui/material';
import { Delete } from '@mui/icons-material';

export default function NoteSelector({ notes, openNote, deleteNote }: { notes: Note[], openNote: (index: number) => void, deleteNote: (index: number) => void }) {
    return (
        <Stack
            direction="column"
            spacing={2}
            padding={2}
        >
            {notes.map((note, index) => (
                <Stack
                    key={index}
                    direction="row"
                    spacing={1}
                    padding={1}
                >
                    <Button
                        fullWidth
                        variant="outlined"
                        onClick={() => openNote(index)}
                    >
                        {note.content !== ''
                            ? note.content.split('\n')[0]
                            : 'New note'
                        }
                    </Button>
                    {index !== 0 &&
                        <Tooltip title="Delete">
                            <IconButton onClick={() => deleteNote(index)}><Delete /></IconButton>
                        </Tooltip>
                    }
                </Stack>
            ))}
        </Stack>
    );
}
