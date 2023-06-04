interface ErrorWithMessage {
  message: string;
}
interface ErrorDataWithMessage {
  data: ErrorWithMessage;
}
interface ErrorResponseDataWithMessage {
  response: { data: ErrorWithMessage };
}

export function getErrorMessage(error: unknown) {
  return toErrorWithMessage(error).message;
}

function toErrorWithMessage(error: unknown): ErrorWithMessage {
  if (isErrorWithMessage(error)) return error;
  if (isErrorWithData(error)) return error.data;
  if (isErrorWithResponseData(error)) return error.response.data;

  try {
    return new Error(JSON.stringify(error));
  } catch {
    // fallback in case there's an error stringifying the error
    // like with circular references for example.
    return new Error(String(error));
  }
}

/**
 * Type predicate to narrow an unknown error to an object with a string 'message' property
 */
function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    valueIsObject(error) &&
    'message' in error &&
    typeof error.message === 'string'
  );
}

function isErrorWithData(error: unknown): error is ErrorDataWithMessage {
  return (
    valueIsObject(error) &&
    'data' in error &&
    typeof (error as any)?.data?.message === 'string'
  );
}
function isErrorWithResponseData(
  error: unknown
): error is ErrorResponseDataWithMessage {
  return (
    valueIsObject(error) &&
    'response' in error &&
    typeof (error as any)?.response?.data?.message ===
      'string'
  );
}

function valueIsObject(value: unknown): value is object {
  return value != null && typeof value === 'object';
}
