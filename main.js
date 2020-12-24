'use strict'
const GAME_STATE = {
  CrossPlayerAwaits: 'CrossPlayerAwaits',
  CirclePlayerAwaits: 'CirclePlayerAwaits',
  GameFinished: 'GameFinished'
}

const modal = {
  circlePositon: [],
  crossPositon: [],
  circle: 'circle',
  cross: 'cross',
  lines: [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]],
  counterClick: 0
}

const view = {
  renderSymbol(symbol, target) {
    target.innerHTML = `<div class="${symbol}"></div>`
  }
}

const controller = {
  currentState: GAME_STATE.CrossPlayerAwaits,
  playerSelect(index, target) {
    modal.counterClick++
    switch (this.currentState) {
      case GAME_STATE.CrossPlayerAwaits:
        this.currentState = GAME_STATE.CirclePlayerAwaits
        this.checkWinner(modal.circle, index)
        view.renderSymbol(modal.circle, target)
        break
      case GAME_STATE.CirclePlayerAwaits:
        this.currentState = GAME_STATE.CrossPlayerAwaits
        this.checkWinner(modal.cross, index)
        view.renderSymbol(modal.cross, target)
        break
    }
  },
  checkWinner(symbol, index) {
    if (symbol === 'circle') {
      modal.circlePositon.push(index)
      this.checkLine(modal.circlePositon, modal.circle)
    } else if (symbol === 'cross') {
      modal.crossPositon.push(index)
      this.checkLine(modal.crossPositon, modal.cross)
    }
    if (modal.counterClick === 9 && controller.currentState !== GAME_STATE.GameFinished) console.log('Ended in a draw')
  },
  checkLine(positionArray, symbol) {
    modal.lines.forEach(line => {
      if(line.every(position => positionArray.includes(position))) {
        controller.currentState = GAME_STATE.GameFinished
        return alert(`${symbol} win`)
      }
    })
  },
  resetGame() {
    document.querySelectorAll('#app td').forEach(node => {
      node.innerHTML = ''
    })
    this.currentState = GAME_STATE.CrossPlayerAwaits
    modal.circlePositon = []
    modal.crossPositon = []
    modal.counterClick = 0
  }
}

const app = document.querySelector('#app')
const btn = document.querySelector('#reset-button')

app.addEventListener('click', e => {
  const target = e.target
  if (!target.tagNmae === 'TD'|| typeof(target.dataset.index) !== 'string' || target.innerHTML !== '') return
  const index = Number(target.dataset.index)
  controller.playerSelect(index, target)
})

btn.addEventListener('click', e => {
  controller.resetGame()
})
