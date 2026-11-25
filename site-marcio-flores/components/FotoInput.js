'use client';
function shrink(file){return new Promise((ok,no)=>{const u=URL.createObjectURL(file),i=new Image();i.onerror=no;i.onload=()=>{const k=Math.min(1,1400/Math.max(i.width,i.height)),c=document.createElement('canvas');c.width=i.width*k;c.height=i.height*k;c.getContext('2d').drawImage(i,0,0,c.width,c.height);c.toBlob(b=>{URL.revokeObjectURL(u);b?ok(new File([b],'foto.jpg',{type:'image/jpeg'})):no()},'image/jpeg',.8)};i.src=u})}
export default function FotoInput(){
  async function onChange(e){const dt=new DataTransfer();for(const f of e.target.files){try{dt.items.add(await shrink(f))}catch{dt.items.add(f)}}e.target.files=dt.files}
  return <input type="file" name="novas" accept="image/*" multiple onChange={onChange}/>;
}
