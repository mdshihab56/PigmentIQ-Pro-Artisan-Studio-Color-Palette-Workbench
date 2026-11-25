/* Medium workbenches use the same universal recipe engine as Extractor & Mixer.
   Generic pigment roles only; percentages are relative recipe proportions, not verified manufacturer formulas. */
document.addEventListener('DOMContentLoaded', () => {
  const configs = {
    spd: { label:'SPD — Synthetic Polyvinyl Distemper', targetId:'spd-target', hexId:'spd-hex', previewId:'spd-preview', outputId:'spd-output', imageId:'spd-image', canvasId:'spd-image-canvas', paletteId:'spd-palette', kind:'coating' },
    enamel: { label:'Enamel Color Studio', targetId:'enamel-target', hexId:'enamel-hex', previewId:'enamel-preview', outputId:'enamel-output', imageId:'enamel-image', canvasId:'enamel-image-canvas', paletteId:'enamel-palette', kind:'enamel' },
    watercolor: { label:'Water Color Mixing Studio', targetId:'watercolor-target', hexId:'watercolor-hex', previewId:'watercolor-preview', outputId:'watercolor-output', imageId:'watercolor-image', canvasId:'watercolor-image-canvas', paletteId:'watercolor-palette', kind:'watercolor' }
  };
  const $ = id => document.getElementById(id);
  const esc = v => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  // Generic pigment reference colors. The solver finds a non-negative blend
  // whose display-RGB average is close to the selected target. Real paint is
  // subtractive, so this remains a starting estimate rather than a formula.
  const pigments = [
    {name:'White pigment',role:'Lightening / opacity',hex:'#F5F3EA'},
    {name:'Warm red pigment',role:'Red / warm hue',hex:'#D92D32'},
    {name:'Magenta pigment',role:'Rose / magenta',hex:'#C21875'},
    {name:'Yellow pigment',role:'Yellow / warm hue',hex:'#F2D21B'},
    {name:'Yellow earth pigment',role:'Muted yellow / earth tone',hex:'#C69A32'},
    {name:'Ultramarine blue pigment',role:'Blue / violet bias',hex:'#3446A8'},
    {name:'Cyan blue pigment',role:'Cool blue / cyan bias',hex:'#168CC4'},
    {name:'Green pigment',role:'Green hue',hex:'#27834A'},
    {name:'Violet pigment',role:'Violet hue',hex:'#713C91'},
    {name:'Red earth pigment',role:'Warm earth tone',hex:'#A64D32'},
    {name:'Brown earth pigment',role:'Brown / neutralizing',hex:'#76513B'},
    {name:'Black pigment',role:'Darkening',hex:'#242424'}
  ];
  const rgbOf = hex => [1,3,5].map(i=>parseInt(hex.slice(i,i+2),16));
  function projectSimplex(values) {
    const sorted=[...values].sort((a,b)=>b-a); let sum=0,theta=0;
    for(let i=0;i<sorted.length;i++){sum+=sorted[i];const t=(sum-1)/(i+1);if(i===sorted.length-1||t>=sorted[i+1]){theta=t;break;}}
    return values.map(v=>Math.max(0,v-theta));
  }
  function solvePigments(targetHex) {
    const target=rgbOf(targetHex), vectors=pigments.map(p=>rgbOf(p.hex));
    // Projected gradient descent on the pigment weights, constrained to sum to 1.
    let weights=pigments.map((_,i)=>i===0?1:0);
    const lipschitz= Math.max(1, vectors.reduce((sum,v)=>sum+v.reduce((s,x)=>s+x*x,0),0));
    const step=1/(lipschitz*2.2);
    for(let iter=0;iter<1800;iter++){
      const mix=[0,1,2].map(ch=>weights.reduce((sum,w,i)=>sum+w*vectors[i][ch],0));
      const error=mix.map((v,ch)=>v-target[ch]);
      const gradient=weights.map((_,i)=>3*error.reduce((sum,e,ch)=>sum+e*vectors[i][ch],0));
      weights=projectSimplex(weights.map((w,i)=>w-step*gradient[i]));
    }
    let rows=weights.map((weight,i)=>({...pigments[i],weight})).filter(x=>x.weight>=0.012);
    // Keep the most meaningful contributors and renormalize for readable proportions.
    rows.sort((a,b)=>b.weight-a.weight); rows=rows.slice(0,5);
    const total=rows.reduce((s,r)=>s+r.weight,0)||1;
    return rows.map(r=>({...r,pct:r.weight/total*100}));
  }
  function render(c) {
    const target=$(c.targetId), output=$(c.outputId), preview=$(c.previewId), hex=$(c.hexId);
    if(!target||!output||!preview||!hex)return;
    const color=(target.value||'#000000').toUpperCase(); hex.textContent=color; preview.style.backgroundColor=color;
    const ingredients=solvePigments(color);
    if(!ingredients.length){output.innerHTML='<p>Could not calculate a pigment estimate for this color. Please choose another target color.</p>';return;}
    const list=ingredients.map(i=>`<div class="medium-ingredient"><div class="medium-ingredient-main"><span class="medium-ingredient-dot" style="background:${esc(i.hex)}"></span><div><strong>${esc(i.name)}</strong><div class="medium-muted">${esc(i.role)}</div></div></div><div class="medium-percent-block"><strong class="medium-percent-number">${i.pct.toFixed(2)}%</strong><div class="medium-muted">of total pigment mix</div></div></div>`).join('');
    output.innerHTML=`<div class="medium-output-heading"><div class="medium-output-swatch" style="background:${color}"></div><div><h3 style="margin:0">Mixing Recipe · ${color}</h3><div class="medium-muted">${esc(c.label)} · Generic pigment guidance</div></div></div><h3>Generic pigment proportions</h3><div class="medium-ingredient-list">${list}</div><p class="medium-muted">These percentages are normalized starting estimates based on display-color blending, not exact physical paint formulas. Actual pigments mix subtractively and vary by strength, opacity, binder, substrate and drying.</p>`;
  }
  function setupImage(c) {
    const input=$(c.imageId), canvas=$(c.canvasId), palette=$(c.paletteId), dropzone=$(`${c.imageId.replace('-image','')}-dropzone`); if(!input||!canvas||!palette)return;
    const ctx=canvas.getContext('2d',{willReadFrequently:true});
    document.querySelector(`[data-upload-for="${c.imageId}"]`)?.addEventListener('click',()=>input.click());
    if(dropzone){ dropzone.addEventListener('dragover',e=>{e.preventDefault();dropzone.classList.add('dragover');}); dropzone.addEventListener('dragleave',()=>dropzone.classList.remove('dragover')); dropzone.addEventListener('drop',e=>{e.preventDefault();dropzone.classList.remove('dragover');const file=e.dataTransfer?.files?.[0];if(file){try{const dt=new DataTransfer();dt.items.add(file);input.files=dt.files;input.dispatchEvent(new Event('change',{bubbles:true}));}catch(_){palette.textContent='Please use Choose Image File to select this image.';}}}); }
    input.addEventListener('change',()=>{
      const file=input.files?.[0];if(!file)return;if(!file.type.startsWith('image/')){palette.textContent='Please select a valid image file.';return;}
      const url=URL.createObjectURL(file),img=new Image();
      img.onload=()=>{const scale=Math.min(1,1100/img.naturalWidth,650/img.naturalHeight);canvas.width=Math.max(1,Math.round(img.naturalWidth*scale));canvas.height=Math.max(1,Math.round(img.naturalHeight*scale));ctx.clearRect(0,0,canvas.width,canvas.height);ctx.drawImage(img,0,0,canvas.width,canvas.height);canvas.hidden=false;URL.revokeObjectURL(url);
        const counts=new Map(),data=ctx.getImageData(0,0,canvas.width,canvas.height).data;
        for(let i=0;i<data.length;i+=4*8){if(data[i+3]<128)continue;const key='#'+[data[i],data[i+1],data[i+2]].map(v=>v.toString(16).padStart(2,'0')).join('').toUpperCase();counts.set(key,(counts.get(key)||0)+1);}
        const top=[...counts.entries()].sort((a,b)=>b[1]-a[1]).slice(0,12);
        palette.innerHTML='<span class="medium-muted">Extracted image palette — select a swatch or click the image:</span><div class="medium-palette-swatches">'+top.map(([v])=>`<button type="button" class="medium-palette-chip" title="Use ${v}" aria-label="Use ${v}" data-color="${v}" style="background:${v}"><span>${v}</span></button>`).join('')+'</div>';
      };
      img.onerror=()=>{URL.revokeObjectURL(url);palette.textContent='Could not read this image. Try another file.';};img.src=url;
    });
    canvas.addEventListener('click',e=>{if(canvas.hidden)return;const rect=canvas.getBoundingClientRect();if(!rect.width||!rect.height)return;const x=Math.max(0,Math.min(canvas.width-1,Math.floor((e.clientX-rect.left)*canvas.width/rect.width))),y=Math.max(0,Math.min(canvas.height-1,Math.floor((e.clientY-rect.top)*canvas.height/rect.height)));const d=ctx.getImageData(x,y,1,1).data;$(c.targetId).value='#'+[d[0],d[1],d[2]].map(v=>v.toString(16).padStart(2,'0')).join('').toUpperCase();render(c);});
    palette.addEventListener('click',e=>{const btn=e.target.closest('[data-color]');if(btn){$(c.targetId).value=btn.dataset.color;render(c);}});
  }
  Object.values(configs).forEach(c=>{const target=$(c.targetId);target?.addEventListener('input',()=>render(c));target?.addEventListener('change',()=>render(c));setupImage(c);render(c);});
});
