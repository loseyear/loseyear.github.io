import React from 'react'
import ReactMarkdown from 'react-markdown'

export default function Lession() {
  const markdownText = `
  # This is a title

  Some regular text.

    * Item 1
  * Item 2
  `
  return (
    <ReactMarkdown>
      {markdownText}
    </ReactMarkdown>
  )
}
