function getPeople(code, callback) {
  return fetch(`http://localhost:3001/people?zip=${code}&radius=25`, {
    accept: 'application/json',
  })
  .then(checkStatus)
  .then(parseJSON)
  .then(callback);
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(`HTTP Error ${response.statusText}`);
  error.status = response.statusText;
  error.response = response;
  throw error;
}

function parseJSON(response) {
  return response.json();
}

const Client = { getPeople };
export default Client;
