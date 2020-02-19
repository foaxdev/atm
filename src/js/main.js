import AtmController from "./controllers/atm-controller";

const form = document.querySelector(`.main-block`);

const atmController = new AtmController(form);
atmController.render();
