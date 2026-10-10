"use strict";
/* ---------- state ---------- */
const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let q='',localFinds=[],synced=false,tab='wild',filter='all',finds=[],openHint=new Set();
const S={};SPECIES.forEach(s=>S[s.id]=s);
const slug=t=>'c:'+t.toLowerCase().trim().replace(/\s+/g,'-').replace(/[^\p{L}\p{N}-]/gu,'').slice(0,40);
function allSpecies(){
  const list=[...SPECIES],seen=new Set(list.map(s=>s.id));
  for(const f of finds)if(f.sid&&f.sid.startsWith('c:')&&!seen.has(f.sid)){
    seen.add(f.sid);list.push({id:f.sid,g:f.group||'wild',en:f.cname||'Saját',la:'',ga:'',sp:GEN,hint:'Saját bejegyzés. Itt tárolod a saját fajtáidat.',custom:1});
  }
  return list;
}
const photoUrl=f=>f.local||'';
const byS=sid=>finds.filter(f=>f.sid===sid);

/* ---------- render ---------- */
function render(){
  const all=allSpecies();
  const cnt=g=>{const l=all.filter(s=>g.includes(s.g));return[l.filter(s=>byS(s.id).length).length,l.length]};
  const [w1,w2]=cnt(TAB_GROUPS.wild),[g1,g2]=cnt(TAB_GROUPS.garden);
  $('#tabs').innerHTML=`<button class="tab" data-act="tab" data-v="wild" aria-pressed="${tab==='wild'}"><span>Vadvirágok</span><span>${w1}/${w2}</span></button><button class="tab" data-act="tab" data-v="garden" aria-pressed="${tab==='garden'}"><span>Kerti virágok</span><span>${g1}/${g2}</span></button>`;
  $('#filters').innerHTML=[['all','Mind'],['have','Megvan'],['miss','Hiányzik']].map(([k,l])=>`<button data-act="filter" data-v="${k}" aria-pressed="${filter===k}">${l}</button>`).join('');
  const [c,t]=cnt(TAB_GROUPS[tab]);$('#bar').style.width=(t?c/t*100:0)+'%';
  let h='';
  if(!synced)h+=`<p class="notice" role="status">Előzmények betöltése…</p>`;
  for(const g of TAB_GROUPS[tab]){
    const qq=q.trim().toLowerCase();
    const l=all.filter(s=>s.g===g&&(filter==='all'||(filter==='have')===byS(s.id).length>0)&&(!qq||[s.en,s.la,s.ga].join(' ').toLowerCase().includes(qq)));
    const tot=all.filter(s=>s.g===g),got=tot.filter(s=>byS(s.id).length).length;
    h+=`<section><h2>${GROUPS[g]}<small>${got} / ${tot.length}</small></h2>`;
    h+=l.length?`<div class="grid">${l.map(card).join('')}</div>`:`<p class="notice">${qq?'Nincs találat. Ha nincs a listán, a fotó mentésekor új nevet is megadhatsz.':filter==='have'?'Ide még nem került fotó. Nyomd meg a „Fotó hozzáadása” gombot.':'Mind megvan ebből a csoportból.'}</p>`;
    h+='</section>';
  }
  h+=`<p class="src">A fajnevek (angol, latin, ír) az <a href="https://irishwildflowers.ie/AZ-english.html" target="_blank" rel="noopener">irishwildflowers.ie</a> indexéből valók, amely a BSBI elterjedési térképeire mutat. Előfordulási adatok: Nemzeti Biodiverzitás Adatközpont (NBDC) / GBIF.</p>`;
  h+=`<div class="backup"><p>A fotók ezen a készüléken, a böngésző tárhelyében maradnak. Ha törlöd a böngészőadatokat, elvesznek, ezért időnként mentsd fájlba.</p><div class="actions"><button data-act="export">Mentés fájlba</button><label for="imp">Visszatöltés fájlból</label></div></div>`;
  const sc=scrollY;$('#main').innerHTML=h;scrollTo(0,sc);
}
function card(s){
  const fs=byS(s.id),have=fs.length>0;
  const art=have?`<img src="${esc(photoUrl(fs[0]))}" alt="${esc(s.en)}" loading="lazy">${fs.length>1?`<span class="cnt">${fs.length}</span>`:''}`:silhouette(s.sp);
  return `<article class="card${have?' have':''}"><button class="art" data-act="detail" data-id="${esc(s.id)}" aria-label="${esc(s.en)} részletei">${art}</button>
  <h3>${esc(s.en)}</h3>${s.la?`<p class="lat">${esc(s.la)}${s.ga?' · '+esc(s.ga):''}</p>`:''}
  ${openHint.has(s.id)?`<p class="hint">${esc(s.hint)}</p>`:''}
  <div class="row"><button data-act="hint" data-id="${esc(s.id)}" aria-expanded="${openHint.has(s.id)}">Hint</button><label class="cam" for="cam" data-pick="${esc(s.id)}" aria-label="Fotózás"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h3l1.5-2h7L17 8h3v11H4z"/><circle cx="12" cy="13.5" r="3.5"/></svg></label><label class="solid" for="file" data-pick="${esc(s.id)}">+ Fotó</label></div></article>`;
}

/* ---------- helyi adatbázis (IndexedDB) ---------- */
let _db;
function idb(){return _db||(_db=new Promise((res,rej)=>{try{const r=indexedDB.open('viragtar',1);r.onupgradeneeded=()=>r.result.createObjectStore('finds',{keyPath:'id'});r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)}catch(e){rej(e)}}))}
async function idbAll(){const d=await idb();return new Promise((res,rej)=>{const r=d.transaction('finds').objectStore('finds').getAll();r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)})}
async function idbPut(v){const d=await idb();return new Promise((res,rej)=>{const t=d.transaction('finds','readwrite');t.objectStore('finds').put(v);t.oncomplete=()=>res();t.onerror=()=>rej(t.error)})}
async function idbDel(id){const d=await idb();return new Promise((res,rej)=>{const t=d.transaction('finds','readwrite');t.objectStore('finds').delete(id);t.oncomplete=()=>res();t.onerror=()=>rej(t.error)})}
function merge(){finds=[...localFinds].sort((a,b)=>(b.ts||0)-(a.ts||0))}
async function saveLocal(rec,blob){
  rec.id='l'+rec.ts;
  const view={...rec,local:URL.createObjectURL(blob)};
  let stored=true;
  try{await idbPut({...rec,blob})}catch{stored=false}
  localFinds=[view,...localFinds];merge();
  if(!stored)throw new Error('idb');
}
async function loadLocal(){
  try{const rows=await idbAll();localFinds=rows.map(r=>{const v={...r,local:URL.createObjectURL(r.blob)};delete v.blob;return v});merge()}catch{}
}

/* ---------- upload flow ---------- */
let up=null;
async function toJpeg(file){
  try{
    let src,w,h,url;
    if(window.createImageBitmap){
      try{src=await createImageBitmap(file,{imageOrientation:'from-image'})}catch{src=await createImageBitmap(file)}
      w=src.width;h=src.height;
    }else{
      url=URL.createObjectURL(file);
      src=await new Promise((res,rej)=>{const i=new Image();i.onload=()=>res(i);i.onerror=rej;i.src=url});
      w=src.naturalWidth;h=src.naturalHeight;
    }
    const k=Math.min(1,1280/Math.max(w,h));
    const c=document.createElement('canvas');c.width=Math.round(w*k);c.height=Math.round(h*k);
    c.getContext('2d').drawImage(src,0,0,c.width,c.height);
    if(url)URL.revokeObjectURL(url);
    const b=await new Promise(res=>c.toBlob(res,'image/jpeg',.82));
    if(b&&b.size>0)return b;
  }catch(e){}
  return file; /* nem sikerült átméretezni: az eredeti képet használjuk */
}
function speciesOptions(sel){
  const all=allSpecies();
  return Object.keys(GROUPS).map(g=>`<optgroup label="${GROUPS[g]}">${all.filter(s=>s.g===g).map(s=>`<option value="${esc(s.id)}"${s.id===sel?' selected':''}>${esc(s.en)}</option>`).join('')}</optgroup>`).join('')
    +`<option value="__new"${sel==='__new'?' selected':''}>Nincs a listán, új név…</option>`;
}
function ymd(d){const p=n=>String(n).padStart(2,'0');return d.getFullYear()+'-'+p(d.getMonth()+1)+'-'+p(d.getDate())}
async function startUpload(file,sid){
  const blob=await toJpeg(file);
  up={blob,url:URL.createObjectURL(blob),sid:sid||null,ctx:!!sid,date:ymd(new Date(file.lastModified||Date.now())),saving:false};
  drawSheet();
}
function drawSheet(){
  if(!up){$('#layer').innerHTML='';return}
  const keep={place:$('#place')?.value||up.place||'',note:$('#note')?.value||up.note||'',date:$('#date')?.value||up.date,nn:$('#nn')?.value??up.newName??'',ng:$('#ng')?.value||up.newGroup||'wild'};
  Object.assign(up,{place:keep.place,note:keep.note,date:keep.date,newName:keep.nn,newGroup:keep.ng});
  const isNew=up.sid==='__new';
  $('#layer').innerHTML=`<div class="scrim" data-act="scrim"><div class="sheet" role="dialog" aria-label="Új fotó">
   <h2>Új fotó</h2><img class="prev" src="${up.url}" alt="A feltöltött fotó">
   <label class="field">Melyik kategóriába kerüljön?<select id="sp">${up.sid?'':'<option value="">Válassz…</option>'}${speciesOptions(up.sid)}</select></label>
   ${isNew?`<div class="two"><label class="field">Név<input id="nn" value="${esc(up.newName)}" placeholder="pl. Dahlia ‘Bishop of Llandaff’"></label><label class="field">Csoport<select id="ng"><option value="wild"${up.newGroup==='wild'?' selected':''}>Vadvirág</option><option value="dahlia"${up.newGroup==='dahlia'?' selected':''}>Dália</option><option value="garden"${up.newGroup==='garden'?' selected':''}>Kerti virág</option></select></label></div>`:''}
   <div class="two"><label class="field">Dátum<input id="date" type="date" value="${esc(up.date)}"></label><label class="field">Hely<input id="place" value="${esc(up.place)}" placeholder="pl. Wicklow"></label></div>
   <label class="field">Megjegyzés<input id="note" value="${esc(up.note)}"></label>
   <div class="actions"><button data-act="cancel">Mégse</button><button class="go" data-act="save" ${up.saving?'disabled':''}>${up.saving?'Mentés…':'Mentés'}</button></div></div></div>`;
}
async function saveUpload(){
  if(!up||up.saving)return;
  let sid=up.sid,cname='',group='';
  if(!sid){showToast('Válassz kategóriát.');return}
  if(sid==='__new'){
    cname=($('#nn')?.value||'').trim();group=$('#ng')?.value||'wild';
    if(!cname){showToast('Add meg a nevet.');return}
    sid=slug(cname);
  }else if(sid.startsWith('c:')){cname=S[sid]?.en||allSpecies().find(s=>s.id===sid)?.en||'';group=allSpecies().find(s=>s.id===sid)?.g||'wild'}
  Object.assign(up,{place:$('#place').value,note:$('#note').value,date:$('#date').value});
  up.saving=true;drawSheet();
  const rec={sid,group:group||S[sid]?.g||'wild',date:up.date,place:up.place,note:up.note,ts:Date.now()};
  if(cname)rec.cname=cname;
  try{
    await saveLocal(rec,up.blob);
    tab=(S[sid]?.g||rec.group)==='wild'?'wild':'garden';
    const nm=allSpecies().find(s=>s.id===sid)?.en||cname;
    up=null;drawSheet();render();showToast('Mentve: '+nm);
  }catch(e){
    tab=(S[sid]?.g||rec.group)==='wild'?'wild':'garden';
    up=null;drawSheet();render();showToast('Csak a munkamenet végéig maradt meg: a böngésző nem engedi a tárolást (privát mód?).');
  }
}

/* ---------- detail ---------- */
let del=null;
function openDetail(sid){
  const s=allSpecies().find(x=>x.id===sid);if(!s)return;
  const fs=byS(sid);
  $('#layer').innerHTML=`<div class="scrim" data-act="scrim"><div class="sheet" role="dialog" aria-label="${esc(s.en)}">
   <h2>${esc(s.en)}</h2>${s.la?`<p class="lat" style="margin:-8px 0 0">${esc(s.la)}${s.ga?' · '+esc(s.ga):''}</p>`:''}
   ${fs.length?'':`<div class="big">${silhouette(s.sp)}</div>`}
   <p class="hint" style="margin:0">${esc(s.hint)}</p>
   ${fs.length?`<div class="gal">${fs.map(f=>`<figure><img src="${esc(photoUrl(f))}" alt="${esc(s.en)}"><span>${esc(f.date||'')}${f.place?' · '+esc(f.place):''}</span>${f.note?`<span>${esc(f.note)}</span>`:''}${del===f.id?`<button data-act="delyes" data-id="${esc(f.id)}">Biztosan törlöd? Igen</button>`:`<button data-act="del" data-id="${esc(f.id)}">Törlés</button>`}</figure>`).join('')}</div>`:''}
   <div class="actions"><button data-act="cancel">Bezár</button><label for="cam" data-pick="${esc(sid)}">Fotózás</label><label for="file" data-pick="${esc(sid)}">Galéria</label></div></div></div>`;
}
async function removeFind(id){
  const f=finds.find(x=>x.id===id);if(!f)return;
  try{await idbDel(id)}catch{}
  if(f.local){try{URL.revokeObjectURL(f.local)}catch{}}
  localFinds=localFinds.filter(x=>x.id!==id);merge();
  del=null;const sid=f.sid;render();byS(sid).length?openDetail(sid):($('#layer').innerHTML='');
}

/* ---------- toast + events ---------- */
let tt;function showToast(m){let t=$('#toast');if(!t){t=document.createElement('div');t.id='toast';t.setAttribute('role','status');t.style.cssText='position:fixed;left:50%;transform:translateX(-50%);bottom:calc(84px + env(safe-area-inset-bottom,0px));background:var(--ink);color:var(--bg);padding:10px 16px;border-radius:10px;z-index:20;font-size:14px;max-width:90%';document.body.appendChild(t)}t.textContent=m;t.hidden=false;clearTimeout(tt);tt=setTimeout(()=>t.hidden=true,3200)}
let pendingSid=null;
['#file','#cam'].forEach(sel=>$(sel).addEventListener('change',e=>{
  const inp=e.target,f=inp.files&&inp.files[0];
  if(!f)return;
  $('#layer').innerHTML='';
  startUpload(f,pendingSid).finally(()=>{try{inp.value=''}catch{}});
}));
$('#q').addEventListener('input',e=>{q=e.target.value;render()});
document.addEventListener('click',e=>{
  const p=e.target.closest('[data-pick]');
  if(p){pendingSid=p.dataset.pick||null;return}
  const b=e.target.closest('[data-act]');if(!b)return;
  const a=b.dataset.act,id=b.dataset.id;
  if(a==='scrim'){if(e.target===b&&!(up&&up.saving)){up=null;del=null;$('#layer').innerHTML=''}return}
  if(a==='tab'){tab=b.dataset.v;render()}
  else if(a==='filter'){filter=b.dataset.v;render()}
  else if(a==='hint'){openHint.has(id)?openHint.delete(id):openHint.add(id);render()}
  else if(a==='detail')openDetail(id);
  else if(a==='cancel'){up=null;del=null;$('#layer').innerHTML=''}
  else if(a==='export')exportAll();
  else if(a==='save')saveUpload();
  else if(a==='del'){del=id;openDetail(finds.find(f=>f.id===id)?.sid)}
  else if(a==='delyes')removeFind(id);
});
document.addEventListener('change',e=>{if(e.target.id==='sp'&&up){up.sid=e.target.value||null;up.ctx=true;drawSheet()}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!(up&&up.saving)){up=null;del=null;$('#layer').innerHTML=''}});

/* ---------- mentés / visszatöltés fájlból ---------- */
const toDataUrl=b=>new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result);r.onerror=rej;r.readAsDataURL(b)});
async function exportAll(){
  try{
    const rows=await idbAll(),out=[];
    for(const r of rows){const {blob,...rest}=r;out.push({...rest,img:await toDataUrl(blob)})}
    const data=new Blob([JSON.stringify({app:'viragtar',v:1,finds:out})],{type:'application/json'});
    const a=document.createElement('a');a.href=URL.createObjectURL(data);a.download='viragtar-mentes-'+ymd(new Date())+'.json';
    document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),4000);
    showToast('Mentés elkészült: '+rows.length+' fotó');
  }catch(e){showToast('A mentés nem sikerült.')}
}
async function importFile(file){
  try{
    const j=JSON.parse(await file.text());let n=0;
    for(const f of (j.finds||[])){
      if(!f.img||!f.sid)continue;
      const blob=await (await fetch(f.img)).blob();const {img,...rest}=f;
      await idbPut({...rest,blob});n++;
    }
    await loadLocal();render();showToast('Visszatöltve: '+n+' fotó');
  }catch(e){showToast('Ezt a fájlt nem tudtam beolvasni.')}
}
$('#imp').addEventListener('change',e=>{const f=e.target.files[0];if(f)importFile(f).finally(()=>{try{e.target.value=''}catch{}})});

/* ---------- indítás ---------- */
render();
loadLocal().then(()=>{synced=true;render()});
if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));
