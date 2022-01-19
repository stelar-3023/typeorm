import 'reflect-metadata';
import { createConnection, Connection } from 'typeorm';
import express, { Request, Response } from 'express';

import { User } from './entity/User'; // import User entity
import { Post } from './entity/Post'; // import Post entity

const app = express();
app.use(express.json());
const port = 5000;

// CREATE
app.post('/users', async (req: Request, res: Response) => {
  const { name, email, role } = req.body;

  try {
    const user = User.create({ name, email, role }); // creates an instance of User entity

    await user.save(); // saves the user to the database

    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Insert failed.' });
  }
});
// READ
app.get('/users', async (_: Request, res: Response) => {
  try {
    const users = await User.find();

    return res.json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Error with request.' });
  }
});
// UPDATE
app.put('/users/:uuid', async (req: Request, res: Response) => {
  const uuid = req.params.uuid;
  const { name, email, role } = req.body;

  try {
    const user = await User.findOneOrFail({ uuid });

    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;

    await user.save();
    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Update failed.' });
  }
});
// DELETE
app.delete('/users/:uuid', async (req: Request, res: Response) => {
  const uuid = req.params.uuid;

  try {
    const user = await User.findOneOrFail({ uuid });

    await user.remove();

    return res.status(204).json({ message: 'User deleted successfully.' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Delete failed.' });
  }
});
// FIND
app.get('/users/:uuid', async (req: Request, res: Response) => {
  const uuid = req.params.uuid;

  try {
    const user = await User.findOneOrFail({ uuid });

    return res.json(user);
  } catch (error) {
    console.log(error);
    return res.status(404).json({ error: 'User not found.' });
  }
});

// CREATE A POST
app.post('/posts', async (req: Request, res: Response) => {
  const { userUuid, title, body } = req.body;

  try {
    const user = await User.findOneOrFail({ uuid: userUuid });

    const post = new Post({ title, body, user });

    await post.save();

    return res.json(post)
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Error adding post' });
  }
});

// READ POSTS


createConnection()
  .then(async (connection) => {
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    }); // listen to port 5000

    // console.log('Inserting a new record into the database...');

    // // create student object
    // const user = new User();

    // // Assign student name and age here
    // user.name = 'Steve Larsen';
    // user.email = 'slarsen-3@att.net';
    // user.role = 'admin';

    // // save student object in connection
    // await connection.manager.save(user);
    // console.log('Saved a new student with id: ' + user.id);

    // console.log('Loading students from the database...');

    // // Display student saved records
    // const students = await connection.manager.find(User);
    // console.log('Loaded students: ', students);

    // console.log('Here you can setup and run express/koa/any other framework.');
  })
  .catch((error) => console.log(error));
