interface ErrorResponse {
    localDateTime: string; // Ou Date, dependendo como você deserializa
    errorCode: number;
    error: string;
    metodo: string;
    requestUri: string;
    // Esta é a forma correta para um objeto JavaScript comum:
    map: { [key: string]: string } | null; 
    message: string;
}

export default ErrorResponse;