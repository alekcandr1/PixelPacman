export class Controller {
    #view
    #model

    constructor(view, model) {
        this.#view = view
        this.#model = model

        this.#model.subscribe(() => {
            this.#render()
            console.log('STATE CHANGED')
        })

        this.#view.onstart = () => {
            this.#model.start()
        }
        this.#view.onPlayerMove = (player, direction) => {
            this.#model.movePlayer(player, direction)
        }
    }

    init() {
        this.#render()
    }

    #render() {
        const dto = {
            status: this.#model.status,
            gridSize: this.#model.gridSize,
            googlePosition: this.#model.googlePosition,
            player1Position: this.#model.player1Position,
            player2Position: this.#model.player2Position,
        }
        this.#view.render(dto)
    }
}