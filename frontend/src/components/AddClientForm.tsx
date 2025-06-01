import { Button, Input, Select, Stack, Text } from '@chakra-ui/react';
import { Field, Form } from 'react-final-form';
import { isRequired } from '../shared/validators';
import { uploadSongFx } from '../models/song.effects';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useToast } from '@chakra-ui/react';

interface IAddSongForm {
  onSubmit: () => void;
}

export type SongFormData = {
  title: string;
  sourceFile: string | Blob;
};

export const AddClientForm = (props: IAddSongForm) => {
  const { t } = useTranslation();
  
  const toast = useToast()

  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleFormSubmit = async (values: SongFormData) => {    
    setIsSubmitting(true);
    
    try {
      await uploadSongFx(values);

      setIsSubmitting(false);
      
      toast({
        title: t('success'),
        description: t('message__file_uploaded'),
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
      
      props.onSubmit();
    } catch (e) {
      setIsSubmitting(false);

      toast({
        title: t('something_wrong'),
        description: t('message__file_upload_failed'),
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <Form<SongFormData> onSubmit={handleFormSubmit}>
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
              {({ meta, input }) => (
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

            <Button loadingText={`${t('message__analysis_in_progess')}...`} isLoading={isSubmitting} colorScheme='teal' mr={3} size="sm" onClick={handleSubmit}>
              Добавить
            </Button>
          </Stack>
        )}
      </Form>
  );
};
