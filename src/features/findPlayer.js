export const findPlayer = (field) => {
  let column = 0
  let row = 0
  row = field.findIndex((row) => {
    column = row.findIndex(item => item === 2)
    if (column !== -1) {
      return true
    }
  })

  return { row: row, column: column }
}