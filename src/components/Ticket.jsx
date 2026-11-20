export default function Ticket({ answers, name }) {
  const passenger = name.trim() || 'Кандидат № 8'

  return (
    <section aria-labelledby="ticket-h">
      <h2 id="ticket-h" className="section-title">Ваш билет</h2>
      <p className="t-issued">Выдан на основании регистрационного листа</p>
      <div className="ticket">
        <span className="stamp stamp-issued" aria-hidden="true">Выдано</span>
        <div className="ticket-main">
          <div className="t-row">
            <div>
              <span className="t-label">Откуда</span>
              <span className="t-val">{answers[0].from}</span>
            </div>
            <span className="t-arrow" aria-hidden="true">→</span>
            <div>
              <span className="t-label">Куда</span>
              <span className="t-val t-val--dest">Прехевиль</span>
            </div>
          </div>
          <div className="t-grid">
            <div>
              <span className="t-label">Дата</span>
              {/* ЗАМЕНИТЕ: дата игры */}
              <span className="t-val">[дата]</span>
            </div>
            <div>
              <span className="t-label">Отправление</span>
              {/* ЗАМЕНИТЕ: время начала */}
              <span className="t-val">[время]</span>
            </div>
            <div>
              <span className="t-label">Место встречи</span>
              {/* ЗАМЕНИТЕ: адрес или площадка */}
              <span className="t-val">[адрес]</span>
            </div>
            <div>
              <span className="t-label">Пассажир</span>
              <span className="t-val">{passenger}</span>
            </div>
          </div>
          <p className="t-note">
            Действителен только в ночь полной луны. Возврату не подлежит.<br />
            Вагон № 3 · пересадки: <em>лес</em> · <em>старый город</em> · <em>лестница Прехевиля</em>.
          </p>
        </div>
        <div className="ticket-stub"><span>Кандидат №&nbsp;8</span></div>
      </div>
      <p className="ticket-ps">При входе в город имена будут собраны, а багаж — взвешен луной.</p>
    </section>
  )
}
