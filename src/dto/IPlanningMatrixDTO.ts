export interface IPlanningMatrixDTO {
  maxLines: number,
  maxColumns: number,
  matrix: {
    line: number,
    column: number,
    value: number
  }[]
}
