import { Button, FormLabel, Input, Select, Stack } from '@chakra-ui/react';
import { Field, Form } from 'react-final-form';
import { isRequired } from '../../shared/validators';
import InputMask from 'react-input-mask';
import { useToast } from '@chakra-ui/react';
import { useLoadClientStatuses } from '../../api/queries/statuses.query';
import { useAddClientMutation } from '../../api/mutations/clients.mutation';
import { useQueryClient } from '@tanstack/react-query';

interface ClientFormProps {
  onSubmit: () => void;
}

export type ClientFormData = {
  first_name: string;
  last_name: string;
  patronymic: string;
  email: string;
  phone: string;
  company: string;
  status: number;
};

export const ClientForm = (props: ClientFormProps) => {
  const toast = useToast()

  const { data: clientStatuses } = useLoadClientStatuses();

  const clientMutation = useAddClientMutation();

  const queryClient = useQueryClient();
  
  const handleFormSubmit = async (values: ClientFormData) => {        
    clientMutation.mutate(values, {
      onSuccess: () => {
        toast({
          title: 'Успех!',
          description: 'Клиент успешно добавлен',
          status: 'success',
          isClosable: true,
        })

        queryClient.invalidateQueries({ queryKey: ['clients'] })
        props.onSubmit();
      },
      onError: () => {
        toast({
          title: 'Что то пошло не так',
          description: 'Произошла ошибка при добавлении клиента',
          status: 'error',
          isClosable: true,
        });
      },
    });
  };

  return (
    <Form<ClientFormData> onSubmit={handleFormSubmit}>
      {({ handleSubmit }) => (
        <Stack spacing={4}>
          <Field name="first_name" validate={isRequired}>
            {({ meta, input }) => (
              <Stack spacing={2}>
                <FormLabel>
                  Имя:
                </FormLabel>
                <Input name={input.name} value={input.value} isInvalid={meta.touched && meta.error} onChange={input.onChange} />
              </Stack>
            )}
          </Field>
          <Field name="last_name" validate={isRequired}>
            {({ meta, input }) => (
              <Stack spacing={2}>
                <FormLabel>
                  Фамилия:
                </FormLabel>
                <Input name={input.name} value={input.value} isInvalid={meta.touched && meta.error} onChange={input.onChange} />
              </Stack>
            )}
          </Field>
          <Field name="patronymic">
            {({ meta, input }) => (
              <Stack spacing={2}>
                <FormLabel>
                  Отчество:
                </FormLabel>
                <Input name={input.name} value={input.value} isInvalid={meta.touched && meta.error} onChange={input.onChange} />
              </Stack>
            )}
          </Field>
          <Field name="email" validate={isRequired}>
            {({ meta, input }) => (
              <Stack spacing={2}>
                <FormLabel>
                  Email:
                </FormLabel>
                <Input  name={input.name} value={input.value} isInvalid={meta.touched && meta.error} onChange={input.onChange} />
              </Stack>
            )}
          </Field>
          <Field name="phone" validate={isRequired}>
            {({ meta, input }) => (
              <Stack spacing={2}>
                <FormLabel>
                  Телефон:
                </FormLabel>
                <InputMask mask="+7 (999) 999-99-99" onChange={input.onChange} name={input.name} value={input.value}>
                  {(inputProps) => <Input {...inputProps}  isInvalid={meta.touched && meta.error} placeholder="+7 (___) ___-__-__" />}
                </InputMask>
                {/* <Input name={input.name} value={input.value} isInvalid={meta.touched && meta.error} onChange={input.onChange} /> */}
              </Stack>
            )}
          </Field>
          <Field name="company" validate={isRequired}>
            {({ meta, input }) => (
              <Stack spacing={2}>
                <FormLabel>
                  Компания:
                </FormLabel>
                <Input name={input.name} value={input.value} isInvalid={meta.touched && meta.error} onChange={input.onChange} />
              </Stack>
            )}
          </Field>
          <Field name="status" validate={isRequired} initialValue={1}>
            {({ meta, input }) => (
              <Stack spacing={2}>
                <FormLabel>
                  Статус:
                </FormLabel>
                <Select
                  name={input.name}
                  value={input.value}
                  onChange={input.onChange}
                  size="sm"
                  variant="filled"
                  colorScheme="white"
                  width="auto"
                  isInvalid={meta.touched && meta.error}
                >
                  {clientStatuses?.map((s: {id: number, name: string}) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </Select>
              </Stack>
            )}
          </Field>

          <Button loadingText="Загрузка..." isLoading={clientMutation.status === 'pending'} colorScheme='blue' mr={3} size="sm" onClick={handleSubmit}>
            Добавить
          </Button>
        </Stack>
      )}
    </Form>
  );
};
