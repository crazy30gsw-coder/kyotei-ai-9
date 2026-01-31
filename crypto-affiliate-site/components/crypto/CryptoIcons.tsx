// =============================================================================
// CryptoIcons - Inline SVG icons for popular cryptocurrencies
// =============================================================================

interface CryptoIconProps {
  size?: number;
  className?: string;
}

/**
 * BitcoinIcon - Orange circle with the Bitcoin currency symbol.
 * Renders an iconic orange coin with the "B" symbol and vertical strokes.
 */
export function BitcoinIcon({ size = 24, className }: CryptoIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Bitcoin"
    >
      {/* Background circle */}
      <circle cx="16" cy="16" r="16" fill="#F7931A" />
      {/* Inner highlight ring */}
      <circle cx="16" cy="16" r="13" fill="none" stroke="#FFFFFF" strokeWidth="0.5" opacity="0.2" />
      {/* Bitcoin symbol */}
      <text
        x="16"
        y="17.5"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#FFFFFF"
        fontSize="16"
        fontWeight="700"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        &#x20BF;
      </text>
      {/* Vertical strokes through the B */}
      <line x1="14" y1="6" x2="14" y2="9" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="18" y1="6" x2="18" y2="9" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="14" y1="23" x2="14" y2="26" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="18" y1="23" x2="18" y2="26" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/**
 * EthereumIcon - Blue/purple diamond shape representing Ethereum.
 * Renders the iconic diamond/octahedron shape in gradient purple-blue.
 */
export function EthereumIcon({ size = 24, className }: CryptoIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Ethereum"
    >
      <defs>
        <linearGradient id="eth-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#627EEA" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
      </defs>
      {/* Background circle */}
      <circle cx="16" cy="16" r="16" fill="url(#eth-gradient)" />
      {/* Ethereum diamond - top half */}
      <path
        d="M16 5L9 17l7 4 7-4L16 5z"
        fill="#FFFFFF"
        opacity="0.9"
      />
      {/* Ethereum diamond - top half darker side */}
      <path
        d="M16 5L9 17l7-3V5z"
        fill="#FFFFFF"
        opacity="0.7"
      />
      {/* Ethereum diamond - bottom half */}
      <path
        d="M9 18.5L16 27l7-8.5-7 4-7-4z"
        fill="#FFFFFF"
        opacity="0.9"
      />
      {/* Ethereum diamond - bottom half darker side */}
      <path
        d="M9 18.5L16 22.5V27l-7-8.5z"
        fill="#FFFFFF"
        opacity="0.7"
      />
    </svg>
  );
}

/**
 * CryptoIcon - A generic cryptocurrency coin icon.
 * Renders a gold/silver coin with a "C" mark and circuit-like accents.
 */
export function CryptoIcon({ size = 24, className }: CryptoIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Cryptocurrency"
    >
      <defs>
        <linearGradient id="crypto-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#FFA000" />
        </linearGradient>
      </defs>
      {/* Background circle */}
      <circle cx="16" cy="16" r="16" fill="url(#crypto-gradient)" />
      {/* Inner ring */}
      <circle cx="16" cy="16" r="12" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.4" />
      {/* Outer ring */}
      <circle cx="16" cy="16" r="14.5" fill="none" stroke="#FFFFFF" strokeWidth="0.5" opacity="0.2" />
      {/* Circuit-like decorative dots */}
      <circle cx="16" cy="4" r="1.5" fill="#FFFFFF" opacity="0.5" />
      <circle cx="16" cy="28" r="1.5" fill="#FFFFFF" opacity="0.5" />
      <circle cx="4" cy="16" r="1.5" fill="#FFFFFF" opacity="0.5" />
      <circle cx="28" cy="16" r="1.5" fill="#FFFFFF" opacity="0.5" />
      {/* Center coin symbol */}
      <text
        x="16"
        y="17"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#FFFFFF"
        fontSize="14"
        fontWeight="700"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        C
      </text>
    </svg>
  );
}
