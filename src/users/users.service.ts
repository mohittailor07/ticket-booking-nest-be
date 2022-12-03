import { Injectable } from '@nestjs/common';
import { User } from './users.model';
import { uuid } from 'uuidv4';

@Injectable()
export class UsersService {
  private users: User[] = [];

  insertUser(mobileNumber: number, email: string, password: string,
             fullName: string, role: number) {
    const uid = uuid();
    const newsUser = new User(uid, mobileNumber, email, password, fullName, role ? 'admin' : 'user');

    this.users.push(newsUser);

    return {
      ...newsUser
    };
  }

  getUsers() {
    return [...this.users];
  }

  getUserById(_id: string) {
    return this.getUserIndexById(_id).user;
  }

  deleteUserById(_id: string) {
    const { userIndex: index } = this.getUserIndexById(_id);
    return this.users.splice(index, 1);
  }

  private getUserIndexById(_id: string): {user: User, userIndex: number} {
    const userIndex = this.users.findIndex(e => e._id === _id);
    return {
      user: this.users[userIndex],
      userIndex
    };
  }

  updateUserById(_id: string, mobileNumber: number, email: string, password: string,
                 fullName: string, role: number) {
    const { user: targetUser, userIndex: index } = this.getUserIndexById(_id);
    const nup = {
      ...targetUser, mobileNumber, email, password, fullName, role
    };
    const updatedUser = new User(_id, nup.mobileNumber, nup.email, nup.password, nup.fullName, nup.role ? 'admin' : 'user');
    this.users[index] = updatedUser;
    return updatedUser;
  }
}
