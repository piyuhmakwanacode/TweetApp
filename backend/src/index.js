import { app } from './app.js';
import { Db_Connect } from './DB/Connect_Db.js';
const PORT = process.env.PORT || 3000;

Db_Connect()
 .then(() => {
  app.get('/', (req, res) => {
   res.send('Hello from Express!');
  });

  app.listen(PORT, () => {
   console.log(`Server running at http://localhost:${PORT}`);
  });
 })
 .catch((err) => {
  console.log('error comes when connecting the database ');
 });
