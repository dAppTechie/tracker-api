import { PrismaClient } from '@prisma/client';
import express from 'express';
import morgan from 'morgan';
import { nanoid } from 'nanoid';

const db = new PrismaClient({ log: ['error', 'info', 'query', 'warn'] });
const genId = () => nanoid(16);

const seedDatabase = async () => {
  if ((await db.user.count()) === 0) {
    await db.user.createMany({
      data: [
        {
          id: genId(),
          email: 'test@testing.com',
          firstName: 'John',
          lastName: 'Doe',
          password: 'password',
          createdAt: new Date(),
        },
        {
          id: genId(),
          email: 'test2@testing.com',
          firstName: 'Jane',
          lastName: 'Doe',
          password: 'password',
          createdAt: new Date(),
        },
      ],
    });
  }
};
seedDatabase();

const app = express();
app.use(morgan('dev'));

app.get('/', async (req, res) => {
  const users = await db.user.findMany();
  res.json(users);
});

const PORT = Number(process.env.PORT ?? 8080);
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
});
