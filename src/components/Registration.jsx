import { useState } from 'react'
import { DISCORD_WEBHOOK_URL } from '../config.js'

export const QUESTIONS = [
  {
    step: 'I',
    question: 'Кто ты на этом поезде?',
    options: [
      { label: 'Горожанин из столицы — сытый, скучающий, привыкший, что всё в мире продаётся', from: 'Столица', item: 'Кошелёк: 3 щекеля', title: 'Горожанин' },
      { label: 'Сын приграничной деревни — лес начинается прямо за твоим забором', from: 'Приграничная деревня', item: 'Пищевой паёк на два дня', title: 'Сын леса' },
      { label: 'Тот, кто вышел из сна. Билет не покупался — билет просто был', from: 'Из сна (билет не покупался)', item: 'Осколок зеркала', title: 'Тот, кто не покупал билет' },
    ],
  },
  {
    step: 'II',
    question: 'Что помнят твои руки?',
    options: [
      { label: 'Людей, которые не всегда хотели жить', item: 'Бинты и хирургическая игла' },
      { label: 'Курок — столько раз, что палец выучился сам', item: 'Ржавый пистолет с одним патроном' },
      { label: 'То, о чём другие молчали. Ты — писал', item: 'Фотоплёнка и блокнот' },
      { label: 'То, что храм считал непотребным. Ты — чертил', item: 'Мел для ритуальных кругов' },
    ],
  },
  {
    step: 'III',
    question: 'Ночь. Свет в вагоне мигнул и погас. Ты…',
    options: [
      { label: 'Идёшь смотреть, что там', item: 'Свеча', note: 'Луна отметила вашу смелость. Она любит смелых — недолго.' },
      { label: 'Сидишь не дыша и считаешь остановки', item: 'Коробок спичек', note: 'Луна вас не заметила. Пока.' },
      { label: 'Проверяешь, что плохо лежит у соседей', item: '2 щекеля', note: 'Луна запомнила ваши руки.' },
      { label: 'Шепчешь молитву в темноте — вдруг кто-то ещё не спит', item: 'Распятие Аллл-мера', note: 'Молитва — тоже голос. Луна слушает все.' },
    ],
  },
  {
    step: 'IV',
    question: 'Чего ты ищешь под луной Прехевиля?',
    options: [
      {
        label: 'Правды. Ты приехал не играть — ты приехал докопаться, даже если никто не просил',
        fate: 'Правда Кайзера',
        fateText: 'Ты не сможешь покинуть Прехевиль, пока Карин не узнает правду о Кайзере. Найди её раньше, чем луна найдёт тебя.',
      },
      {
        label: 'Той, кто осталась в этом городе не по своей воле',
        fate: 'Куб',
        fateText: 'Доведи Оливию до Рейлы. Если Куб заберёт её — он заберёт и тебя.',
      },
      {
        label: 'Того, кто ещё человек — пока не закат первого дня',
        fate: 'Долг у печи',
        fateText: 'Спаси Генриха до заката первого дня. Если он станет Джентльменом — его долг станет твоим.',
      },
      {
        label: 'Взгляда стрелка с крыш. Пусть следит — лишь бы за тобой',
        fate: 'Стрелок и тень',
        fateText: 'Тебе нельзя покинуть Прехевиль вместе с Августом, пока он не назвал тебя другом. И нельзя, чтобы он умер раньше тебя.',
      },
      {
        label: 'Того, кто не вернётся. Кто-то из вас не должен — и имя назовёшь ты',
        fate: 'Первая кровь',
        fateText: 'Кто-то из твоих спутников обязан умереть до возвращения поезда. Имя луна не назвала — его назовёшь ты. Если к отъезду все живы, луна впишет твоё.',
      },
      {
        label: 'Запаха, которого не чует больше никто',
        fate: 'Серный след',
        fateText: 'Следы ведут к башне — и они знают твоё имя. Твоя роль проста: привести остальных туда, куда велит запах. Правила изложит тот, кто прислал письмо, — в первый же сон. Приведёшь всех сам — он сжалится над тобой и заберёт остальных. Нарушишь правила — он будет мешать тебе на каждом шагу, а в конце придёт за тобой.',
      },
    ],
  },
]

export default function Registration({ name, onName, answers, onChoose, stamped, onStamp }) {
  const [copied, setCopied] = useState(false)
  const [sendStatus, setSendStatus] = useState('idle')
  const step = answers.length
  const done = step >= QUESTIONS.length
  const current = QUESTIONS[step]

  function buildResultText() {
    const [origin, , night, fate] = answers
    const who = name.trim() || 'Кандидат № 8'
    return [
      'АНКЕТА КАНДИДАТА — ПРЕХЕВИЛЬ',
      `Имя: ${who}`,
      `Происхождение: ${origin.title}`,
      `Судьба: ${fate.fate} — ${fate.fateText}`,
      `Инвентарь на старте: ${answers.filter((a) => a.item).map((a) => a.item).join('; ')}`,
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

  async function sendResult() {
    setSendStatus('sending')
    try {
      const res = await fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'Регистратура Термины',
          content: '**Новая анкета кандидата**\n```\n' + buildResultText() + '\n```',
        }),
      })
      if (!res.ok) throw new Error(String(res.status))
      setSendStatus('sent')
    } catch {
      setSendStatus('error')
    }
  }

  const sendLabel = {
    idle: 'Отправить ведущему',
    sending: 'Отправляю…',
    sent: 'Отправлено',
    error: 'Не вышло — скопируй и пришли сам',
  }[sendStatus]

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
          <p className="form-progress">лист {current ? current.step : 'IV'} из IV</p>
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
                    <span className="marker">{'абвгде'[i]}.</span>
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
                {stamped && <span className="stamp stamp--pressed">Принято</span>}
              </div>
              <p className="t-label">Инвентарь на старте</p>
              <ul className="inv-list">
                {answers.filter((a) => a.item).map((a) => (
                  <li key={a.item}>{a.item}</li>
                ))}
              </ul>
              <p className="t-label fate-label">Судьба на игру</p>
              <div className="fate-block">
                <p className="fate-name">{answers[3].fate}</p>
                <p className="fate-text">{answers[3].fateText}</p>
              </div>
              <p className="result-note">«{answers[2].note}» — Пер’келе</p>
              <div className="result-actions">
                <button className="btn-ink" type="button" onClick={copyResult}>
                  {copied ? 'Скопировано' : 'Скопировать результат'}
                </button>
                {DISCORD_WEBHOOK_URL && (
                  <button
                    className="btn-line"
                    type="button"
                    onClick={sendResult}
                    disabled={sendStatus === 'sending'}
                  >
                    {sendLabel}
                  </button>
                )}
              </div>
              {!stamped ? (
                <div className="issue-row">
                  <p className="issue-text">Нажми на сургучную печать — и поезд выдаст твой билет.</p>
                  <button className="stamp-slot" type="button" onClick={onStamp}>
                    Поставьте печать
                  </button>
                </div>
              ) : (
                <p className="result-ps">Билет выдан ниже. Предъяви анкету и билет ведущему перед входом в вагон.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
