import { useState } from 'react';
import { AddIcon } from '@chakra-ui/icons';
import { Box, Button, HStack, Link, Spacer, Text, Textarea, VStack } from '@chakra-ui/react';
import { useLoadNotes } from '../api/queries/notes.query';
import { Note } from '../models/types';
import { useAddNoteMutation, useDeleteNoteMutation } from '../api/mutations/notes.mutation';
import { useQueryClient } from '@tanstack/react-query';

type AddCommentFormProps = {
  clientId: number;
}

const AddNoteForm = ({ clientId }: AddCommentFormProps) => {
  const [value, setValue] = useState('');
  
  const addNoteMutation = useAddNoteMutation();

  const queryClient = useQueryClient();
  
  const handleSubmit = () => {
    if (!value.trim()) {
      return;
    }

    addNoteMutation.mutate({ content: value, clientId }, {
      onSuccess: () => {
        setValue('');
        queryClient.invalidateQueries({ queryKey: ['notes', clientId] });
      },
    });
  }
  
  return (
    <VStack alignItems="stretch">
      <Textarea value={value} onChange={(e) => setValue(e.target.value)} />
      <HStack justifyContent="end">
        <Button colorScheme="blue" size="sm" isLoading={addNoteMutation.status === 'pending'} leftIcon={<AddIcon />} onClick={handleSubmit}>
          Добавить заметку
        </Button>
      </HStack>
    </VStack>
  );
};


type NotesListProps = {
  clientId?: number;
};

export const NotesList = ({ clientId }: NotesListProps) => {
  const { data: notes } = useLoadNotes(clientId);

  const deleteNoteMutation = useDeleteNoteMutation();
  const queryClient = useQueryClient();
  
  if (!clientId) {
    return <Text>Клиент не выбран</Text>;
  }

  const handleDelete = (noteId: number) => {
    deleteNoteMutation.mutate({ clientId, noteId }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['notes', clientId] });
      },
    });
  }
  
  if (!notes || notes.length === 0) {
    return (
      <Box>
        <Text fontWeight={"bold"}>Заметки:</Text>
        <Spacer height={2} />
        <Text>Список заметок пуст</Text>
        <Spacer height={4} />
        <AddNoteForm clientId={clientId} />
      </Box>
    );
  }
  
  return (
    <Box>
      <Text fontWeight={"bold"}>Заметки:</Text>
      <Spacer height={2} />
      <VStack gap={2} alignItems="stretch">
        {notes?.length === 0 && (
          <Text>Нет заметок о клиенте</Text>
        )}
        {notes?.map((note: Note) => (
          <VStack key={note.id} gap={2} alignItems="stretch">
            <Text>
              {note.content}
            </Text>
            <HStack gap={2}>
              <Text fontSize={12} color="gray">{new Date(note.created_at).toLocaleDateString()}</Text>
              <Link onClick={() => handleDelete(note.id)} fontSize={12} color="gray">Удалить</Link>
            </HStack>
          </VStack>
        ))}
      </VStack>
      <Spacer height={4} />
      <AddNoteForm clientId={clientId} />
    </Box>
  );
};