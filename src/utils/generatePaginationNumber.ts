export const generatePaginationNumber = (currentPage: number, totalPages: number) => {
  //Max elements to show is 7
  
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  //if current is on first 3 elements
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages]
  }

  //if current is on last 3 elements
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages]
  }

  //if current is between elements but doesnt meet any of the previous casesd
  return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages ]

}