import {GameStatuses} from "../core/constants/game-statuses.js";

export class View {
    #onstart = null
    #onPlayerMove = null
    set onstart(callback) {
        this.#onstart = callback;
    }
    set onPlayerMove(callback) {
        this.#onPlayerMove = callback;
    }

    constructor() {
        document.addEventListener('keyup', (e) => {
            switch (e.code) {
                case 'ArrowUp':
                    this.#onPlayerMove?.(1, 'UP')
                    break
                case 'ArrowDown':
                    this.#onPlayerMove?.(1, 'DOWN')
                    break
                case 'ArrowLeft':
                    this.#onPlayerMove?.(1, 'LEFT')
                    break
                case 'ArrowRight':
                    this.#onPlayerMove?.(1, 'RIGHT')
                    break
                case 'KeyW':
                    this.#onPlayerMove?.(2, 'UP')
                    break
                case 'KeyS':
                    this.#onPlayerMove?.(2, 'DOWN')
                    break
                case 'KeyA':
                    this.#onPlayerMove?.(2, 'LEFT')
                    break
                case 'KeyD':
                    this.#onPlayerMove?.(2, 'RIGHT')
                    break
                default:
                    return
            }
        })
    }

    render(dto) {
        const rootElement = document.getElementById('root');
        rootElement.innerHTML = '';

        const statusElement = document.createElement('div');
        statusElement.textContent = 'GAME - status ' + dto.status;
        rootElement.append(statusElement);

        if (dto.status === GameStatuses.SETTINGS) {
            const settingsComponent = new SettingsComponent({onstart: this.#onstart});
            rootElement.append(settingsComponent.render(dto));
        } else if (dto.status === GameStatuses.IN_PROGRESS) {
            const gridComponent = new GridComponent({onPlayerMove: this.#onPlayerMove});
            const gridElement = gridComponent.render(dto);
            rootElement.append(gridElement);
            console.log('Grid created:', gridElement); // Для отладки
        }
    }
}

class SettingsComponent {
    #props

    constructor(props) {
        this.#props = props
    }

    render(dto) {
        const container = document.createElement('div')
        container.classList.add('container')

        const button = document.createElement('button')
        button.append('START GAME')
        button.classList.add('btn', 'btn-primary')
        button.onclick = () => {
            this.#props?.onstart?.()
        }
        container.append(button)
        return container
    }
}

class GridComponent {
    render(dto) {
        const table = document.createElement('table');
        table.classList.add('game-grid');

        for (let y = 0; y < dto.gridSize.rowsCount; y++) {
            const row = document.createElement('tr');
            for (let x = 0; x < dto.gridSize.columnsCount; x++) {
                const cell = document.createElement('td');

                if (dto.player1Position?.x === x && dto.player1Position?.y === y) {
                    cell.textContent = '1';
                    cell.classList.add('player1');
                } else if (dto.player2Position?.x === x && dto.player2Position?.y === y) {
                    cell.textContent = '2';
                    cell.classList.add('player2');
                } else if (dto.googlePosition?.x === x && dto.googlePosition?.y === y) {
                    cell.textContent = 'G';
                    cell.classList.add('google');
                }

                row.append(cell);
            }
            table.append(row);
        }
        return table;
    }
}