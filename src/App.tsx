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
        content: ''
      }]);
    }
  }, [notes, readNotes]);

  const [shouldPutFocusOnNote, setShouldPutFocusOnNote] = useState(true);

  // Make sure shouldPutFocusOnNote is only true for a single frame.
  useEffect(() => {
    if (shouldPutFocusOnNote) {
      setShouldPutFocusOnNote(false);
    }
  }, [shouldPutFocusOnNote]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container padding={2} spacing={2}>
        <Grid item md={4}>
          <NoteSelector
            notes={notes}
            openNote={(index) => {
              setOpenNoteIndex(index);
              setShouldPutFocusOnNote(true);
            }}
            deleteNote={(index) => {
              // If it is the current note, go to the new note (index 0).
              // If it is after the current note, do nothing.
              // Otherwise decrement the open index.
              if (index === openNoteIndex) {
                setOpenNoteIndex(0);
              } else if (index < openNoteIndex) {
                setOpenNoteIndex(openNoteIndex - 1);
              }
              let newNotes = [...notes];
              newNotes.splice(index, 1);
              setNotes(newNotes);
            }}
          />
        </Grid>
        <Grid item md={8}>
          {notes.length > 0 &&
            <NoteViewer
              noteContent={notes[openNoteIndex].content}
              setNoteContent={(noteContent) => {
                let newNotes = [...notes];
                newNotes[openNoteIndex].content = noteContent;
                if (openNoteIndex === 0) {
                  newNotes = [{
                    content: ''
                  }, ...notes];
                  setOpenNoteIndex(1);
                }
                setNotes(newNotes);
              }}
              shouldRequestFocus={shouldPutFocusOnNote}
            />
          }
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
