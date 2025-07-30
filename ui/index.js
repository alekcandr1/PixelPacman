import {Controller} from "./controller.js";
import {View} from "./view.js";
import {ShogunNumberUtility} from "../core/utils/shogunNumberUtility.js";
import {Game} from "../core/game.js";

const view = new View()
const numberUtil = new ShogunNumberUtility()
const game = new Game(numberUtil)

const controller = new Controller(view, game)
controller.init()