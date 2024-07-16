import { hash, compare } from 'bcrypt';

export async function hashedPassword(password: string): Promise<string> {
  const hashedPassword = await hash(password, 0);
  return hashedPassword;
}

export async function verifyPassword(password: string, hashedPassword: string) {
  const isValid = await compare(password, hashedPassword);

  return isValid;
}