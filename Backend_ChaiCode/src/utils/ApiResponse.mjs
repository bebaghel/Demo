class ApiResponse {
    constructor(
        statusCode, data, message = "Success"
    ) {
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400
    }
}

export { ApiResponse }


// 100-199  information response 
// 200-299  Successful response
// 300-399 Redirection Messages
// 400-499 Client Error Response
// 500-599 Server error Response

