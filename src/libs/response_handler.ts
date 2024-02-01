export function responseHandler(
  success: boolean,
  message: string,
  result?: any
) {
  return {
    success,
    message,
    result,
  };
}
