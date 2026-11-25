import {XMLParser} from 'fast-xml-parser';
import {num} from './util';
const SYN={nome:['title','titulo','nome','name'],valor:['listprice','rentalprice','price','valor','precovenda','preco'],util:['livingarea','areautil','areaconstruida','constructedarea'],total:['lotarea','areatotal','totalarea','area'],suites:['suites','suite'],banh:['bathrooms','banheiros'],vagas:['garage','garagem','vagas','garagens','parkingspaces'],quartos:['bedrooms','dormitorios','quartos'],bairro:['neighborhood','bairro'],cidade:['city','cidade'],resumo:['description','descricao','observacao','observacoes'],tipo:['propertytype','tipoimovel','subtipoimovel','tipo'],fin:['transactiontype','finalidade','transacao'],cond:['propertyadministrationfee','condominio','valorcondominio'],iptu:['yearlytax','iptu','valoriptu']};
function acha(o,ns){
  if(o==null||typeof o!=='object')return '';
  for(const [k,v] of Object.entries(o)){if(ns.includes(k.toLowerCase())&&typeof v!=='object'&&String(v).trim())return String(v).trim()}
  for(const v of Object.values(o)){const r=Array.isArray(v)?v.map(x=>acha(x,ns)).find(Boolean):acha(v,ns);if(r)return r}
  return '';
}
function itens(o){
  if(!o||typeof o!=='object')return null;
  for(const [k,v] of Object.entries(o)){if(/^(listing|imovel|anuncio|property)$/i.test(k))return Array.isArray(v)?v:[v]}
  for(const v of Object.values(o)){const r=itens(v);if(r)return r}
  return null;
}
export function parseXml(txt){
  const raiz=new XMLParser({ignoreAttributes:true,parseTagValue:false}).parse(txt);
  const L=itens(raiz);
  if(!L||!L.length)throw new Error('Formato não reconhecido. Envie um trecho do XML para ajustarmos a leitura.');
  return L.map(e=>{
    const g=k=>acha(e,SYN[k]),t=g('tipo').toLowerCase();
    return {nome:g('nome')||'Imóvel importado',titulo:g('nome')||'Imóvel importado',
      tipo:/apart|cobertura|flat|kitnet/.test(t)?'Apartamento':/casa|sobrado/.test(t)?'Casa':/terren|lote/.test(t)?'Terreno':'Outro',
      fin:/alug|rent/i.test(g('fin'))?'Aluguel':'Venda',local:[g('bairro'),g('cidade')].filter(Boolean).join(', '),
      valor:num(g('valor')),cond:num(g('cond')),iptu:num(g('iptu')),util:num(g('util')),total:num(g('total')),
      quartos:num(g('quartos')),suites:num(g('suites')),banh:num(g('banh')),vagas:num(g('vagas')),
      status:'',resumo:g('resumo'),dif:[],fotos:[],ativo:false};
  });
}
