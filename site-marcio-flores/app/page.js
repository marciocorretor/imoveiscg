import Link from 'next/link';
import {listar} from '@/lib/db';
import {R,TIPOS} from '@/lib/util';
export const dynamic='force-dynamic';
export default async function Home({searchParams}){
  const q=await searchParams;const tipo=q.tipo||'',max=+q.max||0;
  const L=(await listar()).filter(i=>(!tipo||i.tipo===tipo)&&(!max||i.valor<=max));
  return(<>
    <section className="hero"><div className="in"><h1>Imóveis selecionados em Campo Grande</h1><p>Casas e apartamentos com atendimento direto do corretor, do primeiro contato à entrega das chaves.</p></div></section>
    <div className="in">
      <form className="filters" method="get">
        <div><label htmlFor="t">Tipo</label><select id="t" name="tipo" defaultValue={tipo}><option value="">Todos</option>{TIPOS.map(t=><option key={t}>{t}</option>)}</select></div>
        <div><label htmlFor="m">Valor até</label><select id="m" name="max" defaultValue={q.max||''}><option value="">Qualquer valor</option><option value="500000">R$ 500 mil</option><option value="1000000">R$ 1 milhão</option><option value="1500000">R$ 1,5 milhão</option><option value="2000000">R$ 2 milhões</option></select></div>
        <button className="btn" type="submit">Filtrar</button>
      </form>
      <div className="list">{L.length?L.map(i=>(
        <Link key={i.id} className="card" href={`/imovel/${i.id}`}>
          {i.fotos[0]&&<img src={i.fotos[0]} alt={i.nome}/>}
          <div className="b"><h3>{i.nome}</h3><div className="price">{R(i.valor)}{i.fin==='Aluguel'?'/mês':''}</div><div className="mut">{i.local}</div>
          <ul className="facts">{i.util>0&&<li>{i.util} m²</li>}{i.quartos>0&&<li>{i.quartos} quartos</li>}{i.suites>0&&<li>{i.suites} suítes</li>}{i.vagas>0&&<li>{i.vagas} vagas</li>}</ul></div>
        </Link>)):<p className="mut">Nenhum imóvel nessa busca. Fale comigo e eu procuro opções para você.</p>}</div>
    </div></>);
}
