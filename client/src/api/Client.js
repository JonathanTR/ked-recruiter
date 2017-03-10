function getPeople(code, callback) {
  return fetch(`http://localhost:3000/people?zip=${code}&radius=25`, {
    accept: 'application/json',
  })
  .then(parseJSON)
  .then(callback)
}

function parseJSON(response) {
  return response.json();
}

const Client = { getPeople };
export default Client;
