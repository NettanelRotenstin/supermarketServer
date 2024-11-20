export interface RegisterDto extends LoginDto {
  creditCard?: string;
}
export interface LoginDto {
  username: string;
  password: string;
}
