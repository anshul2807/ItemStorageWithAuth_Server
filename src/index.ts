import express, { Request, Response } from 'express';
import { json } from 'body-parser';
import { errorHandler, requestLogger, authenticate } from './middlewares';
import { registerUser, loginUser } from './auth';
import { Item } from './models/item';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(json()); // To parse JSON request bodies
app.use(requestLogger); // Log incoming requests
app.use(errorHandler); // Handle errors

// User registration endpoint
app.post('/api/register', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    // console.log(password);
    const newUser = await registerUser(username, password);
    res.status(201).send(newUser);
  } catch (err) {
    console.log(err);
    
    res.status(400).send({ error: "err" });
  }
});

// User login endpoint
app.post('/api/login', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const token = await loginUser(username, password);
    res.status(200).send({ token });
  } catch (error) {
    res.status(400).send({ error:"error.message" });
  }
});

// CRUD endpoints for items (with authentication)
app.post('/api/items', authenticate, async (req: Request, res: Response) => {
  try {
    const { name, description, price } = req.body;
    const newItem = await Item.create({ name, description, price });
    res.status(201).send(newItem);
  } catch (error) {
    res.status(400).send({ error: "error.message" });
  }
});

app.get('/api/items', authenticate, async (req: Request, res: Response) => {
  try {
    const items = await Item.findAll();
    res.status(200).send(items);
  } catch (error) {
    res.status(400).send({ error: "error.message" });
  }
});

app.get('/api/items/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (item) {
      res.status(200).send(item);
    } else {
      res.status(404).send({ error: 'Item not found' });
    }
  } catch (error) {
    res.status(400).send({ error: "error.message" });
  }
});

app.put('/api/items/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (item) {
      const { name, description, price } = req.body;
      await item.update({ name, description, price });
      res.status(200).send(item);
    } else {
      res.status(404).send({ error: 'Item not found' });
    }
  } catch (error) {
    res.status(400).send({ error: "error.message" });
  }
});

app.delete('/api/items/:id', authenticate, async (req: Request, res: Response) => {
  try {
    const item = await Item.findByPk(req.params.id);
    if (item) {
      await item.destroy();
      res.status(200).send({ message: 'Item deleted' });
    } else {
      res.status(404).send({ error: 'Item not found' });
    }
  } catch (error) {
    res.status(400).send({ error: "error.message" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});