import { Button, FormLabel, Input, Stack, Textarea, useToast } from "@chakra-ui/react";
import { Field, Form } from "react-final-form";
import { isRequired } from "../../shared/validators";
import { useQueryClient } from "@tanstack/react-query";
import { Interaction } from "../../models/types";
import { useAddInteractionMutation, useEditInteractionMutation } from "../../api/mutations/interactions.mutation";

type InteractionFormProps = {
  clientId: number;
  data?: Interaction;
  onSubmit: () => void;
};

type InteractionFormData = {
  date: string;
  content: string;
};

const getInitialData = (data: Interaction): InteractionFormData => {
  return {
    date: data.date,
    content: data.content,
  };
};

export const InteractionForm = ({ clientId, data, onSubmit }: InteractionFormProps) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const addInteractionMutation = useAddInteractionMutation();
  const editInteractionMutation = useEditInteractionMutation();

  const handleFormSubmit = (values: InteractionFormData) => {
    if (data) {
      editInteractionMutation.mutate({
        date: values.date,
        content: values.content,
        clientId,
        interactionId: data.id,
      }, {
        onSuccess: () => {
          toast({
            title: 'Успех!',
            description: 'Контакт изменён',
            status: 'success',
            isClosable: true,
          })

          queryClient.invalidateQueries({ queryKey: ['interactions'] });
          onSubmit();
        },
        onError: () => {
          toast({
            title: 'Что то пошло не так',
            description: 'Произошла ошибка при изменении контакта',
            status: 'error',
            isClosable: true,
          });
        },
      });
      return;
    }
    
    addInteractionMutation.mutate({
      date: values.date,
      content: values.content,
      clientId,
    }, {
      onSuccess: () => {
        toast({
          title: 'Успех!',
          description: 'Контакт добавлен',
          status: 'success',
          isClosable: true,
        })

        queryClient.invalidateQueries({ queryKey: ['interactions'] });
        onSubmit();
      },
      onError: () => {
        toast({
          title: 'Что то пошло не так',
          description: 'Произошла ошибка при добавлении контакта',
          status: 'error',
          isClosable: true,
        });
      },
  
    })
  };
  
  return (
    <Form<InteractionFormData> initialValues={data ? getInitialData(data) : undefined} onSubmit={handleFormSubmit}>
      {({ handleSubmit }) => (
        <Stack spacing={4}>
          <Field name="date" validate={isRequired}>
            {({ meta, input }) => (
              <Stack spacing={2}>
                <FormLabel>
                  Дата:
                </FormLabel>
                <Input
                  type="date"
                  name={input.name}
                  value={input.value}
                  isInvalid={meta.touched && meta.error}
                  onChange={input.onChange}
                />
              </Stack>
            )}
          </Field>
          <Field name="content" validate={isRequired}>
            {({ meta, input }) => (
              <Stack spacing={2}>
                <FormLabel>
                  Содержание:
                </FormLabel>
                <Textarea name={input.name} value={input.value} isInvalid={meta.touched && meta.error} onChange={input.onChange} />
              </Stack>
            )}
          </Field>

          <Button loadingText="Загрузка..." isLoading={addInteractionMutation.status === 'pending'} colorScheme='blue' mr={3} size="sm" onClick={handleSubmit}>
            {data ? 'Изменить' : 'Добавить'}
          </Button>
        </Stack>
      )}
    </Form>
    
  );
};
