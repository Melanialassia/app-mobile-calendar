export type ActivityFormErrors = {
  title?: string;
  description?: string; 
}

export  type ValidationResult = {
  valid: boolean;
  errors: ActivityFormErrors;
};

export  type ActivityFormT = {
  id: number;
  title: string;
  description: string;
  date: Date;
  hour: Date;
  urgency: "Alta" | "Media" | "Baja";
};
