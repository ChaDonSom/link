
export const logout = async () => {
  try {
    let request = await axios.post('/logout', {}, { headers: {
      accept: 'application/json'
    }})
    location.reload()
  } catch (e) {
    if (e && e.response && e.response.status === 419) {
      location.reload()
    }
  }
}