import Sigil from './Sigil.jsx'

export default function Finale() {
  return (
    <footer className="finale">
      <svg className="skyline" viewBox="0 0 1200 200" preserveAspectRatio="none" aria-hidden="true">
        <path fill="#0a0e1c" opacity=".8" d="M0 200 V120 H80 V145 H170 V105 H260 V145 H360 V125 H440 V90 H520 V125 H600 V150 H700 V110 H800 V145 H900 V120 H990 V150 H1080 V115 H1200 V200 Z" />
        <path fill="#04050b" d="M0 200 V150 H60 V120 H90 V150 H140 V92 H162 V150 H212 V130 H242 V96 H252 V130 H302 V150 H362 V112 H382 V150 H432 V136 H472 V150 H560 V125 H600 V100 H616 V125 H648 V150 H690 V66 H702 V38 H718 V66 H730 V150 H782 V116 H812 V150 H862 V132 H902 V150 H952 V106 H972 V150 H1022 V126 H1062 V150 H1122 V142 H1152 V150 H1200 V200 Z" />
        <g fill="rgba(160,50,39,.55)">
          <rect x="146" y="104" width="4" height="6" />
          <rect x="236" y="104" width="4" height="6" />
          <rect x="366" y="126" width="4" height="6" />
          <rect x="592" y="112" width="4" height="6" />
          <rect x="706" y="82" width="4" height="6" />
          <rect x="796" y="128" width="4" height="6" />
          <rect x="956" y="120" width="4" height="6" />
          <rect x="109" y="136" width="4" height="6" />
        </g>
      </svg>
      <div className="fog" aria-hidden="true"></div>
      <div className="finale-content">
        <blockquote>
          «До тех пор — давайте снова встретимся под лунным светом».
          <cite>Пер’келе, голос и наблюдатель</cite>
        </blockquote>
        <p className="fineprint">
          <Sigil /><br />
          Организаторы не несут ответственности за лунноожжённых жителей, пульсирующие мешки в подвалах и судьбы, изменённые лунным светом.<br />
          Прехевиль существует. Просьба не обсуждать это с местными.
        </p>
      </div>
    </footer>
  )
}
