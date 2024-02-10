export function buildPagination(queries: { page?: string; limit?: string }) {
  const limit = parseInt(queries.limit) || 10;
  const offset = (parseInt(queries.page) - 1) * limit || 0;

  return {
    offset,
    limit,
  };
}
