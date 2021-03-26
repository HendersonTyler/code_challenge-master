import Express from "express";
var cors = require("cors");
const router = Express.Router();
import HeroController from "./controllers/heroes.controller";

router.get("/heroes", cors(), HeroController.findAll);
router.get("/heroes/:id", cors(), HeroController.findById);

export default router;
