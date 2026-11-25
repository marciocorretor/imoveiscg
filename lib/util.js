export const R=v=>'R$ '+Number(v||0).toLocaleString('pt-BR');
export const TIPOS=['Casa','Apartamento','Terreno','Sala comercial','Outro'];
export const FIELDS=[['nome','Nome do imóvel'],['titulo','Título do anúncio'],['local','Bairro e cidade'],['valor','Valor (R$)'],['cond','Condomínio (R$)'],['iptu','IPTU (R$)'],['util','Área útil (m²)'],['total','Área total (m²)'],['quartos','Quartos'],['suites','Suítes'],['banh','Banheiros'],['vagas','Vagas'],['status','Situação (ex.: pronto, na planta)']];
export const NUM=['valor','cond','iptu','util','total','quartos','suites','banh','vagas'];
export function num(s){s=String(s==null?'':s).trim();if(/^\d+(\.\d{1,2})?$/.test(s))return Math.round(parseFloat(s));return parseInt(s.split(',')[0].replace(/\D/g,''),10)||0}
export function slug(n){return String(n).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,40)}
