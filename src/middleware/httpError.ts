export class HttpError extends Error {
	statusCode: number;
	details?: unknown;

	constructor(statusCode: number, message: string, details?: unknown) {
		super(message);
		this.name = "HttpError";
		this.statusCode = statusCode;
		this.details = details;
	}
}
