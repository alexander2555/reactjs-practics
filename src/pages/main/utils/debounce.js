export const debounce = (fn, delay = 300) => {
  let tId
  return (...args) => {
    clearTimeout(tId)
    tId = setTimeout(fn, delay, ...args)
  }
}
