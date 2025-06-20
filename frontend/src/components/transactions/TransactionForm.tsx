import { Button, FormLabel, HStack, IconButton, Input, InputGroup, InputLeftElement, Select, Stack, useToast } from "@chakra-ui/react";
import { Field, Form } from "react-final-form";
import { isRequired } from "../../shared/validators";
import { useLoadTransactionStatuses } from "../../api/queries/statuses.query";
import { useAddTransactionMutation, useDeleteTransactionMutation, useEditTransactionMutation } from "../../api/mutations/transactions.mutation";
import { useQueryClient } from "@tanstack/react-query";
import { Transaction } from "../../models/types";
import { DeleteIcon } from "@chakra-ui/icons";

type TransactionFormProps = {
  clientId: number;
  data?: Transaction;
  onSubmit: () => void;
};

type TransactionFormData = {
  date: string;
  value: string;
  status: number;
};

const getInitialData = (data: Transaction): TransactionFormData => {
  return {
    date: data.date,
    value: String(data.value),
    status: data.status,
  };
};

export const TransactionForm = ({ clientId, data, onSubmit }: TransactionFormProps) => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const { data: transactionStatuses } = useLoadTransactionStatuses();
  
  const addTransactionMutation = useAddTransactionMutation();
  const editTransactionMutation = useEditTransactionMutation();
  const deleteTransactionMutation = useDeleteTransactionMutation();
  
  const handleDelete = (transactionId: number) => {
    deleteTransactionMutation.mutate({ clientId, transactionId }, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['transactions'] });
        onSubmit();
      },
    })
  }

  const handleFormSubmit = (values: TransactionFormData) => {
    if (data) {
      editTransactionMutation.mutate({
        date: values.date,
        value: Number(values.value),
        status: Number(values.status),
        clientId,
        transactionId: data.id,
      }, {
        onSuccess: () => {
          toast({
            title: 'Успех!',
            description: 'Транзакция изменена',
            status: 'success',
            isClosable: true,
          })

          queryClient.invalidateQueries({ queryKey: ['transactions'] });
          onSubmit();
        },
        onError: () => {
          toast({
            title: 'Что то пошло не так',
            description: 'Произошла ошибка при изменении транзакции',
            status: 'error',
            isClosable: true,
          });
        },
      });
      return;
    }
    
    addTransactionMutation.mutate({
      date: values.date,
      value: Number(values.value),
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
    <Form<TransactionFormData> initialValues={data ? getInitialData(data) : undefined} onSubmit={handleFormSubmit}>
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
          <Field name="value" validate={isRequired}>
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
          <Field name="status" validate={isRequired} initialValue={data ? data.status : "1"}>
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
                    <option key={s.id} value={s.id.toString()}>{s.name}</option>
                  ))}
                </Select>
              </Stack>
            )}
          </Field>

          <HStack spacing={2} justifyContent={'space-between'} width="100%">
            {data && (
              <IconButton size="sm" color="red" aria-label='delete' onClick={() => handleDelete(data.id)}>
                <DeleteIcon />
              </IconButton> 
            )}
            <Button loadingText="Загрузка..." isLoading={addTransactionMutation.status === 'pending'} colorScheme='blue' mr={3} size="sm" onClick={handleSubmit}>
              {data ? 'Изменить' : 'Добавить'}
            </Button>            
          </HStack>
        </Stack>
      )}
    </Form>
    
  );
};
