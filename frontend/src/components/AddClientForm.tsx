import { Button, Input, Select, Stack, Text } from '@chakra-ui/react';
import { Field, Form } from 'react-final-form';
import { isRequired } from '../shared/validators';
import { useState } from 'react';
import { useToast } from '@chakra-ui/react';

interface IAddClientForm {
  onSubmit: () => void;
}

export type ClientFormData = {
  name: string;
  email: string;
  phone: string;
  company: string;
  status: string;
};

export const AddClientForm = (props: IAddClientForm) => {
  const toast = useToast()

  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleFormSubmit = async (values: ClientFormData) => {    
    setIsSubmitting(true);
    
    try {
      // await uploadSongFx(values);

      setIsSubmitting(false);
      
      toast({
        title: 'Успех!',
        description: 'Клиент успешно добавлен',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      
      props.onSubmit();
    } catch (e) {
      setIsSubmitting(false);

      toast({
        title: 'Что то пошло не так',
        description: 'Произошла ошибка при добавлении клиента',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Form<ClientFormData> onSubmit={handleFormSubmit}>
        {({ handleSubmit }) => (
          <Stack spacing={4}>
            <Field name="name" validate={isRequired}>
              {({ meta, input }) => (
                <Stack spacing={2}>
                  <Text>
                    Имя:
                  </Text>
                  <Input  name={input.name} value={input.value} isInvalid={meta.touched && meta.error} onChange={input.onChange} />
                </Stack>
              )}
            </Field>
            <Field name="email" validate={isRequired}>
              {({ meta, input }) => (
                <Stack spacing={2}>
                  <Text>
                    Email:
                  </Text>
                  <Input  name={input.name} value={input.value} isInvalid={meta.touched && meta.error} onChange={input.onChange} />
                </Stack>
              )}
            </Field>
            <Field name="phone" validate={isRequired}>
              {({ meta, input }) => (
                <Stack spacing={2}>
                  <Text>
                    Телефон:
                  </Text>
                  <Input name={input.name} value={input.value} isInvalid={meta.touched && meta.error} onChange={input.onChange} />
                </Stack>
              )}
            </Field>
            <Field name="company" validate={isRequired}>
              {({ meta, input }) => (
                <Stack spacing={2}>
                  <Text>
                    Компания:
                  </Text>
                  <Input name={input.name} value={input.value} isInvalid={meta.touched && meta.error} onChange={input.onChange} />
                </Stack>
              )}
            </Field>
            <Field name="status" validate={isRequired}>
              {() => (
                <Stack spacing={2}>
                  <Text>
                    Статус:
                  </Text>
                  <Select
                    size="sm"
                    variant="filled"
                    colorScheme="white"
                    width="auto"
                  >
                    <option value='active'>Активный</option>
                    <option value='rejected'>Неактивный</option>
                    <option value='potential'>Потенциальный</option>
                  </Select>
                </Stack>
              )}
            </Field>

            <Button loadingText="Загрузка..." isLoading={isSubmitting} colorScheme='teal' mr={3} size="sm" onClick={handleSubmit}>
              Добавить
            </Button>
          </Stack>
        )}
      </Form>
  );
};
