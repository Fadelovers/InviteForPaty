import { useEffect, useState } from 'react'
import Backdrop from './components/Backdrop.jsx'
import Letter from './components/Letter.jsx'
import Registration, { QUESTIONS } from './components/Registration.jsx'
import Ticket from './components/Ticket.jsx'
import Rules from './components/Rules.jsx'
import Finale from './components/Finale.jsx'

export default function App() {
  const [signed, setSigned] = useState(false)
  const [name, setName] = useState('')
  const [answers, setAnswers] = useState([])
  const [stamped, setStamped] = useState(false)

  useEffect(() => {
    if (!stamped) return undefined
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const timer = setTimeout(() => {
      document.querySelector('.ticket')?.scrollIntoView({
        behavior: prefersReduced ? 'auto' : 'smooth',
        block: 'center',
      })
    }, 750)
    return () => clearTimeout(timer)
  }, [stamped])

  return (
    <>
      <Backdrop />
      <header className="topline">
        <p className="overline">Его небесное величество приглашает</p>
        <h1 className="topline-title">Фестиваль Термины</h1>
        <p className="topline-sub">Прехевиль · восемь кандидатов · один победитель</p>
      </header>
      <main>
        <section id="invite" aria-labelledby="invite-h">
          <h2 id="invite-h" className="section-title">Письмо</h2>
          <Letter signed={signed} onSign={() => setSigned(true)} />
          {signed && (
            <Registration
              name={name}
              onName={setName}
              answers={answers}
              onChoose={(option) => setAnswers((prev) => [...prev, option])}
              stamped={stamped}
              onStamp={() => setStamped(true)}
            />
          )}
        </section>
        {stamped && <Ticket answers={answers} name={name} />}
        {stamped && <Rules />}
        <Finale />
      </main>
    </>
  )
}
