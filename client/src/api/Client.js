function getPeople(code, callback) {
  return fetch(`/people?zip=${code}`, {
    accept: 'application/json',
    credentials: 'same-origin'
  })
  .then(parseJSON)
  .then(callback)
  .catch(handleError)
}

function updatePerson(actionNetworkID, opts = {}, callback) {
  return fetch(`/people?action_network_id=${actionNetworkID}&check_in=true${opts.called ? '&was_called=true' : ''}`, {
    accept: 'application/json',
    credentials: 'same-origin',
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
