function getPeople(code, callback) {
  return fetch(`http://localhost:3000/people?zip=${code}&radius=25`, {
    accept: 'application/json',
  })
  .then(parseJSON)
  .then(callback)
}

function updatePerson(actionNetworkID, opts = {}, callback) {
  return fetch(`http://localhost:3000/people?action_network_id=${actionNetworkID}&check_in=true${opts.called ? '&called=true' : ''}`, {
    accept: 'application/json',
    method: 'POST'
  })
  .then(parseJSON)
  .then(callback)
}

function parseJSON(response) {
  return response.json();
}

const Client = { getPeople, updatePerson };
export default Client;
