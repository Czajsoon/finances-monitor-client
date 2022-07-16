export default interface UserCommand {
  login: string | null,
  firstName: string | null,
  lastName: string | null,
  email: string | null,
  password: string | null,
  userPassword: string | null,
  userLogin: string,
  userId: string
}
