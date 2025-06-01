import { AddIcon, DeleteIcon, PlusSquareIcon } from '@chakra-ui/icons';
import { Box, Button, HStack, Spacer, Text, Textarea, VStack } from '@chakra-ui/react';
import React from 'react';

type CommentsProps = {
  
};

const AddCommentForm = () => (
  <VStack alignItems="stretch">
    <Textarea></Textarea>
    <HStack justifyContent="end">
      <Button size="xs">
        <AddIcon />
        &nbsp;
        Добавить заметку
      </Button>
    </HStack>
  </VStack>
)

export const Comments = (props: CommentsProps) => {
  return (
    <Box>
      <Text fontWeight={"bold"}>Заметки:</Text>
      <Spacer height={2} />
      <VStack gap={2} alignItems="stretch">
        <VStack gap={2} alignItems="stretch">
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </Text>
          <Text fontSize={12} color="gray">9.05.2025</Text>
        </VStack>
        <VStack gap={2} alignItems="stretch">
          <Text>
            Voluptates, voluptate tempore minima culpa reprehenderit sit dignissimos dolorem qui eaque perspiciatis deserunt corrupti alias quisquam nesciunt? 
          </Text>
          <Text fontSize={12} color="gray">9.05.2025</Text>
        </VStack>
      </VStack>
      <Spacer height={4} />
      <AddCommentForm />
    </Box>
  );
};