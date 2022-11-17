import { serverHttp } from "./http";
import './websocket';
require('dotenv').config();

const PORT = process.env.PORT;

serverHttp.listen(PORT, () => {
    console.log(`Server is running in port ${PORT}`);
});