import { app } from './app';

app.listen(process.env.NODE_ENV, () => {
  console.log(`Server is running on port ${process.env.NODE_ENV}.`);
});