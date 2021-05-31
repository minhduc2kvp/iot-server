const createResponse = (code, message, data) => ({
    code,
    message,
    data
})

const statusResponse={
    OK:(data) => createResponse(200,"OK", data),
    ERROR:(error) => createResponse(400, "ERROR", error),
}
module.exports= statusResponse