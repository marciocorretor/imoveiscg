export default function Logo({size=40}){
  return(<svg width={size} height={size} viewBox="0 0 120 120" aria-hidden="true" style={{display:'block'}}>
    <path d="M24 50 L60 22 L96 50" fill="none" stroke="#D2A468" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M24 100 V62 L42 84 L60 62 V100" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="square"/>
    <path d="M74 100 V62 H98 M74 81 H92" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="square"/>
  </svg>);
}
