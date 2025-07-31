import {Controller} from "./controller.js";
import {View} from "./view.js";
import {ShogunNumberUtility} from "../core/utils/shogunNumberUtility.js";
import {Game} from "../core/game.js";
import {GameProxy} from "./game-proxy.js";

//Composition root
const view = new View()
const game = new GameProxy()

const controller = new Controller(view, game)
const intervalId = setInterval(() => {
    if (game.initialized) {
        controller.init()
        clearInterval(intervalId)
    }
}, 100)
