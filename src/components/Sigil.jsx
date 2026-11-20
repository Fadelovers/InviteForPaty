export default function Sigil({ className = 'sigil' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="9.6" cy="12" r="5.4" fill="currentColor" />
    </svg>
  )
}
