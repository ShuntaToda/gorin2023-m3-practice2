import { useState } from "react"

export const useLocalStrage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key)
      console.log(JSON.parse(item), !!JSON.parse(item))
      return JSON.parse(item) ? JSON.parse(item) : initialValue
    } catch (e) {
      console.error("localstrageからロードできませんでした", e)
      return initialValue
    }
  })

  const setValue = (value) => {
    console.log(value)
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (e) {
      console.error("localstrageに保存できませんでした", e)
    }
  }

  const removeValue = () => {
    try {
      setStoredValue(null);
      localStorage.removeItem(key)
    } catch (e) {
      console.error("localstrageを削除できませんでした", e)
    }
  }

  return [storedValue, setValue, removeValue]
}