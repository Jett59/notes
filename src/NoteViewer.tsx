import { TextField } from '@mui/material';
import * as React from 'react';

export default function NoteViewer({ noteContent, setNoteContent, shouldRequestFocus }: { noteContent: string, setNoteContent: (noteContent: string) => void, shouldRequestFocus: boolean }) {
    return <TextField
        fullWidth
        multiline
        autoFocus
        inputRef={input => {
            if (input && shouldRequestFocus) {
                input.focus();
            }
        }}
        value={noteContent}
        onChange={(event) => {
            setNoteContent(event.target.value);
        }}
    />
}
