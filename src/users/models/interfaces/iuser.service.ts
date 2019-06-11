import {IUser} from './user.interface';

export interface IUserService {
  findAll(): Promise<IUser[]>;
  findById(id: string): Promise<IUser | null>;
  create(user: IUser): Promise<IUser>;
  update(id: string, newValue: IUser): Promise<IUser | null>;
  delete(id: string): Promise<string>;
}
