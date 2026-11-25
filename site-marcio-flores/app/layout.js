import './globals.css';
import Link from 'next/link';
import {Bricolage_Grotesque,Instrument_Sans} from 'next/font/google';
import Logo from '@/components/Logo';
import {NOME,CRECI,FONE,REDES,WA} from '@/lib/config';
const head=Bricolage_Grotesque({subsets:['latin'],weight:['500','700'],variable:'--f-head'});
const body=Instrument_Sans({subsets:['latin'],weight:['400','500','600'],variable:'--f-body'});
const base=process.env.VERCEL_PROJECT_PRODUCTION_URL?'https://'+process.env.VERCEL_PROJECT_PRODUCTION_URL:'http://localhost:3000';
export const metadata={metadataBase:new URL(base),title:`${NOME} · Corretor de Imóveis em Campo Grande`,description:`Imóveis selecionados em Campo Grande - MS com ${NOME}, CRECI ${CRECI}.`};
export default function Layout({children}){
  return(<html lang="pt-BR" className={`${head.variable} ${body.variable}`}><body>
    <div className="top"><div className="in"><Link href="/" style={{display:'flex',alignItems:'center',gap:10}}><Logo/><b>{NOME}</b></Link><span>Corretor de imóveis · CRECI {CRECI} · Campo Grande - MS</span></div></div>
    {children}
    <footer><div className="in"><p>{NOME} · CRECI {CRECI} · WhatsApp {FONE}</p><p>{REDES.map(([n,u])=><a key={n} href={u} target="_blank" rel="noopener noreferrer">{n}</a>)}</p><p style={{opacity:.8}}>Valores e condições sujeitos a confirmação. Imagens ilustrativas.</p></div></footer>
    <a className="btn fab" href={`https://wa.me/${WA}`} target="_blank" rel="noopener noreferrer">Falar no WhatsApp</a>
  </body></html>);
}
