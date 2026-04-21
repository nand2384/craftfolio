export type BuilderState = {
  templateId: string;
  data: any;
  links: any;
};

export type AuthState = {
  jwt: string;
  role_id: number;
  userData: {
    first_name: string;
    last_name: string;
    email: string;
  },
  loading: boolean;
  error: string;
};

export type OtpState = {
  email: string;
  otp: number;
  loading: boolean;
}

export type RegisterData = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
};

export type LoginData = {
  email: string;
  password: string;
}