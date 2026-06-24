const response = (statusCode, body) => {
  const res = {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
  };
  if (body !== null && body !== undefined) {
    res.body = JSON.stringify(body);
  }
  return res;
};

module.exports = { response };
