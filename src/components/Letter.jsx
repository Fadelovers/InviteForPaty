import { useEffect, useRef } from 'react'
import Sigil from './Sigil.jsx'

export default function Letter({ signed, onSign }) {
  const letterRef = useRef(null)

  useEffect(() => {
    if (!signed) return undefined
    const timer = setTimeout(() => letterRef.current?.focus(), 850)
    return () => clearTimeout(timer)
  }, [signed])

  return (
    <div className={signed ? 'invite-card open' : 'invite-card'}>
      <div className="cover-wrap" {...(signed ? { inert: '' } : {})}>
        <div className="clip">
          <div className="cover">
            <svg className="crest" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="8.5" fill="none" stroke="currentColor" strokeWidth="1.1" />
              <circle cx="9.4" cy="12" r="5.8" fill="currentColor" />
            </svg>
            <p className="cover-kicker">Письмо его небесного величества</p>
            <p className="cover-title">Фестиваль Термины</p>
            <p className="cover-note">приглашение для восьмерых кандидатов</p>
            <button
              className="seal-btn"
              type="button"
              aria-label="Поставить печать и подписать письмо"
              aria-expanded={signed}
              onClick={onSign}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.3" />
                <circle cx="9.6" cy="12" r="5.4" fill="currentColor" />
              </svg>
            </button>
            <p className="seal-hint" aria-hidden="true">поставьте печать — это ваша подпись</p>
          </div>
        </div>
      </div>
      <div className="letter-wrap" id="letter-body">
        <div className="clip">
          <article className="letter" tabindex="-1" ref={letterRef}>
            <p className="letter-kicker">Прехевиль · Башня Лунного Света</p>
            <h3 className="letter-title">Дорогой кандидат</h3>
            <p className="letter-sub">не переживай — всё позади</p>
            <div className="letter-rule"><Sigil /></div>
            <div className="letter-body">
              <p>Не переживай — всё позади. Теперь ты в безопасности под прекрасным светом луны.</p>
              <p>Поскольку наши слова не дойдут до моего хозяина, я говорю от его имени. Его небесное величество, провинившийся лунный бог-трикстер Реер, приглашает восьмерых из вас на юбилей космических мастабов. Поезд уже отапливается, а ворота города — нет: они откроются только для тех, кто найдёт к ним путь.</p>
              <p className="letter-motto">Восемь кандидатов.<br />Но только один истинный победитель.</p>
              <p>Прехевиль готов принять вас: его мэрия, его трущобы, его церковь и его бледная башня над крышами. Не бойтесь леса по дороге — он лишь проверяет, насколько крепко вы держите свои имена. Осматривайте всё, к чему вы не боитесь прикоснуться, и помните: луна видит вас даже тогда, когда вы решили, что спрятались.</p>
              <p>Я с радостью отвечу на все твои вопросы, когда ты доберёшься. Но до тех пор — давайте снова встретимся под лунным светом.</p>
            </div>
            <div className="letter-sign">
              <p className="name">— Пер’келе</p>
              <p className="role">скромный слуга его небесного величества</p>
            </div>
            <div className="letter-foot">
              <span className="seal-mini" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.3" />
                  <circle cx="9.6" cy="12" r="5.4" fill="currentColor" />
                </svg>
              </span>
            </div>
            <p className="letter-ps">P.S. Просьба иметь при себе кубы судьбы (d20 приветствуется), карандаш и лист персонажа. Форма одежды — походная. Ночные прогулки без сопровождения — на свой страх и риск.</p>
            <p className="letter-ps">P.P.S. К письму приложен регистрационный лист. Заполни его честно: ответы сверяются с луной, а она не прощает вранья. За честные ответы поезд выдаст тебе билет.</p>
          </article>
        </div>
      </div>
    </div>
  )
}
