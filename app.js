(() => {
  'use strict';
  const STORAGE_KEY = 'ruta20-mauricio-v1';
  const SEED = [
    {id:'r20-001',date:'2026-10-01',vehicle:'VAN-01',driver:'Luis',origin:'Bogotá',destination:'Soacha',km:28,cost:85000,type:'Urbano'},
    {id:'r20-002',date:'2026-10-01',vehicle:'CAM-02',driver:'Ana',origin:'Bogotá',destination:'Funza',km:42,cost:124000,type:'Carga'},
    {id:'r20-003',date:'2026-10-02',vehicle:'VAN-01',driver:'Luis',origin:'Soacha',destination:'Bogotá',km:30,cost:90000,type:'Urbano'},
    {id:'r20-004',date:'2026-10-02',vehicle:'MOTO-03',driver:'Carlos',origin:'Bogotá',destination:'Chía',km:35,cost:56000,type:'Mensajería'},
    {id:'r20-005',date:'2026-10-03',vehicle:'CAM-02',driver:'Ana',origin:'Funza',destination:'Mosquera',km:18,cost:72000,type:'Carga'},
    {id:'r20-006',date:'2026-10-03',vehicle:'VAN-04',driver:'Marta',origin:'Bogotá',destination:'Cajicá',km:48,cost:145000,type:'Urbano'},
    {id:'r20-007',date:'2026-10-04',vehicle:'MOTO-03',driver:'Carlos',origin:'Chía',destination:'Bogotá',km:36,cost:58000,type:'Mensajería'},
    {id:'r20-008',date:'2026-10-05',vehicle:'VAN-01',driver:'Luis',origin:'Bogotá',destination:'Madrid',km:35,cost:98000,type:'Urbano'},
    {id:'r20-009',date:'2026-10-05',vehicle:'CAM-02',driver:'Ana',origin:'Mosquera',destination:'Bogotá',km:27,cost:99000,type:'Carga'},
    {id:'r20-010',date:'2026-10-06',vehicle:'VAN-04',driver:'Marta',origin:'Cajicá',destination:'Bogotá',km:49,cost:148000,type:'Urbano'},
    {id:'r20-011',date:'2026-10-07',vehicle:'MOTO-03',driver:'Carlos',origin:'Bogotá',destination:'La Calera',km:26,cost:52000,type:'Mensajería'},
    {id:'r20-012',date:'2026-10-08',vehicle:'CAM-02',driver:'Ana',origin:'Bogotá',destination:'Funza',km:41,cost:121000,type:'Carga'},
    {id:'r20-013',date:'2026-10-09',vehicle:'VAN-01',driver:'Luis',origin:'Madrid',destination:'Bogotá',km:34,cost:96000,type:'Urbano'},
    {id:'r20-014',date:'2026-10-10',vehicle:'VAN-04',driver:'Marta',origin:'Bogotá',destination:'Soacha',km:29,cost:87000,type:'Urbano'},
    {id:'r20-015',date:'2026-10-11',vehicle:'MOTO-03',driver:'Carlos',origin:'Bogotá',destination:'Chía',km:34,cost:55000,type:'Mensajería'},
    {id:'r20-016',date:'2026-10-12',vehicle:'CAM-02',driver:'Ana',origin:'Bogotá',destination:'Mosquera',km:24,cost:92000,type:'Carga'},
    {id:'r20-017',date:'2026-10-13',vehicle:'VAN-04',driver:'Marta',origin:'Bogotá',destination:'Cajicá',km:47,cost:142000,type:'Urbano'},
    {id:'r20-018',date:'2026-10-14',vehicle:'VAN-01',driver:'Luis',origin:'Bogotá',destination:'Soacha',km:28,cost:84000,type:'Urbano'},
    {id:'r20-019',date:'2026-10-15',vehicle:'CAM-02',driver:'Ana',origin:'Funza',destination:'Bogotá',km:43,cost:127000,type:'Carga'},
    {id:'r20-020',date:'2026-10-15',vehicle:'MOTO-03',driver:'Carlos',origin:'Chía',destination:'Bogotá',km:37,cost:59000,type:'Mensajería'},
    {id:'r20-021',date:'2026-10-17',vehicle:'PICK-05',driver:'Jorge',origin:'Bogotá',destination:'Zipaquirá',km:52,cost:166000,type:'Intermunicipal'},
    {id:'r20-022',date:'2026-10-19',vehicle:'VAN-04',driver:'Marta',origin:'Bogotá',destination:'Madrid',km:36,cost:104000,type:'Urbano'},
    {id:'r20-023',date:'2026-10-22',vehicle:'PICK-05',driver:'Jorge',origin:'Zipaquirá',destination:'Bogotá',km:54,cost:171000,type:'Intermunicipal'},
    {id:'r20-024',date:'2026-10-25',vehicle:'CAM-02',driver:'Ana',origin:'Bogotá',destination:'Mosquera',km:25,cost:94000,type:'Carga'}
  ];
  const COLORS = ['#22d3ee','#60a5fa','#a78bfa','#fbbf24','#34d399','#fb7185','#f472b6'];
  const $ = (id) => document.getElementById(id);
  const money = (n) => '$' + Math.round(n || 0).toLocaleString('es-CO');
  const number = (n, digits=0) => Number(n || 0).toLocaleString('es-CO',{minimumFractionDigits:digits,maximumFractionDigits:digits});
  const escapeHTML = (v) => String(v ?? '').replace(/[&<>"']/g, (ch) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const cloneSeed = () => SEED.map((trip) => ({...trip}));
  let trips = loadTrips();
  let toastTimer;

  function loadTrips(){
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (Array.isArray(saved) && saved.every(isTrip)) return saved;
    } catch (_) { /* Una copia local corrupta se reemplaza con la demo. */ }
    return cloneSeed();
  }
  function isTrip(t){ return t && typeof t.id==='string' && /^\d{4}-\d{2}-\d{2}$/.test(t.date) && typeof t.vehicle==='string' && typeof t.driver==='string' && typeof t.origin==='string' && typeof t.destination==='string' && Number.isFinite(Number(t.km)) && Number(t.km)>0 && Number.isFinite(Number(t.cost)) && Number(t.cost)>=0 && typeof t.type==='string'; }
  function save(){ try { localStorage.setItem(STORAGE_KEY,JSON.stringify(trips)); } catch (_) { notify('No fue posible guardar: el almacenamiento del navegador está lleno.'); } }
  function notify(message){ const toast=$('toast'); toast.textContent=message; toast.classList.add('show'); clearTimeout(toastTimer); toastTimer=setTimeout(()=>toast.classList.remove('show'),2600); }
  function dashboardTrips(){
    const from=$('filter-from').value, to=$('filter-to').value, vehicle=$('filter-vehicle').value;
    return trips.filter(t=>(!from||t.date>=from)&&(!to||t.date<=to)&&(!vehicle||t.vehicle===vehicle));
  }
  function refreshVehicleFilter(){
    const select=$('filter-vehicle'), current=select.value;
    const list=[...new Set(trips.map(t=>t.vehicle))].sort();
    select.innerHTML='<option value="">Todos los vehículos</option>'+list.map(v=>`<option value="${escapeHTML(v)}">${escapeHTML(v)}</option>`).join('');
    if(list.includes(current)) select.value=current;
  }
  function render(){ refreshVehicleFilter(); renderDashboard(); renderTable(); $('nav-count').textContent=trips.length; $('table-total').textContent=trips.length; }
  function renderDashboard(){
    const list=dashboardTrips();
    const totalKm=list.reduce((s,t)=>s+Number(t.km),0), totalCost=list.reduce((s,t)=>s+Number(t.cost),0);
    $('kpi-trips').textContent=number(list.length); $('kpi-km').textContent=number(totalKm)+' km';
    $('kpi-cost').textContent=money(totalCost); $('kpi-per-km').textContent=money(totalKm?totalCost/totalKm:0);
    const from=$('filter-from').value, to=$('filter-to').value;
    $('chart-period').textContent=periodLabel(list,from,to);
    renderDaily(list); renderVehicle(list); renderTypes(list); renderEfficiency(list); renderConclusions(list,totalKm,totalCost);
  }
  function periodLabel(list,from,to){
    if(!list.length)return 'SIN REGISTROS';
    const dates=list.map(t=>t.date).sort();
    const f=from||dates[0], t=to||dates[dates.length-1];
    const a=new Date(f+'T12:00:00'), b=new Date(t+'T12:00:00');
    const fmt=new Intl.DateTimeFormat('es-CO',{month:'long',year:'numeric'});
    const one=fmt.format(a).toUpperCase(), two=fmt.format(b).toUpperCase();
    return one===two?one:`${one} — ${two}`;
  }
  function renderDaily(list){
    const root=$('daily-chart');
    if(!list.length){root.innerHTML='<div class="empty-chart">Sin datos para este filtro</div>'; $('daily-total-legend').textContent=''; return;}
    const days=new Map(); list.forEach(t=>days.set(t.date,(days.get(t.date)||0)+Number(t.cost)));
    const entries=[...days.entries()].sort((a,b)=>a[0].localeCompare(b[0]));
    const width=600,height=155,left=44,right=8,top=12,bottom=25,plotW=width-left-right,plotH=height-top-bottom,max=Math.max(...entries.map(x=>x[1]))||1;
    const step=plotW/entries.length, barW=Math.min(25,step*.62); let svg=`<svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" aria-hidden="true">`;
    for(let i=0;i<4;i++){const y=top+(plotH/3)*i,val=max*(1-i/3);svg+=`<line x1="${left}" y1="${y}" x2="${width-right}" y2="${y}" stroke="#243247" stroke-dasharray="3 4"/><text x="${left-7}" y="${y+3}" fill="#708097" font-size="8" text-anchor="end" font-family="DM Mono,monospace">${compactCurrency(val)}</text>`;}
    entries.forEach(([d,v],i)=>{const h=Math.max(2,v/max*plotH),x=left+i*step+(step-barW)/2,y=top+plotH-h; const day=d.slice(8); svg+=`<g><title>${escapeHTML(d)}: ${money(v)}</title><rect x="${x}" y="${y}" width="${barW}" height="${h}" rx="3" fill="url(#dailyGradient)" opacity=".9"/><rect x="${x}" y="${y}" width="${barW}" height="${h}" rx="3" fill="transparent" stroke="#22d3ee" stroke-opacity=".08"/><text x="${x+barW/2}" y="${height-7}" fill="#718097" font-size="8" text-anchor="middle" font-family="DM Mono,monospace">${day}</text></g>`;});
    svg=svg.replace('<svg ', '<svg ').replace('aria-hidden="true">','aria-hidden="true"><defs><linearGradient id="dailyGradient" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stop-color="#22d3ee"/><stop offset="100%" stop-color="#14708b" stop-opacity=".62"/></linearGradient></defs>');
    root.innerHTML=svg+'</svg>';
    $('daily-total-legend').textContent=`${number(entries.length)} días · ${money(list.reduce((s,t)=>s+Number(t.cost),0))}`;
  }
  function compactCurrency(value){const v=Math.round(value);if(v>=1000000)return (v/1000000).toFixed(1).replace('.',',')+'M';if(v>=1000)return Math.round(v/1000)+'k';return String(v);}
  function renderVehicle(list){
    const root=$('vehicle-chart');
    if(!list.length){root.innerHTML='<div class="empty-chart">Sin datos para este filtro</div>';return;}
    const totals=new Map(); list.forEach(t=>totals.set(t.vehicle,(totals.get(t.vehicle)||0)+Number(t.km)));
    const entries=[...totals.entries()].sort((a,b)=>b[1]-a[1]); const max=entries[0][1]||1;
    root.innerHTML=entries.map(([name,km],i)=>`<div class="vehicle-row"><span class="vehicle-name">${escapeHTML(name)}</span><span class="vehicle-track"><span class="vehicle-fill" style="display:block;width:${Math.max(3,km/max*100)}%;opacity:${1-i*.08}"></span></span><span class="vehicle-distance">${number(km)} km</span></div>`).join('');
  }
  function renderTypes(list){
    const root=$('type-chart');
    if(!list.length){root.innerHTML='<div class="empty-chart">Sin datos para este filtro</div>';return;}
    const totals=new Map(); list.forEach(t=>totals.set(t.type,(totals.get(t.type)||0)+Number(t.cost)));
    const entries=[...totals.entries()].sort((a,b)=>b[1]-a[1]); const sum=entries.reduce((s,x)=>s+x[1],0)||1; let offset=0;
    const circles=entries.map(([name,value],i)=>{const pct=value/sum*100;const part=`<circle cx="58" cy="58" r="42" fill="none" stroke="${COLORS[i%COLORS.length]}" stroke-width="12" stroke-dasharray="${pct} ${100-pct}" stroke-dashoffset="${-offset}" pathLength="100" transform="rotate(-90 58 58)"/>`;offset+=pct;return part;}).join('');
    const labels=entries.map(([name,value],i)=>`<div class="donut-label"><i style="background:${COLORS[i%COLORS.length]}"></i><span>${escapeHTML(name)}</span><b>${Math.round(value/sum*100)}%</b></div>`).join('');
    root.innerHTML=`<div class="donut-wrap"><svg class="donut-svg" viewBox="0 0 116 116" aria-hidden="true"><circle cx="58" cy="58" r="42" fill="none" stroke="#1e2b3d" stroke-width="12"/>${circles}<text x="58" y="56" class="donut-center" text-anchor="middle">${compactCurrency(sum)}</text><text x="58" y="68" class="donut-sub" text-anchor="middle">COP TOTAL</text></svg><div class="donut-labels">${labels}</div></div>`;
  }
  function renderEfficiency(list){
    const root=$('efficiency-chart');
    if(!list.length){root.innerHTML='<div class="empty-chart">Sin datos para este filtro</div>';return;}
    const totals=new Map();
    list.forEach(t=>{const item=totals.get(t.vehicle)||{km:0,cost:0};item.km+=Number(t.km);item.cost+=Number(t.cost);totals.set(t.vehicle,item);});
    const entries=[...totals.entries()].map(([vehicle,x])=>({vehicle,rate:x.km?x.cost/x.km:0})).sort((a,b)=>b.rate-a.rate);
    const max=entries[0].rate||1;
    root.innerHTML=entries.map((x,i)=>`<div class="efficiency-row"><span class="vehicle-name">${escapeHTML(x.vehicle)}</span><span class="vehicle-track"><span class="efficiency-fill" style="display:block;width:${Math.max(3,x.rate/max*100)}%;opacity:${1-i*.08}"></span></span><span class="efficiency-value">${money(x.rate)}</span></div>`).join('');
  }
  function renderConclusions(list,totalKm,totalCost){
    const root=$('conclusions');
    if(!list.length){root.innerHTML='<article class="conclusion-card"><div class="conclusion-number">01</div><p>No hay registros para los filtros seleccionados. Amplía el período o selecciona todos los vehículos.</p></article>';return;}
    const byType=new Map(),byVehicle=new Map();
    list.forEach(t=>{byType.set(t.type,(byType.get(t.type)||0)+Number(t.cost));byVehicle.set(t.vehicle,(byVehicle.get(t.vehicle)||0)+Number(t.km));});
    const topType=[...byType.entries()].sort((a,b)=>b[1]-a[1])[0];
    const topVehicle=[...byVehicle.entries()].sort((a,b)=>b[1]-a[1])[0];
    const daily=new Map();list.forEach(t=>daily.set(t.date,(daily.get(t.date)||0)+Number(t.cost)));
    const topDay=[...daily.entries()].sort((a,b)=>b[1]-a[1])[0];
    const avg=totalKm?totalCost/totalKm:0;
    const conclusion1=`En <strong>${number(list.length)} recorridos</strong> se registraron <strong>${number(totalKm)} km</strong> y un costo total de <strong>${money(totalCost)} COP</strong>. El gasto medio fue de <strong>${money(avg)} por kilómetro</strong>.`;
    const conclusion2=`El tipo de recorrido con mayor costo acumulado es <strong>${escapeHTML(topType[0])}</strong>, con <strong>${money(topType[1])} COP</strong> (${Math.round(topType[1]/(totalCost||1)*100)}% del total filtrado). Conviene comparar sus rutas y costos unitarios.`;
    const date=new Date(topDay[0]+'T12:00:00').toLocaleDateString('es-CO',{day:'numeric',month:'short'});
    const conclusion3=`El vehículo con más kilómetros es <strong>${escapeHTML(topVehicle[0])}</strong> (${number(topVehicle[1])} km). El día de mayor gasto fue el <strong>${date}</strong> (${money(topDay[1])}); comparar carga y ruta ayuda a explicar ese pico.`;
    root.innerHTML=[conclusion1,conclusion2,conclusion3].map((text,i)=>`<article class="conclusion-card"><div class="conclusion-number">0${i+1}</div><p>${text}</p></article>`).join('');
  }
  function renderTable(){
    const query=$('table-search').value.trim().toLocaleLowerCase('es-CO');
    const shown=trips.filter(t=>!query||[t.date,t.vehicle,t.driver,t.origin,t.destination,t.type].some(x=>String(x).toLocaleLowerCase('es-CO').includes(query))).sort((a,b)=>b.date.localeCompare(a.date)||a.vehicle.localeCompare(b.vehicle));
    $('record-count').textContent=`${number(shown.length)} ${shown.length===1?'registro':'registros'}`;
    $('empty-state').classList.toggle('hidden',shown.length>0);
    $('trip-rows').innerHTML=shown.map(t=>`<tr><td class="trip-date">${formatDate(t.date)}</td><td class="vehicle-cell"><b>${escapeHTML(t.vehicle)}</b><small>${escapeHTML(t.driver)}</small></td><td class="route-cell">${escapeHTML(t.origin)} <span>→</span> ${escapeHTML(t.destination)}</td><td><span class="type-chip ${escapeHTML(t.type.toLowerCase())}">${escapeHTML(t.type)}</span></td><td class="table-km">${number(t.km,Number(t.km)%1?1:0)} km</td><td class="table-cost">${money(t.cost)}</td><td class="actions-col"><div class="row-actions"><button class="row-action" data-edit="${escapeHTML(t.id)}" title="Editar recorrido" aria-label="Editar ${escapeHTML(t.vehicle)}">✎</button><button class="row-action delete" data-delete="${escapeHTML(t.id)}" title="Eliminar recorrido" aria-label="Eliminar ${escapeHTML(t.vehicle)}">×</button></div></td></tr>`).join('');
  }
  function formatDate(d){return new Date(d+'T12:00:00').toLocaleDateString('es-CO',{day:'2-digit',month:'short',year:'numeric'}).replace('.','');}
  function openForm(trip){
    $('trip-form').reset(); $('trip-id').value=trip?.id||''; $('form-title').textContent=trip?'Editar recorrido':'Nuevo recorrido';
    $('trip-date').value=trip?.date||new Date().toISOString().slice(0,10);
    $('trip-vehicle').value=trip?.vehicle||''; $('trip-driver').value=trip?.driver||'';
    $('trip-type').value=trip?.type||''; $('trip-origin').value=trip?.origin||''; $('trip-destination').value=trip?.destination||'';
    $('trip-km').value=trip?.km??''; $('trip-cost').value=trip?.cost??'';
    $('trip-dialog').showModal();
  }
  function closeForm(){ $('trip-dialog').close(); }
  $('trip-form').addEventListener('submit',(event)=>{
    event.preventDefault(); const id=$('trip-id').value;
    const item={id:id||`r20-${Date.now()}`,date:$('trip-date').value,vehicle:$('trip-vehicle').value.trim().toUpperCase(),driver:$('trip-driver').value.trim(),type:$('trip-type').value,origin:$('trip-origin').value.trim(),destination:$('trip-destination').value.trim(),km:Number($('trip-km').value),cost:Number($('trip-cost').value)};
    if(!isTrip(item)){notify('Revisa los campos: la distancia debe ser mayor que cero y el costo no puede ser negativo.');return;}
    if(id){trips=trips.map(t=>t.id===id?item:t);notify('Recorrido actualizado.');}else{trips.push(item);notify('Recorrido agregado a la bitácora.');}
    save(); render(); closeForm();
  });
  document.querySelectorAll('[data-open-form]').forEach(btn=>btn.addEventListener('click',()=>openForm()));
  $('close-dialog').addEventListener('click',closeForm); $('cancel-dialog').addEventListener('click',closeForm);
  $('trip-dialog').addEventListener('click',(e)=>{if(e.target===$('trip-dialog'))closeForm();});
  $('trip-rows').addEventListener('click',(e)=>{
    const edit=e.target.closest('[data-edit]'), del=e.target.closest('[data-delete]');
    if(edit){const trip=trips.find(t=>t.id===edit.dataset.edit);if(trip)openForm(trip);}
    if(del){const trip=trips.find(t=>t.id===del.dataset.delete);if(trip&&window.confirm(`¿Eliminar el recorrido ${trip.vehicle}: ${trip.origin} → ${trip.destination}?`)){trips=trips.filter(t=>t.id!==trip.id);save();render();notify('Recorrido eliminado.');}}
  });
  $('table-search').addEventListener('input',renderTable);
  ['filter-from','filter-to','filter-vehicle'].forEach(id=>$(id).addEventListener('change',renderDashboard));
  $('reset-filters').addEventListener('click',()=>{$('filter-from').value='';$('filter-to').value='';$('filter-vehicle').value='';renderDashboard();});
  document.querySelectorAll('.nav-link').forEach(btn=>btn.addEventListener('click',()=>{
    document.querySelectorAll('.nav-link').forEach(x=>x.classList.toggle('active',x===btn));
    document.querySelectorAll('.view-section').forEach(section=>section.classList.toggle('active',section.id===`view-${btn.dataset.view}`));
    window.scrollTo({top:0,behavior:'smooth'});
  }));
  document.querySelector('.notice-close').addEventListener('click',()=>document.querySelector('.notice').remove());
  function exportCSV(){
    const header=['Fecha','Vehículo','Conductor','Origen','Destino','Kilómetros','Costo COP','Tipo de recorrido'];
    const rows=trips.map(t=>[t.date,t.vehicle,t.driver,t.origin,t.destination,t.km,t.cost,t.type]);
    const csv='\uFEFF'+[header,...rows].map(row=>row.map(v=>'"'+String(v).replace(/"/g,'""')+'"').join(';')).join('\r\n');
    const blob=new Blob([csv],{type:'text/csv;charset=utf-8'}),url=URL.createObjectURL(blob),a=document.createElement('a');
    a.href=url;a.download='ruta20-recorridos.csv';document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(url);notify('Archivo CSV exportado.');
  }
  $('export-csv').addEventListener('click',exportCSV); $('export-top').addEventListener('click',exportCSV);
  $('restore-data').addEventListener('click',()=>{if(window.confirm('¿Restaurar los 24 registros ficticios de demostración? Los cambios guardados en este navegador se reemplazarán.')){trips=cloneSeed();save();render();$('table-search').value='';notify('Datos de demostración restaurados.');}});
  render();
})();
