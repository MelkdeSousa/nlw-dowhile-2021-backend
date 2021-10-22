import { httpServer } from "./app";
import { IP, PORT } from "../config/environment";

httpServer.listen(PORT, () =>
  console.log(`server running at http://${IP}:${PORT}/api/`)
);
