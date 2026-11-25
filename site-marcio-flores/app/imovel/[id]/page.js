import Link from 'next/link';
import {notFound} from 'next/navigation';
import {obter} from '@/lib/db';
import {R} from '@/lib/util';
import {zap} from '@/lib/config';
export const dynamic='force-dynamic';
export async function generateMetadata({params}){
  const {id}=await params;const i=await obter(id);if(!i||i.ativo===false)return{};
  return{title:`${i.nome} · Marcio Flores`,description:(i.resumo||i.titulo).slice(0,155),openGraph:{title:i.titulo,description:(i.resumo||'').slice(0,155),images:i.fotos[0]?[i.fotos[0]]:[]}};
}
export default async function Imovel({params}){
  const {id}=await params;const i=await obter(id);if(!i||i.ativo===false)notFound();
  const linhas=[['Área útil',i.util&&i.util+' m²'],['Área total',i.total&&i.total+' m²'],['Quartos',i.quartos],['Suítes',i.suites],['Banheiros',i.banh],['Vagas',i.vagas],['Condomínio',i.cond&&R(i.cond)],['IPTU',i.iptu&&R(i.iptu)]].filter(x=>x[1]);
  return(<div className="in">
    <Link className="back" href="/">‹ Ver todos os imóveis</Link>
    {i.fotos.length>0&&<div className="gal">{i.fotos.map((u,n)=><img key={u} className={n?'s':'m'} src={u} alt={`${i.nome}, foto ${n+1}`}/>)}</div>}
    <div className="det"><div><h1>{i.titulo}</h1><p className="mut">{i.local}{i.status?' · '+i.status:''}</p><p>{i.resumo}</p>
      {i.dif.length>0&&<><h2 style={{fontSize:22,margin:'22px 0 8px'}}>Diferenciais</h2><ul className="dif">{i.dif.map(d=><li key={d}>{d}</li>)}</ul></>}</div>
      <aside className="box"><div className="price" style={{margin:0}}>{R(i.valor)}{i.fin==='Aluguel'?'/mês':''}</div>
        <dl>{linhas.map(([k,v])=><><dt key={'t'+k}>{k}</dt><dd key={'d'+k}>{v}</dd></>)}</dl>
        <a className="btn" style={{display:'block',textAlign:'center'}} href={zap(i.nome)} target="_blank" rel="noopener noreferrer">Agendar visita pelo WhatsApp</a>
        <p className="mut" style={{fontSize:13,margin:'10px 0 0'}}>Marcio Flores · CRECI 15639</p></aside></div></div>);
}
