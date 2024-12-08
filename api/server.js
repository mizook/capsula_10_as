import app from "./app.js";
import { postgres, mysql } from "./config/db.js";

(async () => {
  try {
    await postgres.authenticate();
    await mysql.authenticate();
    console.log("Conectado a PostgreSQL y MySQL");

    await postgres.sync();
    await mysql.sync();

    app.listen(3000, () => {
      console.log("API corriendo en http://localhost:3000");
    });
  } catch (error) {
    console.error("Error al conectar:", error);
  }
})();
