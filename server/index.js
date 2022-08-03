import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import compress from "compression";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import models, { sequelize } from "./models/init-models";
import routes from "./routes/indexRoutes"

dotenv.config()

const port = process.env.PORT || 8080
const app   = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(helmet());
app.use(compress());
app.use(cors());

app.use(async (req, res, next) => {
  req.context = { models };
  console.log(req.method + " " + req.path + " - " + req.hostname);
  next();
});

app.use("/entity", routes.entityRoute)
app.use("/ponty", routes.phoneNumberTypeRoute) //phone_number_type
app.use("/roles", routes.rolesRoute)
app.use("/users", routes.usersRoutes)
app.use("/etad", routes.usersAddressRoute) //users_address
app.use("/usdu", routes.usersEducationRoute) //users_education
app.use("/pmail", routes.usersEmailRoute) //users_email
app.use("/usex", routes.usersExperiencesRoute) //users_experiences
app.use("/uesk", routes.usersExperiencesSkillRoute) //users_experiences_skill
app.use("/usme", routes.usersMediaRoute) //users_media
app.use("/uspo", routes.usersPhonesRoute) //users_phones
app.use("/usro", routes.usersRolesRoute) //users_roles
app.use("/uski", routes.usersSkillRoute) //users_skill

const dropDatabaseSync = false;

sequelize.sync({ force: dropDatabaseSync }).then(async () => {
  if (dropDatabaseSync) {
    console.log("Database do not drop");
  }
  app.listen(port, () => {
    console.log("Server listening on port " + port);
  });
});

export default app;