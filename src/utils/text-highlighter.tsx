export function getHighlightedText(text: string, highlights: string[]) {
  // Create a regular expression pattern to match any of the highlight terms
  const regexPattern = new RegExp(`(${highlights.join("|")})`, "gi")

  // Split the text based on the regex pattern
  const parts = text.split(regexPattern)

  return (
    <span>
      {parts.map((part, i) => (
        <span key={i} className={highlights.includes(part) ? "highlight-text" : ""}>
          {part}
        </span>
      ))}
    </span>
  )
}
