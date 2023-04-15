import { Button, CssBaseline, Grid, ThemeProvider, createTheme, useMediaQuery } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import NoteSelector from './NoteSelector';
import { Note } from './note';
import NoteViewer from './NoteViewer';
import { read } from 'fs';

export default function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = useMemo(() => createTheme({
    palette: {
      mode: prefersDarkMode ? 'dark' : 'light',
    },
  }), [prefersDarkMode]);

  const [notes, setNotes] = useState<Note[]>([]);

  const [readNotes, setReadNotes] = useState(false);

  useEffect(() => {
    const notes = localStorage.getItem('notes');
    if (notes) {
      setNotes(JSON.parse(notes));
    }
    setReadNotes(true);
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const [openNoteIndex, setOpenNoteIndex] = useState(0);

  // To make sure there is always a note to have open.
  useEffect(() => {
    if (readNotes && notes.length === 0) {
      setNotes([{
        name: 'New note',
        content: ''
      }]);
    }
  }, [notes, readNotes]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container padding={2} spacing={2}>
        <Grid item md={4}>
          <NoteSelector
            notes={notes}
            newNote={() => {
              setNotes([{
                name: 'New note',
                content: ''
              }, ...notes]);
              setOpenNoteIndex(0);
            }}
            openNote={(index) => {
              setOpenNoteIndex(index);
            }}
          />
        </Grid>
        <Grid item md={8}>
          {notes.length > 0 &&
            <NoteViewer
              noteContent={notes[openNoteIndex].content}
              setNoteContent={(noteContent) => {
                console.log(noteContent);
                let newNotes = [...notes];
                newNotes[openNoteIndex].content = noteContent;
                setNotes(newNotes);
              }}
            />
          }
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
