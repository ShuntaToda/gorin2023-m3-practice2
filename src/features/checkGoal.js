import { findPlayer } from "./findPlayer"

export const checkGoal = (field) => {
  const playerPosition = findPlayer(field)
  if (
    field[playerPosition.row][playerPosition.column + 1] === 4 ||
    field[playerPosition.row][playerPosition.column - 1] === 4
  ) {
    return true
  } else if (field[playerPosition.row + 1] !== undefined) {
    if (field[playerPosition.row + 1][playerPosition.column] === 4) {
      return true
    }
  } else if (field[playerPosition.row - 1] !== undefined) {
    if (field[playerPosition.row - 1][playerPosition.column] === 4) {
      return true
    }
  }
  return false
}