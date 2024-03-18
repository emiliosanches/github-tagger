import dotenv from 'dotenv';
import { app } from "./server";

dotenv.config();

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
