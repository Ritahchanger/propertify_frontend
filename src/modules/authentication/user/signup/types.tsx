interface SignupFormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phone: string;
  idNumber: string;
  role: "owner" | "manager" | "accountant" | "tenant";
  agreeToTerms: boolean;
}

export type { SignupFormData };
