export interface RegisterRequest {
  login: string;
  email: string;
  password: string;
  username: string;
  firstName: string;
  lastName: string;
  sex: string;
  birthDate: Date;
}

export interface LoginRequest {
  login: string;
  password: string;
}
