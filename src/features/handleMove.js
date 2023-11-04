import { findPlayer } from "./findPlayer"

export const moveRight = (field, setField, setMoveBlocks) => {
  const playerPosition = findPlayer(field)
  if (field[playerPosition.row][playerPosition.column + 1] == 0) {
    setField(prevField => {
      prevField[playerPosition.row][playerPosition.column] = 0
      prevField[playerPosition.row][playerPosition.column + 1] = 2
      return [...prevField]
    })
  } else if (field[playerPosition.row][playerPosition.column + 1] == 3 && field[playerPosition.row][playerPosition.column + 2] == 0) {
    setMoveBlocks(prevMoveBlocks => ++prevMoveBlocks)
    setField(prevField => {
      prevField[playerPosition.row][playerPosition.column] = 0
      prevField[playerPosition.row][playerPosition.column + 1] = 2
      prevField[playerPosition.row][playerPosition.column + 2] = 3
      return [...prevField]
    })
  }
}
export const moveLeft = (field, setField, setMoveBlocks) => {
  const playerPosition = findPlayer(field)
  if (field[playerPosition.row][playerPosition.column - 1] == 0) {
    setField(prevField => {
      prevField[playerPosition.row][playerPosition.column] = 0
      prevField[playerPosition.row][playerPosition.column - 1] = 2
      return [...prevField]
    })
  } else if (field[playerPosition.row][playerPosition.column - 1] == 3 && field[playerPosition.row][playerPosition.column - 2] == 0) {
    setMoveBlocks(prevMoveBlocks => ++prevMoveBlocks)
    setField(prevField => {
      prevField[playerPosition.row][playerPosition.column] = 0
      prevField[playerPosition.row][playerPosition.column - 1] = 2
      prevField[playerPosition.row][playerPosition.column - 2] = 3
      return [...prevField]
    })
  }
}
export const moveTop = (field, setField, setMoveBlocks) => {
  const playerPosition = findPlayer(field)
  if (field[playerPosition.row - 1] !== undefined) {
    if (field[playerPosition.row - 1][playerPosition.column] == 0) {
      setField(prevField => {
        prevField[playerPosition.row][playerPosition.column] = 0
        prevField[playerPosition.row - 1][playerPosition.column] = 2
        return [...prevField]
      })
    } else if (field[playerPosition.row - 1][playerPosition.column] == 3 && field[playerPosition.row - 2][playerPosition.column] == 0) {
      setMoveBlocks(prevMoveBlocks => ++prevMoveBlocks)
      setField(prevField => {
        prevField[playerPosition.row][playerPosition.column] = 0
        prevField[playerPosition.row - 1][playerPosition.column] = 2
        prevField[playerPosition.row - 2][playerPosition.column] = 3
        return [...prevField]
      })
    }
  }
}
export const moveBottom = (field, setField, setMoveBlocks) => {
  const playerPosition = findPlayer(field)
  if (field[playerPosition.row + 1] !== undefined) {
    if (field[playerPosition.row + 1][playerPosition.column] == 0) {
      setField(prevField => {
        prevField[playerPosition.row][playerPosition.column] = 0
        prevField[playerPosition.row + 1][playerPosition.column] = 2
        return [...prevField]
      })
    } else if (field[playerPosition.row + 1][playerPosition.column] == 3 && field[playerPosition.row + 2][playerPosition.column] == 0) {
      setMoveBlocks(prevMoveBlocks => ++prevMoveBlocks)
      setField(prevField => {
        prevField[playerPosition.row][playerPosition.column] = 0
        prevField[playerPosition.row + 1][playerPosition.column] = 2
        prevField[playerPosition.row + 2][playerPosition.column] = 3
        return [...prevField]
      })
    }
  }
}