// Stylized side-view of the formula car used on Cars + Contact + other pages.
// Pure SVG, neon-outline aesthetic with cyan + pink accents.
export default function CarSideView({ className = '' }) {
  return (
    <svg
      viewBox="0 0 1100 460"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="ITU Racing — formula side view"
    >
      <defs>
        <radialGradient id="cv-ground" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="rgba(45,212,220,0.55)" />
          <stop offset="40%" stopColor="rgba(45,212,220,0.18)" />
          <stop offset="100%" stopColor="rgba(45,212,220,0)" />
        </radialGradient>
        <linearGradient id="cv-glow" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#2dd4dc" />
          <stop offset="100%" stopColor="#14b3bd" />
        </linearGradient>
        <filter id="cv-blur" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.2" />
        </filter>
      </defs>

      {/* Ground glow */}
      <ellipse cx="560" cy="400" rx="430" ry="26" fill="url(#cv-ground)" />

      {/* Floating front-wing element (right) */}
      <g stroke="#2dd4dc" strokeWidth="2.3" fill="none">
        <rect x="940" y="172" width="120" height="14" rx="2" />
        <rect x="950" y="195" width="100" height="6" rx="2" />
      </g>

      {/* Rear wing endplate (left tall) */}
      <g stroke="#2dd4dc" strokeWidth="2.3" fill="none">
        <rect x="140" y="120" width="6" height="170" rx="2" />
        <rect x="160" y="138" width="60" height="60" rx="2" />
        <line x1="146" y1="160" x2="160" y2="160" />
        <line x1="146" y1="190" x2="160" y2="190" />
      </g>

      {/* Pink accent line on rear */}
      <path
        d="M180 230 Q 240 222 305 232"
        stroke="#ff3aa8"
        strokeWidth="2.3"
        fill="none"
        opacity="0.85"
      />

      {/* Body — main side silhouette */}
      <g fill="none" stroke="#2dd4dc" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round">
        {/* Main body outline */}
        <path d="
          M180 240
          C 240 225, 320 225, 380 230
          L 520 230
          C 600 230, 680 240, 760 250
          L 880 270
          C 920 275, 940 285, 945 305
          L 945 320
          L 175 320
          L 175 240 Z
        " />

        {/* Side pod / floor */}
        <path d="M260 285 L 800 285 L 820 320 L 240 320 Z" />

        {/* Cockpit cutout (negative space hint) */}
        <path d="M450 230 Q 460 200 510 198 Q 560 198 580 230" />

        {/* Floor splitter */}
        <line x1="180" y1="320" x2="940" y2="320" />
      </g>

      {/* Driver — helmet + shoulder */}
      <g>
        {/* Shoulders */}
        <path
          d="M450 225 Q 480 200 520 195 Q 565 195 585 225 Z"
          fill="#0a0e12"
          stroke="#1a2128"
          strokeWidth="1"
        />
        {/* Helmet */}
        <ellipse cx="525" cy="155" rx="40" ry="44" fill="#0a0e12" stroke="#1a2128" strokeWidth="1.2" />
        <ellipse cx="525" cy="158" rx="38" ry="42" fill="none" stroke="#2dd4dc" strokeWidth="1.4" opacity="0.55" />
        {/* Visor */}
        <path
          d="M498 152 Q 525 138 552 152 L 552 168 Q 525 178 498 168 Z"
          fill="#06090b"
          stroke="#0a0e12"
          strokeWidth="1"
        />
      </g>

      {/* TU ISTANBUL banner on side */}
      <g>
        <rect
          x="430"
          y="248"
          width="290"
          height="56"
          rx="2"
          fill="none"
          stroke="#2dd4dc"
          strokeWidth="2.2"
        />
        <line x1="430" y1="260" x2="720" y2="260" stroke="#2dd4dc" strokeWidth="1" opacity="0.5" />
        <text
          x="575"
          y="287"
          fontFamily="Montserrat, system-ui, sans-serif"
          fontSize="22"
          fontWeight="700"
          fill="#2dd4dc"
          textAnchor="middle"
          letterSpacing="3"
        >
          TU ISTANBUL
        </text>
      </g>

      {/* Front pink chevron accent */}
      <path
        d="M820 252 L 880 268"
        stroke="#ff3aa8"
        strokeWidth="2.4"
        fill="none"
        opacity="0.9"
      />

      {/* Wheels */}
      {/* Rear wheel */}
      <g>
        <circle cx="290" cy="335" r="58" fill="#06090b" stroke="#2dd4dc" strokeWidth="2.4" />
        <circle cx="290" cy="335" r="32" fill="#0a0f12" stroke="#2dd4dc" strokeWidth="1.6" />
        <circle cx="290" cy="335" r="9" fill="#2dd4dc" />
        {/* Speed lines / brake duct hint */}
        <path d="M180 335 L 230 335" stroke="#2dd4dc" strokeWidth="1.2" opacity="0.5" />
      </g>

      {/* Front wheel */}
      <g>
        <circle cx="855" cy="335" r="62" fill="#06090b" stroke="#2dd4dc" strokeWidth="2.4" />
        <circle cx="855" cy="335" r="34" fill="#0a0f12" stroke="#2dd4dc" strokeWidth="1.6" />
        <circle cx="855" cy="335" r="10" fill="#2dd4dc" />
      </g>

      {/* Subtle motion lines under wheels */}
      <g opacity="0.4" stroke="#2dd4dc" strokeWidth="1">
        <line x1="200" y1="395" x2="380" y2="395" />
        <line x1="780" y1="395" x2="930" y2="395" />
      </g>
    </svg>
  )
}
