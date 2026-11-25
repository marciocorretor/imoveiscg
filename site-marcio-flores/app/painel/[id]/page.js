import Link from 'next/link';
import {notFound} from 'next/navigation';
import {obter} from '@/lib/db';
import {FIELDS,NUM,TIPOS} from '@/lib/util';
import FotoInput from '@/components/FotoInput';
import {salvarImovel,excluirImovel} from '../actions';
export const dynamic='force-dynamic';
const VAZIO={id:'',nome:'',titulo:'',tipo:'Casa',fin:'Venda',local:'',status:'',resumo:'',dif:[],fotos:[],ativo:true};
export default async function Editar({params}){
  const {id}=await params;const novo=id==='novo';
  const i=novo?VAZIO:await obter(id);if(!i)notFound();
  return(<main className="in pad" style={{maxWidth:760}}><Link className="back" href="/painel">‹ Voltar</Link><h1>{novo?'Novo imóvel':'Editar imóvel'}</h1>
    <form action={salvarImovel}><input type="hidden" name="id" value={i.id}/>
      <div className="fg">
        {FIELDS.map(([k,l])=><div key={k} className={['nome','titulo','local'].includes(k)?'full':''}><label htmlFor={k}>{l}</label><input id={k} name={k} defaultValue={i[k]??''} inputMode={NUM.includes(k)?'numeric':undefined}/></div>)}
        <div><label htmlFor="tipo">Tipo</label><select id="tipo" name="tipo" defaultValue={i.tipo}>{TIPOS.map(t=><option key={t}>{t}</option>)}</select></div>
        <div><label htmlFor="fin">Finalidade</label><select id="fin" name="fin" defaultValue={i.fin}><option>Venda</option><option>Aluguel</option></select></div>
        <div className="full"><label htmlFor="resumo">Descrição</label><textarea id="resumo" name="resumo" rows={4} defaultValue={i.resumo}/></div>
        <div className="full"><label htmlFor="dif">Diferenciais (um por linha)</label><textarea id="dif" name="dif" rows={6} defaultValue={i.dif.join('\n')}/></div>
        <div className="full"><label><input type="checkbox" name="ativo" defaultChecked={i.ativo!==false} style={{width:'auto'}}/> Mostrar no site</label></div>
        {i.fotos.length>0&&<div className="full"><label>Fotos atuais (marque a capa ou remova)</label>{i.fotos.map((u,n)=><span className="ph" key={u}><input type="hidden" name="fotoUrl" value={u}/><img src={u} alt={`Foto ${n+1}`}/><label><input type="radio" name="capa" value={u} defaultChecked={n===0} style={{width:'auto'}}/> capa</label><label><input type="checkbox" name="rm" value={u} style={{width:'auto'}}/> remover</label></span>)}</div>}
        <div className="full"><label htmlFor="novas">Adicionar fotos (até cerca de 10 por vez)</label><FotoInput/></div>
      </div>
      <div className="row"><button className="btn" type="submit">Salvar</button></div>
    </form>
    {!novo&&<form action={excluirImovel}><input type="hidden" name="id" value={i.id}/><button className="btn sec" type="submit">Excluir imóvel</button></form>}</main>);
}
