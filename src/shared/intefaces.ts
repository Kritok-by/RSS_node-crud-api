export interface IUser {
  id?: string;
  username?: string;
  age?: number;
  hobbies?: string[];
}

export interface IPostData {
  username: string;
  age: number;
  hobbies: string[];
}

export interface IUserTable {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}
