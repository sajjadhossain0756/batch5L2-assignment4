export interface IBorrowBooks {
    quantity: number,
    dueDate: string
}

export interface IBorrowBookSummary {
    totalQuantity: number,
      book: {
        title: string,
        isbn: string
      }
}