import {cookies} from 'next/headers';
import {redirect} from 'next/navigation';
import {tok} from '@/lib/auth';
async function entrar(f){
  'use server';
  const s=process.env.PAINEL_SENHA;
  if(s&&f.get('senha')===s){(await cookies()).set('adm',await tok(),{httpOnly:true,secure:true,sameSite:'lax',path:'/painel',maxAge:60*60*24*14});redirect('/painel')}
  redirect('/painel/login?erro=1');
}
export default async function Login({searchParams}){
  const q=await searchParams;
  return(<main className="in pad" style={{maxWidth:420}}><h1>Painel do corretor</h1>
    <form action={entrar} className="fg"><div className="full"><label htmlFor="s">Senha</label><input id="s" name="senha" type="password" autoComplete="current-password" required/></div>
    {q.erro&&<p className="full err">Senha incorreta.</p>}<div className="full"><button className="btn" type="submit">Entrar</button></div></form></main>);
}
