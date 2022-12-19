import app from './app';

const port: number = 3000;
app.listen(port, () => {
  console.log(`Server started, app listening on ${port}`);
});
