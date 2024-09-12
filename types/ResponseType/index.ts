export type RegisterUserResponseType = {
  data: {
    id: string;
    name: string | null;
    email: string;
    image: string;
  } | null;
  message: string;
};

export type LoginUserResponseType = {
  data: {
    id: string;
    name: string | null;
    email: string;
    emailVerified: Date | null;
    password: string | null;
    image: string | null;
    plan: string | null;
    status: number | null;
    createdAt: Date;
    updatedAt: Date;
  } | null;
  message: string;
};
