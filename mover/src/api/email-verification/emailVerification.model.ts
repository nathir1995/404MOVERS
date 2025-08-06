export type VerifyEmailRequestType = {
  email: string;
  code: string;
};

export type SendVerifictionCodeRequestType = {
  email: string;
};
