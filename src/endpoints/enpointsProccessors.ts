import { ServerResponse } from 'http';
import { usersTable } from '../db/db';
import { IPostData, IUser } from '../shared/intefaces';
import {
  status200,
  status201,
  status204,
  status400,
  status404,
} from '../shared/responses';
import { v4 as uuidv4 } from 'uuid';

export const getData = (res: ServerResponse, id?: string) => {
  if (id) {
    const user = usersTable.find((user) => user.id === id);
    if (!user) {
      status404(res, `User "${id}" does not exist`);
      return;
    }
    status200(res, user);
    return;
  }
  status200(res, usersTable);
};

export const postData = (res: ServerResponse, body: IPostData) => {
  const validated = validatePost(res, body);
  if (!validated) return;

  const newUser = {
    id: uuidv4(),
    username: body.username,
    age: body.age,
    hobbies: body.hobbies,
  };

  usersTable.push(newUser);

  status201(res, newUser);
};

export const putData = (res: ServerResponse, id: string, body: IUser) => {
  const validated = validatePost(res, body);
  if (!validated) return;

  let userIndex = 0;
  const user = usersTable.find((user, index) => {
    if (user.id === id) {
      userIndex = index;
      return true;
    }
    return false;
  });

  if (!user) {
    status404(res, `User "${id}" does not exist`);
    return;
  }

  Object.entries(body).forEach(([key, value]) => {
    switch (key) {
      case 'username':
        user.username = value;
        break;
      case 'age':
        user.age = value;
        break;
      case 'hobbies':
        user.hobbies = value;
        break;
    }
  });

  usersTable[userIndex] = user;

  status200(res, user);
};

export const deleteData = (res: ServerResponse, id: string) => {
  const userIndex = usersTable.findIndex((user) => user.id === id);

  if (userIndex === -1) {
    status404(res, `User "${id}" does not exist`);
    return;
  }

  usersTable.splice(userIndex, 1);

  status204(res, id);
};

const validatePost = (res: ServerResponse, data: IUser) => {
  let validated = true;
  const fields = ['username', 'age', 'hobbies'];
  fields.forEach((field: string) => {
    if (!(field in data) && validated) {
      validated = false;
      status400(res, `Field "${field}" must be specified`);
    }
  });
  if (validated) {
    if (typeof data.username !== 'string') {
      status400(res, `Field "username" must be a string`);
      validated = false;
    }
    if (typeof data.age !== 'number') {
      status400(res, `Field "age" must be a number`);
      validated = false;
    }
    if (!Array.isArray(data.hobbies)) {
      status400(res, `Field "username" must be an array`);
      validated = false;
    }
  }
  return validated;
};
