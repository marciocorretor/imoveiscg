'use server';
import {put} from '@vercel/blob';
import {redirect} from 'next/navigation';
import {revalidatePath} from 'next/cache';
import {cookies} from 'next/headers';
import {salvar,excluir,obter,listar} from '@/lib/db';
import {FIELDS,NUM,num,slug} from '@/lib/util';
import {parseXml} from '@/lib/xml';
const RES=['novo','importar','login'];
async function novoId(nome){
  const L=(await listar(true)).map(x=>x.id);let s=slug(nome)||'imovel';
  if(RES.includes(s)||L.includes(s))s+='-'+Date.now().toString(36);return s;
}
const fim=()=>{revalidatePath('/');revalidatePath('/painel');redirect('/painel')};
export async function salvarImovel(f){
  const id0=f.get('id'),ex=id0?await obter(id0):null;
  const i={...(ex||{})};
  FIELDS.forEach(([k])=>{i[k]=NUM.includes(k)?num(f.get(k)):String(f.get(k)||'').trim()});
  if(!i.nome)redirect('/painel');
  i.id=ex?ex.id:await novoId(i.nome);
  i.titulo=i.titulo||i.nome;
  i.tipo=String(f.get('tipo')||'Casa');i.fin=String(f.get('fin')||'Venda');
  i.resumo=String(f.get('resumo')||'').trim();
  i.dif=String(f.get('dif')||'').split('\n').map(x=>x.trim()).filter(Boolean);
  i.ativo=f.get('ativo')==='on';
  const rm=f.getAll('rm');let fotos=f.getAll('fotoUrl').filter(u=>!rm.includes(u));
  const capa=f.get('capa');if(capa&&fotos.includes(capa))fotos=[capa,...fotos.filter(u=>u!==capa)];
  const novas=f.getAll('novas').filter(x=>x&&typeof x==='object'&&x.size>0);
  for(let n=0;n<novas.length;n++){
    const b=await put(`imoveis/${i.id}/foto-${n}.jpg`,novas[n],{access:'public',addRandomSuffix:true,contentType:'image/jpeg'});
    fotos.push(b.url);
  }
  i.fotos=fotos;
  await salvar(i);fim();
}
export async function excluirImovel(f){await excluir(String(f.get('id')));fim()}
export async function importarXml(f){
  const arq=f.get('xml');
  if(!arq||!arq.size)redirect('/painel/importar?erro='+encodeURIComponent('Escolha um arquivo XML.'));
  let L;try{L=parseXml(await arq.text())}catch(e){redirect('/painel/importar?erro='+encodeURIComponent(e.message))}
  for(const x of L){x.id=await novoId(x.nome);await salvar(x)}
  fim();
}
export async function sair(){(await cookies()).delete({name:'adm',path:'/painel'});redirect('/painel/login')}
