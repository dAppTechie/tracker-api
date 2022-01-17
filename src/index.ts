import express from 'express';
import morgan from 'morgan';

const app = express();
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({ hello: 'World' });
});

const PORT = Number(process.env.PORT ?? 8080);
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on port ${PORT}`);
});
