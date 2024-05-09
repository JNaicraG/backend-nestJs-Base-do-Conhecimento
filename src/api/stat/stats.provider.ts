import { Connection } from "mongoose";
import { StatSchema } from "./schemas/stat.schema";
import { DATABASE_CONNECTION, STAT_MODEL } from "src/utils/constants";

export const statsProvider = [
    //{
    //    provide: STAT_MODEL,
    //    useFactory: (connection: Connection) => connection.model('Stat', StatSchema),
    //    inject: [DATABASE_CONNECTION] //faltou o DatabaseModule para o modo * mongoose
    //}
];