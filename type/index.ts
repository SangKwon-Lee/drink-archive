import yup from 'yup';
export interface SignupShemeType {
  username: string;
  nickname: yup.Maybe<string | undefined>;
  password: string;
  confirmPassword: yup.Maybe<string | undefined>;
}

export interface APIError {
  data: null;
  error: {
    status: number;
    name: string;
    message: string;
    details: any;
  };
}
