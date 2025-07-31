import {ShogunNumberUtility} from "../core/utils/shogunNumberUtility.js";
import {Game} from "../core/game.js";
import {WebSocketServer} from "ws";

// Model
const numberUtil = new ShogunNumberUtility()
const game = new Game(numberUtil)


// WS API
function createDTO() {
    const dto = {
        status: game.status,
        gridSize: game.gridSize,
        googlePosition: game.googlePosition,
        player1Position: game.player1Position,
        player2Position: game.player2Position,
    }
    return dto
}

const wss = new WebSocketServer({port: 8080})

wss.on('connection', (channel) => {

    game.subscribe(() => {
        channel.send(JSON.stringify(createDTO()))
    })
    channel.on('message', (message) => {
        const action = JSON.parse(message.toString())
        switch (action.type) {
            case 'start':
                game.start()
                break
            case 'movePlayer':
                game.movePlayer(action.payload.playerNumber, action.payload.moveDirection)
                break
        }
    })
    channel.send(JSON.stringify(createDTO()))


})

console.log('server is running')