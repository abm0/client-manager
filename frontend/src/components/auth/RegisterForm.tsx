import { Field, Form } from "react-final-form";
import { Button, Input, Stack, Text, useToast } from '@chakra-ui/react';
import { isRequired } from "../../shared/validators";
import { useState } from "react";
import { useRegisterMutation } from "../../mutations/auth.mutation";

type RegisterFormData = {
  username: string;
  email: string;
  password: string;
}

const RegisterForm = () => {
  const toast = useToast()

  const registerMutation = useRegisterMutation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleFormSubmit = async (values: RegisterFormData) => {
    setIsSubmitting(true);

    registerMutation.mutate(values, {
      onSuccess: () => {
        toast({
          title: 'Успех!',
          description: "Пользователь создан",
          status: 'success',
          duration: 9000,
          isClosable: true,
        });
      },
      onError: () => {
        toast({
          title: 'Ошибка',
          description: "При создании пользователя произошла ошибка",
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      },
      onSettled: () => {
        setIsSubmitting(false);
      },
    })
  };

  return (
    <Form<RegisterFormData> onSubmit={handleFormSubmit}>
      {({ handleSubmit }) => (
        <Stack spacing={4}>
          <Field name="username" validate={isRequired}>
            {({ meta, input }) => (
              <Stack spacing={2}>
                <Text>
                  Имя пользователя:
                </Text>
                <Input name={input.name} isInvalid={meta.touched && meta.error} onChange={input.onChange} />
              </Stack>
            )}
          </Field>

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
            Зарегистрировать
          </Button>
        </Stack>
      )}
    </Form>
  );
}

export { RegisterForm };
