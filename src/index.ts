import "dotenv/config";
import connectDb from "./config/connectDb";
import { app } from "./app";

const PORT = (process.env.PORT as string) || "3000";
connectDb().then(()=>{
    console.log('connected to db');
    app.listen(PORT, () => {
        console.log("connected to port :", PORT);
      });
})
    