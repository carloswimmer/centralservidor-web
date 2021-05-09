interface ErrorResponse {
  response?: DataResponse;
  message: string;
}

interface DataResponse {
  data?: Message;
  message: string;
}

interface Message {
  message: string;
}

export default function getErrorMessage(err: ErrorResponse): string {
  let message = '';

  if (err.response && err.response.data) {
    message = err.response.data.message;
  }
  if (err.response) {
    message = err.response.message;
  }
  if (err) {
    message = err.message;
  }

  return message;
}
