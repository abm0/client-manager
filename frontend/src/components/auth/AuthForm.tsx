import { Field, Form } from "react-final-form";
import { Button, Input, Stack, Text, useToast } from '@chakra-ui/react';
import { isRequired } from "../../shared/validators";
import { useContext, useState } from "react";
import { AuthContext } from "./AuthProvider";
import { Credentials } from "../../api/auth";


const AuthForm = () => {
  const toast = useToast()

  const { login } = useContext(AuthContext);
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (values: Credentials) => {
    setIsSubmitting(true);
    
    await login(values, {
      onSuccess: () => {
        toast({
          title: 'Успех!',
          description: 'Пользователь успешно авторизован',
          status: 'success',
          isClosable: true,
        });
      },
      onError: () => {
        toast({
          title: 'Ошибка',
          description: 'При авторизации произошла ошибка, возможно введены неверные данные пользователя',
          status: 'error',
          isClosable: true,
        });
      },
      onSettled: () => {
        setIsSubmitting(false);
      },
    });
  };

  return (
    <Form<Credentials> onSubmit={handleFormSubmit}>
      {({ handleSubmit }) => (
        <Stack spacing={4}>
          <Field name="email" validate={isRequired}>
            {({ meta, input }) => (
              <Stack spacing={2}>
                <Text>
                  Email:
                </Text>
                <Input name={input.name} isInvalid={meta.touched && meta.error} onChange={input.onChange} />
              </Stack>
            )}
          </Field>

          <Field name="password" validate={isRequired}>
            {({ input, meta }) => (
              <Stack spacing={2}>
                <Text>
                  Пароль:
                </Text>
                <Input type="password" name={input.name} isInvalid={meta.touched && meta.error} onChange={input.onChange} />
              </Stack>
            )}
          </Field>


          <Button
            colorScheme="blue"
            size="sm"
            width="auto"
            isLoading={isSubmitting}
            onClick={handleSubmit}
          >
            Авторизоваться
          </Button>
        </Stack>
      )}
    </Form>
  );
}

export { AuthForm };
