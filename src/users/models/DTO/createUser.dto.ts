export class CreateUserDto {
  readonly username: string;

  readonly email: string;

  readonly roles: Array<string>;
}
