function getPeople(code, callback) {
  return fetch(`http://localhost:3000/people?zip=${code}&radius=25`, {
    accept: 'application/json',
  })
  .then(parseJSON)
  .then(callback)
}

function updatePerson(actionNetworkID) {
  return fetch(`http://localhost:3000/people?action_network_id=${actionNetworkID}`, {
    accept: 'application/json',
    method: 'POST'
  })
}

function parseJSON(response) {
  return response.json();
}

const Client = { getPeople, updatePerson };
export default Client;
