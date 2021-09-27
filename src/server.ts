import AppController from "./app";

const PORT = process.env.PORT || 80;

process.env.TZ = "UTC";

const appController = new AppController();

appController.app.listen(PORT, () => {
  console.log(`🌎 Server running on port ${PORT}.`);
});
