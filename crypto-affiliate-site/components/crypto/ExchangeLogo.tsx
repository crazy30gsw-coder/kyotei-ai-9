// =============================================================================
// ExchangeLogo - Inline SVG logo components for each cryptocurrency exchange
// =============================================================================

interface ExchangeLogoProps {
  exchange: string;
  size?: number;
}

interface LogoConfig {
  bgColor: string;
  textColor: string;
  label: string;
  shape: "circle" | "roundedRect";
}

const logoConfigs: Record<string, LogoConfig> = {
  bitflyer: {
    bgColor: "#FFA500",
    textColor: "#FFFFFF",
    label: "bF",
    shape: "roundedRect",
  },
  coincheck: {
    bgColor: "#00B4C5",
    textColor: "#FFFFFF",
    label: "CC",
    shape: "circle",
  },
  "gmo-coin": {
    bgColor: "#0066CC",
    textColor: "#FFFFFF",
    label: "GMO",
    shape: "roundedRect",
  },
  "dmm-bitcoin": {
    bgColor: "#E60012",
    textColor: "#FFFFFF",
    label: "DMM",
    shape: "roundedRect",
  },
  bitbank: {
    bgColor: "#1B2B37",
    textColor: "#FFFFFF",
    label: "bb",
    shape: "roundedRect",
  },
  bitpoint: {
    bgColor: "#00A650",
    textColor: "#FFFFFF",
    label: "BP",
    shape: "circle",
  },
  binance: {
    bgColor: "#F0B90B",
    textColor: "#FFFFFF",
    label: "BN",
    shape: "roundedRect",
  },
  bybit: {
    bgColor: "#F7A600",
    textColor: "#FFFFFF",
    label: "By",
    shape: "roundedRect",
  },
  okx: {
    bgColor: "#000000",
    textColor: "#FFFFFF",
    label: "OKX",
    shape: "roundedRect",
  },
  "gate-io": {
    bgColor: "#2354E6",
    textColor: "#FFFFFF",
    label: "G",
    shape: "circle",
  },
  mexc: {
    bgColor: "#2B6AF5",
    textColor: "#FFFFFF",
    label: "MX",
    shape: "roundedRect",
  },
};

function BitflyerLogo({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="bitFlyer"
    >
      <rect width="48" height="48" rx="10" fill="#FFA500" />
      <path
        d="M14 16h6c3.3 0 6 1.8 6 4.5S23.3 25 20 25h-6v-9zm0 12h7c3.3 0 6 1.8 6 4.5S24.3 37 21 37h-7v-9z"
        fill="#FFFFFF"
        opacity="0.3"
      />
      <text
        x="24"
        y="29"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#FFFFFF"
        fontSize="16"
        fontWeight="700"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        bF
      </text>
    </svg>
  );
}

function CoincheckLogo({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Coincheck"
    >
      <circle cx="24" cy="24" r="24" fill="#00B4C5" />
      <circle cx="24" cy="24" r="16" fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.3" />
      <path
        d="M30 20l-3 3-3-3-3 3-3-3"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.25"
      />
      <text
        x="24"
        y="26"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#FFFFFF"
        fontSize="14"
        fontWeight="700"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        CC
      </text>
    </svg>
  );
}

function GmoCoinLogo({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="GMO Coin"
    >
      <rect width="48" height="48" rx="10" fill="#0066CC" />
      <rect x="4" y="4" width="40" height="40" rx="8" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.2" />
      <text
        x="24"
        y="26"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#FFFFFF"
        fontSize="13"
        fontWeight="800"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        GMO
      </text>
    </svg>
  );
}

function DmmBitcoinLogo({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="DMM Bitcoin"
    >
      <rect width="48" height="48" rx="10" fill="#E60012" />
      <rect x="6" y="18" width="36" height="12" rx="2" fill="#FFFFFF" opacity="0.15" />
      <text
        x="24"
        y="26"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#FFFFFF"
        fontSize="13"
        fontWeight="800"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        DMM
      </text>
    </svg>
  );
}

function BitbankLogo({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="bitbank"
    >
      <rect width="48" height="48" rx="10" fill="#1B2B37" />
      <rect x="8" y="8" width="32" height="32" rx="6" fill="none" stroke="#4A90D9" strokeWidth="1.5" opacity="0.4" />
      <text
        x="24"
        y="26"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#FFFFFF"
        fontSize="15"
        fontWeight="700"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        bb
      </text>
    </svg>
  );
}

function BitpointLogo({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="BITPOINT"
    >
      <circle cx="24" cy="24" r="24" fill="#00A650" />
      <circle cx="24" cy="24" r="18" fill="none" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.25" />
      <circle cx="24" cy="24" r="10" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.15" />
      <text
        x="24"
        y="26"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#FFFFFF"
        fontSize="14"
        fontWeight="700"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        BP
      </text>
    </svg>
  );
}

function BinanceLogo({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Binance"
    >
      <rect width="48" height="48" rx="10" fill="#F0B90B" />
      {/* Binance diamond pattern */}
      <path d="M24 12l4 4-4 4-4-4z" fill="#FFFFFF" opacity="0.3" />
      <path d="M16 20l4 4-4 4-4-4z" fill="#FFFFFF" opacity="0.2" />
      <path d="M32 20l4 4-4 4-4-4z" fill="#FFFFFF" opacity="0.2" />
      <path d="M24 28l4 4-4 4-4-4z" fill="#FFFFFF" opacity="0.3" />
      <text
        x="24"
        y="26"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#FFFFFF"
        fontSize="14"
        fontWeight="700"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        BN
      </text>
    </svg>
  );
}

function BybitLogo({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Bybit"
    >
      <rect width="48" height="48" rx="10" fill="#F7A600" />
      <path d="M10 14h28v4H10z" fill="#FFFFFF" opacity="0.15" />
      <path d="M10 30h28v4H10z" fill="#FFFFFF" opacity="0.15" />
      <text
        x="24"
        y="26"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#FFFFFF"
        fontSize="14"
        fontWeight="700"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        By
      </text>
    </svg>
  );
}

function OkxLogo({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="OKX"
    >
      <rect width="48" height="48" rx="10" fill="#000000" />
      {/* OKX grid pattern */}
      <rect x="14" y="14" width="8" height="8" rx="1" fill="#FFFFFF" opacity="0.15" />
      <rect x="26" y="14" width="8" height="8" rx="1" fill="#FFFFFF" opacity="0.15" />
      <rect x="14" y="26" width="8" height="8" rx="1" fill="#FFFFFF" opacity="0.15" />
      <rect x="26" y="26" width="8" height="8" rx="1" fill="#FFFFFF" opacity="0.15" />
      <text
        x="24"
        y="26"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#FFFFFF"
        fontSize="13"
        fontWeight="800"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        OKX
      </text>
    </svg>
  );
}

function GateIoLogo({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Gate.io"
    >
      <circle cx="24" cy="24" r="24" fill="#2354E6" />
      <circle cx="24" cy="24" r="16" fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.2" />
      <path d="M24 8v32" stroke="#FFFFFF" strokeWidth="1" opacity="0.1" />
      <path d="M8 24h32" stroke="#FFFFFF" strokeWidth="1" opacity="0.1" />
      <text
        x="24"
        y="26"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#FFFFFF"
        fontSize="18"
        fontWeight="700"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        G
      </text>
    </svg>
  );
}

function MexcLogo({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="MEXC"
    >
      <rect width="48" height="48" rx="10" fill="#2B6AF5" />
      <path d="M8 36L16 12h4l8 16 8-16h4l8 24" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.2" strokeLinecap="round" />
      <text
        x="24"
        y="26"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#FFFFFF"
        fontSize="14"
        fontWeight="700"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        MX
      </text>
    </svg>
  );
}

/**
 * Fallback logo using the generic config
 */
function FallbackLogo({ config, size }: { config: LogoConfig; size: number }) {
  const fontSize = config.label.length > 2 ? 13 : config.label.length > 1 ? 15 : 18;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={config.label}
    >
      {config.shape === "circle" ? (
        <circle cx="24" cy="24" r="24" fill={config.bgColor} />
      ) : (
        <rect width="48" height="48" rx="10" fill={config.bgColor} />
      )}
      <text
        x="24"
        y="26"
        textAnchor="middle"
        dominantBaseline="central"
        fill={config.textColor}
        fontSize={fontSize}
        fontWeight="700"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        {config.label}
      </text>
    </svg>
  );
}

/**
 * Generic fallback for unknown exchanges
 */
function UnknownLogo({ exchange, size }: { exchange: string; size: number }) {
  const initial = exchange.charAt(0).toUpperCase();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={exchange}
    >
      <rect width="48" height="48" rx="10" fill="#6B7280" />
      <text
        x="24"
        y="26"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#FFFFFF"
        fontSize="18"
        fontWeight="700"
        fontFamily="system-ui, -apple-system, sans-serif"
      >
        {initial}
      </text>
    </svg>
  );
}

// Map of exchange IDs to their custom SVG logo components
const customLogos: Record<string, React.FC<{ size: number }>> = {
  bitflyer: BitflyerLogo,
  coincheck: CoincheckLogo,
  "gmo-coin": GmoCoinLogo,
  "dmm-bitcoin": DmmBitcoinLogo,
  bitbank: BitbankLogo,
  bitpoint: BitpointLogo,
  binance: BinanceLogo,
  bybit: BybitLogo,
  okx: OkxLogo,
  "gate-io": GateIoLogo,
  mexc: MexcLogo,
};

/**
 * ExchangeLogo renders an inline SVG logo for a given cryptocurrency exchange.
 *
 * Each exchange has a unique stylized SVG using its brand colors. For unknown
 * exchanges, a generic logo is rendered with the first letter of the exchange name.
 *
 * @param exchange - The exchange ID (e.g., "bitflyer", "coincheck", "gmo-coin")
 * @param size - The width and height of the SVG in pixels (default: 48)
 */
export function ExchangeLogo({ exchange, size = 48 }: ExchangeLogoProps) {
  const CustomLogo = customLogos[exchange];
  if (CustomLogo) {
    return <CustomLogo size={size} />;
  }

  const config = logoConfigs[exchange];
  if (config) {
    return <FallbackLogo config={config} size={size} />;
  }

  return <UnknownLogo exchange={exchange} size={size} />;
}
