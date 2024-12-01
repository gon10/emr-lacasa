// export type FormElementOption = {
//   id: string;
//   label: string;
//   value: string;
// };

// export type FormElement = {
//   id: string;
//   type: string;
//   label: string;
//   sublabel?: string;
//   required?: boolean;
//   width?: "fixed" | "auto";
//   options?: FormElementOption[];
//   defaultValue?: string;
//   showEmptyOption?: boolean;
//   predefinedOptions?: string;
//   validation?: {
//     pattern?: string;
//     minLength?: number;
//     maxLength?: number;
//     min?: number;
//     max?: number;
//   };
// };

// export type FormData = {
//   heading?: string;
//   subtitle?: string;
//   elements: FormElement[];
// };

export type FormElementOption = {
  id: string;
  label: string;
  value: string;
};

export type FormElement = {
  id: string;
  type: string;
  label: string;
  sublabel?: string;
  required?: boolean;
  value?: string;
  width?: "fixed" | "auto";
  options?: FormElementOption[];
  defaultValue?: string;
  showEmptyOption?: boolean;
  predefinedOptions?: string;
  validation?: {
    pattern?: string;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
  };
};

export type FormData = {
  heading?: string;
  subtitle?: string;
  elements: FormElement[];
};
