import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// Replace this with your own user model and database logic
import { User } from './models/user';

const SECRET_KEY = 'your-secret-key'; // This should be in an environment variable

export const registerUser = async (username: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username, password: hashedPassword });
  return user;
};

export const loginUser = async (username: string, password: string) => {
  const user = await User.findOne({ where: { username } });

  if (!user) {
    throw new Error('User not found');
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
    expiresIn: '1h',
  });

  return token;
};