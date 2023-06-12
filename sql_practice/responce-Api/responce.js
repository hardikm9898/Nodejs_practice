const success =  (status, results, statusCode) =>({ status, error: false, code: statusCode, results })
  


const error = (message, statusCode) => {
  let scode = statusCode;
  // List of common HTTP request code
  const codes = [200, 201, 400, 401, 404, 403, 422, 500];

  // Get matched code
  const findCode = codes.find((code) => code === scode);

  if (!findCode) {
    scode = 500;
  } else {
    scode = findCode;
  }

  return {
    message,
    code: statusCode,
    error: true,
  };
};

module.exports = { success, error };
