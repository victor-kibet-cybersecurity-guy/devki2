
"use strict";
const val=id=>Number(document.getElementById(id)?.value||0);
document.querySelector('[data-calc="roof"]')?.addEventListener("click",()=>{
 const length=val("roofLength"), slope=val("roofSlope"), cover=val("sheetCover");
 if(length<=0||slope<=0||cover<=0)return;
 const perSide=Math.ceil(length/cover), total=perSide*2;
 document.getElementById("roofResult").textContent=`Estimated sheets: ${total}. Approximate sheet length: ${slope.toFixed(2)} m each. Confirm roof geometry and overlaps before ordering.`;
});
document.querySelector('[data-calc="steel"]')?.addEventListener("click",()=>{
 const d=val("barDia"), l=val("barLength"), q=val("barQty");
 if(d<=0||l<=0||q<=0)return;
 const kgpm=(d*d)/162, total=kgpm*l*q;
 document.getElementById("steelResult").textContent=`Approximate weight: ${total.toFixed(2)} kg total. Unit weight: ${kgpm.toFixed(3)} kg/m.`;
});
document.querySelector('[data-calc="cement"]')?.addEventListener("click",()=>{
 const v=val("concreteLength")*val("concreteWidth")*val("concreteDepth"), rate=val("bagsPerM3");
 if(v<=0||rate<=0)return;
 document.getElementById("cementResult").textContent=`Concrete volume: ${v.toFixed(2)} m³. Planning estimate: ${Math.ceil(v*rate)} bags of 50kg cement at ${rate} bags/m³. Confirm the structural mix design before purchase.`;
});
document.querySelector('[data-calc="materials"]')?.addEventListener("click",()=>{
 const area=val("wallLength")*val("wallHeight"), rate=val("blockRate");
 if(area<=0||rate<=0)return;
 const blocks=Math.ceil(area*rate), waste=Math.ceil(blocks*1.05);
 document.getElementById("materialsResult").textContent=`Wall area: ${area.toFixed(2)} m². Base estimate: ${blocks} blocks. With 5% planning allowance: ${waste} blocks. Openings are not deducted.`;
});
