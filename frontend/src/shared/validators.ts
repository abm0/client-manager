import { FieldValidator } from "final-form";

export const isRequired: FieldValidator<string | number> = (value) => value == null ? 'error__empty_field' : undefined; 