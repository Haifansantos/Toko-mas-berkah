(function(){
  'use strict';
  const branches = window.STORE_BRANCHES || [];
  const areas = window.STORE_AREAS || [];
  const byArea = new Map(areas.map(a => [a.name, a]));
  const searchInput = document.getElementById('storeSearch');
  const areaFilter = document.getElementById('areaFilter');
  const areaPicker = document.getElementById('areaPicker');
  const areaPickerTrigger = document.getElementById('areaPickerTrigger');
  const areaPickerPanel = document.getElementById('areaPickerPanel');
  const areaPickerSearch = document.getElementById('areaPickerSearch');
  const areaPickerList = document.getElementById('areaPickerList');
  const areaPickerValue = document.getElementById('areaPickerValue');
  const areaPickerHint = document.getElementById('areaPickerHint');
  const branchList = document.getElementById('branchList');
  const resultCount = document.getElementById('resultCount');
  const resultsTitle = document.getElementById('resultsTitle');
  const resultsCaption = document.getElementById('resultsCaption');
  const emptyState = document.getElementById('emptyState');
  const resetFilter = document.getElementById('resetFilter');
  const emptyReset = document.getElementById('emptyReset');
  let map = null;
  let mapMarkers = [];
  let mapReady = false;

  document.getElementById('totalBranches').textContent = branches.length;
  document.getElementById('totalAreas').textContent = areas.length;
  document.getElementById('year').textContent = new Date().getFullYear();

  const sortedAreas = areas.slice().sort((a,b)=>a.name.localeCompare(b.name,'id'));
  sortedAreas.forEach(area => {
    const option = document.createElement('option'); option.value = area.name; option.textContent = area.name; areaFilter.appendChild(option);
  });

  function esc(s){return String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
  function areaCount(name){return name ? branches.filter(b=>b.area===name).length : branches.length;}
  function renderAreaPickerOptions(query=''){
    if(!areaPickerList)return;
    const normalized=query.trim().toLocaleLowerCase('id');
    const choices=[{name:'', label:'Semua wilayah', count:branches.length, sub:'Lihat seluruh jaringan'}]
      .concat(sortedAreas.map(a=>({name:a.name,label:a.name,count:areaCount(a.name),sub:'Temukan cabang di area ini'})))
      .filter(o=>!normalized || o.label.toLocaleLowerCase('id').includes(normalized) || o.sub.toLocaleLowerCase('id').includes(normalized));
    areaPickerList.innerHTML=choices.map(o=>{
      const selected=areaFilter.value===o.name;
      return '<button type="button" class="area-option'+(selected?' is-active':'')+'" role="option" aria-selected="'+String(selected)+'" data-area-value="'+esc(o.name)+'">'+
        '<span class="area-option-pin" aria-hidden="true">⌖</span><span class="area-option-copy"><strong>'+esc(o.label)+'</strong><small>'+esc(o.sub)+'</small></span><span class="area-option-count">'+o.count+'</span><span class="area-option-check" aria-hidden="true">✓</span></button>';
    }).join('');
    if(!choices.length) areaPickerList.innerHTML='<div class="area-picker-empty">Wilayah tidak ditemukan. Coba kata kunci lain.</div>';
  }
  function renderAreaPickerState(){
    if(!areaPickerTrigger)return;
    const chosen=areaFilter.value;
    areaPickerValue.textContent=chosen||'Semua wilayah';
    areaPickerHint.textContent=chosen ? areaCount(chosen)+' entri toko di wilayah ini' : sortedAreas.length+' area · '+branches.length+' entri toko';
    renderAreaPickerOptions(areaPickerSearch ? areaPickerSearch.value : '');
  }
  function closeAreaPicker(){
    if(!areaPickerPanel || !areaPickerTrigger)return;
    areaPickerPanel.hidden=true;areaPickerTrigger.setAttribute('aria-expanded','false');areaPicker.classList.remove('is-open');
  }
  function openAreaPicker(){
    if(!areaPickerPanel || !areaPickerTrigger)return;
    areaPickerPanel.hidden=false;areaPickerTrigger.setAttribute('aria-expanded','true');areaPicker.classList.add('is-open');
    renderAreaPickerOptions(areaPickerSearch.value);
    window.setTimeout(()=>areaPickerSearch.focus(),30);
  }
  if(areaPickerTrigger){
    areaPickerTrigger.addEventListener('click',()=>areaPickerPanel.hidden?openAreaPicker():closeAreaPicker());
    areaPickerSearch.addEventListener('input',()=>renderAreaPickerOptions(areaPickerSearch.value));
    areaPickerList.addEventListener('click',event=>{
      const option=event.target.closest('[data-area-value]');if(!option)return;
      areaFilter.value=option.getAttribute('data-area-value');
      areaFilter.dispatchEvent(new Event('change',{bubbles:true}));
      areaPickerSearch.value='';closeAreaPicker();
    });
    document.getElementById('areaPickerClear').addEventListener('click',()=>{
      areaFilter.value='';areaFilter.dispatchEvent(new Event('change',{bubbles:true}));areaPickerSearch.value='';closeAreaPicker();
    });
    document.addEventListener('click',event=>{if(!areaPicker.contains(event.target))closeAreaPicker();});
    document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!areaPickerPanel.hidden){closeAreaPicker();areaPickerTrigger.focus();}});
  }
  renderAreaPickerState();
  function phoneToWa(phone){let n=String(phone).replace(/\D/g,'');if(n.startsWith('0'))n='62'+n.slice(1);else if(!n.startsWith('62'))n='62'+n;return n;}
  function telUrl(phone){return 'tel:'+String(phone).replace(/[^\d+]/g,'');}
  function waUrl(phone, branch){return 'https://wa.me/'+phoneToWa(phone)+'?text='+encodeURIComponent('Halo, saya menemukan '+branch.name+' ('+branch.area+') melalui website Tokomas Berkah. Saya ingin bertanya mengenai produk atau layanan.');}
  function mapsUrl(branch){return branch.mapsUrl || ('https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(branch.name+', '+branch.address+', '+branch.area+', Jawa Barat, Indonesia'));}
  function mapsLabel(branch){return branch.mapsUrl ? 'Google Maps' : 'Cari di Maps';}
  function matches(){
    const q=searchInput.value.trim().toLocaleLowerCase('id'); const area=areaFilter.value;
    return branches.filter(b=>{
      const matchArea=!area||b.area===area;
      const hay=[b.name,b.area,b.address,...b.phones].join(' ').toLocaleLowerCase('id');
      return matchArea&&(!q||hay.includes(q));
    });
  }
  function branchPhoneHtml(b){
    if(!b.phones.length) return '<span class="small-action disabled" aria-disabled="true">Nomor belum tersedia</span>';
    const first=b.phones[0];
    let html='<a class="small-action primary" href="'+esc(waUrl(first,b))+'" target="_blank" rel="noopener"><span class="action-icon">◔</span> WhatsApp</a>';
    if(b.phones.length>1){html+='<a class="small-action" href="'+esc(telUrl(first))+'"><span class="action-icon">⌕</span> Telepon</a>';}
    else {html+='<a class="small-action" href="'+esc(telUrl(first))+'"><span class="action-icon">⌕</span> Telepon</a>';}
    return html;
  }
  function cardHtml(b){
    const phones=b.phones.length?b.phones.map(p=>esc(p)).join(' / '):'Nomor belum tercantum';
    return '<article class="branch-card">'+
      '<div class="branch-card-top"><div class="branch-title">'+esc(b.name)+'</div><span class="branch-area">'+esc(b.area)+'</span></div>'+
      '<div class="branch-address"><span>⌖</span><span>'+esc(b.address)+'</span></div>'+
      '<div class="branch-meta"><span>◷ Jam buka: 07.00–17.00</span><span>▣ Libur: '+esc(b.dayOff)+'</span></div>'+
      '<div class="branch-meta" style="margin-top:6px"><span>☎ '+phones+'</span></div>'+
      '<div class="branch-actions">'+branchPhoneHtml(b)+'<a class="small-action map-action" href="'+esc(mapsUrl(b))+'" target="_blank" rel="noopener" aria-label="'+esc(mapsLabel(b)+' untuk '+b.name+' '+b.area)+'"><span class="action-icon">⌖</span>'+esc(mapsLabel(b))+' ↗</a><button class="small-action" type="button" data-details="'+esc(b.id)+'">Detail <span>↗</span></button></div>'+
      '</article>';
  }
  function renderCards(list){
    branchList.innerHTML=list.map(cardHtml).join('');
    resultCount.textContent=list.length;
    emptyState.hidden=list.length!==0;
    branchList.hidden=list.length===0;
    const area=areaFilter.value;
    resultsTitle.textContent=area||'Daftar toko';
    resultsCaption.textContent=area ? ('Toko pada area '+area) : (searchInput.value.trim()? 'Hasil yang sesuai dengan pencarian' : 'Semua toko dari daftar awal');
  }
  function groupFiltered(list){
    const counts=new Map(); list.forEach(b=>counts.set(b.area,(counts.get(b.area)||0)+1));
    return areas.filter(a=>counts.has(a.name)).map(a=>({...a,count:counts.get(a.name),branches:list.filter(b=>b.area===a.name)}));
  }
  function initMap(){
    const mapEl=document.getElementById('storeMap');
    if(typeof maplibregl==='undefined'){
      mapEl.innerHTML='<div class="map-unavailable"><strong>Peta belum dapat dimuat.</strong><br>Pastikan internet aktif dan buka website melalui server lokal (bukan hanya file langsung) bila diperlukan.<br><a href="https://openfreemap.org/" target="_blank" rel="noopener">Informasi OpenFreeMap</a></div>';
      return;
    }
    try {
      map = new maplibregl.Map({
        container:'storeMap',
        style:'https://tiles.openfreemap.org/styles/positron',
        center:[107.73,-6.92],
        zoom:8,
        scrollZoom:false,
        attributionControl:true,
        cooperativeGestures:true
      });
      map.addControl(new maplibregl.NavigationControl({showCompass:false}), 'top-right');
      map.on('load',()=>{
        mapReady=true;
        renderMarkers(matches());
        setTimeout(()=>map.resize(),250);
      });
      map.on('error',(event)=>{
        // Keep the directory usable if a remote map resource temporarily fails.
        console.warn('Map resource warning:', event && event.error ? event.error.message : event);
      });
    } catch (error) {
      mapEl.innerHTML='<div class="map-unavailable"><strong>Peta belum dapat dimuat.</strong><br>Periksa koneksi internet lalu muat ulang halaman.</div>';
      console.error(error);
    }
  }
  function renderMarkers(list){
    if(!mapReady||!map)return;
    mapMarkers.forEach(marker=>marker.remove());
    mapMarkers=[];
    const groups=groupFiltered(list);
    groups.forEach(group=>{
      const icon=document.createElement('div');
      icon.className='map-marker-wrap';
      icon.innerHTML='<div class="map-count-icon"><span>'+group.count+'</span></div>';
      const marker=new maplibregl.Marker({element:icon,anchor:'bottom'})
        .setLngLat([group.lng,group.lat]);
      const popup=document.createElement('div');
      const names=group.branches.slice(0,5).map(b=>'<div>• '+esc(b.name)+'</div>').join('')+(group.branches.length>5?'<div>+ '+(group.branches.length-5)+' toko lainnya</div>':'');
      popup.innerHTML='<div class="map-popup-title">'+esc(group.name)+' <span style="color:#8d7136">('+group.count+')</span></div><div class="map-popup-list">'+names+'</div><button class="map-popup-button" type="button">Lihat toko di area ini →</button>';
      popup.querySelector('button').addEventListener('click',()=>{
        areaFilter.value=group.name;
        areaFilter.dispatchEvent(new Event('change',{bubbles:true}));
        document.getElementById('branchList').scrollTop=0;
        document.getElementById('lokasi').scrollIntoView({behavior:'smooth',block:'start'});
      });
      marker.setPopup(new maplibregl.Popup({offset:22,closeButton:true,closeOnClick:true}).setDOMContent(popup));
      marker.addTo(map);
      mapMarkers.push(marker);
    });
  }
    function renderAll(){const list=matches();renderCards(list);renderMarkers(list);}
  function openDetails(id){
    const b=branches.find(x=>x.id===id);if(!b)return;
    const phones=b.phones.length?b.phones.map(p=>'<div>'+esc(p)+'</div>').join(''):'Nomor belum tercantum pada daftar awal';
    const content=document.getElementById('dialogContent');
    content.innerHTML='<div class="dialog-eyebrow">Informasi cabang</div><h2 class="dialog-title">'+esc(b.name)+'</h2><div class="dialog-area">Area '+esc(b.area)+'</div><div class="dialog-info">'+
      '<div class="dialog-info-row"><strong>Alamat</strong><span>'+esc(b.address)+'</span></div>'+
      '<div class="dialog-info-row"><strong>Jam buka</strong><span>07.00–17.00 (sementara)</span></div>'+
      '<div class="dialog-info-row"><strong>Hari libur</strong><span>'+esc(b.dayOff)+'</span></div>'+
      '<div class="dialog-info-row"><strong>Kontak</strong><span>'+phones+'</span></div></div>'+
      '<div class="dialog-actions">'+(b.phones.length?'<a class="button button-gold" href="'+esc(waUrl(b.phones[0],b))+'" target="_blank" rel="noopener">WhatsApp cabang ↗</a><a class="button" style="background:#eeece3" href="'+esc(telUrl(b.phones[0]))+'">Telepon</a>':'<span class="small-action disabled">Kontak belum tersedia</span>')+'<a class="button" style="border:1px solid #ddd8c8" target="_blank" rel="noopener" href="'+esc(mapsUrl(b))+'">'+esc(b.mapsUrl?'Buka titik toko di Google Maps ↗':'Cari alamat di Google Maps ↗')+'</a></div>';
    const dialog=document.getElementById('branchDialog');
    if(typeof dialog.showModal==='function')dialog.showModal();else alert(b.name+'\n'+b.address+'\nJam buka sementara: 07.00–17.00');
  }
  branchList.addEventListener('click',e=>{const btn=e.target.closest('[data-details]');if(btn)openDetails(btn.getAttribute('data-details'));});
  document.getElementById('dialogClose').addEventListener('click',()=>document.getElementById('branchDialog').close());
  document.getElementById('branchDialog').addEventListener('click',e=>{if(e.target===e.currentTarget)e.currentTarget.close();});
  searchInput.addEventListener('input',renderAll);areaFilter.addEventListener('change',()=>{renderAreaPickerState();renderAll();});
  function clearFilters(){searchInput.value='';areaFilter.value='';if(areaPickerSearch)areaPickerSearch.value='';closeAreaPicker();areaFilter.dispatchEvent(new Event('change',{bubbles:true}));}
  resetFilter.addEventListener('click',clearFilters);emptyReset.addEventListener('click',clearFilters);
  const menuToggle=document.getElementById('menuToggle');const mainNav=document.getElementById('mainNav');
  menuToggle.addEventListener('click',()=>{const open=mainNav.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open));menuToggle.textContent=open?'×':'☰';});
  mainNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mainNav.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');menuToggle.textContent='☰';}));
  document.querySelectorAll('.nav-link').forEach(a=>a.addEventListener('click',()=>{document.querySelectorAll('.nav-link').forEach(n=>n.classList.remove('active'));a.classList.add('active');}));

  function initScrollReveal(){
    const selector='.hero-content,.stats-strip .stat,.section-heading,.map-panel,.directory-panel,.data-note,.service-card,.product-card,.product-feature-card,.products-heading,.about-emblem,.about-copy,.faq-inner>.eyebrow,.faq-inner>h2,.faq-list details,.contact-band-inner,.footer-main';
    const items=Array.from(document.querySelectorAll(selector));
    if(!items.length)return;
    items.forEach((item,index)=>{
      item.classList.add('reveal-item');
      const delay=index%4;
      if(delay)item.classList.add('reveal-delay-'+delay);
    });
    const reduced=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(reduced||!('IntersectionObserver' in window)){
      items.forEach(item=>item.classList.add('is-revealed'));
      return;
    }
    const observer=new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    },{threshold:0.10,rootMargin:'0px 0px -35px 0px'});
    items.forEach(item=>observer.observe(item));
  }

  initScrollReveal();
  renderAll();initMap();
})();
