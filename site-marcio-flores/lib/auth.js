export async function tok(){
  const d=new TextEncoder().encode((process.env.PAINEL_SENHA||'')+':'+(process.env.PAINEL_SEGREDO||''));
  const h=await crypto.subtle.digest('SHA-256',d);
  return [...new Uint8Array(h)].map(b=>b.toString(16).padStart(2,'0')).join('');
}
