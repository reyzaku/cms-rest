import mongoose from "mongoose";
import { config } from "../app/config.js";

mongoose.connect(`mongodb+srv://${config.dbUser}:${config.dbPass}@cluster0.anzyyek.mongodb.net/?retryWrites=true&w=majority`)
const db = mongoose.connection

export default db