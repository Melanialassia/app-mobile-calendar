import {
    ActivityFormErrors,
    ActivityFormT,
    ValidationResult,
} from "@/types";

type DetailsForm = {
  title: string;
  description: string;
};

export const validateActivityForm = (
  form: ActivityFormT | DetailsForm
): ValidationResult => {
  let errors: ActivityFormErrors = {};

  if (!form.title || form.title.trim().length === 0) {
    errors.title = "El título es obligatorio";
  } else if (form.title.length > 50) {
    errors.title = "El título no puede superar los 50 caracteres";
  }

  if (!form.description || form.description.trim().length === 0) {
    errors.description = "La descripción es obligatoria";
  }
  
  const valid = Object.keys(errors).length === 0;

  return { valid, errors };
};
