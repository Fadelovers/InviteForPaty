import { useState } from 'react'

export const QUESTIONS = [
  {
    step: 'I',
    question: 'Откуда ты едешь в Прехевиль?',
    options: [
      { label: 'Из столицы — сытый, скучающий, с карманными деньгами', from: 'Столица', item: 'Кошелёк: 3 щекеля', title: 'Горожанин' },
      { label: 'Из приграничной деревни — лес начинается прямо за забором', from: 'Приграничная деревня', item: 'Пищевой паёк на два дня', title: 'Сын леса' },
      { label: 'Из сна. Я не помню, чтобы покупал билет', from: 'Из сна (билет не покупался)', item: 'Осколок зеркала', title: 'Тот, кто не покупал билет' },
    ],
  },
  {
    step: 'II',
    question: 'Что ты успел положить в чемодан, пока поезд гудел под окнами?',
    options: [
      { label: 'Отцовский нож. Он тяжёлый — значит, настоящий', item: 'Отцовский нож' },
      { label: 'Аптечка: бинты и пузырёк с синей жидкостью', item: 'Синий флакон' },
      { label: 'Книгу в свиной коже, о которой лучше не спрашивать', item: 'Скин-библия (потрёпанная)' },
    ],
  },
  {
    step: 'III',
    question: 'Ночь. Свет в вагоне мигнул и погас. Ты…',
    options: [
      { label: 'Идёшь смотреть, что там', item: 'Свеча', note: 'Луна отметила вашу смелость. Она любит смелых — недолго.' },
      { label: 'Сидишь не дыша и считаешь остановки', item: 'Коробок спичек', note: 'Луна вас не заметила. Пока.' },
      { label: 'Проверяешь, что плохо лежит у соседей', item: '2 щекеля', note: 'Луна запомнила ваши руки.' },
    ],
  },
]

export default function Registration({ name, onName, answers, onChoose, onReset, stamped, onStamp }) {
  const [copied, setCopied] = useState(false)
  const step = answers.length
  const done = step >= QUESTIONS.length
  const current = QUESTIONS[step]

  function buildResultText() {
    const [origin, luggage, night] = answers
    const who = name.trim() || 'Кандидат № 8'
    return [
      'АНКЕТА КАНДИДАТА — ПРЕХЕВИЛЬ',
      `Имя: ${who}`,
      `Происхождение: ${origin.title}`,
      `Инвентарь на старте: ${answers.map((a) => a.item).join('; ')}`,
      `Примечание Пер’келе: ${night.note}`,
      '(предъявить ведущему перед входом в вагон)',
    ].join('\n')
  }

  async function copyResult() {
    const text = buildResultText()
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      const textarea = document.createElement('textarea')
      textarea.value = text
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className="invite-card reg">
      <div className="form-paper">
        <p className="form-kicker">Регистрационный лист · заполняется до прибытия</p>
        <h3 className="form-title">Анкета кандидата</h3>
        <p className="form-sub">От того, как ты ответишь, зависит, с чем ты проснёшься в Прехевиле.</p>

        <div className="form-head">
          <label className="form-name">
            <span className="t-label">Имя (то, которое не забудет луна)</span>
            <input
              className="name-input"
              type="text"
              value={name}
              maxLength={40}
              placeholder="впишите имя"
              onChange={(e) => onName(e.target.value)}
            />
          </label>
          <p className="form-progress">лист {current ? current.step : 'III'} из III</p>
        </div>

        <div className="dots" aria-hidden="true">
          {QUESTIONS.map((q, i) => (
            <span key={q.step} className={i < step ? 'dot on' : 'dot'}></span>
          ))}
        </div>

        <div aria-live="polite">
          {!done ? (
            <div className="form-question-box" key={step}>
              <p className="form-question">{current.question}</p>
              <div className="form-options">
                {current.options.map((option, i) => (
                  <button key={option.label} className="option-btn" type="button" onClick={() => onChoose(option)}>
                    <span className="marker">{'абв'[i]}.</span>
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="form-result" key="result">
              <div className="result-head">
                <div>
                  <p className="t-label">{stamped ? 'Кандидат принят' : 'Лист заполнен'}</p>
                  <p className="result-name">{name.trim() || 'Кандидат № 8'}</p>
                  <p className="result-title">{answers[0].title}</p>
                </div>
                {stamped ? (
                  <span className="stamp stamp--pressed">Принято</span>
                ) : (
                  <button className="stamp-slot" type="button" onClick={onStamp}>
                    Поставьте печать
                  </button>
                )}
              </div>
              <p className="t-label">Инвентарь на старте</p>
              <ul className="inv-list">
                {answers.map((a) => (
                  <li key={a.item}>{a.item}</li>
                ))}
              </ul>
              <p className="result-note">«{answers[2].note}» — Пер’келе</p>
              <div className="result-actions">
                <button className="btn-ink" type="button" onClick={copyResult}>
                  {copied ? 'Скопировано' : 'Скопировать результат'}
                </button>
                <button className="btn-ghost" type="button" onClick={onReset}>
                  Пройти заново
                </button>
              </div>
              <p className="result-ps">
                {stamped
                  ? 'Билет выдан ниже. Предъяви анкету и билет ведущему перед входом в вагон.'
                  : 'Осталось поставить печать «Принято» — и поезд выдаст тебе билет.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
