class ErrorResponse extends Error {
  // this property  will store the http status code
  statusCode: number;
  constructor(message: string, statusCode: number) {
    // call the parents Error class constructor with message
    super(message);

    // store the http statusCode  in this instance

    this.statusCode = statusCode;

    // set the name of the error class dynamically
    this.name = this.constructor.name;
  }
}

export default ErrorResponse;
