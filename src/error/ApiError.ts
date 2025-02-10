export class ApiError extends Error {
    error?: string;
    constructor(
        public code: number,
        error?: string
    ) {
        super();
        this.error = error
    }
}

