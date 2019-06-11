import {Document} from 'mongoose';

export interface IUser extends Document {
  id: string;
  username: string;
  email: string;
  roles: Array<string>;
}
