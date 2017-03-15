function getPeople(code, callback) {
  return fetch(`/people?zip=${code}&radius=25`, {
    accept: 'application/json',
  })
  .then(parseJSON)
  .then(callback)
  .catch(handleError)
}

function updatePerson(actionNetworkID, opts = {}, callback) {
  return fetch(`/people?action_network_id=${actionNetworkID}&check_in=true${opts.called ? '&was_called=true' : ''}`, {
    accept: 'application/json',
    method: 'POST'
  })
  .then(parseJSON)
  .then(callback)
  .catch(handleError)
}

function parseJSON(response) {
  return response.json();
}

function handleError(error) {
  console.log(error)
}

const Client = { getPeople, updatePerson };
export default Client;
