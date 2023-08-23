export class ApiError extends Error {
    status: number;
    errors: Error[];
    timestamp: string;

    constructor(status: number, message: string, errors: Error[], timestamp: string) {
        super(message);
        this.status = status;
        this.errors = errors;
        this.timestamp = timestamp;
    }
}