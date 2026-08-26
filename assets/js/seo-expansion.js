
document.querySelectorAll('[data-menu]').forEach(b=>b.addEventListener('click',()=>b.closest('.nav').classList.toggle('open')));
function n(id){return Number(document.getElementById(id)?.value||0)}
document.querySelectorAll('[data-calc]').forEach(form=>{
 form.addEventListener('submit',e=>{
  e.preventDefault(); const type=form.dataset.calc; let out='';
  if(type==='concrete'){out=`Concrete volume: ${(n('length')*n('width')*n('depth')).toFixed(2)} m³`;}
  if(type==='rebar'){let d=n('diameter'),l=n('barlength'),q=n('qty');out=`Estimated steel weight: ${((d*d/162)*l*q).toFixed(1)} kg`;}
  if(type==='cement'){let v=n('length')*n('width')*n('depth'),bags=n('bagsperm3');out=`Planning estimate: ${Math.ceil(v*bags)} bags of 50 kg cement`;}
  if(type==='blocks'){let area=n('walllength')*n('wallheight'),rate=n('blocksperm2');out=`Wall area: ${area.toFixed(1)} m². Estimated blocks: ${Math.ceil(area*rate)}.`;}
  if(type==='roof'){let area=n('rooflength')*n('slopelength')*2,cover=n('coverwidth'),sheet=n('sheetlength');out=`Roof area: ${area.toFixed(1)} m². Estimated sheets: ${Math.ceil(area/(cover*sheet))}.`;}
  if(type==='steelcost'){out=`Estimated steel material cost: KSh ${(n('units')*n('unitprice')).toLocaleString()}`;}
  if(type==='cementcost'){out=`Estimated cement material cost: KSh ${(n('bags')*n('bagprice')).toLocaleString()}`;}
  if(type==='sandballast'){let v=n('concretevolume');out=`Planning volume: ${v.toFixed(2)} m³. Enter an engineer-approved mix design before ordering sand, ballast and cement.`;}
  if(type==='house'){let area=n('floorarea');out=`Planning floor area: ${area.toFixed(0)} m². Use the linked foundation, slab, wall and roofing calculators for component estimates.`;}
  if(type==='tonnage'){out=`Total load: ${(n('weightkg')/1000).toFixed(2)} tonnes.`;}
  document.querySelector('.result').textContent=out;
 });
});
