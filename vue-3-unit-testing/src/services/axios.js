import axios from 'axios'

export function getMessage() {
  return axios.get('http://localhost:8081/api/message').then((response) => {
    return response.data
  })
}
