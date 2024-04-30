const API_URL =
  "https://raw.githubusercontent.com/Bowserinator/Periodic-Table-JSON/master/PeriodicTableJSON.json"

export interface HighlighterApiBaseType {
  elements: [{ symbol: string }]
}

export const fetchHighlighter = async () => {
  // return new Promise<{ data: string[] }>(resolve =>
  //   setTimeout(() => {
  //     resolve({ data: ["H", "He", "Li", "Be", "B", "C", "N", "O", "F", "Ne"] })
  //   }, 2000),
  // )
  const rawFetch = await fetch(API_URL)
  return rawFetch.json()
}
