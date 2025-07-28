import {Game} from "./game";

describe('game', () => {
    it('', () => {
        const game = new Game()
        expect(game.status).toBe('SETTINGS')
    })
})