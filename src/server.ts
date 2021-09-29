import AppController from "./app";

const PORT = process.env.PORT || 80;

process.env.TZ = "UTC";

const appController = new AppController();

const server = appController.app.listen(PORT, () => {
  console.log(`🌎 Server running on port ${PORT}.`);
});

const gracefulShutdown = (signal) => {
  const gracefulShutdownTime = 15000;

  console.log(`⚠️ Caught ${signal}, gracefully shutting down`);
  appController.disableServer();

  setTimeout(() => {
    console.log("🤞 Shutting down application");
    server.close(() => {
      console.log("🚫 All requests stopped, shutting down");
      appController.dbController
        .closeConnections()
        .then(() => {
          console.log("👋 Database connections closed. Goodbye!");
          process.exit(0);
        })
        .catch((err) => {
          console.log("💀 Error closing database connections: ", err);
          console.log("👋 Shutting down anyways. Goodbye!");
          process.exit(1);
        });
    });
  }, gracefulShutdownTime);
};

process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);

export default appController;
