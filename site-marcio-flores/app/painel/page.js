import Link from 'next/link';
import {listar} from '@/lib/db';
import {R} from '@/lib/util';
import {sair} from './actions';
export const dynamic='force-dynamic';
export default async function Painel(){
  const L=await listar(true);
  return(<main className="in pad"><h1>Painel do corretor</h1>
    <div className="row"><Link className="btn" href="/painel/novo">Novo imóvel</Link><Link className="btn sec" href="/painel/importar">Importar XML</Link><Link className="btn sec" href="/">Ver o site</Link><form action={sair}><button className="btn sec" type="submit">Sair</button></form></div>
    <ul className="plist">{L.map(i=><li key={i.id}><span><b>{i.nome}</b> · {R(i.valor)} {i.ativo===false&&<em className="mut">· oculto no site</em>}</span><Link className="btn sec" href={`/painel/${i.id}`}>Editar</Link></li>)}</ul>
    {!L.length&&<p className="mut">Nenhum imóvel ainda. Toque em Novo imóvel.</p>}</main>);
}
