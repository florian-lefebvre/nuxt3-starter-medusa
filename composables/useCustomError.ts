import { H3Error } from "h3";

interface _Error {
    statusCode: number;
    statusMessage: string;
}

export const useCustomError = (err: _Error) => {
    const error = new Error() as any;
    error.statusCode = err.statusCode;
    error.message = err.statusMessage;
    throwError(error);
};
