import Link from 'next/link';
import {importarXml} from '../actions';
export default async function Importar({searchParams}){
  const q=await searchParams;
  return(<main className="in pad" style={{maxWidth:640}}><Link className="back" href="/painel">‹ Voltar</Link><h1>Importar XML</h1>
    <p className="mut">Os imóveis entram ocultos, para você revisar e adicionar fotos antes de mostrar no site. As fotos do XML não são importadas.</p>
    <form action={importarXml}><input type="file" name="xml" accept=".xml,text/xml,application/xml" required/>{q.erro&&<p className="err">{q.erro}</p>}<div className="row"><button className="btn" type="submit">Importar</button></div></form></main>);
}
