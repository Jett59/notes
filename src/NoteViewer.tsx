import { TextField } from '@mui/material';
import * as React from 'react';

export default function NoteViewer({ noteContent, setNoteContent, shouldRequestFocus }: { noteContent: string, setNoteContent: (noteContent: string) => void, shouldRequestFocus: boolean }) {
    return <TextField
        fullWidth
        multiline
        autoFocus
        sx={{
            height: '100%',
            '& .MuiInputBase-root': {
                alignItems: 'stretch',
                height: '100%',
            },
            '& .MuiInputBase-inputMultiline': {
                height: '100% !important',
                overflowY: 'auto !important',
            },
        }}
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
