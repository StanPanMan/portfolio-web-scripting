import"./modulepreload-polyfill-B5Qt9EMX.js";document.addEventListener("DOMContentLoaded",()=>{const t=document.getElementById("pixelGrid"),e=document.getElementById("colorPicker"),o=32;for(let n=0;n<o*o;n++){const c=document.createElement("div");c.classList.add("pixel"),c.addEventListener("click",()=>{b(),d==="1x1"?c.style.backgroundColor=e.value:d==="3x3"&&P(n,32)}),t.appendChild(c)}});const k=document.getElementById("saveButton"),y=document.getElementById("loadButton"),E=document.getElementById("undoButton"),B=document.getElementById("redoButton"),m=document.getElementById("eraser");document.getElementById("pixelGrid");function h(){const e=[...document.querySelectorAll(".pixel")].map(o=>o.style.backgroundColor);localStorage.setItem("pixelGridState",JSON.stringify(e)),alert("Grid saved!")}function L(){const t=localStorage.getItem("pixelGridState");if(t){const e=JSON.parse(t);document.querySelectorAll(".pixel").forEach((n,c)=>{n.style.backgroundColor=e[c]||""}),alert("Grid loaded!")}else alert("No saved grid found!")}k.addEventListener("click",h);y.addEventListener("click",L);let g="#000000";function I(){colorPicker.value!=="#ffffff"?(g=colorPicker.value,colorPicker.value="#ffffff",m.classList.add("active")):(colorPicker.value=g,m.classList.remove("active"))}m.addEventListener("click",I);const l=[],r=[];function v(){return[...document.querySelectorAll(".pixel")].map(e=>e.style.backgroundColor)}function x(t){const e=[...document.querySelectorAll(".pixel")];t.forEach((o,n)=>{e[n].style.backgroundColor=o})}function b(){l.push(v()),l.length>30&&l.shift(),r.length=0}function C(){l.length>0&&(r.push(v()),x(l.pop()))}function G(){if(r.length>0){const t=v();l.push(t);const e=r.pop();x(e)}}E.addEventListener("click",C);B.addEventListener("click",G);let d="1x1";const i=document.getElementById("brush1x1"),p=document.getElementById("brush3x3");i.classList.add("active");i.addEventListener("click",()=>{d="1x1",i.classList.add("active"),p.classList.remove("active")});p.addEventListener("click",()=>{d="3x3",p.classList.add("active"),i.classList.remove("active")});function P(t,e){const o=document.querySelectorAll(".pixel"),n=Math.floor(t/e),c=t%e;for(let s=-1;s<=1;s++)for(let a=-1;a<=1;a++){const u=n+s,f=c+a;if(u>=0&&u<e&&f>=0&&f<e){const S=u*e+f;o[S].style.backgroundColor=colorPicker.value}}}
