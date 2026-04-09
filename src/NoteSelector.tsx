import * as React from 'react';
import { Note } from './note';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Stack, Tooltip } from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import { useState } from 'react';

function DeleteConfirmDialog({ open, onClose, onConfirm }: { open: boolean, onClose: () => void, onConfirm: () => void }) {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Delete Note</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Are you sure you want to delete this note? This action cannot be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">          Cancel     </Button>
                <Button onClick={onConfirm} color="secondary">Delete</Button>
            </DialogActions>
        </Dialog>
    );
}

export default function NoteSelector({ notes, openNote, deleteNote }: { notes: Note[], openNote: (index: number) => void, deleteNote: (index: number) => void }) {
    const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

    return (<>
        <Box sx={{ height: '100%', minHeight: 0, overflowY: 'auto' }}>
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
                                    <IconButton onClick={() => setDeleteIndex(index)}><Delete /></IconButton>
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
        </Box>
        <DeleteConfirmDialog
            open={deleteIndex !== null}
            onClose={() => setDeleteIndex(null)}
            onConfirm={() => {
                if (deleteIndex !== null) {
                    deleteNote(deleteIndex);
                    setDeleteIndex(null);
                }
            }}
        />
    </>);
}
