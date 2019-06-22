function appUrl() {
  let meta = document.querySelector("meta[name='app_url']")
  if (!meta) console.warn("No app_url found!")
  let url = meta.content || 'localhost'
  if (url.includes('localhost')) url = (new URL(location.href)).origin
  return url
}
function user() {
  let meta = document.querySelector("meta[name='user']")
  if (!meta) console.warn("No user found!")
  try {
    return JSON.parse(meta.content)
  } catch (e) { console.warn("Failed to parse user: ", e) }
}
function session() {
  let meta = document.querySelector("meta[name='session']")
  if (!meta) console.warn("No session found!")
  try {
    return JSON.parse(meta.content)
  } catch (e) { console.warn("Failed to parse session: ", e) }
}

export { appUrl, user, session }