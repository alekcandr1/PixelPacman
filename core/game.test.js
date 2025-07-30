import {Game} from "./game.js";
import {GameStatuses} from "./constants/game-statuses.js";
import {ShogunNumberUtility} from "./utils/shogunNumberUtility.js";
import {Position} from "./position";

describe('game', () => {
    it('game should be created and return status', () => {
        const numberUtil = new ShogunNumberUtility()
        const game = new Game(numberUtil)
        expect(game.status).toBe(GameStatuses.SETTINGS)
    })
    it('game have status IN PROGRESS after starting', async () => {
        const numberUtil = new ShogunNumberUtility()
        const game = new Game(numberUtil)
        await game.start()
        expect(game.status).toBe(GameStatuses.IN_PROGRESS)
    })
    it('google should be in the Grid after start', async () => {
        const numberUtil = new ShogunNumberUtility()
        for (let i = 0; i < 100; i++) {
            const game = new Game(numberUtil)
            expect(game.googlePosition).toBeNull()
            await game.start()
            expect(game.googlePosition.x).toBeLessThan(game.gridSize.columnsCount)
            expect(game.googlePosition.x).toBeGreaterThanOrEqual(0)
            expect(game.googlePosition.y).toBeLessThan(game.gridSize.rowsCount)
            expect(game.googlePosition.y).toBeGreaterThanOrEqual(0)
        }
    })
    it('player1 should be in the Grid after start', async () => {
        const numberUtil = new ShogunNumberUtility()
        for (let i = 0; i < 100; i++) {
            const game = new Game(numberUtil)
            expect(game.player1Position).toBeNull()
            await game.start()
            expect(game.player1Position.x).toBeLessThan(game.gridSize.columnsCount)
            expect(game.player1Position.x).toBeGreaterThanOrEqual(0)
            expect(game.player1Position.y).toBeLessThan(game.gridSize.rowsCount)
            expect(game.player1Position.y).toBeGreaterThanOrEqual(0)
        }
    })
    it('player2 should be in the Grid after start', async () => {
        const numberUtil = new ShogunNumberUtility()
        for (let i = 0; i < 100; i++) {
            const game = new Game(numberUtil)
            expect(game.player2Position).toBeNull()
            await game.start()
            expect(game.player2Position.x).toBeLessThan(game.gridSize.columnsCount)
            expect(game.player2Position.x).toBeGreaterThanOrEqual(0)
            expect(game.player2Position.y).toBeLessThan(game.gridSize.rowsCount)
            expect(game.player2Position.y).toBeGreaterThanOrEqual(0)
        }
    })
    it('google should be in the Grid but in the new position after jump', async () => {
        const numberUtil = new ShogunNumberUtility()
        const game = new Game(numberUtil)
        game.googleJumpInterval = 1 // ms
        await game.start()

        for (let i = 0; i < 100; i++) {
            const prevGooglePosition = game.googlePosition
            await delay(1)
            const currentGooglePosition = game.googlePosition
            expect(prevGooglePosition).not.toEqual(currentGooglePosition);
            if (game.winner === 'Google') {
                expect(game.status).toBe('LOSE')
            } else {
                !expect(game.status).toBe('IN_PROGRESS')
            }
        }
    })
    it('players should be move in correct directions', async () => {
        // const numberUtil = new ShogunNumberUtility()
        const fakeNumberUtility = {
            *numberGenerator(){
                yield 2
                yield 2
                yield 1
                yield 1
                yield 0
                yield 0
                while(true) {
                    yield 0
                }
            },
            iterator: null,

            getRandomIntegerNumber(from, to) {
                if (!this.iterator) {
                    this.iterator = this.numberGenerator()
                }
                return this.iterator.next().value
            }
        }
        const game = new Game(fakeNumberUtility)
        await game.start()
        game.gridSize = {
            columnsCount: 3,
            rowsCount: 3,
        }
        game.pointsToWin = {
            google: 10,
            players: 1,
        }
        // [GO][  ][  ]
        // [  ][p2][  ]
        // [  ][  ][p1]
        expect(game.player1Position).toEqual({x: 2, y: 2})

        game.movePlayer(1, 'RIGHT')
        // [GO][  ][  ]
        // [  ][p2][  ]
        // [  ][  ][p1]
        expect(game.player1Position).toEqual({x: 2, y: 2})

        game.movePlayer(1, 'DOWN')
        // [GO][  ][  ]
        // [  ][p2][  ]
        // [  ][  ][p1]
        expect(game.player1Position).toEqual({x: 2, y: 2})

        game.movePlayer(1, 'UP')
        // [GO][  ][  ]
        // [  ][p2][p1]
        // [  ][  ][  ]
        expect(game.player1Position).toEqual({x: 2, y: 1})

        game.movePlayer(1, 'UP')
        // [GO][  ][p1]
        // [  ][p2][  ]
        // [  ][  ][  ]
        expect(game.player1Position).toEqual({x: 2, y: 0})

        game.movePlayer(1, 'LEFT')
        // [GO][p1][  ]
        // [  ][p2][  ]
        // [  ][  ][  ]
        expect(game.player1Position).toEqual({x: 1, y: 0})

        game.movePlayer(1, 'RIGHT')
        // [GO][  ][p1]
        // [  ][p2][  ]
        // [  ][  ][  ]
        expect(game.player1Position).toEqual({x: 2, y: 0})

        game.movePlayer(1, 'LEFT')
        // [GO][p1][  ]
        // [  ][p2][  ]
        // [  ][  ][  ]
        expect(game.player1Position).toEqual({x: 1, y: 0})

        game.movePlayer(1, 'DOWN')
        // [GO][p1][  ]
        // [  ][p2][  ]
        // [  ][  ][  ]
        expect(game.player1Position).toEqual({x: 1, y: 0})

        game.movePlayer(1, 'LEFT')
        // [p1][  ][  ]
        // [  ][p2][  ]
        // [  ][  ][  ]
        expect(game.player1Position).toEqual({x: 0, y: 0})
        expect(game.points.player1).toBe(1)
        expect(game.status).toBe('WIN')


    })

})

const delay = (ms) => new Promise(res => setTimeout(res, ms))