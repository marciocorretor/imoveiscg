import {neon} from '@neondatabase/serverless';
import {SEED} from './seed';
let ready;
async function db(){
  const s=neon(process.env.DATABASE_URL);
  if(!ready){ready=(async()=>{
    await s`CREATE TABLE IF NOT EXISTS imoveis(id text PRIMARY KEY, dados jsonb NOT NULL, criado timestamptz DEFAULT now())`;
    const r=await s`SELECT count(*)::int AS n FROM imoveis`;
    if(!r[0].n){for(const i of SEED){await s`INSERT INTO imoveis(id,dados) VALUES(${i.id},${JSON.stringify(i)}::jsonb)`}}
  })().catch(e=>{ready=null;throw e})}
  await ready;return s;
}
export async function listar(todos){const s=await db();const r=await s`SELECT dados FROM imoveis ORDER BY criado DESC`;return r.map(x=>x.dados).filter(i=>todos||i.ativo!==false)}
export async function obter(id){const s=await db();const r=await s`SELECT dados FROM imoveis WHERE id=${id}`;return r[0]?r[0].dados:null}
export async function salvar(i){const s=await db();await s`INSERT INTO imoveis(id,dados) VALUES(${i.id},${JSON.stringify(i)}::jsonb) ON CONFLICT (id) DO UPDATE SET dados=EXCLUDED.dados`}
export async function excluir(id){const s=await db();await s`DELETE FROM imoveis WHERE id=${id}`}
