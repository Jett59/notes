import * as React from 'react';
import { Note } from './note';
import { Button, IconButton, Stack, Tooltip } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';

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
                    {index !== 0
                        ? <><Button
                            fullWidth
                            variant="outlined"
                            onClick={() => openNote(index)}
                        >
                            {note.content.trim() !== ''
                                ? note.content.split('\n').find(line => line.trim() !== '')
                                : 'New note'
                            }
                        </Button>
                            <Tooltip title="Delete">
                                <IconButton onClick={() => deleteNote(index)}><Delete /></IconButton>
                            </Tooltip>
                        </>
                        : <Button
                            fullWidth
                            variant="outlined"
                            endIcon={<Add />}
                            accessKey="n"
                            onClick={() => openNote(index)}
                        >
                            New Note
                        </Button>
                    }
                </Stack>
            ))
            }
        </Stack >
    );
}
