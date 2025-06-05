import { Button, FormLabel, Input, InputGroup, InputLeftElement, Select, Stack, useToast } from "@chakra-ui/react";
import { Field, Form } from "react-final-form";
import { isRequired } from "../../shared/validators";
import { useLoadTransactionStatuses } from "../../api/queries/statuses.query";
import { useAddTransactionMutation } from "../../api/mutations/transactions.mutation";
import { useQueryClient } from "@tanstack/react-query";

type TransactionFormProps = {
  clientId: number;
  onSubmit: () => void;
};

type TransactionFormData = {
  date: string;
  sum: string;
  status: number;
};

export const TransactionForm = ({ clientId, onSubmit }: TransactionFormProps) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const { data: transactionStatuses } = useLoadTransactionStatuses();

  const addTransactionMutation = useAddTransactionMutation();

  const handleFormSubmit = (values: TransactionFormData) => {
    addTransactionMutation.mutate({
      date: values.date,
      value: Number(values.sum),
      status: Number(values.status),
      clientId,
    }, {
      onSuccess: () => {
        toast({
          title: 'Успех!',
          description: 'Транзакция добавлена',
          status: 'success',
          isClosable: true,
        })

        queryClient.invalidateQueries({ queryKey: ['transactions'] });
        onSubmit();
      },
      onError: () => {
        toast({
          title: 'Что то пошло не так',
          description: 'Произошла ошибка при добавлении транзакции',
          status: 'error',
          isClosable: true,
        });
      },
  
    })
  };
  
  return (
    <Form<TransactionFormData> onSubmit={handleFormSubmit}>
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
          <Field name="sum" validate={isRequired}>
            {({ meta, input }) => (
              <Stack spacing={2}>
                <FormLabel>
                  Сумма:
                </FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents='none' color='gray.300' fontSize='1.2em'>
                    ₽
                  </InputLeftElement>
                  <Input name={input.name} value={input.value} isInvalid={meta.touched && meta.error} onChange={input.onChange} />
                </InputGroup>
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
                  {transactionStatuses?.map((s: {id: number, name: string}) => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </Select>
              </Stack>
            )}
          </Field>

          <Button loadingText="Загрузка..." isLoading={addTransactionMutation.status === 'pending'} colorScheme='blue' mr={3} size="sm" onClick={handleSubmit}>
            Добавить
          </Button>
        </Stack>
      )}
    </Form>
    
  );
};
