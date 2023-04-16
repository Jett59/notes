import { TextField } from '@mui/material';
import * as React from 'react';

export default function NoteViewer({ noteContent, setNoteContent }: { noteContent: string, setNoteContent: (noteContent: string) => void }) {
    return <TextField
        fullWidth
        multiline
        value={noteContent}
        onChange={(event) => {
            setNoteContent(event.target.value);
        }}
    />
}
