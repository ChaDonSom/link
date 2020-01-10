export function cleanHTML(html) {
  let span = document.createElement('span')
  span.innerHTML = html
  return span.innerText
}