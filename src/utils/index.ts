export const getFromLocalStorage = (key: string) => {
  const target = localStorage.getItem(key)
  if (target) {
    return JSON.parse(target)
  } else {
    return null
  }
}

export const setToLocalStorage = (key: string, value: any):void => {
  localStorage.setItem(key, JSON.stringify(value))
}
