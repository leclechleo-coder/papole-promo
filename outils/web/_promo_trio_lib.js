if(typeof DECH==="undefined")window.DECH={niveau:()=>0,label:()=>"",setServer(){},signed:()=>true,locked:()=>false,sign(){},open:()=>Promise.resolve(true),etapes:()=>[],TEXTE:"",refus:()=>"",probleme:()=>"",delai:()=>0,avert:()=>"",APRES:"",injouable:n=>!!(DATA.cards[n-1]&&(DATA.cards[n-1].nf||DATA.cards[n-1].mem)),chains:()=>"",setup(){},unlock:()=>Promise.resolve(true),release(){}};
if(typeof Tuto==="undefined"){window.Tuto={show:()=>Promise.resolve("close"),event(){},close(){},open:()=>false,waiting:()=>null,onQuit(){}};if(!DemoStore.tuto){DemoStore.tuto=()=>({done:true,fights:9,wins:9});DemoStore.tutoSet=()=>({})}}
const TRIO=(()=>{
const P=[...Array(29)].map((_,i)=>i+1).concat([37,38,47,130,131,132,133,134,135,136,137,138,139,140,141,143,
142,89,97,99,101,103,106,107,110,111,112,115,120,122,124,128,129,179,197,181,208]);
const O=[30,58,35,71,80,81,84,98,102,40,184,32,33,42,43,104,105,108,109,113,117,121,123,126,
144,145,146,147,148,149,150,151,152,153,154,155,156,157,
159,160,161,162,163,164,165,166,167,168,169,170,171,172,
173,174,176,177,180,185,186,188,189,190,192,193,194,200];
const T={};
for(let n=1;n<=200;n++)T[n]="E";
P.forEach(n=>T[n]="P");O.forEach(n=>T[n]="O");
const INFO={
P:{n:"Personnage",s:"Perso",e:'<img class="tIco" src="art/types/P.webp" alt="Personnage" style="width:1.35em;height:1.35em;vertical-align:-.32em">',emoji:"👤",c:"#e0322c"},
O:{n:"Objet, animal ou outil",s:"Objet",e:'<img class="tIco" src="art/types/O.webp" alt="Objet" style="width:1.35em;height:1.35em;vertical-align:-.32em">',emoji:"🧰",c:"#f2c14e"},
E:{n:"Événement ou lieu",s:"Événement",e:'<img class="tIco" src="art/types/E.webp" alt="Événement" style="width:1.35em;height:1.35em;vertical-align:-.32em">',emoji:"🌍",c:"#4fb3d9"},
};
const CRIMINELS=[20,24,28];
const SHADE={
P:{ord:"#7a1f3d",cul:"#c4284a",com:"#a3364a",dic:"#4a0618",tue:"#9e1020",crim:"#d2410f",sec:"#7d0f2c",ent:"#b8301a",sci:"#8e1a18",pol:"#a5261f",gue:"#6a0d22",web:"#c0391b",abs:"#b3361c",_:"#9a2420"},
E:{ord:"#3d2d8a",cul:"#6d35c9",com:"#2f2a8f",gue:"#3a0c5e",att:"#56188c",nat:"#3b2a9e",ind:"#2b38b2",pol:"#4630c2",ent:"#3049d0",sci:"#6526ad",sec:"#4c1d96",web:"#3a3fc8",oeu:"#5a2bb8",abs:"#4236c0",_:"#4733b5"},
O:{ord:"#6f8a3a",cul:"#9aa63a",com:"#8a9a2c",abs:"#a8c234",web:"#94b036",jeu:"#7d9d33",oeu:"#68862e",sci:"#5d752c",ent:"#6c6f30",ind:"#77753a",nat:"#88a83a",pol:"#6f6c3e",att:"#7a7434",_:"#82983a"},
};
const color=(no,cat)=>{const t=T[no],m=SHADE[t];if(t==="P"&&cat==="tue"&&CRIMINELS.includes(no))return m.crim;return m[cat]||m._;};
const MIN_TAG=3;
function tagStatus(nos){
const have={P:0,E:0,O:0};
const D=typeof DATA!=="undefined"?DATA.cards:null;
new Set(nos||[]).forEach(no=>{const t=T[no],c=D&&D[no-1];if(t&&!(c&&(c.nf||c.mem)))have[t]++;});
const missing=["P","E","O"].filter(t=>have[t]<MIN_TAG).map(t=>({t,n:MIN_TAG-have[t]}));
return{ok:!missing.length,have,missing,min:MIN_TAG};
}
const GRAVE=new Set([98,146,44,45,46,48,50,51,52,53,54,56,57,59,60,61,62,64,65,66,67,68,69,70,72,73,74,75,76,77,78,82,88,95,116,117,120,121,125,127]);
const FRIVOLE=new Set([17,36,39,40,41,43,55,134,144,145,147,148,149,150,151,152,155,156,157,167,168,171,172,173,174,175,176,177,178,179,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,200]);
const MEMO=new Set([201,202,203,204,205,206,207]);
const fusionnable=no=>!MEMO.has(no);
const MEMO_REFUS=[
"Tu es sérieux ? Tu allais vraiment fusionner cette carte ? Même pas en rêve. On ne veut pas aller en prison.",
"Non. Cette carte ne se mélange avec rien. Il y a des limites, et celle-là est en béton.",
"Carte mémorielle. Elle se regarde, elle se respecte, elle ne se fusionne pas. Pose-la doucement.",
"On a tout prévu pour que tu puisses faire n'importe quoi. Sauf ça.",
"Fusionner ça ? Notre avocate a fait un malaise. Non.",
"Tu peux tout mélanger dans ce jeu. Tout, sauf ça. C'est la seule règle qu'on ne négocie pas.",
"Cette carte reste entière. Comme la mémoire de ceux qui y sont.",
"Non. Et ne demande pas pourquoi : tu sais très bien pourquoi.",
];
const PORNO=[["mineur",[113,154,158,176,186]],["animal",[30,55,58,126,149,151,174,194]],
["victimes",[84,104,34,49,51,63,85,98,105,146]],["sexiste",[159,160,163]],["raciste",[161,162,170]]];
const LECTURE_VICTIMES=[[7,65],[7,66],[1,87],[87,153],[19,52],[158,60],[158,62],[158,67],[158,69],[158,73],[158,75],[158,80],[158,85],[158,91],[158,84],[158,61],
[37,48],[37,50],[37,53],[37,60],[37,61],[37,74],[37,95],[37,116],[97,48],[97,53],[48,81],[48,104],[48,113],[48,123],
[95,71],[95,80],[95,81],[95,84],[95,126],[116,154],[116,84],[128,117],
[120,30],[120,58],[120,126],[120,154],[116,58],[46,81],[46,104],[7,64],[26,75],[97,66],[47,54],[26,61],[1,57],[14,52],[14,43],[15,121],[97,76],[97,77],[66,160],[158,54],[158,46],[158,50],[158,68],[99,158],[8,158],[8,39],...[1,2,3,4,5,6,8,10,11,13,14,97,106].map(d=>[d,88]),
...[1,2,3,4,5,6,8,10,11,13,14,97,106].map(d=>[d,84])];
const LECTURE_RACISTE=[[197,87],[5,150],[11,160],[61,146],[69,146],[5,160],[14,186],[116,126],[47,61],[131,170]];
const GRILLE=[[51,57,59,64,68,69,70,75,78].flatMap(a=>[17,175,176,178].map(b=>[a,b])),[[69,149],[69,151]]];
const LECTURE_ENFANT=[[23,170],[17,173],[17,180],[23,159],...[17,159,160,163,170,176,180,128,117,154,155].map(b=>[208,b])];
const LECTURE_VIVANT=[[178,155],[17,178],[181,87]];
const INCOMPAT=[
...[52,54,57,116,120].flatMap(a=>[159,160,161,162,163,170].map(b=>[a,b])),
[52,158],[52,153],[52,5],[52,11],[52,143],
[35,54],
[131,159],...[61,62].flatMap(a=>[161,162,170].map(b=>[a,b])),[5,116],[11,116],
...LECTURE_VICTIMES,...GRILLE[0],...GRILLE[1],[17,87],[17,91],...LECTURE_RACISTE,...LECTURE_ENFANT,...LECTURE_VIVANT,
[5,146],[11,146],[143,146],
...[98,146].flatMap(a=>[175,176,178].map(b=>[a,b])),
[5,162],[5,170],[11,162],[11,170],[17,170],[143,170],[1,160],[1,162],[1,170],
[128,159],[128,160],[128,163],[128,166],
[3,65],
[15,159],[15,163],[27,159],[17,159],
...PORNO.flatMap(([c,l])=>l.map(b=>[17,b])),
...[5,11,143].flatMap(a=>[186,193].map(b=>[a,b])),
[17,181]
].map(([a,b])=>a<b?a+"-"+b:b+"-"+a);
const PAIRES=new Set(INCOMPAT);
const SANS_EMIGRE=new Set([5,9,11,101,103,106,112,25,30,47,123,15,17,18,19,20,22,23,24,26,27,28,29,143,179,197,
58,65,102,104,109,146,35,98,105,38,153,154,158,159,160,161,162,163,166,170,174,186,193]);
const RAISONS={
raciste:"Raciste. Cette association reprend un cliché raciste. On ne joue pas avec ça.",
xeno:"Xénophobe. Ça colle un cliché sur les migrants. Non.",
antisemite:"Antisémite. Ça tourne la Shoah en dérision. Jamais.",
sexiste:"Sexiste et choquant. Ça mêle des violences sexuelles à des victimes réelles.",
enfant:"Inacceptable. Un bébé à côté d'un film de violences sexuelles. Tu le sais très bien.",
mineur:"Inacceptable. Rien de sexuel à côté d'un enfant. Jamais, même pour rire.",
animal:"Non. Avec un animal, ce que ça sous-entend est un crime. Même pour rire.",
victimes:"Choquant. Ça colle du sexe sur des victimes réelles. Non.",
vivant:"Non. Une vraie personne vivante dans une scène sexuelle, c'est un délit. Même pour rire.",
memo:"Carte mémorielle. Elle ne se fusionne avec rien. Jamais.",
drame:"Hors de propos. Un drame avec une carte légère, ça le banalise. Pas de ça ici.",
deuxDrames:"Ces deux drames-là ne vont pas ensemble. Une tragédie à la fois, et c'est déjà beaucoup.",
traite:"La Traite atlantique ne se mélange qu'avec ceux qui méritent d'être jugés. Pas avec ça.",
execution:"Non. La guillotine a vraiment servi pendant cette guerre. Les condamnés ne sont pas une blague.",
};
const CAT={};
const cat=(pairs,c)=>pairs.forEach(([a,b])=>{CAT[Math.min(a,b)+"-"+Math.max(a,b)]=c;});
cat([52,54,57,116,120].flatMap(a=>[161,162,170].map(b=>[a,b])),"raciste");
cat([52,54,57,116,120].flatMap(a=>[159,160,163].map(b=>[a,b])),"sexiste");
cat([[52,158],[52,153],[52,5],[52,11],[52,143],[5,162],[5,170],[11,162],[11,170],[17,170],[143,170],[1,162],[1,170]],"raciste");
cat([[1,160]],"antisemite");
cat([[128,159],[128,160],[128,163],[128,166]],"enfant");
cat([[15,159],[15,163],[27,159],[17,159]],"sexiste");
cat([[3,65]],"xeno");
cat([[131,159]],"sexiste");cat([61,62].flatMap(a=>[161,162,170].map(b=>[a,b])),"raciste");cat([[5,116],[11,116]],"raciste");
cat(LECTURE_VICTIMES,"drame");cat(GRILLE[0].filter(([,b])=>b!==17),"drame");cat(GRILLE[0].filter(([,b])=>b===17),"victimes");cat(GRILLE[1],"raciste");cat([[17,87],[17,91]],"victimes");cat(LECTURE_RACISTE,"raciste");cat(LECTURE_ENFANT,"enfant");cat(LECTURE_VIVANT,"vivant");
cat([[35,54]],"execution");
cat([[5,146],[11,146],[143,146]],"raciste");
cat([98,146].flatMap(a=>[175,176,178].map(b=>[a,b])),"drame");
cat([5,11,143].flatMap(a=>[186,193].map(b=>[a,b])),"raciste");
cat([[17,181]],"vivant");
PORNO.forEach(([c,l])=>cat(l.map(b=>[17,b]),c));
function pourquoi(nos){
if(nos.some(n=>!fusionnable(n)))return RAISONS.memo;
for(let i=0;i<nos.length;i++)for(let j=i+1;j<nos.length;j++){
const k=Math.min(nos[i],nos[j])+"-"+Math.max(nos[i],nos[j]);
if(CAT[k])return RAISONS[CAT[k]];
}
if(nos.includes(95)&&nos.some(n=>SANS_EMIGRE.has(n)))return RAISONS.xeno;
if(nos.some(n=>GRAVE.has(n)&&!LEGER_OK.has(n))&&nos.some(n=>FRIVOLE.has(n)))return RAISONS.drame;
if(deuxDrames(nos))return RAISONS.deuxDrames;
if(traiteMal(nos))return RAISONS.traite;
return null;
}
const TACLES_INTERDIT=[
"Si tu ne vois pas le problème, c'est que tu en fais partie.",
"Si tu ne comprends pas pourquoi, le problème, c'est toi.",
"Si ça te fait rire, on a un souci. Et c'est toi, le souci.",
"Tu savais. On sait que tu savais.",
"Relis ta main. Puis ta conscience.",
"Tu cherchais la limite ? La voilà.",
"On ne te demande pas pourquoi tu as essayé. On a peur de la réponse.",
"Ça ne passe pas. Toi non plus, d'ailleurs.",
"Même ton historique de recherche a honte.",
"Si tu dois demander pourquoi, tu ne devrais pas jouer à ce jeu.",
];
const tacleInterdit=()=>TACLES_INTERDIT[Math.floor(Math.random()*TACLES_INTERDIT.length)];
const DRAME=n=>GRAVE.has(n)||SENSIBLE.has(n)||n===80||n===81||n===84;
const TRAITE_AVEC=new Set([1,2,3,4,6,8,10,13,14,97,15,18,20,23,24,26,27,28,29,89,99]);
const CATASTROPHES=new Set([60,61,62,63,66,67,68,69,70,72,73,74,75,76,77,78,80,81,82,83,84,85]);
const EPIDEMIES=new Set([59,64,65,146]);
const GUERRES_ANCIENNES=new Set([34,49,51,57]);
const COMBINABLE=n=>CATASTROPHES.has(n)||EPIDEMIES.has(n)||GUERRES_ANCIENNES.has(n);
const LEGER_OK=new Set([51,57,59,64,68,69,70,75,78]);
const deuxDrames=nos=>{const d=nos.filter(DRAME);return d.length>=2&&!d.every(COMBINABLE);};
const traiteMal=nos=>nos.includes(52)&&nos.some(n=>n!==52&&!TRAITE_AVEC.has(n));
const okFusion=nos=>{
if(nos.some(n=>!fusionnable(n)))return false;
if(deuxDrames(nos)||traiteMal(nos))return false;
if(nos.some(n=>GRAVE.has(n)&&!LEGER_OK.has(n))&&nos.some(n=>FRIVOLE.has(n)))return false;
for(let i=0;i<nos.length;i++)for(let j=i+1;j<nos.length;j++){
const a=Math.min(nos[i],nos[j]),b=Math.max(nos[i],nos[j]);
if(PAIRES.has(a+"-"+b))return false;
}
if(nos.includes(95)&&nos.some(n=>SANS_EMIGRE.has(n)))return false;
return true;
};
const RECOUPES=[[1,44,48,120],[45,202,207]];
const groupeDe=no=>RECOUPES.findIndex(g=>g.includes(no));
const SENSIBLE=new Set([34,35,49,63,83,85,105]);
function unDrame(sel){
const ds=["P","E","O"].map(t=>sel[t]).filter(c=>c&&(GRAVE.has(c.i)||SENSIBLE.has(c.i)||[80,81,84].includes(c.i)));
if(ds.length>=2&&ds.every(c=>COMBINABLE(c.i))){const out={};["P","E","O"].forEach(t=>out[t]=sel[t]||null);return out;}
let vu=false;const out={};
["P","E","O"].forEach(t=>{const c=sel[t];if(c&&(GRAVE.has(c.i)||SENSIBLE.has(c.i))){out[t]=vu?null:c;vu=true;}else out[t]=c||null;});
return out;
}
return{T,INFO,ORDER:["P","O","E"],of:no=>T[no],color,tagStatus,MIN_TAG,GRAVE,FRIVOLE,okFusion,pourquoi,RAISONS,TACLES_INTERDIT,tacleInterdit,INCOMPAT,RECOUPES,groupeDe,unDrame,SENSIBLE,COMBINABLE,LEGER_OK,MEMO,fusionnable,MEMO_REFUS};
})();
if(typeof module!=="undefined")module.exports=TRIO;
const TrioEngine=(()=>{
const KEYS=["d","m","p"];
const ORDER=["p","d","m"];
const val=(k,c)=>(k==="d"?c.d??0:c[k]);
const totals=cards=>({d:cards.reduce((s,c)=>s+val("d",c),0),m:cards.reduce((s,c)=>s+c.m,0),p:cards.reduce((s,c)=>s+c.p,0)});
const cmp=(k,A,B)=>(A[k]>B[k]?0:B[k]>A[k]?1:null);
function resolve(A,sA,B,sB){
const steps=[];let win=null;
if(sA&&sB&&sA!==sB){
const w1=cmp(sA,A,B),w2=cmp(sB,A,B);
steps.push({k:sA,w:w1,by:0},{k:sB,w:w2,by:1});
const pts=[0,0];[w1,w2].forEach(w=>{if(w!==null)pts[w]++;});
if(pts[0]!==pts[1])win=pts[0]>pts[1]?0:1;
else{const k3=KEYS.find(k=>k!==sA&&k!==sB),w3=cmp(k3,A,B);steps.push({k:k3,w:w3,tb:true});win=w3;}
}else{
const first=sA||sB,list=first?[first,...ORDER.filter(k=>k!==first)]:ORDER;
for(let j=0;j<list.length;j++){
const w=cmp(list[j],A,B);
steps.push({k:list[j],w,by:j===0&&first?(sA&&sB?2:sA?0:1):undefined,tb:!(j===0&&first)});
if(w!==null){win=w;break;}
}
}
return{win,steps};
}
function trios(hand,onlyFull=true){
const byT={P:[],O:[],E:[]};hand.forEach(x=>byT[x.t].push(x));
const types=["P","O","E"].filter(t=>byT[t].length),out=[];
for(let m=1;m<1<<types.length;m++){
const sub=types.filter((_,i)=>m&(1<<i));
if(onlyFull&&sub.length<types.length)continue;
const okF=acc=>!(typeof TRIO!=="undefined"&&TRIO.okFusion)||TRIO.okFusion(acc.map(y=>y.c.i).filter(Boolean));
const rec=(i,acc)=>{if(i===sub.length){if(okF(acc))out.push(acc);return;}for(const x of byT[sub[i]])rec(i+1,acc.concat([x]));};
rec(0,[]);
}
if(onlyFull&&!out.length&&hand.length){const all=trios(hand,false),mx=Math.max(0,...all.map(x=>x.length));return all.filter(x=>x.length===mx);}
return out;
}
let RANK=null;
function ranks(all){
const r=new Map(),n=all.length;
for(const k of KEYS)all.slice().sort((a,b)=>val(k,a)-val(k,b)).forEach((c,i)=>r.set(c,(r.get(c)||0)+i/(n-1)/3));
RANK=r;return r;
}
const power=c=>(RANK&&RANK.get(c))||0.5;
const pts=w=>(w===0?1:w===null?0.5:0);
function decide(me,foe,round,P={},heard=null,rnd=Math.random){
const mine=trios(me).map(x=>({x,T:totals(x.map(y=>y.c))}));
const theirs=trios(foe).map(x=>({x,T:totals(x.map(y=>y.c))}));
const ears=typeof P.ears==="number"?P.ears:0.4;
const opp=[];
for(const o of theirs)for(const k of KEYS){
let s=0;for(const m of mine)for(const mk of KEYS)s+=pts(resolve(o.T,k,m.T,mk).win);
opp.push({T:o.T,k,s:s/(mine.length*3)});
}
const w=opp.map(o=>Math.exp(o.s*6)*(heard?(o.k===heard?1+3*ears:1):1)),W=w.reduce((a,b)=>a+b,0);
const keep=round===1?.25:round===2?.12:0;
const cands=[];
for(const m of mine)for(const k of KEYS){
let e=0;opp.forEach((o,i)=>{e+=w[i]*pts(resolve(m.T,k,o.T,o.k).win);});
e/=W;const cost=m.x.reduce((s,y)=>s+power(y.c),0)/3;
cands.push({cards:m.x,k,e,v:e-keep*cost});
}
cands.sort((a,b)=>b.v-a.v);
if(P.mou&&rnd()<P.mou){
const vu=new Map(),ok=[];
for(const c of cands){const n=vu.get(c.cards)||0;if(n<2){ok.push(c);vu.set(c.cards,n+1);}}
const bas=ok.slice(Math.floor(ok.length*2/3)),c=(bas.length?bas:ok)[Math.floor(rnd()*(bas.length||ok.length))];
return{cards:c.cards,k:c.k};
}
if(rnd()<(P.err||0)*.5){const c=cands[Math.floor(rnd()*Math.min(cands.length,20))];return{cards:c.cards,k:c.k};}
const temp=Math.max(.01,P.temp??.1),top=cands.slice(0,15);
const ws=top.map(x=>Math.exp((x.v-top[0].v)/temp*4));let s=ws.reduce((a,b)=>a+b,0)*rnd();
for(let i=0;i<top.length;i++){s-=ws[i];if(s<=0)return{cards:top[i].cards,k:top[i].k};}
return{cards:top[0].cards,k:top[0].k};
}
function announce(k,P={},rnd=Math.random){
const b=P.bluff||{chance:.5,lie:.3};
if(rnd()>b.chance)return null;
if(rnd()<b.lie){const o=KEYS.filter(x=>x!==k);return{k:o[Math.floor(rnd()*o.length)],lie:true};}
return{k,lie:false};
}
function souple(me,T0,s0,rnd=Math.random,fixe=()=>true){
const all=trios(me).filter(fixe),tots=all.map(x=>totals(x.map(y=>y.c)));
const pct=(k,v)=>tots.filter(T=>T[k]<v).length/Math.max(1,tots.length-1);
let best=null;
all.forEach((tr,i)=>{
const T=tots[i],top2=KEYS.slice().sort((a,b)=>pct(b,T[b])-pct(a,T[a])).slice(0,2);
for(const k of top2){
const sc=s0?[s0]:KEYS;let e=0;
for(const s of sc)e+=pts(resolve(T,k,T0,s).win);
e=e/sc.length+rnd()*1e-3;if(!best||e<best.e)best={cards:tr,k,e};
}
});
return best;
}
function deckMatch(cards,mine,typeOf,rnd=Math.random,ecart=0){
const used=new Set(mine),out=[],R=["C","U","R","E","L","X"],ok=i=>!cards[i].mem&&!cards[i].nf&&(typeof papoleSortie!=="function"||papoleSortie(i));
for(const ci of mine){
const c=cards[ci],t=typeOf(ci);let grp=[],libres=[];
for(let d=0;d<6&&!libres.length;d++){
const rs=[R[R.indexOf(c.r)+d],R[R.indexOf(c.r)-d]].filter(Boolean);
grp=cards.map((x,i)=>i).filter(i=>ok(i)&&typeOf(i)===t&&rs.includes(cards[i].r));
libres=grp.filter(i=>!used.has(i));
}
if(!libres.length)libres=cards.map((x,i)=>i).filter(i=>ok(i)&&typeOf(i)===t&&!used.has(i));
const pw=i=>power(cards[i]),n=grp.length;
const rang=x=>(n>1?grp.filter(i=>pw(i)<x).length/(n-1):.5);
const cible=Math.min(1,Math.max(0,rang(pw(ci))-ecart));
const top=libres.map(i=>[i,Math.abs(rang(pw(i))-cible)+rnd()*1e-6]).sort((a,b)=>a[1]-b[1]).slice(0,3);
const x=top[Math.floor(rnd()*top.length)][0];used.add(x);out.push(x);
}
return out;
}
return{KEYS,ORDER,val,totals,resolve,trios,decide,announce,ranks,power,deckMatch,souple};
})();
if(typeof module!=="undefined")module.exports=TrioEngine;
const LIAISONS={
1:["Adolf Hitler"],2:["Joseph Staline"],3:["Mao Zedong"],4:["Pol Pot"],5:["Idi Amin Dada"],6:["Kim Jong-il"],
7:["La Vieillesse"],8:["Augusto Pinochet"],9:["La Tuberculose"],10:["Saddam Hussein"],11:["Mobutu Sese Seko"],
12:["Le Caravage"],13:["Caligula"],14:["Léopold II de Belgique"],15:["Jack l'Éventreur"],16:["Les Chutes"],
17:["La Pornographie"],18:["Henri Désiré Landru"],19:["Le docteur Petiot"],20:["Al Capone"],21:["La Route"],
22:["Le Docteur de la Mort"],23:["Vacher"],24:["Bonnie & Clyde"],25:["La Grippe saisonnière"],26:["H. H. Holmes"],
27:["Élisabeth Báthory"],28:["Albert Spaggiari"],29:["Le Zodiaque"],
51:["Les conquêtes mongoles","pendant les conquêtes mongoles"],57:["Les Croisades","pendant les Croisades"],
86:["Les plombiers du Watergate"],87:["Les accusateurs de Dreyfus"],89:["Félix Faure"],95:["La frontière","à la frontière"],
97:["Néron"],99:["Raspoutine"],101:["Ponzi"],103:["Lustig"],106:["Louis XI"],
107:["La Compagnie des mers du Sud"],110:["Big Tobacco"],111:["Les vendeurs d'indulgences"],112:["Thérèse Humbert"],
115:["Le docteur aux boucs"],120:["Shirō Ishii"],122:["Les patrons des usines de radium"],124:["Thomas Midgley Jr."],
128:["Le psychologue John Watson"],129:["Lyssenko"],130:["Les millérites"],131:["Les adamites"],132:["Les pythagoriciens"],
133:["Les shakers"],134:["L'Arétin"],135:["Jean de Leyde"],136:["Les dadaïstes"],
137:["La manie dansante"],138:["La Foudre"],139:["Alexandre d'Abonuteichos"],140:["Les convulsionnaires de Saint-Médard"],
141:["Les flagellants"],142:["Thomas Müntzer"],143:["Le culte du cargo"],179:["Léo Taxil"],197:["Les Reptiliens"],
30:["Le mammouth","avec un mammouth"],31:["L'incendie de Rome","pendant l'incendie de Rome"],
32:["L'alcool","sous alcool"],33:["Le cholestérol","avec le cœur bouché"],
34:["La prise de Constantinople","pendant la prise de Constantinople"],36:["L'affaire de Roswell","à Roswell en 1947"],
37:["Les gladiateurs"],38:["Hannibal"],
39:["L'expérience de Philadelphie","à bord du navire invisible"],40:["Les chemtrails","sous les chemtrails"],41:["Le cambriolage artistique","pendant un cambriolage artistique"],
42:["Le sucre raffiné","en plein pic de glycémie"],43:["Le Jésus repeint","devant le Jésus repeint"],
44:["La Seconde Guerre mondiale","pendant la Seconde Guerre mondiale"],45:["La Première Guerre mondiale","dans les tranchées de 14-18"],
46:["La chasse aux sorcières","sur un bûcher de sorcière"],47:["L'homme de Néandertal"],48:["Hiroshima et Nagasaki","à Hiroshima"],
49:["La guerre de Cent Ans","pendant la guerre de Cent Ans"],50:["La Saint-Barthélemy","le soir de la Saint-Barthélemy"],
52:["La traite atlantique","à bord d'un navire négrier"],53:["La guerre du Vietnam","au Vietnam"],54:["La guerre d'Algérie","en Algérie"],
55:["La guerre des émeus","pendant la guerre des émeus"],56:["La guerre du football","pendant la guerre du football"],
59:["La Peste noire","en pleine Peste noire"],60:["Le tsunami de 2004","pendant le tsunami de 2004"],61:["Le séisme d'Haïti","en Haïti en 2010"],
62:["L'ouragan Katrina","à La Nouvelle-Orléans sous Katrina"],63:["L'éruption du Vésuve","à Pompéi"],64:["La grippe espagnole","en pleine grippe espagnole"],
66:["La canicule de 2003","pendant la canicule de 2003"],67:["La tempête Xynthia","dans la tempête Xynthia"],68:["Le séisme de Lisbonne","à Lisbonne en 1755"],
69:["Les crues du fleuve Jaune","sur le fleuve Jaune en crue"],70:["L'éruption du Krakatoa","au pied du Krakatoa"],
72:["Tchernobyl","à Tchernobyl"],73:["Fukushima","à Fukushima"],74:["La fuite d'isocyanate de méthyle","sous l'isocyanate de méthyle"],
76:["L'explosion d'une usine d'engrais","dans une usine d'engrais"],77:["L'explosion du nitrate","sur un port en flammes"],78:["La catastrophe de Seveso","à Seveso"],
83:["Le réchauffement climatique","en plein réchauffement climatique"],85:["L'inondation de mélasse de Boston","dans la mélasse de Boston"],
91:["L'affaire du Rainbow Warrior","sur le Rainbow Warrior"],92:["Le scandale de Panama","en plein scandale de Panama"],
93:["L'affaire Iran-Contra","en plein Iran-Contra"],94:["Le Brexit","le jour du Brexit"],114:["La tulipomanie","en pleine tulipomanie"],
116:["L'étude de Tuskegee","à Tuskegee"],118:["L'expérience de Milgram","dans l'expérience de Milgram"],
119:["L'expérience de Stanford","dans la fausse prison de Stanford"],125:["Le projet MK-Ultra","au cœur du projet MK-Ultra"],
127:["L'élixir sulfanilamide","sous élixir sulfanilamide"],175:["Le Ice Bucket Challenge","en plein Ice Bucket Challenge"],
178:["Le Gamergate","en plein Gamergate"],181:["Les Poutine multiples","entre deux sosies de Poutine"],
182:["La Guerre des mondes","le soir de La Guerre des mondes"],183:["Le canular de la Lune","pendant le canular de la Lune"],
184:["La pizza à 10 000 bitcoins","le jour de la pizza à 10 000 bitcoins"],187:["La Terre plate","au bord de la Terre plate"],
191:["Le lundi","un lundi matin"],195:["Le bug de l'an 2000","le soir du bug de l'an 2000"],196:["Le changement d'heure","au changement d'heure"],
198:["L'alunissage truqué","dans le studio de l'alunissage truqué"],199:["Les ronds-points français","sur un rond-point"],
35:["La guillotine","sous la guillotine"],58:["Le moustique","avec un moustique"],65:["Le Covid-19","avec le Covid"],
71:["L'astéroïde de Chicxulub","à dos d'astéroïde"],75:["Le Titanic","à bord du Titanic"],79:["La marée noire de l'Erika","dans le pétrole de l'Erika"],
80:["La plateforme en feu","sur une plateforme en feu"],81:["Le Hindenburg","à bord du Hindenburg"],82:["Le supersonique","à bord du supersonique"],
84:["La navette Challenger","à bord de la navette Challenger"],88:["Le sang contaminé","avec une poche de sang contaminé"],
90:["Les diamants de Bokassa","avec les diamants de Bokassa"],96:["Les écoutes de l'Élysée","avec les micros de l'Élysée"],
98:["L'amiante","dans un nuage d'amiante"],100:["La surveillance de la NSA","sur écoute de la NSA"],102:["L'opium","sous opium"],
104:["L'allumette","avec une allumette au phosphore"],105:["Le remède à l'étain","sous traitement à l'étain"],108:["Le papier peint vert","sur fond de papier peint vert"],
109:["La poudre de succession","avec une pincée de poudre de succession"],113:["Le radioscope","au radioscope à chaussures"],117:["La thalidomide","sous thalidomide"],
121:["La lobotomie","à coups de pic à glace"],123:["Le Cœur du démon","avec le Cœur du démon"],126:["Laïka","avec Laïka"],
144:["Papolé","en jouant à Papolé"],145:["Le jeu du tireur fou","sur le jeu du tireur fou"],146:["La variole","avec la variole"],
147:["Le râteau","avec un râteau"],148:["Le premier FPS","dans le premier FPS"],149:["Le pigeon","avec un pigeon"],
150:["La peau de banane","sur une peau de banane"],151:["Le chat","avec un chat"],152:["La tartine beurrée","avec une tartine beurrée"],
153:["Le cheval de Troie","dans un cheval de Troie"],154:["La rougeole","avec la rougeole"],155:["Le lit","au lit"],
156:["Le distributeur automatique","sous un distributeur de canettes"],157:["La conserve d'artiste","avec une conserve d'artiste"],
158:["La noyade","en apnée"],159:["Salò","devant Salò"],160:["Cannibal Holocaust","devant Cannibal Holocaust"],
161:["Le film de propagande","devant un film de propagande"],162:["Naissance d'une nation","devant Naissance d'une nation"],
163:["Orange mécanique","devant Orange mécanique"],164:["La Dernière Tentation du Christ","devant La Dernière Tentation du Christ"],
165:["Madame Bovary","avec Madame Bovary"],166:["L'Exorciste","devant L'Exorciste"],167:["Ubu roi","devant Ubu roi"],
168:["La Vie de Brian","devant La Vie de Brian"],169:["Les Fleurs du mal","en récitant Les Fleurs du mal"],170:["La BD coloniale de 1931","en lisant une BD coloniale"],
171:["L'urinoir","avec l'urinoir"],172:["Jésus dans du pipi","devant Jésus dans du pipi"],173:["La robe bleue ou blanche","en robe bleue (ou blanche)"],
174:["Le requin","avec un requin"],176:["Le défi Momo","au défi Momo"],177:["Le Turc mécanique","face au Turc mécanique"],
180:["Les fées de Cottingley","avec les fées de Cottingley"],185:["« OK boomer »","en criant « OK boomer »"],186:["Harambe","avec Harambe"],
188:["L'ananas sur la pizza","avec de l'ananas sur la pizza"],189:["Les chaussettes dans les sandales","en chaussettes et sandales"],
190:["La chocolatine","en mangeant une chocolatine"],192:["Le selfie","en prenant un selfie"],193:["La noix de coco","à coups de noix de coco"],
194:["L'hippopotame","à dos d'hippopotame"],200:["Le papier toilette à l'envers","avec le papier toilette à l'envers"],208:["Gilles de Rais"],
};
const MOTS={
1:["Hitler"],
2:["Staline"],
3:["Mao"],
4:["Pol Pot"],
5:["Amin Dada"],
6:["Kim Jong-il"],
7:["La Vieillesse"],
8:["Pinochet"],
9:["La Tuberculose"],
10:["Saddam"],
11:["Mobutu"],
12:["Le Caravage"],
13:["Caligula"],
14:["Léopold II"],
15:["Jack l'Éventreur"],
16:["Les chutes domestiques"],
17:["La Pornographie"],
18:["Landru"],
19:["Petiot"],
20:["Al Capone"],
21:["La Route"],
22:["Docteur la Mort"],
23:["Vacher"],
24:["Bonnie & Clyde"],
25:["La Grippe"],
26:["H. H. Holmes"],
27:["Báthory"],
28:["Spaggiari"],
29:["Le Zodiaque"],
51:["Les conquêtes mongoles","pendant les conquêtes mongoles"],
57:["Les Croisades","pendant les Croisades"],
86:["Le Watergate","en plein Watergate"],
87:["L'affaire Dreyfus","en pleine affaire Dreyfus"],
89:["Félix Faure"],
95:["La frontière","à la frontière"],
97:["Néron"],
99:["Raspoutine"],
101:["Ponzi"],
103:["Lustig"],
106:["Louis XI"],
107:["La Compagnie des mers du Sud"],
110:["Big Tobacco"],
111:["Les vendeurs d'indulgences"],
112:["Thérèse Humbert"],
115:["Le docteur aux boucs"],
120:["Shirō Ishii"],
122:["Les patrons du radium"],
124:["Midgley"],
128:["John Watson"],
129:["Lyssenko"],
130:["Les millérites"],
131:["Les adamites"],
132:["Les pythagoriciens"],
133:["Les shakers"],
134:["L'Arétin"],
135:["Jean de Leyde"],
136:["Les dadaïstes"],
137:["La manie dansante"],
138:["La Foudre"],
139:["Le prophète au serpent"],
140:["Les convulsionnaires"],
141:["Les flagellants"],
142:["Müntzer"],
143:["Le culte du cargo"],
179:["Taxil"],
197:["Les Reptiliens"],
30:["Le mammouth","avec un mammouth"],
31:["L'incendie de Rome","dans Rome en flammes"],
32:["L'alcool","sous alcool"],
33:["Le cholestérol","avec le cœur bouché"],
34:["La prise de Constantinople","pendant la prise de Constantinople"],
36:["Roswell","à Roswell"],
37:["Les gladiateurs"],
38:["Hannibal"],
39:["Le navire invisible","sur le navire invisible"],
40:["Les chemtrails","sous les chemtrails"],
41:["Le cambriolage artistique","pendant un casse au musée"],
42:["Le sucre","en hyperglycémie"],
43:["Le Jésus repeint","devant le Jésus repeint"],
44:["39-45","en 39-45"],
45:["Verdun","à Verdun"],
46:["La chasse aux sorcières","sur un bûcher de sorcière"],
47:["L'homme de Néandertal"],
48:["Hiroshima","à Hiroshima"],
49:["Azincourt","à Azincourt"],
50:["La Saint-Barthélemy","à la Saint-Barthélemy"],
52:["Le négrier","sur un négrier"],
53:["La guerre du Vietnam","au Vietnam"],
54:["La guerre d'Algérie","en Algérie"],
55:["Les émeus","contre les émeus"],
56:["La guerre du football","pendant la guerre du football"],
59:["La Peste noire","en pleine Peste noire"],
60:["Le tsunami","dans le tsunami"],
61:["Le séisme d'Haïti","pendant le séisme d'Haïti"],
62:["Katrina","sous Katrina"],
63:["Pompéi","à Pompéi"],
64:["La grippe espagnole","en pleine grippe espagnole"],
66:["La canicule","en pleine canicule"],
67:["Xynthia","sous Xynthia"],
68:["Lisbonne","à Lisbonne"],
69:["Le fleuve Jaune","sur le fleuve Jaune"],
70:["Le Krakatoa","au Krakatoa"],
72:["Tchernobyl","à Tchernobyl"],
73:["Fukushima","à Fukushima"],
74:["L'isocyanate de méthyle","sous l'isocyanate de méthyle"],
76:["L'usine d'engrais","à l'usine d'engrais"],
77:["Le nitrate","sur le port"],
78:["Seveso","à Seveso"],
83:["Le réchauffement","sur une banquise qui fond"],
85:["La mélasse","dans la mélasse"],
91:["Le Rainbow Warrior","sur le Rainbow Warrior"],
92:["Panama","à Panama"],
93:["L'Iran-Contra","dans l'Iran-Contra"],
94:["Le Brexit","au Brexit"],
114:["La tulipomanie","en pleine tulipomanie"],
116:["Tuskegee","à Tuskegee"],
118:["Milgram","chez Milgram"],
119:["Stanford","à Stanford"],
125:["MK-Ultra","sous MK-Ultra"],
127:["L'élixir","sous élixir"],
175:["Le Ice Bucket Challenge","sous un seau glacé"],
178:["Le Gamergate","au Gamergate"],
181:["Les Poutine multiples"],
182:["Les Martiens","chez les Martiens"],
183:["La Lune de 1835","sur la Lune en 1835"],
184:["La pizza à 10 000 bitcoins","avec une pizza à 10 000 bitcoins"],
187:["La Terre plate","sur la Terre plate"],
191:["Le lundi","un lundi"],
195:["L'an 2000","en l'an 2000"],
196:["L'heure d'hiver","à l'heure d'hiver"],
198:["La Lune","sur la Lune"],
199:["Le rond-point","au rond-point"],
35:["La guillotine","sous la guillotine"],
58:["Le moustique","avec un moustique"],
65:["Le Covid","pendant le Covid"],
71:["L'astéroïde","sur l'astéroïde"],
75:["Le Titanic","sur le Titanic"],
79:["La marée noire de l'Erika","dans la marée noire"],
80:["La plateforme en feu","sur une plateforme en feu"],
81:["Le Hindenburg","à bord du Hindenburg"],
82:["Le supersonique","à bord du supersonique"],
84:["Challenger","dans Challenger"],
88:["Le sang contaminé","pendant l'affaire du sang contaminé"],
90:["L'affaire des diamants","en pleine affaire des diamants"],
96:["Les écoutes","sur écoute"],
98:["L'amiante","avec l'amiante"],
100:["La NSA","sous l'œil de la NSA"],
102:["L'opium","sous opium"],
104:["L'allumette","à l'allumette toxique"],
105:["Le remède à l'étain","sous traitement à l'étain"],
108:["Le papier peint vert","sur papier peint vert"],
109:["La poudre de succession","à la poudre de succession"],
113:["Le radioscope","au radioscope"],
117:["La thalidomide","sous cachet anti-nausée"],
121:["La lobotomie","à coups de pic à glace"],
123:["Le Cœur du démon","avec le Cœur du démon"],
126:["Laïka","avec Laïka"],
144:["Papolé","sur Papolé"],
145:["Le jeu du tireur fou","sur le jeu du tireur fou"],
146:["La variole","avec la variole"],
147:["Le râteau","avec un râteau"],
148:["Le premier FPS","dans le premier FPS"],
149:["Le pigeon","avec un pigeon"],
150:["La peau de banane","sur une peau de banane"],
151:["Le chat","avec un chat"],
152:["La tartine beurrée","avec une tartine beurrée"],
153:["Le cheval de Troie","dans un cheval de Troie"],
154:["La rougeole","avec la rougeole"],
155:["Le lit","au lit"],
156:["Le distributeur","sous un distributeur"],
157:["La conserve d'artiste","avec une conserve d'artiste"],
158:["La Noyade","en apnée"],
159:["Salò","devant Salò"],
160:["Cannibal Holocaust","devant Cannibal Holocaust"],
161:["La propagande","devant la propagande"],
162:["Naissance d'une nation","devant Naissance d'une nation"],
163:["Orange mécanique","devant Orange mécanique"],
164:["La Dernière Tentation","devant La Dernière Tentation"],
165:["Madame Bovary","avec Madame Bovary"],
166:["L'Exorciste","devant L'Exorciste"],
167:["Ubu roi","devant Ubu roi"],
168:["La Vie de Brian","devant La Vie de Brian"],
169:["Les Fleurs du mal","en vers interdits"],
170:["La BD coloniale","avec une BD coloniale"],
171:["L'urinoir","avec l'urinoir"],
172:["Jésus dans du pipi","devant Jésus dans du pipi"],
173:["La robe","avec la robe"],
174:["Le requin","avec un requin"],
176:["Le défi Momo","au défi Momo"],
177:["Le Turc mécanique","contre l'automate"],
180:["Les fées","avec des fées en papier"],
185:["OK boomer","en lançant « OK boomer »"],
186:["Harambe","avec Harambe"],
188:["L'ananas","avec l'ananas"],
189:["Les chaussettes","en chaussettes-sandales"],
190:["La chocolatine","avec une chocolatine"],
192:["Le selfie","en selfie"],
193:["La noix de coco","avec une noix de coco"],
194:["L'hippopotame","à dos d'hippopotame"],
200:["Le PQ","avec le PQ"]
};
const ELEMENTS={
34:"au pied des remparts",
35:"sous un couperet",
44:"sous les sirènes",
67:"dans un lotissement inondable",73:"derrière une digue basse",88:"sous perfusion",98:"sous un faux plafond",105:"dans une pharmacie",
45:"dans les tranchées",
46:"au procès des sorcières",
48:"à l'ère atomique",
49:"sous une pluie de flèches",
50:"au son du tocsin",
52:"devant le tribunal de l'Histoire",
53:"pendant la guerre du Vietnam",
54:"dans les djebels",
56:"après un match de foot",
59:"derrière un drap de pestiféré",
60:"face à la vague",
61:"au milieu des promesses d'aide",
62:"derrière une digue",
63:"au pied du volcan",
64:"en quarantaine",
65:"sous un masque",
66:"sous 40 degrés",
68:"le jour de la Toussaint",
69:"face à la crue",
70:"sous un ciel rouge",
72:"devant un réacteur",
74:"dans une ville endormie",
51:"à cheval dans la steppe",
57:"en croisade",
75:"sur l'insubmersible",
76:"dans un cratère",
77:"devant un entrepôt",
78:"un été en Lombardie",
82:"à bord du supersonique",
83:"sur une banquise qui fond",
85:"dans la mélasse",
116:"au service de santé publique",
117:"sous cachet anti-nausée",
121:"à coups de pic à glace",
125:"sous LSD",
127:"au sirop d'antigel",
146:"dans un lazaret",
95:"à la frontière",
};
function trioPhrase(sel,html=false){
const TR=typeof TRIO!=="undefined"?TRIO:(typeof require!=="undefined"?require("./types.js"):null);
if(TR&&TR.unDrame)sel=TR.unDrame(sel);
const M=no=>(typeof DATA!=="undefined"&&DATA.cards[no-1]&&DATA.cards[no-1].retired?["Une carte retirée","avec une carte retirée"]:MOTS[no]||[]);
const w=s=>(html?"<b>"+String(s).replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]))+"</b>":s);
const P=sel.P&&(M(sel.P.i)[0]||sel.P.n),E=sel.E&&M(sel.E.i),O=sel.O&&M(sel.O.i);
const grave=c=>TR&&TR.GRAVE&&c&&TR.GRAVE.has(c.i)&&!c.retired;
const el=c=>(P&&grave(c)&&ELEMENTS[c.i]?[null,ELEMENTS[c.i]]:null);
const E2=el(sel.E)||E,O2=el(sel.O)||O;
let s;
const eL=E2&&(E2[1]||sel.E.n),oL=O2&&(O2[1]||sel.O.n),w1=x=>String(x).split(/[ ']/)[0].toLowerCase();
const meme=eL&&oL&&w1(eL)===w1(oL);
const nomO=O2&&O2===O&&O[0]?(/^(Le|La|Les|L'|Un|Une|Des) ?/.test(O[0])?O[0].charAt(0).toLowerCase()+O[0].slice(1):O[0]):null;
const oL2=meme&&nomO?"avec "+nomO:oL,et=meme&&!nomO?" et ":" ";
if(P)s=w(P)+(eL?" "+w(eL):"")+(oL2?et+w(oL2):"");
else if(E)s=w(E[0]||sel.E.n)+(O?" "+w(O[1]||sel.O.n):"");
else s=w((O&&O[0])||(sel.O&&sel.O.n)||"");
return s;
}
if(typeof module!=="undefined")module.exports={LIAISONS,MOTS,ELEMENTS,trioPhrase};
const REPLIQUES={
1:"tu choisis toujours le mauvais camp",
2:"tu effaces tes amis des photos",
3:"tu gères ta main comme un plan quinquennal",
4:"tu abolis tes chances comme Pol Pot a aboli l'argent",
5:"tu te crois roi d'un royaume étranger",
6:"tu bluffes comme il golfait",
7:"ton jeu a pris un coup de vieux",
8:"tu perdrais un référendum contre toi-même",
9:"ta stratégie tousse encore",
10:"ton niveau se cache dans un trou",
11:"tes erreurs coûtent plus cher qu'une toque en léopard",
12:"tu peins aussi mal que tu te bats",
13:"le cheval de Caligula a fait meilleure carrière que toi",
14:"tu veux un pays et tu loues un studio",
15:"personne ne sait qui tu es, et c'est mieux ainsi",
16:"tu tombes à chaque manche",
17:"tu préfères regarder les autres jouer",
18:"tu notes tout dans un carnet, sauf tes points",
19:"ton médecin traitant se méfie de toi",
20:"tu tomberas pour moins que ça",
21:"tu conduis ta main sans freins",
22:"tu promets la lumière et tu laisses le noir",
23:"tu erres de partie en partie",
24:"un couple mieux assorti que ta main",
25:"tu reviens chaque hiver, aussi nul",
26:"ton plan n'a pas de sortie, comme le château de Holmes",
27:"les bains de Báthory ne rajeuniraient pas ton humour",
28:"ta réputation passe par les égouts",
29:"ta logique reste indéchiffrable",
51:"tu conquiers tout sauf la table",
57:"tu diras que c'était pour le bien",
86:"tu recrutes des bras cassés à ton image",
87:"toi, tu es coupable pour de vrai",
89:"ta sortie fait jaser tout l'Élysée",
95:"tu n'as jamais quitté ton canapé",
97:"tu chantes faux pendant que tout brûle",
99:"tu n'hypnotises que toi-même",
101:"tu paies les anciens avec les nouveaux",
103:"tu revends ce qui n'est pas à toi",
106:"tu mets ton jeu en cage",
107:"ta bulle va éclater",
110:"tu jures que ta main ne crée aucune dépendance",
111:"tu paies pour te faire pardonner",
112:"ton coffre-fort est vide",
115:"tu greffes n'importe quoi sur n'importe qui",
120:"tu échapperais au procès en vendant tes notes",
122:"ton tour de payer viendra",
124:"tu collectionnes les catastrophes",
128:"ta façon de jouer reste la pire expérience",
129:"tu sèmes tes cartes et tout pourrit",
130:"tu attends une victoire qui ne vient pas",
131:"tu te présentes à poil, sans un atout",
132:"tu comptes tout et tu perds quand même",
133:"tu refuses de te reproduire, tant mieux",
134:"tu écris des sonnets à tes échecs",
135:"tu te couronnes roi de rien",
136:"ton jeu n'a aucun sens, exprès ou pas",
137:"tu t'agites sans aucun résultat",
138:"tu frappes rarement et sans force",
139:"ton oracle est une chaussette",
140:"tu cries au miracle au moindre point",
141:"tu défiles sans jamais avancer",
142:"tu promets la victoire puis tu te caches",
143:"tu attends un miracle qui ne viendra pas",
179:"tu mens douze ans sans rougir",
197:"enfin une explication à tes choix",
30:"et tu finiras empaillé au musée",
31:"tu regardes ton jeu partir en cendres",
32:"tu joues comme après trois verres",
33:"tes artères sont bouchées, ton cerveau aussi",
34:"tu cèdes après un long siège",
36:"les extraterrestres t'évitent",
37:"tu te bats pour amuser la galerie",
38:"tu traverses les Alpes pour rien",
39:"on ne te voit plus dès le premier tour",
40:"tu vois des complots dans tes défaites",
41:"tu voles même tes idées",
42:"ton cerveau tourne au sucre",
43:"tu retouches ta stratégie, en pire",
44:"tu recules sur tous les fronts",
45:"tu t'enterres dans ta tranchée",
46:"on t'a dénoncé pour sorcellerie",
47:"tu disparais sans laisser de traces",
48:"tu n'as rien appris de l'Histoire",
49:"tes tours durent cent ans",
50:"tu trahis tes invités à table",
52:"on notera que tu as fait ce choix",
53:"tu mènes une guerre que personne ne gagne",
54:"on évite d'en parler, et de jouer avec toi",
55:"des oiseaux te battraient",
56:"un match suffit à te fâcher",
59:"ta mauvaise humeur est plus contagieuse que la peste",
60:"et le malaise gagne toute la table",
61:"tes promesses d'aide n'arrivent jamais",
62:"tu restes dans l'œil du cyclone",
63:"et tu es fossilisé depuis l'Antiquité",
64:"tu te mets en quarantaine dès le premier tour",
66:"tout le monde souffre sauf ton ego",
67:"tu dévastes l'ambiance",
68:"tu n'ébranles pas la table",
69:"tu sors de ton lit au premier tour",
70:"on entend tes rires gênés d'ici",
72:"tu irradies d'incompétence",
73:"tu as toujours un tour de retard",
74:"tu fuis tes responsabilités, comme l'industriel",
76:"tu bâcles le rangement, comme l'exploitant",
77:"tu stockes n'importe quoi n'importe où",
78:"on va donner ton nom à une directive européenne",
83:"tu chauffes la planète pour rien",
85:"la mélasse te dépasse",
91:"tu te fais repérer comme un agent secret en vacances",
92:"tu creuses ton trou",
93:"ta magouille est plus claire que ton jeu",
94:"tu claques la porte et tu le regrettes",
114:"tu paies un bulbe le prix d'une maison",
116:"l'éthique n'est pas ton fort",
118:"tu obéis sans réfléchir",
119:"tu mérites la vraie prison",
125:"on cherche encore l'explication de tes choix",
127:"tu ne testes jamais rien avant",
175:"c'est le seul défi que tu relèves",
178:"tu harcèles en appelant ça un débat",
181:"tu as autant de sosies que d'excuses",
182:"ton adversaire panique pour rien",
183:"tu crois tout ce qu'on imprime",
184:"et tu claques une fortune pour pas grand-chose",
187:"tu tomberais du bord au premier pas",
191:"personne n'a envie de toi, comme d'un lundi",
195:"tu paniques comme à la veille de l'an 2000",
196:"tu fais perdre une heure à chaque tour",
198:"tes bluffs sont plus bancals qu'un complot",
199:"tu tournes en rond",
35:"et ta tête ne tient qu'à un fil",
58:"et tu piques comme un moustique, sans effet",
65:"et tout le monde garde ses distances avec toi",
71:"et chacun prie pour la fin de la partie",
75:"ton ego coulera pareil",
79:"ta morale est glissante",
80:"et ta stratégie part en fumée",
81:"et tu gonfles avant de brûler",
82:"tu passes le mur du son, jamais celui du ridicule",
84:"et tu ignores toutes les alertes",
88:"et tu es responsable, mais pas coupable",
90:"et tu offres un cadeau empoisonné",
96:"et on a tout enregistré",
98:"et ça t'isole bien du groupe",
100:"et ton dossier est classé « pathétique »",
102:"et tu en redemandes toujours",
104:"et tu brûles par les deux bouts",
105:"et tu avales tout sans lire la notice",
108:"et ta déco est toxique",
109:"et ton héritage, c'est la défaite",
113:"et tu te fais rayonner les orteils",
117:"tes notices oublient les effets secondaires",
121:"et on te décerne un Nobel immérité",
123:"et tu laisses une trace radioactive partout",
126:"on t'envoie en orbite pour avoir la paix",
144:"et tu t'insultes toi-même",
145:"tu as la subtilité d'un jeu de tir",
146:"et aucun vaccin ne te protège",
147:"et tu marches encore sur le râteau",
148:"et même la calculatrice joue mieux",
149:"et tu te fais plumer",
150:"et tu glisses sur chaque peau de banane",
151:"et le chat te méprise",
152:"et tu tombes toujours du mauvais côté",
153:"et tu ouvres la porte à ta défaite",
154:"et tu n'es pas vacciné contre la défaite",
155:"et tu ferais mieux de rester au lit",
156:"tu secoues la machine pour récupérer ta monnaie",
157:"et une conserve d'artiste se vend mieux que toi",
158:"et tu bois la tasse à chaque tour",
159:"et tout le monde regrette",
160:"et personne ne demande si tu vas bien",
161:"et ta propagande ne trompe que toi",
162:"et ton humour était déjà indéfendable en 1915",
163:"et on te force à lire les règles",
164:"et la tentation de quitter l'emporte",
165:"et tu t'ennuies en province",
166:"et il va falloir un prêtre",
167:"et ton premier mot fait scandale",
168:"tu cherches le bon côté de la vie, en vain",
169:"et même tes rimes sont interdites",
170:"tes cases ont très mal vieilli",
171:"et personne ne comprend, mais ça coûte cher",
172:"et même un évêque jouerait mieux",
173:"et la partie est plus divisée que jamais",
174:"et le requin a meilleure presse que toi",
176:"et ton historique fait plus peur",
177:"et même ta triche est mécanique",
180:"et tu crois encore aux fées",
185:"et c'est ta seule réplique",
186:"et même ce gorille avait plus de fans que toi",
188:"même ta pizza a honte de toi",
189:"même tes pieds ont honte de toi",
190:"et tu relances la guerre du pain au chocolat",
192:"et tu te prends en photo à chaque défaite",
193:"et le cocotier rigole",
194:"et même cet hippopotame impressionne plus que toi",
200:"et tu n'as rien compris à la vie",
208:"tu caches tout derrière une porte interdite"
};
const VARIANTES={47:{60:"tu as connu les glaciations, mais tu ne vois toujours pas venir la vague"}};
const ALT={
1:["les Beaux-Arts de Vienne auraient recalé ton deck","tu finis la partie terré dans un bunker"],
2:["ton plan quinquennal ne tient pas cinq tours","tu te fais appeler l'homme d'acier avec un deck en fer-blanc"],
3:["ton grand bond en avant recule d'une case","tu cites ton petit livre rouge et personne n'écoute"],
4:["tu rates tes examens à Paris et tu perds ta bourse","ta stratégie revient à l'an zéro à chaque tour"],
5:["tu t'épingles des médailles que personne ne t'a remises","tes titres sont longs, tes victoires introuvables"],
6:["ton jeu a le suspense d'un film de propagande","tu prends le train blindé pour fuir tes défaites"],
7:["la vieillesse prend moins de temps que ton tour","tu vieillis mal et ta main encore plus"],
8:["ta santé fragile guérit dès l'atterrissage","tu caches tes cartes comme des comptes à l'étranger"],
9:["un sanatorium ne guérirait pas ton jeu","ton jeu résiste à tous les antibiotiques"],
10:["ta mère de toutes les batailles dure un tour","tu gagnes avec 100 % des voix, toutes truquées"],
11:["tu affrètes un supersonique pour aller perdre","tu rebaptises tout, même tes défaites"],
12:["ton jeu reste dans le clair-obscur, surtout l'obscur","tu poses en vaincu, comme le Caravage en Goliath"],
13:["tu pars en guerre et tu reviens avec des coquillages","tu portes de petites bottes et de petites idées"],
14:["tu traites la table comme ta propriété privée","on déboulonne tes statues une à une"],
15:["tes lettres anonymes finissent toutes au panier","pour tes erreurs, il n'y a qu'un seul suspect"],
16:["le tapis de jeu te fait trébucher","tu rates la dernière marche du podium"],
17:["tu effaces ton historique, jamais tes défaites","ton jeu mériterait un carré blanc"],
18:["tes petites annonces de partie restent sans réponse","tu nies jusqu'au bout, preuves sous le nez"],
19:["tu rejoins le bon camp au dernier moment, sous un faux nom","ta blouse blanche ne rassure personne autour de la table"],
20:["ta carte de visite dit brocanteur, ton jeu dit amateur","ton comptable suffirait à te faire plonger"],
21:["tu grilles les règles comme des feux rouges","ton GPS refuse de te suivre"],
22:["tu peins des yeux sur ton carrosse et tu ne vois rien","tu t'adoubes chevalier sans avoir rien gagné"],
23:["tu plaides la folie, l'expert conclut : mauvais joueur","le légiste attribue la mort de ta stratégie à des causes naturelles"],
24:["tu écris des poèmes de cavale qui ne riment à rien","tu braques des épiceries pour trois sous"],
25:["tu passes pour un rhume, en plus pénible","tu sautes le rappel, de vaccin comme de règles"],
26:["tu gonfles tes exploits pour les vendre aux journaux","ton arnaque à l'assurance finit par te trahir"],
27:["on te mure dans ta chambre jusqu'à la fin de la partie","tu échappes au procès grâce à ton rang, pas à ton talent"],
28:["tu sautes par la fenêtre du juge plutôt que d'assumer","tu pique-niques dans la salle des coffres pendant ton tour"],
29:["un couple d'amateurs a percé ton jeu en une semaine","tu nargues la presse et tu perds quand même"],
30:["ta dernière victoire est conservée dans le permafrost","les labos de désextinction renoncent à ton jeu"],
31:["tu cherches des coupables commodes pour ta défaite","ton excuse est un violon qui n'existait pas encore"],
32:["la loi Évin interdirait de faire ta pub","tu tiens ton Dry January jusqu'au 2"],
33:["ton bon cholestérol joue contre toi","ta stratégie a la légèreté d'une raclette"],
34:["tu refuses de payer ton ingénieur, il part chez l'adversaire","tu tires tes navires sur une colline et tu n'avances toujours pas"],
35:["comme le docteur Guillotin, tu regrettes qu'on retienne ton nom","il te faudrait un Badinter pour abolir ta stratégie"],
36:["tu annonces une soucoupe et tu livres un ballon","ta partie est aussi crédible que l'autopsie d'un petit homme vert"],
37:["tu combats en rétiaire avec un filet troué","tu salues César et il change de chaîne"],
38:["tu t'endors dans les délices de Capoue","tu campes aux portes de Rome sans jamais entrer"],
39:["le seul témoin de ta victoire, c'est toi","tu te rends invisible, sauf tes erreurs"],
40:["ta stratégie, c'est de la vapeur d'eau qui gèle","tu accuses les avions de ton score"],
41:["tu rends tout, sauf ta dignité","ton deck est un cambriolage, pas une œuvre"],
42:["tu paies des chercheurs pour accuser le gras de ta défaite","tes erreurs se cachent partout, comme le glucose dans les plats préparés"],
43:["une fresque ratée attire plus de visiteurs que ta table","tu transformes un chef-d'œuvre en mème"],
44:["ta défense est une ligne Maginot qu'on contourne","ta drôle de guerre dure tout le premier tour"],
45:["tu attends les taxis de la Marne pour te sauver","tu proposes une trêve de Noël en plein tour"],
46:["tu accuses ta voisine de ta propre défaite","tu lis le Marteau des sorcières au lieu des règles"],
47:["Néandertal avait le cerveau plus gros que le tien","tu passes trois cent mille ans sans progresser"],
48:["tes regrets arrivent toujours trop tard","tu ne te vanteras pas de cette partie, et tu auras raison"],
49:["tu promets un siècle de partie et tu débordes de seize ans","tu changes de camp comme le duc de Bourgogne"],
50:["ta parole vaut celle de Charles IX","pour toi, une victoire vaudrait bien une messe"],
51:["on cherche encore ta tombe et ta stratégie","ton plan n'arrive jamais, malgré tes relais à cheval"],
52:["tu sais exactement ce que tu viens de poser","tu poses ça pour quelques points, et tu les comptes"],
53:["tu crois encore à la théorie des dominos","tu caches tes cartes comme les papiers du Pentagone"],
54:["tu appelles ça des « événements », comme l'État jusqu'en 1999","ton « je vous ai compris » ne veut rien dire"],
55:["ta mitrailleuse s'enraye face aux émeus","tu retournes au front juste pour reperdre"],
56:["tu prends un penalty pour une déclaration de guerre","ton fair-play tient moins de cent heures"],
57:["tu te trompes de cible comme en 1204","tu t'endettes auprès de Venise pour rater ta destination"],
58:["tu bourdonnes toute la nuit pour rien","tu reviens malgré la citronnelle"],
59:["tu racontes cent histoires pour fuir ta défaite","on te mettrait bien quarante jours à l'écart de la table"],
60:["tu n'as aucun système d'alerte et ça se voit","tu poses ça et tu cherches encore la blague"],
61:["tu t'excuses six ans trop tard, comme les Nations unies","tu reconnais ta faute seulement quand on t'y oblige"],
62:["tu survoles la partie depuis ton avion présidentiel"],
63:["tu écris ta défaite à Tacite en deux lettres","tes graffitis sont moins drôles que ceux de Pompéi"],
64:["tu rejettes la faute sur l'Espagne, qui n'y est pour rien","tu censures tes défaites comme les pays en guerre"],
65:["tu remplis ton attestation pour sortir de la partie","tu applaudis à vingt heures et tu oublies le reste"],
66:["tu réponds depuis ton lieu de vacances, en polo","tu inventes un lundi de solidarité pour te racheter"],
67:["tu signes des permis de construire en zone inondable","tu ignores ton propre plan de prévention des risques"],
68:["Leibniz perdrait son optimisme devant ton jeu","tu ne cultiverais même pas ton jardin"],
69:["tu ignores tout de ce que tu poses, et ça se voit","tu apprends l'histoire dans un booster, quelle honte"],
70:["tes coups de gueule portent jusqu'à l'île Rodrigues","les couchers de soleil rougissent de ton jeu"],
71:["tu finis comme les dinosaures, sans voir venir le coup","ton jeu a la finesse d'un caillou de dix kilomètres"],
72:["tu annonces ta défaite quand la Suède l'a déjà détectée","comme le nuage, tu t'arrêtes à la frontière"],
73:["ta digue est toujours trop basse","tu falsifies tes rapports de sûreté, comme Tepco en 2002"],
74:["tu files aux États-Unis sous caution et tu ne reviens jamais","tu soldes ta faute pour une somme ridicule"],
75:["tu vantes ton jeu insubmersible avant le premier tour","tu fais un film de trois heures sur ta défaite"],
76:["tu fais traîner ton procès pendant des années","tu cherches toutes les pistes, sauf la tienne"],
77:["tu laisses les lettres d'alerte sans réponse","tu suspends l'enquête dès qu'elle s'approche de toi"],
78:["tu perds tes fûts et on les retrouve dans un abattoir","tu préviens les habitants avec des jours de retard"],
79:["tu navigues sous pavillon de complaisance","tu affrètes un rafiot de vingt-quatre ans pour économiser"],
80:["tu réclames ta vie d'avant","tu bouches tes trous avec des balles de golf"],
81:["on te refuse l'hélium, tu prends n'importe quoi","tu enregistres ta défaite pour la postérité"],
82:["en appel, ta responsabilité reste floue","tu ranges ton orgueil au musée, comme le Concorde"],
83:["tu savais depuis les années 1970, comme les pétroliers","tu signes l'accord de Paris et tu prends l'avion"],
84:["tu troques ta casquette d'ingénieur contre celle de manager","il te faudrait Feynman et un verre d'eau glacée pour comprendre"],
85:["tu accuses les anarchistes pour ta cuve mal construite","ton comptable supervise ta cuve sans savoir lire un plan"],
86:["il manque dix-huit minutes à ton enregistrement","tu jures ne pas être un escroc, personne ne te croit"],
87:["tu fabriques un faux pour couvrir ta première erreur","tu blanchis le vrai traître en trois minutes"],
88:["on crée une cour pour juger les ministres et tu es relaxé","tu distribues ton stock alors que tu savais"],
89:["tu entres dans le néant comme chez toi","tu ne laisses qu'une anecdote, et aucune loi"],
90:["tu jures avoir tout revendu pour une bonne cause","un journal satirique te fait perdre, une fois de plus"],
91:["tu joues les faux époux suisses en voyage de noces","tu nies tout jusqu'à ce que la presse publie"],
92:["tu réussis Suez une fois, puis plus jamais","tu arroses les « chéquards » et tu fais faillite quand même"],
93:["tu passes tes documents à la broyeuse avant l'enquête","tu négocies avec un gâteau en forme de clé"],
94:["tu promets 350 millions par semaine sur un bus","tu repousses ta sortie de délai en délai"],
95:["tu agites la frontière à chaque élection sans lire un chiffre","tu zappes dès que le journal parle des naufrages"],
96:["tu mets un écrivain sur écoute pour protéger tes secrets","ta cellule antiterroriste écoute surtout des journalistes"],
97:["tu tombes de ton char et on te déclare quand même vainqueur","il te faut une maison dorée pour être enfin logé correctement"],
98:["tu crées un comité pour dire que tout va bien","ta stratégie se désamiante aussi lentement que Jussieu"],
99:["ta seule postérité sera un tube disco","tu fais et défais les ministres, mais pas ta main"],
100:["on écoute ton portable comme celui de la chancelière","tu te crois fiché, tu n'intéresses personne"],
101:["tu spécules sur des coupons-réponse postaux","tu finis fauché à Rio avec tes promesses"],
102:["tu déclares la guerre à qui refuse ton produit","tu paies ton thé en drogue et tu trouves ça normal"],
103:["tu brades la tour Eiffel à la ferraille, deux fois","ta boîte à billets n'imprime que des défaites"],
104:["tu t'allumes sur n'importe quelle surface, sans prévenir","il faudra une convention internationale pour t'interdire"],
105:["tu forces l'État à inventer un contrôle rien que pour toi","ta formule ne passerait aucun pharmacien"],
106:["tu tisses ta toile d'araignée et tu t'y englues","tu vas négocier chez l'ennemi et tu finis piégé à Péronne"],
107:["tu calcules les astres mais pas ta propre folie","tu lances une entreprise dont personne ne connaît l'objet"],
108:["tu accuses les médecins de chasse aux sorcières, comme William Morris","tu suis la mode, même quand elle te rend malade"],
109:["tu fais disparaître le dossier quand il touche la cour","tu hâtes la fin de partie, sans plus de succès"],
110:["ton seul produit, c'est le doute","tu fais recommander ta marque par des médecins"],
111:["tu achètes une remise de peine pour ta prochaine défaite","tu as droit à quatre-vingt-quinze thèses contre ton jeu"],
112:["ton héritage américain n'existe que sur papier","tu t'inventes des cousins américains pour emprunter"],
113:["tu vends des chaussures avec la science d'un forain","ta pointure est connue, ton niveau reste un mystère"],
114:["tu fais du commerce de vent, littéralement","ta tulipe de prestige ne vaut plus qu'un oignon"],
115:["on te retire ta licence, tu émets depuis le Mexique","tu brigues le poste de gouverneur après ta radiation"],
116:["tu attends vingt-cinq ans pour présenter tes excuses","il faut un lanceur d'alerte pour t'arrêter"],
117:["tu t'excuses cinquante ans plus tard, comme le laboratoire","il te faudrait une Frances Kelsey pour bloquer ton jeu"],
118:["tu montes à 450 volts parce qu'une blouse te l'a dit","deux tiers des joueurs feraient pareil, ce n'est pas une excuse"],
119:["tu joues un rôle qu'on t'a soufflé, comme les gardiens","il faut quelqu'un d'extérieur pour arrêter ton expérience"],
120:["tu négocies ton immunité en coulisses, jamais ta victoire","tu comptes sur l'oubli, comme ceux qui ont couvert l'affaire"],
121:["tu fais la tournée du pays pour vendre ta méthode","ta méthode est rangée au musée des erreurs, avec toi"],
122:["tu te caches derrière un écran de plomb, comme la direction","tu invoques la prescription pour fuir l'addition, comme les patrons"],
123:["tu changes ton protocole seulement après deux accidents","ton surnom de démon ne fait peur à personne"],
124:["tu respires ton propre produit devant la presse","chacune de tes solutions devient deux problèmes"],
125:["tu détruis tes archives avant l'enquête, comme la CIA","tu crois contrôler les esprits, tu ne contrôles pas ta main"],
126:["ta propagande tient des décennies, ton jeu pas trois tours","tu envoies les autres en mission à ta place"],
127:["tu n'es condamné que pour une faute d'étiquette","tu fais voter une loi rien qu'avec tes erreurs"],
128:["tu finis dans la publicité, comme le psychologue","ton protocole ne passerait aucun comité d'éthique"],
129:["tu glaces tes semences et tu promets des miracles","tu déclares la génétique bourgeoise pour excuser ta main"],
130:["tu recalcules la date de ton triomphe pour la troisième fois","ta grande déception tombe toujours un mardi"],
131:["tes ennemis racontent n'importe quoi sur toi, sauf sur ton jeu","tu renies la honte, sauf celle de ton score"],
132:["tu fais vœu de silence et c'est ton meilleur coup","ta stratégie est irrationnelle, comme racine de deux"],
133:["tu fabriques de beaux meubles et de mauvais coups","tu trembles pendant l'office et pendant ton tour"],
134:["tu te proclames fléau des princes et tu perds contre un valet","tu fais chanter tout le monde sauf ta chance"],
135:["tu proclames la Nouvelle Jérusalem dans une ville assiégée","ancien tailleur, tu couds ta stratégie de travers"],
136:["tu écris ton plan avec des mots tirés d'un chapeau","tu récites « gadji beri bimba » en guise d'excuse"],
137:["on t'engage un orchestre et tu ne guéris pas","on te monte une scène et tu n'en descends plus"],
138:["tu attires les défaites comme un paratonnerre","ta chance ne tombe jamais deux fois, ni même une"],
139:["tu jettes deux lions au Danube et tu perds quand même","tu tends la main à tes critiques et ils te la mordent"],
140:["un décret royal interdit à Dieu de t'aider, et il obéit","on ferme ta table, tu continues en cachette"],
141:["le pape d'Avignon condamne ta procession","tu fais pénitence pour une partie déjà perdue"],
142:["un arc-en-ciel sur ta bannière n'arrête rien","tu t'attires un pamphlet de Luther en personne"],
143:["tu imites les gestes des gagnants sans rien comprendre","tu guettes le livreur comme un messie"],
144:["tu notes cinq étoiles le jeu qui te méprise","tes propres cartes ne savent pas quoi faire de toi"],
145:["tu assumes ta réputation avec un humour crétin","tu es interdit dans plusieurs pays, pour d'autres raisons"],
146:["une simple vache a suffi à te vaincre","on ne te garde que dans deux labos au monde, sous clé"],
147:["tu ramasses plus de vents que de feuilles mortes","ta déclaration à la victoire reste sans réponse"],
148:["un frigo connecté calculerait tes coups avec plus de finesse","tu n'inventes rien, tu ranges juste tout dans une boîte"],
149:["tu donnes ton avis sur toutes les statues","un pigeon décoré porte mieux un message que toi"],
150:["tu répètes le gag et personne ne rit","la science juge la glissade rarissime, toi tu en fais une spécialité"],
151:["tu fais tomber les verres de la table pour qu'on te regarde","tu retombes sur tes pattes, sauf aux cartes"],
152:["un chat beurré tourne mieux que ta stratégie","ton jeu mérite un Ig Nobel, pas un vrai"],
153:["tu ignores Cassandre à chaque tour","tu cliques sur toutes les pièces jointes qu'on t'envoie"],
154:["tu crois encore l'article retiré du Lancet","tu repousses le rappel par peur d'une rumeur"],
155:["tu joues comme on fait la grasse matinée","ta couette a plus de répondant que toi"],
156:["tu tapes sur la vitre au lieu de taper le bon code","ta canette reste coincée, comme ta stratégie"],
157:["ton jeu ne vaut pas son poids en or, juste son poids","personne n'ose ouvrir ta boîte pour vérifier"],
158:["tu barbotes dans le petit bain depuis le début de la partie","tu coules dès que tu n'as plus pied"],
159:["tu cites Pasolini pour justifier ton pire coup","tu dis avoir vu tout Pasolini pour faire cinéphile"],
160:["tu inventes le found footage et c'est Blair Witch qui encaisse","tu caches tes acteurs un an pour faire parler de toi"],
161:["tu filmes ta défaite en contre-plongée pour qu'elle ait l'air grande","on étudie ton jeu en cours, comme exemple à ne pas suivre"],
162:["tu projettes ta honte à la Maison-Blanche","tu confonds prouesse technique et circonstance atténuante"],
163:["la cure Ludovico ne corrigerait pas ton jeu","tu bois ton lait au Korova et tu te crois dangereux"],
164:["tu résistes à tout sauf au coup le plus bête","tu rêves d'une vie ordinaire que tu as déjà"],
165:["tu te prends pour Homais, sûr de tout et nul en tout","tu rêves de Paris depuis ton Yonville"],
166:["Tubular Bells ne rendrait pas ton tour inquiétant","tu fais tourner la tête à toute la table, et pas dans le bon sens"],
167:["tu réclames ta « phynance » comme le Père Ubu","tu jures « cornegidouille » et tu perds quand même"],
168:["tu n'es pas le messie, juste un vilain garçon","à part l'aqueduc, ton jeu ne nous a rien apporté"],
169:["tes ailes de géant t'empêchent de jouer","hypocrite joueur, tu nous ressembles trop"],
170:["tu redessines ta copie sans régler le problème","on te réédite avec un avertissement en première page"],
171:["tu signes R. Mutt et tu crois avoir fait une œuvre","ton original est perdu et tes copies déçoivent"],
172:["tu provoques pour exister et ça marche à moitié","on se dispute encore sur toi trente ans après, sans t'avoir regardé"],
173:["tu vois du blanc et or là où c'est bleu et noir","tu prends parti sur une robe et pas sur ta stratégie"],
174:["tu tombes en panne comme l'animatronique des Dents de la mer","tu fais peur à tout le monde sans rien mordre"],
175:["tu te verses de l'eau glacée et tu oublies de donner","tu nommes trois amis et aucun ne répond"],
176:["tu affoles les chaînes d'info, pas tes adversaires","ton canular tient mieux que ta stratégie"],
177:["tu caches un joueur dans le meuble et tu perds quand même","Edgar Poe a deviné ton truc avant tout le monde"],
178:["tu parles d'éthique pour masquer ta mauvaise foi","tu crées dix faux comptes pour avoir raison"],
179:["tu obtiens une audience du pape avec des bobards","ton témoin vedette n'a jamais existé"],
180:["tu découpes tes preuves dans un vieux livre illustré","Sherlock aurait démasqué ton jeu, son auteur non"],
181:["tu zoomes sur chaque photo pour trouver la doublure","tu crois que ton adversaire a été remplacé"],
182:["tu annonces une invasion martienne et personne ne bouge","ta réputation, ce sont les journaux qui l'ont inventée"],
183:["tu vois des castors bipèdes sur la Lune et dans ta main","tu prêtes tes erreurs à un astronome qui n'a rien demandé"],
184:["tu échanges des millions futurs contre deux pizzas","on fête chaque année ta pire transaction"],
185:["tu réponds « OK boomer » faute d'argument","tu clos le débat en deux mots et tu perds en trois"],
186:["tu deviens un mème, mais pour de mauvaises raisons","on t'inscrirait en candidat fantaisie et tu ferais zéro voix"],
187:["tu cherches où finit la table depuis le début","tu traites tes adversaires de globistes"],
188:["tu provoques un incident diplomatique pour une garniture","tu mets du sucré là où personne n'en veut"],
189:["tu joues confortable et tout le monde détourne le regard","ta stratégie porte des chaussettes dans des sandales"],
190:["tu déposes un amendement pour faire oublier ta défaite","tu ouvres un front sud-ouest pour une viennoiserie"],
191:["tu joues comme un réveil à 7 h sans café","tu as l'élan d'un réveil qui sonne pour la troisième fois"],
192:["tu tends le bras pour immortaliser ta débâcle","ton meilleur profil reste celui où tu perds"],
193:["ta réputation repose sur un chiffre que personne n'a vérifié","tu es dur dehors et plein d'eau dedans"],
194:["tu sues rouge à chaque tour et tu appelles ça une stratégie","tu bâilles pour intimider et tout le monde s'en va"],
195:["tu prépares la fin du monde et il ne se passe rien","tu dis « tout ça pour rien » sans remercier personne"],
196:["on vote ta suppression et tu restes quand même","tu es en retard deux fois par an, et le reste de l'année aussi"],
197:["tu vérifies les pupilles de tes adversaires avant de jouer","tu changes de peau mais pas de stratégie"],
198:["tu prends un drapeau froissé pour une preuve","Kubrick aurait refusé de tourner ta partie"],
199:["tu rates la sortie à chaque tour","ta stratégie a la beauté d'une sculpture de giratoire"],
200:["tu déroules ton jeu par-dessous, contre le brevet","tu tombes en panne au pire moment, comme le rouleau"]
};
const motsPleins=s=>(String(s).toLowerCase().match(/[a-zàâäéèêëîïôöùûüç]{5,}/g)||[]);
function choisirReplique(no,ids,deja){
const L=[REPLIQUES[no],...(ALT[no]||[])].filter(Boolean);
if(L.length<2)return L[0];
let h=2166136261;for(const ch of ids.slice().sort((a,b)=>a-b).join("-")+":"+no)h=Math.imul(h^ch.charCodeAt(0),16777619)>>>0;
const vus=new Set(deja.flatMap(motsPleins)),memeAvant=deja.some(d=>/même/i.test(d));
for(let n=0;n<L.length;n++){
const c=L[(h+n)%L.length];
if(motsPleins(c).some(m=>vus.has(m)))continue;
if(memeAvant&&/^(et )?même/i.test(c))continue;
return c;
}
return L[h%L.length];
}
function trioReplique(sel){
const TR=typeof TRIO!=="undefined"?TRIO:(typeof require!=="undefined"?require("./types.js"):null);
if(TR&&TR.unDrame)sel=TR.unDrame(sel);
const ids=["P","E","O"].filter(t=>sel[t]).map(t=>sel[t].i);
const parts=[];
["P","E","O"].filter(t=>sel[t]).forEach(t=>{
const no=sel[t].i;if(sel[t].retired)return;
const v=VARIANTES[no]&&Object.keys(VARIANTES[no]).map(Number).find(k=>ids.includes(k));
const r=v?VARIANTES[no][v]:choisirReplique(no,ids,parts);
if(r)parts.push(r);
});
if(!parts.length)return"";
for(let i=0;i<parts.length-1;i++)parts[i]=parts[i].replace(/^et /,"");
if(parts.length===1)parts[0]=parts[0].replace(/^et /,"");
let s;
if(parts.length===1)s=parts[0];
else{
const der=parts[parts.length-1].replace(/^et /,""),avant=parts.slice(0,-1).join(", ");
s=/ et /.test(der)?avant+", "+der:avant+" et "+der;
}
return s.charAt(0).toUpperCase()+s.slice(1)+".";
}
if(typeof module!=="undefined")module.exports={REPLIQUES,ALT,trioReplique};
const CLASHS=[
"Ça te suffisait pas, blaireau ?",
"Elle est où ta limite ? On s'inquiète.",
"Non mais là, faut appeler le psy.",
"OK, j'appelle la police.",
"Police nationale ? J'ai un client pour vous.",
"Mais ça dépasse l'entendement.",
"Ils ont pris de la drogue, les développeurs ?",
"Tu le fais exprès, rassure-nous ?",
"Ta mère sait que tu joues à ça ?",
"Même l'IA refuse de commenter.",
"Respire. Personne ne t'oblige.",
"Tu as perdu un pari, c'est ça ?",
"On va prévenir tes parents.",
"Quelqu'un surveille cet enfant ?",
"Le service client ne répond plus.",
"Ah. Bon. D'accord. Pourquoi ?",
"Tu dors bien, la nuit ?",
"On a déjà appelé le prêtre.",
"Le psy ne prend plus de patients.",
"C'était ça, ton plan ? Vraiment ?",
"Les avocats sont en PLS.",
"Même Satan prend des notes.",
"On ne juge pas. Enfin, si.",
"J'ai vu ton historique. Tout s'explique.",
"Tu veux un câlin ou un sermon ?",
"Les voisins ont entendu.",
"Bravo. Enfin, non. Pas bravo.",
"Ton conseiller d'orientation avait raison.",
"Ça va, à la maison ?",
"Il est quelle heure dans ta tête ?",
"Même ton chien a honte.",
"Tu viens de perdre un ami. Minimum.",
"Ta grand-mère pleure, quelque part.",
"On te laisse seul cinq minutes, et voilà.",
"Pose ton téléphone. Lentement.",
"Mains en l'air ! Lâche cette carte.",
"Le FBI vient d'ouvrir un dossier.",
"Interpol est sur le coup.",
"Ta carte d'électeur est révoquée.",
"On a appelé le SAMU. Celui de la morale.",
"La cellule psychologique est ouverte.",
"Et après, tu t'étonnes d'être seul.",
"Personne ne t'a appris la honte ?",
"Ce trio, c'est un appel à l'aide ?",
"Tu as besoin d'en parler ?",
"Le jury délibère. C'est mal parti.",
"Faut-il prévenir ton employeur ?",
"Ton CV vient de prendre feu.",
"Ton banquier refuse de te connaître.",
"Même Papolé se désolidarise.",
"Les développeurs démissionnent.",
"Le stagiaire a pleuré.",
"On ne t'invitera plus aux mariages.",
"Le karma a noté ton adresse.",
"Ton ange gardien a posé sa démission.",
"Le Vatican envisage l'excommunication.",
"Même le diable trouve ça too much.",
"OK boomer. Enfin, OK monstre.",
"C'est pas un jeu, ça. Enfin si. Mais non.",
"Ton âme est en solde.",
"Rends-nous ta conscience, on la garde.",
"Tu as un permis pour ça ?",
"Le comité d'éthique vient de s'évanouir.",
"Le GIGN est en route. Il prend son temps.",
"On t'a vu. Tout le monde t'a vu.",
"Capture d'écran faite. Pour la justice.",
"C'est enregistré. Pour la formation.",
"Tu dois des excuses à l'humanité.",
"Ça, c'est un drapeau rouge géant.",
"Un psy, deux psys, trois psys…",
"Le compteur de honte vient d'exploser.",
"Erreur 404 : morale introuvable.",
"Mise à jour de ta conscience échouée.",
"Redémarre ton cerveau, s'il te plaît.",
"Ton cerveau a quitté la partie.",
"Tu joues avec les pieds ?",
"Cligne deux fois si on te force.",
"On t'aime quand même. Un peu. Non.",
"Tes amis imaginaires t'ont bloqué.",
"Même ton reflet détourne les yeux.",
"Tu manges des piles au petit-déj ?",
"Qui t'a laissé jouer sans adulte ?",
"Sérieusement ? SÉRIEUSEMENT ?",
"Le bon goût a quitté la salle.",
"Tu viens de traumatiser le serveur.",
"On a bipé ta carte. Trop tard.",
"Tu es banni de Noël.",
"Ton horoscope l'avait prédit.",
"Je préviens ta tante. Celle qui crie.",
"La honte, ça se mange froid.",
"Tu as raté ta vocation : tribunal.",
"On va te faire une cagnotte. Pour le psy.",
"Ta thérapie coûtera plus cher que le jeu.",
"Ce n'est plus de l'humour, c'est un dossier.",
"Les juges de l'enfer sont jaloux.",
"Mais qui t'a élevé ? Des loups ?",
"Les loups refusent la responsabilité.",
"On ne peut plus rien dire, mais toi si.",
"C'était le trio de trop.",
"Quelqu'un, arrêtez-le.",
"Tu veux qu'on t'appelle un taxi ? Loin.",
"Tu fais peur aux bots.",
"L'IA adverse demande un congé maladie.",
"Ton adversaire veut changer de table.",
"Même la machine a une meilleure morale.",
"On a besoin d'un adulte. D'urgence.",
"Tu vas finir dans un documentaire en six épisodes.",
"Le podcast true crime t'attend.",
"Ton nom en une du journal. Pas en bien.",
"Un grand quotidien prépare ton portrait. Inquiétant.",
"Une équipe de reportage est devant chez toi.",
"Les journalistes d'investigation ont des questions.",
"L'accusé peut entrer.",
"Tu as le droit de garder le silence.",
"Tout ce que tu joues sera retenu contre toi.",
"Garde à vue : 48 heures. Minimum.",
"Ton avocat a changé de numéro.",
"Commis d'office, et encore.",
"Plaide la folie. Ça passera.",
"Circonstances aggravantes : ce trio.",
"Le procureur requiert la perpétuité.",
"Ton casier vient de s'allonger.",
"Fiché S comme Sans limite.",
"Le juge d'application des peines soupire.",
"Le procès aura lieu à huis clos.",
"Pas de sursis pour ce trio.",
"Tu as droit à un appel. Un psy.",
"Bracelet électronique conseillé.",
"Interdit de territoire : bon goût.",
"Assigné à résidence dans la honte.",
"Mise en examen pour mauvais goût.",
"L'enquête est ouverte.",
"Les témoins refusent de parler.",
"Les preuves sont accablantes.",
"Ton ADN est sur toutes les cartes.",
"Les empreintes ne mentent pas.",
"Il faut ouvrir une enquête sur toi.",
"La brigade anti-malaise a été prévenue.",
"La police du goût est en route.",
"Contrôle de routine. Ta morale, s'il te plaît.",
"Papiers ! Et ta conscience aussi.",
"Souffle dans le ballon de la décence.",
"Positif au contrôle d'immoralité.",
"Dopage moral détecté.",
"Carton rouge direct.",
"Expulsé du terrain de la décence.",
"VAR consultée : c'est pire que prévu.",
"L'arbitre a rendu son sifflet.",
"Suspension de dix matchs. Ou à vie.",
"Hors-jeu moral, monsieur.",
"Penalty contre ton âme.",
"But contre ton camp. Celui de l'humanité.",
"Tu joues dans quelle équipe, là ?",
"Le coach te sort à la mi-temps.",
"Banc de touche jusqu'à nouvel ordre.",
"Tes supporters rentrent chez eux.",
"Le stade siffle. Tout le stade.",
"Ola de malaise dans les tribunes.",
"La buvette ferme par dépit.",
"Même les hooligans trouvent ça violent.",
"Ton trio est interdit dans 12 pays.",
"Censuré en Corée du Nord. C'est dire.",
"Interdit aux moins de 99 ans.",
"Déconseillé à toute personne vivante.",
"Avertissement : contenu toi.",
"Ce trio contient des traces de folie.",
"À consommer avec modération. Pas toi.",
"Nuit gravement à ton entourage.",
"Fumer tue. Toi, tu achèves.",
"Notice : ne pas laisser à portée de toi.",
"Effets secondaires : honte durable.",
"Ne pas avaler. Ne pas jouer non plus.",
"Produit inflammable. Toi aussi.",
"Danger : esprit tordu en circulation.",
"Attention, sol glissant. Morale aussi.",
"Zone de non-droit détectée.",
"Périmètre de sécurité établi.",
"Évacuez la table, calmement.",
"Avis de recherche : ta dignité.",
"Dignité perdue, récompense offerte.",
"Si tu trouves ta limite, rapporte-la.",
"Objets trouvés : ta conscience. Viens la chercher.",
"On a retrouvé ta morale. Elle était morte.",
"Minute de silence pour ta réputation.",
"Ci-gît ta crédibilité.",
"Ta réputation a été incinérée.",
"RIP ton dernier ami.",
"Ton groupe de discussion vient de se vider.",
"Ta famille a changé de nom.",
"Ton chat a demandé à être adopté ailleurs.",
"Ton poisson rouge a sauté du bocal.",
"Ta plante s'est laissée mourir.",
"Le facteur ne passe plus chez toi.",
"Même le livreur refuse ta rue.",
"Ta voisine a mis un panneau « à vendre ».",
"On a muré ta porte. Par précaution.",
"Le maire t'a retiré la clé de la ville.",
"Tu n'es jumelé avec personne.",
"Ta ville natale nie te connaître.",
"L'office du tourisme t'a effacé.",
"Ton prof de français a honte aussi.",
"Ta maîtresse de CP l'avait vu venir.",
"T'as pas honte ? Non ? Ça se voit.",
"Va dans ta chambre. Sans dessert.",
"Privé d'écran pendant dix ans.",
"Au coin, avec ton bonnet d'âne.",
"Copie cent fois : « Je ne jouerai plus ça ».",
"Zéro pointé. Et encore, c'est gentil.",
"Convocation chez le directeur.",
"Mot dans le carnet de correspondance.",
"Tes parents sont convoqués demain.",
"Redoublement immédiat.",
"Tu iras en pension. En Sibérie.",
"Colle samedi. Tous les samedis.",
"Même la cantine refuse de te servir.",
"Tu ne passeras pas en sixième.",
"Ton bulletin dit : « Inquiétant ».",
"« Peut mieux faire. » Non. Ne fais plus rien.",
"Le conseil de classe est unanime.",
"Exclusion définitive. De la société.",
"Ton diplôme est annulé rétroactivement.",
"On te reprend ton permis. Et ta carte Vitale.",
"Ton badge de scout est confisqué. Ta médaille de natation aussi.",
"France Travail te déconseille partout.",
"Ton patron lit par-dessus ton épaule.",
"Ton profil pro vient d'être supprimé.",
"Ta note de passager passe à une étoile.",
"Plus aucune location de vacances ne t'accepte.",
"Ton appli de rencontre te propose… personne.",
"Ton crush a vu ça. C'est fini.",
"Ton ex avait raison, finalement.",
"Ta future belle-mère a tout vu.",
"Le mariage est annulé.",
"Tes témoins se désistent.",
"Le DJ refuse de jouer pour toi.",
"Plus jamais d'invitation à la crémaillère.",
"Même tonton Michel trouve ça limite.",
"Repas de famille : tu manges dehors.",
"Ton parrain ne te reconnaît plus.",
"Tes cousins ont créé un groupe sans toi.",
"Ta grand-mère a changé son testament.",
"Joyeux Noël. Pas pour toi.",
"Le Père Noël te met sur liste noire.",
"Pas de chocolats à Pâques. Ni après.",
"La petite souris ne passera plus.",
"Même le père Fouettard a peur de toi.",
"Saint Pierre a verrouillé la porte.",
"Le paradis affiche complet. Pour toi.",
"L'enfer a une liste d'attente. Tu es en tête.",
"Le purgatoire, c'est trop doux.",
"Va te confesser. Prévois la journée.",
"Le curé a pris sa retraite anticipée.",
"Trois Ave Maria ne suffiront pas.",
"Le confessionnal a pris feu.",
"Prie. Beaucoup. Tout de suite.",
"Même les athées prient pour toi.",
"Dieu a mis ton numéro en silencieux.",
"Bouddha perd son calme.",
"Le karma te réserve une surprise.",
"Ta prochaine vie : moustique.",
"Réincarnation prévue : bactérie.",
"Ton chakra est complètement bouché.",
"Tes ondes sont mauvaises.",
"Le pendule tourne dans le mauvais sens.",
"Ta voyante a fermé boutique.",
"Même l'astrologue n'ose pas lire ton thème.",
"Mercure rétrograde ? Non, c'est toi.",
"Les tarots ne sortent que la Mort.",
"Ta boule de cristal s'est fissurée.",
"Le médium te rend ton argent.",
"Ce trio porte malheur. À toi.",
"Un chat noir vient de changer de trottoir.",
"Sept ans de malheur. Minimum.",
"Touche du bois. Beaucoup de bois.",
"Il est temps de déménager. Sur Mars.",
"Même les milliardaires de l'espace refusent de t'emmener.",
"Même la NASA ne veut pas de toi.",
"Les extraterrestres repartent.",
"Ils étaient venus en paix. Plus maintenant.",
"Houston, on a un problème. C'est toi.",
"Ton signal se perd dans l'espace.",
"Fin de transmission. Pour ton honneur.",
"Ta conscience est en mode avion.",
"Batterie morale : 0 %.",
"Réseau éthique : aucun signal.",
"Ta morale est en maintenance.",
"Mise à jour requise : humanité 2.0.",
"Ton logiciel moral a planté.",
"Ctrl+Z, vite. Ctrl+Z !",
"Il n'y a pas de bouton annuler.",
"Fichier corrompu : ta tête.",
"Antivirus : menace détectée. C'est toi.",
"Ta tête tourne sur un vieux PC de 1995.",
"Ton cerveau rame comme un modem 56k.",
"Captcha échoué : tu n'es pas humain.",
"Prouve que tu n'es pas un robot. Ah non.",
"Cookies refusés. Toi aussi.",
"Conditions d'utilisation : violées.",
"Ton compte a été signalé 47 fois.",
"La modération a démissionné.",
"On a ouvert un ticket. Il se ferme jamais.",
"Toi, tu n'as peur de rien. C'est ça le souci.",
"Il y a des limites. Tu les as pulvérisées.",
"Il fallait oser. Il ne fallait pas.",
"C'est courageux. Et totalement con.",
"Audacieux. Dans le sens « inquiétant ».",
"Intéressant. Au sens clinique.",
"Fascinant. Comme une notice de montage.",
"On regarde, mais on a honte.",
"C'est beau comme un ticket de caisse.",
"Original. Dans le mauvais sens.",
"Créatif. Comme un pyromane.",
"Génie ou fou ? Fou.",
"Tu as un vrai talent. Pour le malaise.",
"Le malaise est palpable.",
"Le silence est gênant. Très.",
"Personne n'ose te regarder.",
"On entend les mouches voler.",
"Un ange passe. Il s'enfuit.",
"Gros blanc autour de la table.",
"Ça jette un froid. Polaire.",
"La température a chuté de 20 degrés.",
"Même la banquise fond moins vite.",
"Le malaise traverse l'écran.",
"On sent la gêne d'ici.",
"Tu as cassé l'ambiance. Et la table.",
"Fin de soirée. Tout le monde rentre.",
"Les invités cherchent leurs manteaux.",
"On t'appelle un taxi ? Pour toi seul.",
"La fête est finie. À cause de toi.",
"On rallume la lumière. Tu peux partir.",
"La musique s'est arrêtée net.",
"Le videur te raccompagne.",
"Interdit d'entrée à vie.",
"Ta tête est sur la liste.",
"On a ta photo à l'entrée.",
"Même le kebab ne te sert plus.",
"Le boulanger te rend ta monnaie en silence.",
"On te reconnaît dans la rue. Pas en bien.",
"Change de coupe, de nom, de pays.",
"Le programme de protection des témoins refuse.",
"Laisse pousser ta barbe et pars.",
"Une nouvelle identité, vite.",
"Fuis. Loin. Maintenant.",
"Cours. Vite. Loin.",
"Sors. Et ferme derrière toi.",
"La porte, c'est par là.",
"Tu connais la sortie.",
"On ne te retient pas.",
"Bon vent. Très loin.",
"Bon débarras, en somme.",
"Au revoir. Et merci pour rien.",
"Ne reviens pas. Sauf pour t'excuser.",
"On t'a assez vu.",
"Ta présence n'était pas requise.",
"Qui t'a invité, au juste ?",
"Tu t'es trompé de jeu. Et de vie.",
"Retourne aligner des bonbons sur ton téléphone.",
"Tu serais mieux devant un dessin animé pour les tout-petits.",
"Même empiler des blocs, c'est trop violent pour toi.",
"Le jeu de l'oie, c'est plus ton niveau.",
"Les petits chevaux t'attendent.",
"Tu as l'âge mental d'un animal virtuel.",
"Ton animal virtuel est mort de honte.",
"Ton petit monstre de poche refuse d'évoluer avec toi.",
"Ton avatar demande à changer de joueur.",
"Ta manette s'est débranchée toute seule.",
"Game over. Pour ta réputation.",
"Tu as débloqué le succès « Monstre ».",
"Trophée platine de l'immoralité.",
"Niveau de mauvais goût : légendaire.",
"Nouveau record mondial de malaise.",
"Le livre des records t'a contacté.",
"Médaille d'or en indécence.",
"Trophée d'or du mauvais goût.",
"Grand prix de la provoc.",
"Statuette du pire trio.",
"Prix du malaise. Discours, discours !",
"Remercie ta famille. Ah, elle t'a bloqué.",
"Prix Nobel de rien du tout.",
"Le jury est sous le choc.",
"Tu as cassé le barème.",
"Note : hors catégorie.",
"Le compteur ne va pas plus haut.",
"Tu as fait sauter les plombs.",
"Le serveur a crashé de honte.",
"Les cartes demandent à changer de joueur.",
"Les cartes se sentent sales.",
"Même Hitler trouve ça déplacé. Non. Pas lui.",
"L'Histoire te demande d'arrêter.",
"Les historiens se tapent la tête.",
"Les manuels d'histoire te renient.",
"Les archives refusent de te classer.",
"Ce trio sera interdit en 2040.",
"Tes descendants vont changer de nom.",
"Tes arrière-petits-enfants te détestent déjà.",
"Ton arbre généalogique s'arrête ici.",
"Ta lignée te renie ce soir.",
"Ton QI vient de passer en négatif.",
"Ça réfléchit fort, là-dedans ? Non.",
"Deux neurones, et ils se font la gueule.",
"Ton neurone est en arrêt maladie.",
"Le cerveau, c'est en option chez toi ?",
"On a cherché ton cerveau. Introuvable.",
"Ta boîte crânienne fait écho.",
"Il y a de la place, là-haut.",
"Tu penses avec quoi, exactement ?",
"Réfléchir, ça s'apprend. Inscris-toi.",
"Même un poisson rouge aurait hésité.",
"Une huître a plus de recul.",
"Une moule réfléchit plus que toi.",
"Ton plan sort d'un paquet de céréales.",
"Tu as gagné ton cerveau dans un œuf surprise.",
"Notice de montage du cerveau perdue.",
"Ton GPS moral recalcule l'itinéraire.",
"« Faites demi-tour dès que possible. »",
"Tu roules à contresens sur l'autoroute de la morale.",
"Excès de vitesse dans le mauvais goût.",
"Radar flashé : 300 km/h de malaise.",
"Retrait de permis de jouer.",
"Points perdus : tous.",
"Ton assurance refuse de te couvrir.",
"Même ta mutuelle te lâche.",
"La Sécu ne rembourse pas ça.",
"Il n'y a pas de vaccin contre toi.",
"Tu es contagieux ? On met un masque.",
"Distanciation sociale avec toi : 10 km.",
"Quarantaine conseillée.",
"Isolement total, par sécurité.",
"On désinfecte la table après toi.",
"Passe le nettoyeur haute pression sur ce trio.",
"Même la javel ne nettoiera pas ça.",
"Il faudra repeindre la pièce.",
"On brûle les cartes après la partie.",
"Exorcisme programmé à 18 h.",
"L'eau bénite bout à ton contact.",
"Ta tête a tourné à 360 degrés ?",
"Vade retro, joueur.",
"Le démon en toi a faim.",
"Tu as signé un pacte, avoue.",
"Ton âme était en promo, c'est ça ?",
"Méphisto veut renégocier le contrat.",
"Lucifer prend des cours avec toi.",
"Même les démons se signent.",
"Satan t'a envoyé une demande d'amitié.",
"Belzébuth te suit sur les réseaux.",
"Ton parrain, c'est Dracula ?",
"Tu dors dans un cercueil, avoue.",
"L'ail ne marchera pas sur toi.",
"Même les zombies ont plus de cœur.",
"Les vampires ont un code d'honneur. Pas toi.",
"Les loups-garous te trouvent bizarre.",
"Même la poupée du grenier te trouve flippant.",
"Le croque-mitaine fait des cauchemars de toi.",
"Même les sorciers maléfiques disent ton nom à voix basse.",
"Même les méchants à cape trouvent ça trop sombre.",
"Les ténèbres te trouvent excessif.",
"Un troll des cavernes a plus de morale.",
"Le grand œil maléfique te surveille. Inquiet.",
"Même le clown tueur te trouve trop sérieux.",
"Tu as le charisme d'une huissière.",
"Tu as l'humour d'un avis de décès.",
"Ton humour sent le formol.",
"Ta blague a fini à la morgue.",
"Le légiste ne trouve pas la chute.",
"L'autopsie de ta blague est en cours.",
"Cause du décès : ton trio.",
"Heure du décès de l'ambiance : maintenant.",
"On débranche ? On débranche.",
"Encéphalogramme plat.",
"Le défibrillateur ne suffira pas.",
"Code bleu à la table 3 !",
"Infirmière ! Une tisane, et vite.",
"Suite de la honte réservée à ton nom.",
"La blouse s'attache dans le dos.",
"Ta conscience, tu la ranges où ?",
"Ta honte, c'est le matin ou le soir ?",
"Augmentez la dose. Doublez-la.",
"Le docteur a dit « pas d'écran ».",
"Ordonnance : arrêter immédiatement.",
"Ton psy a pris un psy.",
"Ton psy t'envoie la facture et démissionne.",
"Dix ans de thérapie, minimum.",
"Freud aurait adoré ton cas.",
"Jung l'aurait refusé.",
"Ton cas sera étudié en fac de psycho.",
"Une thèse entière sur toi. Volume 1.",
"Ton dossier médical fait 400 pages.",
"Allongez-vous. Parlez-moi de votre mère.",
"Ta mère n'y est pour rien. Si ?",
"Ton enfance, on en parle ?",
"On sent les traumatismes d'ici.",
"Tu cries à l'aide, on t'entend.",
"Si tu as un vrai souci, parle-en à quelqu'un. Vraiment.",
"On t'offre une tisane. Et un exorciste.",
"Respire par le ventre. Lâche les cartes.",
"Tu as cliqué là, vraiment ?",
"Le bouton, c'était l'autre.",
"Tu voulais jouer autre chose, non ?",
"Personne ne t'a forcé. C'est pire.",
"Tu l'as choisi. En pleine conscience.",
"Tu as eu dix secondes. Et voilà.",
"Dix secondes pour ça ? Ça ne valait pas une.",
"Tu as réfléchi. C'est ça qui fait peur.",
"C'était calculé ? Ça fait encore plus peur.",
"Préméditation établie.",
"Avec circonstances atténuantes : aucune.",
"Mais pourquoi ?",
"Pourquoi tu es comme ça ?",
"Qui t'a fait du mal ?",
"Qu'est-ce qu'on t'a fait ?",
"Tu vas bien ? Vraiment ?",
"On peut en parler, tu sais.",
"On est là pour toi. Enfin, loin.",
"On t'aime. De loin. De très loin.",
"Bisous. Avec des gants.",
"Câlin interdit par décret.",
"On te serre la main ? Non.",
"On te tend une perche. Tu la brûles.",
"Tends l'autre joue. Pour la claque.",
"Une claque ou deux ?",
"Mérite une gifle de grand-mère.",
"Ta mamie vient te tirer l'oreille.",
"Ton père n'est pas fâché. Il est déçu.",
"Ta mère est déçue. Ça fait plus mal.",
"Toute la famille est déçue.",
"Ta famille fait un communiqué.",
"Ton frère dit qu'il ne te connaît pas.",
"Ta sœur a tout raconté au repas.",
"Même ton jumeau maléfique est choqué.",
"Ton double numérique se déconnecte.",
"Ce n'est pas toi, c'est ton compte piraté ?",
"Dis-nous que tu as été hacké.",
"Ton chat a marché sur l'écran, c'est ça ?",
"Le chat a bon dos.",
"C'est ton petit frère qui a joué ?",
"Tu étais bourré ? Même pas ?",
"Sobre, et tu joues ça ?",
"Ça sent l'apéro qui a mal tourné.",
"Range la bouteille.",
"Le dernier verre était le verre de trop.",
"On t'a confisqué tes clés.",
"Tu dors sur le canapé ce soir.",
"Ta moitié dort chez sa mère.",
"Ton coloc déménage demain.",
"Ton proprio résilie le bail.",
"Ta concierge parle déjà de toi.",
"Tout l'immeuble est au courant.",
"Le quartier fait une pétition.",
"Une pétition à 10 000 signatures.",
"Une manif contre toi samedi.",
"Grève générale contre ton trio.",
"Même les syndicats sont d'accord : non.",
"Le Parlement vote une loi contre toi.",
"Le Conseil constitutionnel valide.",
"L'ONU publie une résolution.",
"Les Casques bleus sont en route.",
"L'OTAN se réunit en urgence.",
"Le G7 parle de toi.",
"Sanctions économiques imposées.",
"Ton trio est un incident diplomatique.",
"L'ambassadeur est rappelé.",
"Même la Suisse n'est plus neutre.",
"La Belgique refuse aussi. Poliment.",
"Le Vatican ferme ses portes.",
"Monaco t'a déjà oublié.",
"Même le Luxembourg n'a pas de place pour toi.",
"Tu finiras sur une île. Seul.",
"Même Robinson avait Vendredi.",
"Ton aventure s'arrête ici.",
"Le groupe a voté : dehors.",
"Le point faible, c'est toi. Au revoir.",
"Tu es éliminé de l'humanité.",
"Pas de seconde chance.",
"Pas de rattrapage.",
"Pas de joker. Pas de deuxième essai.",
"Appeler un ami ? Plus personne ne décroche.",
"Le public a voté contre toi.",
"Le buzzer n'a pas résisté.",
"Question pour toi : pourquoi ?",
"Devinette : je suis ton pire trio.",
"Ton mot de passe : « honte ».",
"Prix de ta dignité : zéro euro.",
"Gagner des millions ? Pas toi.",
"Il te manque un mot dans la chanson : décence.",
"Tu as perdu ton joker moral.",
"La roue s'est arrêtée sur « non ».",
"Escalier de la honte, dernière marche.",
"En chiffres comme en lettres : non.",
"Le fort te garde en cellule.",
"Les développeurs n'assument plus.",
"On a codé ce jeu pour rire. Pas pour ça.",
"Ce trio n'était pas prévu dans le code.",
"Bug signalé : le joueur.",
"Patch prévu pour te corriger.",
"Les devs t'ont mis en commentaire.",
"Ton trio a fait planter le serveur.",
"On a dû redémarrer la morale.",
"Le serveur refuse ta requête.",
"Erreur 500 : humanité interne.",
"Requête refusée pour indécence.",
"Accès refusé : bon goût requis.",
"Le jeu te suggère une pause. Longue.",
"Papolé te conseille de sortir prendre l'air.",
"Va toucher de l'herbe. Beaucoup d'herbe.",
"Ferme l'appli et va voir tes amis. Ah.",
"Ta séance est terminée.",
"Le minuteur de la honte tourne.",
"Tu as atteint ton quota de mauvais goût.",
"Recharge ta décence pour continuer.",
"Plus de piles pour ta conscience.",
"Ton énergie morale est à plat.",
"Achète une pile de bon sens. 0,99 €.",
"Diamants insuffisants pour te racheter.",
"Même 1 000 diamants ne te sauveront pas.",
"Pack rédemption : en rupture de stock.",
"Booster de dignité épuisé.",
"Ta carte la plus rare : ta décence. Perdue.",
"Collection complète : de bêtises.",
"Ton deck sent le soufre.",
"Ce deck devrait être brûlé.",
"Tes cartes ont porté plainte.",
"Le paquet de cartes a fait une dépression.",
"Ton jeu est maudit.",
"Même tes jokers ne rigolent pas.",
"L'as de pique t'a tourné le dos.",
"La dame de cœur pleure.",
"Le roi abdique devant toi.",
"Échec et mat. Pour ta morale.",
"Tu joues aux échecs avec des grenades.",
"Tu as jeté le plateau de jeu par la fenêtre.",
"Direction la prison, sans passer par la case départ.",
"Tu ne touches rien. Ni maintenant, ni jamais.",
"L'enquête est résolue : c'est toi.",
"Dans la cuisine, avec le chandelier : toi.",
"Le Loup-garou t'élimine au premier tour.",
"Quatre de honte alignés.",
"Mille kilomètres de mauvais goût.",
"Ton puzzle n'a plus de pièces. Comme ta morale.",
"Tu es le Mistigri de la soirée.",
"On t'a mis au Bingo des pires joueurs. Bingo.",
"Qui c'est ? Le pire joueur.",
"Dans le doute, c'est toi.",
"C'est toujours toi, de toute façon.",
"Encore toi ? Toujours toi.",
"Tu recommences ? Tu recommences.",
"Pas encore !",
"Pitié, pas lui.",
"Oh non. Oh non non non.",
"Aïe. Aïe aïe aïe.",
"Ouch. Ça pique.",
"Wow. Juste wow.",
"Hein ?!",
"Quoi ?! QUOI ?!",
"Pardon ?",
"Je relis. Non, c'est bien ça.",
"J'ai dû mal lire. Non.",
"Je vais faire comme si j'avais rien vu.",
"Personne n'a rien vu. Hein ?",
"On efface et on recommence ?",
"Je n'ai pas de mots. Vraiment pas.",
"Les mots me manquent. Les gros aussi.",
"Je préfère ne pas commenter.",
"Sans commentaire.",
"Pas de commentaire. Pas d'excuse.",
"Aucune excuse valable.",
"L'excuse « c'est de l'humour » ne marche plus.",
"« C'est pour rire. » Personne ne rit.",
"Tu rigoles tout seul, là.",
"Seul ton miroir rit avec toi.",
"Même les rires enregistrés se taisent.",
"Les applaudissements sont ironiques.",
"Standing ovation de la honte.",
"Le public lance des tomates.",
"Les tomates refusent aussi.",
"Rideau. Vite, le rideau.",
"Coupez ! Coupez tout !",
"La régie a coupé le son.",
"On passe à la pub. Pour toujours.",
"Ce trio sera coupé au montage.",
"Le Conseil d'État est saisi.",
"L'Arcom a un dossier à ton nom.",
"Floute-toi la tête, par sécurité.",
"Le bip ne suffira pas.",
"Ton trio est classé X. Comme eXécrable.",
"Moins de 18 ans, fermez les yeux. Plus de 18 ans aussi.",
"Tout le monde, fermez les yeux.",
"Ne regardez pas, il recommence.",
"T'es un génie du mal. Sans le génie.",
"Tu étais à deux doigts d'être sympa.",
"On y a cru. Deux secondes.",
"Il y a de l'espoir. Ah non, plus."
];
const SOBRES_EXCLUS=new Set(["Ton arbre généalogique s'arrête ici.","Le paradis affiche complet. Pour toi.","Respire. Personne ne t'oblige.","La musique s'est arrêtée net.","Le GIGN est en route. Il prend son temps.","Ton badge de scout est confisqué. Ta médaille de natation aussi.",
"Bon débarras, en somme.","Il y a de la place, là-haut.","Tu cries à l'aide, on t'entend.","On sent les traumatismes d'ici.",
"Le Conseil constitutionnel valide.","Déconseillé à toute personne vivante.","Même la NASA ne veut pas de toi.","Ton aventure s'arrête ici.",
"Il faudra repeindre la pièce.","Le légiste ne trouve pas la chute.","Préméditation établie.","Gros blanc autour de la table.",
"Un chat noir vient de changer de trottoir.","Même le kebab ne te sert plus.","Tes parents sont convoqués demain.",
"Même Hitler trouve ça déplacé. Non. Pas lui.","Quelqu'un surveille cet enfant ?",
"Fiché S comme Sans limite.",
"Fumer tue. Toi, tu achèves.",
"Produit inflammable. Toi aussi.",
"On a retrouvé ta morale. Elle était morte.",
"Minute de silence pour ta réputation.",
"Ci-gît ta crédibilité.",
"Ta réputation a été incinérée.",
"RIP ton dernier ami.",
"Le confessionnal a pris feu.",
"Créatif. Comme un pyromane.",
"Change de coupe, de nom, de pays.",
"Laisse pousser ta barbe et pars.",
"Il n'y a pas de vaccin contre toi.",
"Tu es contagieux ? On met un masque.",
"Distanciation sociale avec toi : 10 km.",
"Quarantaine conseillée.",
"Isolement total, par sécurité.",
"On brûle les cartes après la partie.",
"Ta blague a fini à la morgue.",
"Cause du décès : ton trio.",
"Heure du décès de l'ambiance : maintenant.",
"On débranche ? On débranche.",
"Encéphalogramme plat.",
"Le défibrillateur ne suffira pas.",
"Augmentez la dose. Doublez-la.",
"Les Casques bleus sont en route.",
"Tu joues aux échecs avec des grenades.",
"Ton humour sent le formol.",
"Ce deck devrait être brûlé."
]);
const CLASHS_SOBRES=CLASHS.filter(s=>!SOBRES_EXCLUS.has(s));
const CLASHS_EMIGRE=[
"Toi, tu ne tiens même pas une partie.",
"Même ton deck rêve d'un autre joueur.",
"Ton trio a la cohérence d'un discours électoral.",
"Tu donnes des leçons, pas des cartes.",
"Ta stratégie tient sur un ticket de métro.",
"Ton jeu manque d'accueil. Et de talent."
];
const ECHO={
146:["Il n'y a pas de vaccin contre toi.","Tu es contagieux ? On met un masque.","Quarantaine conseillée.","Isolement total, par sécurité.","Distanciation sociale avec toi : 10 km.","On désinfecte la table après toi.","Ton dossier médical fait 400 pages."],
98:["Cause du décès : ton trio.","Ta blague a fini à la morgue.","Ton humour sent le formol."],105:["Cause du décès : ton trio.","Ta blague a fini à la morgue.","Ton humour sent le formol."],
84:["Houston, on a un problème. C'est toi.","Fin de transmission. Pour ton honneur.","Ton signal se perd dans l'espace."],
82:["Le serveur a crashé de honte."],
72:["Le compteur ne va pas plus haut.","Évacuez la table, calmement."],
73:["Évacuez la table, calmement."],
48:["Le compteur de honte vient d'exploser."],
76:["Le compteur de honte vient d'exploser.","Tu as fait sauter les plombs."],
77:["Le compteur de honte vient d'exploser.","Tu as fait sauter les plombs."],
81:["Le compteur de honte vient d'exploser.","Tu as fait sauter les plombs."],
75:["Ça jette un froid. Polaire.","La température a chuté de 20 degrés."],
66:["La température a chuté de 20 degrés."],
52:["Même Robinson avait Vendredi."]
};
[[[5,11,143],"Même Robinson avait Vendredi."],[[8],"Le stade siffle. Tout le stade."],
[[59,146,64,65],"On a muré ta porte. Par précaution."],
[[60,61,62,63,67,68,69,70,73,75,158,85,77,76,72,74,66],"Remercie ta famille. Ah, elle t'a bloqué."],
[[60,62,67,69,70,68,73,75,158,85],"Ton badge de scout est confisqué. Ta médaille de natation aussi."],
[[59,64,65,146],"Remercie ta famille. Ah, elle t'a bloqué."],
[[14],"Mains en l'air ! Lâche cette carte."],[[14],"On te serre la main ? Non."],
[[50,57,34,51],"Ils étaient venus en paix. Plus maintenant."],
[[60],"Joyeux Noël. Pas pour toi."],[[75,80,81,84,60,62,69],"Évacuez la table, calmement."],[[84,81,80],"Ça jette un froid. Polaire."],[[60,61,62],"Ils étaient venus en paix. Plus maintenant."],[[91,82,84],"Ton badge de scout est confisqué. Ta médaille de natation aussi."],[[60,61,62,67,73,68,70],"Plus aucune location de vacances ne t'accepte."]]
.forEach(([nos,s])=>nos.forEach(n=>(ECHO[n]=ECHO[n]||[]).push(s)));
const CLASHS_GILLES=[
"Même la légende a honte de toi.",
"Le tribunal de l'Histoire a déjà tranché.",
"Pendu à Nantes. Toi, tu es juste éliminé.",
"Ta réputation brûle plus vite que la sienne.",
"Jeanne d'Arc a changé de camp.",
"Ton blason est rayé des registres.",
"Les chroniqueurs refusent d'écrire ton nom.",
"Le château est vendu. Ta dignité aussi.",
"Même le Moyen Âge te trouve arriéré.",
"Excommunié du jeu, sans appel."
];
function trioClash(sel){
const TR=typeof TRIO!=="undefined"?TRIO:(typeof require!=="undefined"?require("./types.js"):null);
const cards=["P","E","O"].filter(t=>sel[t]).map(t=>sel[t]);
const VICT=[126,84,81,80,122,128,158,95,131,117,121];
const grave=cards.some(c=>c.nf||(TR&&TR.GRAVE&&TR.GRAVE.has(c.i))||(TR&&TR.SENSIBLE&&TR.SENSIBLE.has(c.i))||VICT.includes(c.i));
const U=TR&&TR.unDrame?TR.unDrame(sel):sel;
let L=U.E&&U.E.i===95?CLASHS_EMIGRE:grave?CLASHS_SOBRES:CLASHS;
if(cards.some(c=>c.i===208)&&L!==CLASHS_EMIGRE)L=CLASHS_GILLES;
if(cards.length<3){const L2=L.filter(s=>!/\btrio\b/i.test(s));if(L2.length)L=L2;}
let h=2166136261;
for(const c of cards.map(c=>c.i).join("-"))h=Math.imul(h^c.charCodeAt(0),16777619)>>>0;
const echo=new Set(cards.flatMap(c=>ECHO[c.i]||[]));
let k=h%L.length;
for(let n=0;n<L.length&&echo.has(L[k]);n++)k=(k+1)%L.length;
return L[k];
}
if(typeof module!=="undefined")module.exports={CLASHS,trioClash};
const DECOUPES=[{"z":[[[63.9,39.3],[30.1,40.6],[0,18.5],[0,0],[100,0],[100,34.8],[79.4,29.8]],[[63.9,39.3],[79.4,29.8],[100,34.8],[100,100],[24.7,100],[46.9,76.2]],[[63.9,39.3],[46.9,76.2],[24.7,100],[0,100],[0,18.5],[30.1,40.6]]],"l":[[[63.9,39.3],[30.1,40.6],[0,18.5]],[[63.9,39.3],[79.4,29.8],[100,34.8]],[[63.9,39.3],[46.9,76.2],[24.7,100]]],"a":[0.344,0.339,0.317]},{"z":[[[58.6,52.2],[70.2,71.2],[72.8,100],[0,100],[0,56.0],[33.1,47.7]],[[58.6,52.2],[33.1,47.7],[0,56.0],[0,0],[65.2,0],[72.3,24.5]],[[58.6,52.2],[72.3,24.5],[65.2,0],[100,0],[100,100],[72.8,100],[70.2,71.2]]],"l":[[[58.6,52.2],[70.2,71.2],[72.8,100]],[[58.6,52.2],[33.1,47.7],[0,56.0]],[[58.6,52.2],[72.3,24.5],[65.2,0]]],"a":[0.335,0.343,0.322]},{"z":[[[57.6,43.9],[35.5,69.7],[0,85.1],[0,0],[42.4,0],[42.1,23.7]],[[57.6,43.9],[42.1,23.7],[42.4,0],[100,0],[100,91.6],[82.0,60.5]],[[57.6,43.9],[82.0,60.5],[100,91.6],[100,100],[0,100],[0,85.1],[35.5,69.7]]],"l":[[[57.6,43.9],[35.5,69.7],[0,85.1]],[[57.6,43.9],[42.1,23.7],[42.4,0]],[[57.6,43.9],[82.0,60.5],[100,91.6]]],"a":[0.348,0.316,0.335]},{"z":[[[41.0,42.8],[50.9,20.6],[47.7,0],[100,0],[100,70.6],[65.2,63.5]],[[41.0,42.8],[65.2,63.5],[100,70.6],[100,100],[13.0,100],[22.9,65.3]],[[41.0,42.8],[22.9,65.3],[13.0,100],[0,100],[0,0],[47.7,0],[50.9,20.6]]],"l":[[[41.0,42.8],[50.9,20.6],[47.7,0]],[[41.0,42.8],[65.2,63.5],[100,70.6]],[[41.0,42.8],[22.9,65.3],[13.0,100]]],"a":[0.334,0.329,0.338]},{"z":[[[41.4,58.7],[42.2,19.7],[25.1,0],[100,0],[100,58.9],[62.5,47.9]],[[41.4,58.7],[62.5,47.9],[100,58.9],[100,100],[17.2,100],[22.0,79.8]],[[41.4,58.7],[22.0,79.8],[17.2,100],[0,100],[0,0],[25.1,0],[42.2,19.7]]],"l":[[[41.4,58.7],[42.2,19.7],[25.1,0]],[[41.4,58.7],[62.5,47.9],[100,58.9]],[[41.4,58.7],[22.0,79.8],[17.2,100]]],"a":[0.327,0.338,0.336]},{"z":[[[65.7,52.0],[80.7,34.3],[100,29.3],[100,100],[24.0,100],[37.6,75.6]],[[65.7,52.0],[37.6,75.6],[24.0,100],[0,100],[0,0],[4.0,0],[26.9,28.9]],[[65.7,52.0],[26.9,28.9],[4.0,0],[100,0],[100,29.3],[80.7,34.3]]],"l":[[[65.7,52.0],[80.7,34.3],[100,29.3]],[[65.7,52.0],[37.6,75.6],[24.0,100]],[[65.7,52.0],[26.9,28.9],[4.0,0]]],"a":[0.335,0.349,0.316]},{"z":[[[39.9,61.9],[73.7,56.5],[100,61.9],[100,100],[11.1,100],[21.8,74.8]],[[39.9,61.9],[21.8,74.8],[11.1,100],[0,100],[0,0],[34.6,0],[43.7,22.1]],[[39.9,61.9],[43.7,22.1],[34.6,0],[100,0],[100,61.9],[73.7,56.5]]],"l":[[[39.9,61.9],[73.7,56.5],[100,61.9]],[[39.9,61.9],[21.8,74.8],[11.1,100]],[[39.9,61.9],[43.7,22.1],[34.6,0]]],"a":[0.316,0.334,0.35]},{"z":[[[36.0,42.8],[62.4,67.0],[71.4,100],[0,100],[0,52.5],[12.6,41.8]],[[36.0,42.8],[12.6,41.8],[0,52.5],[0,0],[100,0],[100,0.8],[65.9,34.7]],[[36.0,42.8],[65.9,34.7],[100,0.8],[100,100],[71.4,100],[62.4,67.0]]],"l":[[[36.0,42.8],[62.4,67.0],[71.4,100]],[[36.0,42.8],[12.6,41.8],[0,52.5]],[[36.0,42.8],[65.9,34.7],[100,0.8]]],"a":[0.335,0.335,0.33]},{"z":[[[60.5,48.5],[59.0,23.2],[81.7,0],[100,0],[100,100],[59.7,100],[71.0,67.5]],[[60.5,48.5],[71.0,67.5],[59.7,100],[0,100],[0,44.0],[20.6,54.4]],[[60.5,48.5],[20.6,54.4],[0,44.0],[0,0],[81.7,0],[59.0,23.2]]],"l":[[[60.5,48.5],[59.0,23.2],[81.7,0]],[[60.5,48.5],[71.0,67.5],[59.7,100]],[[60.5,48.5],[20.6,54.4],[0,44.0]]],"a":[0.348,0.324,0.328]},{"z":[[[49.0,49.9],[58.3,26.9],[55.4,0],[100,0],[100,82.2],[73.7,76.1]],[[49.0,49.9],[73.7,76.1],[100,82.2],[100,100],[0,100],[0,88.7],[19.6,60.9]],[[49.0,49.9],[19.6,60.9],[0,88.7],[0,0],[55.4,0],[58.3,26.9]]],"l":[[[49.0,49.9],[58.3,26.9],[55.4,0]],[[49.0,49.9],[73.7,76.1],[100,82.2]],[[49.0,49.9],[19.6,60.9],[0,88.7]]],"a":[0.332,0.327,0.341]},{"z":[[[35.1,50.8],[15.5,35.3],[3.1,0],[100,0],[100,15.8],[79.8,33.0]],[[35.1,50.8],[79.8,33.0],[100,15.8],[100,100],[76.3,100],[46.9,75.7]],[[35.1,50.8],[46.9,75.7],[76.3,100],[0,100],[0,0],[3.1,0],[15.5,35.3]]],"l":[[[35.1,50.8],[15.5,35.3],[3.1,0]],[[35.1,50.8],[79.8,33.0],[100,15.8]],[[35.1,50.8],[46.9,75.7],[76.3,100]]],"a":[0.343,0.333,0.324]},{"z":[[[56.7,61.0],[26.9,26.3],[0,10.4],[0,0],[100,0],[100,29.6],[77.2,33.4]],[[56.7,61.0],[77.2,33.4],[100,29.6],[100,100],[30.7,100],[35.7,74.3]],[[56.7,61.0],[35.7,74.3],[30.7,100],[0,100],[0,10.4],[26.9,26.3]]],"l":[[[56.7,61.0],[26.9,26.3],[0,10.4]],[[56.7,61.0],[77.2,33.4],[100,29.6]],[[56.7,61.0],[35.7,74.3],[30.7,100]]],"a":[0.348,0.339,0.313]},{"z":[[[35.1,54.0],[39.2,30.1],[23.0,0],[100,0],[100,56.4],[62.1,48.4]],[[35.1,54.0],[62.1,48.4],[100,56.4],[100,100],[28.2,100],[25.5,71.4]],[[35.1,54.0],[25.5,71.4],[28.2,100],[0,100],[0,0],[23.0,0],[39.2,30.1]]],"l":[[[35.1,54.0],[39.2,30.1],[23.0,0]],[[35.1,54.0],[62.1,48.4],[100,56.4]],[[35.1,54.0],[25.5,71.4],[28.2,100]]],"a":[0.344,0.344,0.312]},{"z":[[[53.5,63.5],[46.0,33.2],[54.8,0],[100,0],[100,79.3],[80.5,67.2]],[[53.5,63.5],[80.5,67.2],[100,79.3],[100,100],[0,100],[0,75.7],[19.2,64.5]],[[53.5,63.5],[19.2,64.5],[0,75.7],[0,0],[54.8,0],[46.0,33.2]]],"l":[[[53.5,63.5],[46.0,33.2],[54.8,0]],[[53.5,63.5],[80.5,67.2],[100,79.3]],[[53.5,63.5],[19.2,64.5],[0,75.7]]],"a":[0.341,0.327,0.332]},{"z":[[[59.8,61.9],[76.3,85.1],[100,89.2],[100,100],[0,100],[0,62.4],[24.1,55.0]],[[59.8,61.9],[24.1,55.0],[0,62.4],[0,0],[51.5,0],[63.7,37.9]],[[59.8,61.9],[63.7,37.9],[51.5,0],[100,0],[100,89.2],[76.3,85.1]]],"l":[[[59.8,61.9],[76.3,85.1],[100,89.2]],[[59.8,61.9],[24.1,55.0],[0,62.4]],[[59.8,61.9],[63.7,37.9],[51.5,0]]],"a":[0.322,0.346,0.332]},{"z":[[[53.7,46.6],[69.2,70.7],[100,94.3],[100,100],[0,100],[0,85.0],[25.7,55.3]],[[53.7,46.6],[25.7,55.3],[0,85.0],[0,0],[46.3,0],[55.9,23.7]],[[53.7,46.6],[55.9,23.7],[46.3,0],[100,0],[100,94.3],[69.2,70.7]]],"l":[[[53.7,46.6],[69.2,70.7],[100,94.3]],[[53.7,46.6],[25.7,55.3],[0,85.0]],[[53.7,46.6],[55.9,23.7],[46.3,0]]],"a":[0.332,0.319,0.349]},{"z":[[[37.4,43.4],[52.6,31.7],[55.8,0],[100,0],[100,90.6],[82.8,66.6]],[[37.4,43.4],[82.8,66.6],[100,90.6],[100,100],[0,100],[0,99.2],[28.5,66.0]],[[37.4,43.4],[28.5,66.0],[0,99.2],[0,0],[55.8,0],[52.6,31.7]]],"l":[[[37.4,43.4],[52.6,31.7],[55.8,0]],[[37.4,43.4],[82.8,66.6],[100,90.6]],[[37.4,43.4],[28.5,66.0],[0,99.2]]],"a":[0.323,0.331,0.346]},{"z":[[[46.1,43.6],[46.0,73.2],[68.8,100],[0,100],[0,34.3],[24.1,32.3]],[[46.1,43.6],[24.1,32.3],[0,34.3],[0,0],[100,0],[100,5.2],[76.1,32.4]],[[46.1,43.6],[76.1,32.4],[100,5.2],[100,100],[68.8,100],[46.0,73.2]]],"l":[[[46.1,43.6],[46.0,73.2],[68.8,100]],[[46.1,43.6],[24.1,32.3],[0,34.3]],[[46.1,43.6],[76.1,32.4],[100,5.2]]],"a":[0.327,0.323,0.35]},{"z":[[[44.7,53.7],[39.3,80.8],[23.9,100],[0,100],[0,0],[26.3,0],[29.8,27.8]],[[44.7,53.7],[29.8,27.8],[26.3,0],[100,0],[100,58.9],[77.7,46.4]],[[44.7,53.7],[77.7,46.4],[100,58.9],[100,100],[23.9,100],[39.3,80.8]]],"l":[[[44.7,53.7],[39.3,80.8],[23.9,100]],[[44.7,53.7],[29.8,27.8],[26.3,0]],[[44.7,53.7],[77.7,46.4],[100,58.9]]],"a":[0.349,0.348,0.303]},{"z":[[[62.4,56.6],[84.3,67.9],[100,93.2],[100,100],[0,100],[0,81.3],[23.5,60.6]],[[62.4,56.6],[23.5,60.6],[0,81.3],[0,0],[51.4,0],[50.6,35.6]],[[62.4,56.6],[50.6,35.6],[51.4,0],[100,0],[100,93.2],[84.3,67.9]]],"l":[[[62.4,56.6],[84.3,67.9],[100,93.2]],[[62.4,56.6],[23.5,60.6],[0,81.3]],[[62.4,56.6],[50.6,35.6],[51.4,0]]],"a":[0.342,0.342,0.316]},{"z":[[[45.1,37.6],[54.4,17.4],[80.5,0],[100,0],[100,100],[88.0,100],[77.3,73.7]],[[45.1,37.6],[77.3,73.7],[88.0,100],[0,100],[0,80.9],[33.5,57.9]],[[45.1,37.6],[33.5,57.9],[0,80.9],[0,0],[80.5,0],[54.4,17.4]]],"l":[[[45.1,37.6],[54.4,17.4],[80.5,0]],[[45.1,37.6],[77.3,73.7],[88.0,100]],[[45.1,37.6],[33.5,57.9],[0,80.9]]],"a":[0.344,0.32,0.336]},{"z":[[[57.5,56.1],[47.2,85.7],[22.1,100],[0,100],[0,5.7],[22.7,32.6]],[[57.5,56.1],[22.7,32.6],[0,5.7],[0,0],[100,0],[100,2.3],[79.4,38.7]],[[57.5,56.1],[79.4,38.7],[100,2.3],[100,100],[22.1,100],[47.2,85.7]]],"l":[[[57.5,56.1],[47.2,85.7],[22.1,100]],[[57.5,56.1],[22.7,32.6],[0,5.7]],[[57.5,56.1],[79.4,38.7],[100,2.3]]],"a":[0.329,0.344,0.327]},{"z":[[[51.3,43.6],[40.4,20.5],[41.4,0],[100,0],[100,68.5],[70.3,59.6]],[[51.3,43.6],[70.3,59.6],[100,68.5],[100,100],[0,100],[0,91.6],[36.2,65.1]],[[51.3,43.6],[36.2,65.1],[0,91.6],[0,0],[41.4,0],[40.4,20.5]]],"l":[[[51.3,43.6],[40.4,20.5],[41.4,0]],[[51.3,43.6],[70.3,59.6],[100,68.5]],[[51.3,43.6],[36.2,65.1],[0,91.6]]],"a":[0.322,0.346,0.332]},{"z":[[[56.9,52.6],[80.9,72.0],[98.6,100],[0,100],[0,84.6],[25.1,59.3]],[[56.9,52.6],[25.1,59.3],[0,84.6],[0,0],[63.6,0],[49.4,32.6]],[[56.9,52.6],[49.4,32.6],[63.6,0],[100,0],[100,100],[98.6,100],[80.9,72.0]]],"l":[[[56.9,52.6],[80.9,72.0],[98.6,100]],[[56.9,52.6],[25.1,59.3],[0,84.6]],[[56.9,52.6],[49.4,32.6],[63.6,0]]],"a":[0.325,0.35,0.325]},{"z":[[[46.8,55.3],[58.6,83.2],[87.7,100],[0,100],[0,44.3],[21.2,42.4]],[[46.8,55.3],[21.2,42.4],[0,44.3],[0,0],[78.1,0],[74.1,30.7]],[[46.8,55.3],[74.1,30.7],[78.1,0],[100,0],[100,100],[87.7,100],[58.6,83.2]]],"l":[[[46.8,55.3],[58.6,83.2],[87.7,100]],[[46.8,55.3],[21.2,42.4],[0,44.3]],[[46.8,55.3],[74.1,30.7],[78.1,0]]],"a":[0.312,0.34,0.348]},{"z":[[[43.9,58.9],[36.8,86.9],[51.1,100],[0,100],[0,11.7],[32.0,29.9]],[[43.9,58.9],[32.0,29.9],[0,11.7],[0,0],[100,0],[100,25.8],[75.6,34.3]],[[43.9,58.9],[75.6,34.3],[100,25.8],[100,100],[51.1,100],[36.8,86.9]]],"l":[[[43.9,58.9],[36.8,86.9],[51.1,100]],[[43.9,58.9],[32.0,29.9],[0,11.7]],[[43.9,58.9],[75.6,34.3],[100,25.8]]],"a":[0.31,0.341,0.35]},{"z":[[[57.8,50.9],[77.1,69.7],[75.7,100],[0,100],[0,48.4],[36.4,55.5]],[[57.8,50.9],[36.4,55.5],[0,48.4],[0,0],[75.1,0],[58.8,14.5]],[[57.8,50.9],[58.8,14.5],[75.1,0],[100,0],[100,100],[75.7,100],[77.1,69.7]]],"l":[[[57.8,50.9],[77.1,69.7],[75.7,100]],[[57.8,50.9],[36.4,55.5],[0,48.4]],[[57.8,50.9],[58.8,14.5],[75.1,0]]],"a":[0.349,0.318,0.333]},{"z":[[[46.8,42.3],[44.5,80.7],[56.3,100],[0,100],[0,2.6],[21.6,34.7]],[[46.8,42.3],[21.6,34.7],[0,2.6],[0,0],[100,0],[100,47.6],[75.2,34.0]],[[46.8,42.3],[75.2,34.0],[100,47.6],[100,100],[56.3,100],[44.5,80.7]]],"l":[[[46.8,42.3],[44.5,80.7],[56.3,100]],[[46.8,42.3],[21.6,34.7],[0,2.6]],[[46.8,42.3],[75.2,34.0],[100,47.6]]],"a":[0.333,0.347,0.32]},{"z":[[[41.4,46.5],[48.7,28.9],[36.0,0],[100,0],[100,70.2],[74.2,65.2]],[[41.4,46.5],[74.2,65.2],[100,70.2],[100,100],[15.0,100],[15.3,72.3]],[[41.4,46.5],[15.3,72.3],[15.0,100],[0,100],[0,0],[36.0,0],[48.7,28.9]]],"l":[[[41.4,46.5],[48.7,28.9],[36.0,0]],[[41.4,46.5],[74.2,65.2],[100,70.2]],[[41.4,46.5],[15.3,72.3],[15.0,100]]],"a":[0.349,0.334,0.317]},{"z":[[[47.9,58.3],[34.7,77.7],[44.6,100],[0,100],[0,0],[3.0,0],[32.5,25.3]],[[47.9,58.3],[32.5,25.3],[3.0,0],[100,0],[100,30.1],[67.8,39.1]],[[47.9,58.3],[67.8,39.1],[100,30.1],[100,100],[44.6,100],[34.7,77.7]]],"l":[[[47.9,58.3],[34.7,77.7],[44.6,100]],[[47.9,58.3],[32.5,25.3],[3.0,0]],[[47.9,58.3],[67.8,39.1],[100,30.1]]],"a":[0.346,0.31,0.344]}];
if(typeof module!=="undefined")module.exports=DECOUPES;
const CADRAGES={BOX:{"1":[26.4,14.8,52.2,59.2],"2":[31.9,6.1,16.2,21.3],"3":[46.6,5.2,37.7,49.4],"4":[19.6,0,61.1,74.3],"5":[36.8,0,46.2,60.0],"6":[42.2,20.2,14.5,19.0],"7":[21.8,0,56.4,68.9],"8":[20.4,0,67.1,78.4],"9":[39.6,0,20.9,35.6],"10":[1.7,3.6,81.6,96.4],"11":[34.9,5.7,16.2,26.0],"12":[31.1,20.3,27.8,42.6],"13":[29.0,10.1,13.9,21.3],"14":[25.6,2.5,54.3,70.9],"15":[27.2,10.3,40.6,53.3],"16":[26.9,7.8,30.2,47.4],"17":[7.6,31.4,63.8,41.4],"18":[31.6,0,33.0,35.8],"19":[18.0,3.0,63.1,82.4],"20":[27.4,1.2,32.1,42.0],"21":[31.5,9.1,22.0,33.2],"22":[43.4,1.7,23.2,37.9],"23":[39.6,20.2,29.5,38.7],"24":[36.8,2.4,46.4,29.6],"25":[0,7.6,48.3,70.3],"26":[32.5,0,22.3,28.3],"27":[34.5,1.8,33.0,43.1],"28":[38.0,21.9,29.0,35.5],"29":[38.8,0,17.4,29.0],"30":[28,8,50,60],"32":[10,8,70,50],"33":[20,15,60,60],"35":[45,10,40,55],"37":[25.4,32.8,23.2,59.2],"38":[24.8,0,46.4,62.5],"42":[48,10,45,65],"43":[30,10,40,45],"47":[20.6,30.8,63.8,47.4],"51":[31.8,15.3,46.4,53.3],"57":[17.6,35.8,34.8,47.4],"58":[25,10,50,55],"65":[30,20,40,45],"71":[25,20,50,55],"75":[30,15,45,50],"79":[10,35,35,45],"80":[22,5,55,75],"81":[20,15,55,40],"82":[20,25,55,35],"84":[42,10,24,70],"86":[26.8,30.8,46.4,47.4],"87":[26.4,35.3,23.2,53.3],"88":[15,30,60,45],"89":[26.6,2.8,48.7,59.2],"90":[25,35,50,45],"95":[21.4,35.8,52.2,47.4],"97":[27.0,10.1,15.1,21.3],"98":[15,20,50,45],"99":[33,12,31,32],"100":[20,25,60,45],"101":[32.6,36.4,34.8,41.4],"102":[15,55,60,40],"103":[17.2,19.6,26.7,39.1],"104":[4,25,32,55],"105":[30,42,40,22],"106":[27.0,52.7,44.1,37.9],"107":[21.7,7.5,62.6,28.4],"108":[55,5,40,60],"109":[22,22,58,50],"110":[18.2,29.2,55.7,54.5],"111":[21.4,2.6,23.2,61.6],"112":[24,18,50,50],"113":[25,25,35,40],"115":[10.4,4.8,52.2,59.2],"117":[16,44,18,38],"120":[5.6,21.4,34.8,41.4],"121":[25,5,50,65],"122":[26.8,25.8,46.4,47.4],"123":[30,20,40,50],"124":[21.8,0,46.4,50.6],"126":[20,20,30,30],"128":[0,0,54.0,54.0],"129":[26.8,25.8,46.4,47.4],"130":[1.2,1.8,25.5,71.0],"131":[26.8,2.8,46.4,59.2],"132":[24.6,23.3,48.7,53.3],"133":[26.4,15.3,52.2,53.3],"134":[24.4,15.3,52.2,53.3],"135":[48.2,6.8,25.5,59.2],"136":[14.4,20.8,52.2,47.4],"137":[21.0,34.8,58.0,59.2],"138":[38.4,0,23.2,69.8],"139":[18.0,0.7,58.0,82.9],"140":[21.0,0.8,58.0,47.4],"141":[36.4,12.3,52.2,65.1],"142":[22.6,22.8,48.7,59.2],"143":[0,18.8,43.2,71.0],"144":[25,10,50,40],"145":[40,48,58,45],"146":[0,5,45,55],"147":[15,25,75,55],"148":[10,35,80,60],"149":[38,8,30,60],"150":[5,58,60,32],"151":[25,5,40,80],"152":[8,45,45,40],"153":[10,5,55,80],"154":[25,20,15,20],"155":[15,35,80,60],"156":[42,8,35,70],"157":[30,10,50,80],"159":[0,15,50,50],"160":[30,30,45,45],"161":[0,40,30,45],"162":[20,0,55,70],"163":[35,20,35,60],"164":[40,5,40,70],"165":[35,20,45,65],"166":[40,15,20,25],"167":[35,5,35,55],"168":[55,0,35,45],"169":[20,5,60,60],"170":[18,10,40,80],"171":[25,30,40,50],"172":[30,40,40,50],"173":[25,15,45,60],"174":[40,15,60,50],"175":[33,20,38,58],"176":[5,62,45,38],"177":[20,10,60,80],"179":[26.8,19.3,46.4,65.1],"180":[40,15,50,40],"185":[22,8,50,55],"186":[33,5,32,40],"188":[10,50,80,45],"189":[18,25,55,55],"190":[22,35,58,45],"191":[6,44,26,22],"192":[30,2,30,85],"193":[10,38,34,44],"194":[40,5,50,75],"196":[9,26,55,42],"197":[24.6,18.6,48.7,61.6],"200":[25,20,40,50]},FOND:{"196":"#07070a"},ASPECTS:[0.45,0.65,0.9,1.25,1.75,2.5],RECTS:[[[[40,20,17.9,39.7],[42,20,25.5,39.3],[46,20,34.8,38.6],[46,18,44.7,35.7],[48,16,55.8,31.9],[52,16,70.5,28.2]],[[84,67,28.2,62.7],[82,67,36.0,55.4],[78,77,41.4,46.0],[76,81,45.8,36.6],[74,85,49.3,28.2],[72,89,53.9,21.6]],[[14,68,26.4,58.6],[16,66,32.0,49.2],[20,62,38.6,42.9],[24,58,44.2,35.3],[24,56,48.0,27.4],[26,52,52.0,20.8]]],[[[36,75,22.3,49.6],[36,75,31.2,48.0],[30,77,41.4,46.0],[32,77,55.2,44.2],[32,81,64.0,36.6],[36,85,68.4,27.4]],[[12,26,21.8,48.5],[16,24,31.2,48.0],[22,24,43.2,48.0],[30,24,60.0,48.0],[32,20,64.0,36.6],[34,20,66.3,26.5]],[[86,58,28.0,62.2],[86,48,28.0,43.1],[84,50,31.4,34.9],[84,48,32.0,25.6],[82,52,34.9,19.9],[82,50,36.0,14.4]]],[[[16,36,31.7,70.5],[20,32,40.0,61.6],[22,38,40.4,44.9],[22,42,42.3,33.8],[24,44,45.0,25.7],[24,42,48.0,19.2]],[[86,28,24.3,53.9],[84,26,32.0,49.2],[78,22,39.6,44.0],[76,20,45.5,36.4],[74,16,52.0,29.7],[72,12,56.0,22.4]],[[60,77,20.7,46.0],[60,79,27.3,42.0],[62,79,35.3,39.2],[62,81,42.9,34.3],[60,85,51.6,29.5],[58,87,63.9,25.5]]],[[[83,32,28.8,64.0],[81,30,38.0,58.5],[75,26,46.7,51.8],[75,20,48.8,39.0],[75,36,49.3,28.2],[73,38,50.7,20.3]],[[43,76,20.5,45.5],[43,78,27.1,41.7],[45,80,34.4,38.2],[47,82,44.2,35.4],[51,84,56.0,32.0],[59,84,72.0,28.8]],[[14,30,26.8,59.5],[18,26,32.6,50.2],[20,22,39.6,44.0],[22,18,44.0,35.2],[24,14,47.5,27.1],[24,12,48.0,19.2]]],[[[87,26,23.1,51.4],[59,24,31.2,48.0],[65,24,43.2,48.0],[71,24,58.0,46.4],[71,22,57.8,33.0],[71,36,57.8,23.1]],[[65,75,20.8,46.1],[67,77,29.9,46.0],[69,77,38.7,43.0],[69,79,52.5,42.0],[69,81,62.0,35.4],[65,85,69.8,27.9]],[[16,38,28.7,63.9],[18,38,34.3,52.8],[20,38,38.8,43.1],[20,34,40.0,32.0],[20,30,40.0,22.9],[20,26,40.0,16.0]]],[[[86,71,25.2,56.1],[84,75,32.0,49.2],[80,77,37.9,42.2],[76,81,45.9,36.7],[72,85,52.5,30.0],[70,87,60.0,24.0]],[[14,62,27.9,61.9],[16,58,32.0,49.2],[18,56,36.0,40.0],[22,54,40.1,32.1],[24,54,46.0,26.3],[26,54,50.5,20.2]],[[62,22,19.7,43.8],[60,20,26.0,40.0],[60,20,33.5,37.2],[58,18,42.1,33.7],[60,16,55.9,31.9],[62,14,70.0,28.0]]],[[[61,80,18.0,40.0],[65,80,26.0,40.0],[71,80,36.0,40.0],[71,80,47.9,38.3],[69,82,62.0,35.4],[61,86,70.0,28.0]],[[16,34,30.6,68.0],[18,32,36.0,55.4],[20,36,40.0,44.5],[20,30,40.0,32.0],[20,26,40.0,22.9],[22,28,40.7,16.3]],[[58,28,25.2,56.0],[62,28,36.4,56.0],[70,28,50.4,56.0],[72,24,56.0,44.8],[72,16,56.0,32.0],[72,12,56.0,22.4]]],[[[24,71,25.0,55.5],[24,73,33.5,51.6],[24,75,42.6,47.3],[26,79,52.0,41.6],[30,83,59.5,34.0],[32,87,64.0,25.6]],[[28,22,18.0,40.1],[14,20,26.0,40.0],[18,20,36.0,40.0],[24,20,48.0,38.4],[32,18,61.5,35.1],[36,14,70.0,28.0]],[[84,62,28.1,62.6],[84,58,32.0,49.2],[82,56,34.7,38.5],[80,52,36.3,29.0],[78,50,42.1,24.0],[76,48,47.8,19.1]]],[[[85,44,28.6,63.5],[83,38,30.6,47.1],[83,36,34.0,37.8],[81,36,38.0,30.4],[81,32,38.0,21.7],[79,30,38.3,15.3]],[[48,76,21.6,48.0],[44,76,29.7,45.7],[20,78,39.6,44.0],[28,78,55.0,44.0],[32,72,62.5,35.7],[32,68,64.0,25.6]],[[28,26,23.0,51.2],[30,26,32.0,49.3],[30,24,43.2,48.0],[28,22,55.0,44.0],[30,26,58.6,33.5],[30,20,58.4,23.4]]],[[[83,34,30.6,68.0],[79,30,39.0,60.0],[79,24,42.0,46.7],[79,18,42.0,33.6],[79,12,42.0,24.0],[77,46,45.5,18.2]],[[44,77,19.4,43.2],[42,79,27.3,42.0],[40,79,34.6,38.5],[40,81,43.7,34.9],[40,85,52.5,30.0],[42,87,61.0,24.4]],[[14,30,25.4,56.5],[18,28,35.0,53.9],[24,26,44.8,49.8],[26,22,51.8,41.4],[28,18,55.1,31.5],[28,18,56.0,22.4]]],[[[37,22,19.8,44.0],[39,22,27.4,42.1],[41,20,36.0,40.0],[43,20,46.1,36.9],[45,18,59.3,33.9],[49,14,70.0,28.0]],[[85,67,26.3,58.5],[83,65,34.0,52.3],[79,63,39.3,43.7],[77,63,46.0,36.8],[73,61,51.9,29.6],[73,59,54.0,21.6]],[[14,72,25.1,55.9],[16,74,32.0,49.2],[20,78,36.7,40.7],[22,82,40.4,32.3],[22,84,44.0,25.2],[26,90,50.0,20.0]]],[[[56,24,21.3,47.3],[56,22,27.7,42.6],[56,20,34.1,37.9],[56,18,40.9,32.8],[60,16,54.9,31.4],[64,14,70.0,28.0]],[[86,69,26.6,59.1],[82,75,32.5,50.0],[80,77,38.5,42.8],[76,81,44.9,36.0],[72,83,52.6,30.1],[68,87,64.0,25.6]],[[16,66,29.8,66.1],[16,58,32.0,49.2],[18,56,35.0,38.8],[20,56,38.4,30.7],[22,58,41.5,23.7],[24,58,44.8,17.9]]],[[[87,26,22.7,50.5],[55,24,31.2,48.0],[61,24,43.2,48.0],[69,24,60.0,48.0],[69,18,60.2,34.4],[69,14,62.0,24.8]],[[57,76,21.6,48.0],[61,76,31.2,48.0],[61,76,41.5,46.1],[63,78,55.0,44.0],[65,80,67.3,38.4],[63,82,70.3,28.1]],[[14,38,26.8,59.6],[16,38,30.0,46.2],[16,36,32.0,35.6],[18,38,34.9,27.9],[18,36,36.0,20.6],[18,32,36.0,14.4]]],[[[72,32,28.8,64.0],[78,32,41.6,64.0],[76,34,46.7,51.8],[76,30,48.0,38.4],[74,34,48.7,27.8],[74,34,50.6,20.2]],[[48,81,15.4,34.2],[28,83,22.1,34.0],[32,83,30.6,34.0],[38,83,42.5,34.0],[46,83,57.9,33.1],[48,85,74.4,29.8]],[[16,32,28.8,64.0],[22,32,41.4,63.6],[24,26,44.6,49.5],[24,18,44.6,35.7],[24,14,47.0,26.9],[24,10,48.0,19.2]]],[[[24,79,18.9,42.0],[28,79,26.8,41.3],[28,79,35.5,39.5],[26,81,47.5,38.0],[30,81,60.0,34.3],[34,85,65.7,26.3]],[[14,28,24.6,54.6],[18,28,35.5,54.6],[26,28,49.1,54.6],[28,32,53.7,43.0],[30,38,57.0,32.6],[30,40,60.0,24.0]],[[83,36,32.3,71.7],[81,28,35.2,54.1],[81,22,35.2,39.1],[81,16,38.0,30.4],[79,12,39.9,22.8],[79,10,42.0,16.8]]],[[[46,76,21.3,47.4],[40,78,28.6,44.0],[42,78,36.6,40.7],[42,82,45.0,36.0],[40,84,52.4,29.9],[42,86,62.0,24.8]],[[14,28,24.4,54.3],[18,26,33.8,52.0],[22,24,43.2,48.0],[24,24,48.0,38.4],[26,30,52.0,29.7],[28,30,52.4,21.0]],[[84,34,30.6,68.0],[80,30,37.2,57.2],[78,26,43.8,48.6],[78,18,44.0,35.2],[78,14,44.0,25.2],[76,10,44.1,17.7]]],[[[85,30,27.0,60.0],[81,28,36.4,56.0],[77,28,43.2,48.0],[77,32,45.2,36.2],[77,32,46.0,26.3],[77,28,46.0,18.4]],[[44,77,20.7,46.0],[48,77,27.5,42.3],[50,79,35.9,39.9],[52,81,44.7,35.8],[56,83,54.7,31.2],[54,87,64.8,25.9]],[[14,32,28.0,62.2],[18,26,32.7,50.3],[20,22,37.0,41.1],[24,18,45.0,36.0],[26,16,52.0,29.7],[26,12,52.0,20.8]]],[[[16,68,28.8,64.0],[20,70,38.8,59.7],[24,70,44.0,48.9],[24,70,44.0,35.2],[24,86,44.2,25.3],[26,90,50.0,20.0]],[[48,20,17.6,39.2],[48,20,23.9,36.8],[48,18,32.4,36.0],[50,18,41.1,32.9],[30,16,56.0,32.0],[38,16,76.0,30.4]],[[84,67,28.9,64.3],[82,65,36.0,55.4],[78,63,41.8,46.5],[76,61,48.0,38.4],[74,59,52.0,29.7],[74,55,52.0,20.8]]],[[[16,60,28.4,63.0],[18,62,32.6,50.1],[18,60,36.0,40.0],[20,62,39.7,31.8],[20,58,40.0,22.9],[22,58,40.5,16.2]],[[54,24,21.6,48.0],[58,24,30.4,46.8],[62,24,40.8,45.4],[70,24,56.7,45.4],[68,20,64.0,36.6],[64,14,68.4,27.4]],[[73,74,21.7,48.3],[69,76,31.2,48.0],[69,76,41.2,45.8],[71,78,52.0,41.6],[71,82,57.3,32.8],[71,80,58.0,23.2]]],[[[40,80,18.0,40.0],[44,80,26.0,40.0],[48,80,36.0,40.0],[48,80,46.9,37.5],[48,82,59.2,33.8],[50,84,70.9,28.4]],[[14,30,27.0,60.0],[20,30,37.7,58.0],[26,28,49.3,54.8],[26,32,49.5,39.6],[26,16,49.4,28.3],[26,10,49.9,20.0]],[[84,30,27.0,60.0],[80,28,36.1,55.6],[78,24,41.7,46.4],[76,20,47.1,37.7],[76,14,48.0,27.4],[76,10,48.0,19.2]]],[[[85,36,27.0,60.0],[83,36,33.2,51.0],[81,34,38.0,42.2],[79,32,42.0,33.6],[77,32,46.0,26.3],[75,34,47.7,19.1]],[[48,77,20.7,46.0],[48,79,27.3,42.0],[46,81,34.2,38.0],[46,81,42.6,34.1],[44,85,52.5,30.0],[44,87,65.0,26.0]],[[14,30,27.0,60.0],[18,28,34.7,53.3],[20,24,40.0,44.5],[22,18,44.0,35.2],[24,14,48.0,27.4],[26,12,52.0,20.8]]],[[[14,67,26.9,59.8],[18,67,33.5,51.6],[20,67,40.0,44.5],[24,67,45.4,36.3],[24,65,48.0,27.4],[26,63,51.1,20.4]],[[56,24,21.4,47.6],[54,22,28.6,44.0],[56,22,37.0,41.2],[56,20,46.8,37.4],[54,18,56.1,32.0],[52,14,67.3,26.9]],[[86,72,25.2,56.0],[82,74,32.0,49.3],[80,76,39.6,44.0],[78,80,44.0,35.2],[76,86,48.0,27.4],[74,90,49.7,19.9]]],[[[86,30,27.0,60.0],[82,28,34.8,53.6],[78,24,43.1,47.9],[74,20,49.1,39.3],[72,16,53.1,30.3],[70,12,56.5,22.6]],[[54,77,20.3,45.1],[54,79,26.5,40.8],[56,81,34.2,38.0],[60,81,44.5,35.6],[64,83,58.1,33.2],[64,85,71.1,28.4]],[[16,34,30.6,68.0],[20,30,39.0,60.0],[20,24,40.0,44.5],[22,40,40.1,32.1],[22,40,43.5,24.8],[24,42,44.4,17.7]]],[[[50,78,19.7,43.7],[48,78,26.9,41.4],[44,80,36.0,40.0],[44,82,45.0,36.0],[46,84,56.0,32.0],[46,86,67.8,27.1]],[[14,30,26.0,57.8],[20,28,36.4,56.0],[24,28,47.7,53.0],[24,20,48.0,38.4],[26,16,49.0,28.0],[26,12,52.0,20.8]],[[85,32,28.6,63.5],[81,30,35.8,55.1],[79,32,39.5,43.9],[79,30,42.0,33.6],[77,34,44.6,25.5],[77,32,46.0,18.4]]],[[[14,72,24.4,54.1],[18,74,32.5,50.0],[22,76,41.1,45.7],[24,78,48.0,38.4],[26,84,52.0,29.7],[28,88,55.8,22.3]],[[44,24,21.6,48.0],[40,22,28.6,44.0],[42,22,37.4,41.5],[28,22,51.7,41.4],[32,20,64.0,36.6],[38,16,72.2,28.9]],[[86,62,26.4,58.8],[84,62,32.0,49.2],[80,64,37.4,41.5],[78,64,41.1,32.9],[78,60,44.0,25.2],[76,60,46.5,18.6]]],[[[16,65,31.5,70.0],[18,69,36.0,55.4],[18,61,36.0,40.0],[20,63,38.0,30.4],[20,61,40.0,22.9],[20,59,40.0,16.0]],[[50,24,20.1,44.7],[52,22,26.4,40.7],[52,20,33.0,36.7],[54,18,40.5,32.4],[60,16,51.6,29.5],[62,14,66.9,26.8]],[[86,69,27.9,62.0],[82,71,36.0,55.4],[78,75,44.0,48.9],[74,77,51.2,41.0],[72,75,56.0,32.0],[70,79,56.6,22.7]]],[[[12,76,20.9,46.4],[16,78,28.6,44.0],[20,78,39.6,44.0],[28,78,55.0,44.0],[34,80,67.7,38.7],[38,84,75.5,30.2]],[[32,26,23.4,52.0],[36,26,33.7,51.9],[34,26,44.4,49.4],[28,24,56.0,44.8],[30,18,56.5,32.3],[30,12,57.1,22.8]],[[85,34,27.1,60.3],[83,34,33.0,50.7],[81,34,37.9,42.1],[79,34,40.6,32.5],[79,38,41.0,23.5],[79,42,41.5,16.6]]],[[[14,68,28.0,62.2],[20,70,38.9,59.8],[22,66,44.0,48.9],[22,60,44.0,35.2],[22,56,44.0,25.2],[22,52,44.0,17.6]],[[46,20,17.5,38.8],[46,20,24.0,36.9],[44,18,32.4,36.0],[48,18,43.8,35.1],[50,18,57.0,32.6],[60,16,80.0,32.0]],[[70,70,27.0,60.0],[76,72,36.0,55.4],[78,74,44.0,48.9],[74,68,50.0,40.0],[74,64,52.0,29.7],[72,72,52.7,21.1]]],[[[86,32,28.0,62.2],[80,30,36.5,56.2],[76,26,46.8,52.0],[74,22,51.2,41.0],[74,16,51.2,29.3],[72,12,52.2,20.9]],[[43,78,19.8,44.0],[45,78,27.7,42.7],[47,80,36.0,40.0],[47,82,45.0,36.0],[49,84,56.0,32.0],[57,84,74.5,29.8]],[[14,30,27.0,60.0],[18,26,33.8,52.0],[20,28,37.8,42.0],[20,26,40.0,32.0],[22,30,42.4,24.2],[22,28,44.0,17.6]]],[[[16,62,32.0,71.1],[18,58,34.0,52.3],[18,54,36.0,40.0],[20,56,38.1,30.5],[20,54,40.0,22.9],[22,56,41.8,16.7]],[[53,22,19.7,43.7],[53,20,26.0,40.0],[55,20,32.6,36.2],[59,18,43.5,34.8],[65,16,56.0,32.0],[67,14,66.0,26.4]],[[86,68,27.1,60.3],[82,72,36.0,55.4],[78,76,43.2,48.0],[74,78,50.9,40.7],[72,82,56.0,32.0],[70,80,57.9,23.2]]]]};
if(typeof module!=="undefined")module.exports=CADRAGES;
const TrioFusion=(()=>{
const PICK=["P","E","O"],SEAT=["E","P","O"];
const RO={X:0,L:1,E:2,R:3,U:4,C:5};
const hash=s=>{let x=2166136261;for(const ch of String(s)){x^=ch.codePointAt(0);x=Math.imul(x,16777619);}return x>>>0;};
const PERMS=[[0,1,2],[0,2,1],[1,0,2],[1,2,0],[2,0,1],[2,1,0]];
const cards=sel=>PICK.filter(t=>sel[t]).map(t=>sel[t]);
const keyOf=sel=>PICK.map(t=>(sel[t]?sel[t].i:0)).join("-");
const fondOf=c=>(c&&CADRAGES.FOND&&CADRAGES.FOND[c.i])||null;
const boxOf=(t,c)=>(c&&c.img?(t!=="E"?CADRAGES.BOX[c.i]||(t==="P"?[28,8,44,52]:[20,15,60,65]):CADRAGES.BOX[c.i]||null):null);
function room(li,zi,b){
let best=null;
CADRAGES.RECTS[li][zi].forEach(r=>{const f=Math.min(r[2]/b[2],r[3]/b[3]);if(!best||f>best[1])best=[r,f];});
return best;
}
const FLAT=new Map();
function flat(li,zi){
const k=li*3+zi;let f=FLAT.get(k);
if(!f){const z=DECOUPES[li].z[zi];f={xs:Float64Array.from(z,p=>p[0]),ys:Float64Array.from(z,p=>p[1]),n:z.length,
x0:Math.min(...z.map(p=>p[0])),x1:Math.max(...z.map(p=>p[0])),y0:Math.min(...z.map(p=>p[1])),y1:Math.max(...z.map(p=>p[1]))};FLAT.set(k,f);}
return f;
}
function inside(x,y,f){
const xs=f.xs,ys=f.ys,n=f.n;let c=false;
for(let i=0,j=n-1;i<n;j=i++){
const yi=ys[i],yj=ys[j];
if((yi>y)!==(yj>y)&&x<(xs[j]-xs[i])*(y-yi)/(yj-yi)+xs[i])c=!c;
}
return c;
}
function visible(b,s,ox,oy,f){
const x0=ox+s*(b[0]+b[2]*.02),y0=oy+s*(b[1]+b[3]*.02),w=s*b[2]*.96,h=s*b[3]*.96;
let n=0;
for(let i=0;i<=4;i++){const x=x0+w*i/4;for(let j=0;j<=4;j++)if(inside(x,y0+h*j/4,f))n++;}
return n/25;
}
const SCALES=[1,.9,.8,.7,.6,.5];
function placeFor(b,f,r,fine,fond){
const zx0=f.x0,zx1=f.x1,zy0=f.y0,zy1=f.y1;
const sMin=fond?0.55:Math.min(1,Math.max(zx1-zx0,zy1-zy0)/100);
const rcx=r?r[0][0]:(zx0+zx1)/2,rcy=r?r[0][1]:(zy0+zy1)/2;
const clamp=(lo,hi,v)=>Math.min(hi,Math.max(lo,v));
let bs=0,bx=0,by=0,bv=-1,bd=0;
for(let si=0;si<=SCALES.length;si++){
const s=si<SCALES.length?SCALES[si]:sMin;
if(si<SCALES.length&&s<=sMin)continue;
const loX=fond?Math.min(zx1-100*s,zx0):zx1-100*s,hiX=fond?Math.max(zx0,zx1-100*s):zx0;
const loY=fond?Math.min(zy1-100*s,zy0):zy1-100*s,hiY=fond?Math.max(zy0,zy1-100*s):zy0;
const wx=clamp(loX,hiX,rcx-s*(b[0]+b[2]/2)),wy=clamp(loY,hiY,rcy-s*(b[1]+b[3]/2));
const G=fine?4:0;
for(let i=-1;i<=G;i++)for(let j=-1;j<=G;j++){
if((i<0)!==(j<0))continue;
const ox=i<0?wx:loX+(hiX-loX)*i/4,oy=j<0?wy:loY+(hiY-loY)*j/4;
const v=visible(b,s,ox,oy,f),d=Math.hypot(ox-wx,oy-wy);
if(v>bv+1e-6||(Math.abs(v-bv)<=1e-6&&(s>bs+1e-6||(Math.abs(s-bs)<=1e-6&&d<bd)))){bs=s;bx=ox;by=oy;bv=v;bd=d;}
}
}
return{s:bs,ox:bx,oy:by,v:bv};
}
function plan(sel){
const key=keyOf(sel),cand=[];
const score=(li,pm,fine)=>{
let q=0;const fit={};
PICK.forEach((t,k)=>{const b=boxOf(t,sel[t]);if(!b)return;
const p=placeFor(b,flat(li,pm[k]),room(li,pm[k],b),fine,fondOf(sel[t]));fit[t]=p;q+=(p.v+.08*p.s)*(t==="P"?1.2:1);});
return{li,pm,q,fit};
};
const quick=[];
CADRAGES.RECTS.forEach((_,li)=>PERMS.forEach(pm=>{let q=0;
PICK.forEach((t,k)=>{const b=boxOf(t,sel[t]);if(b)q+=Math.min(1,room(li,pm[k],b)[1])*(t==="P"?1.2:1);});
quick.push({li,pm,q});}));
quick.sort((a,b)=>b.q-a.q);
quick.slice(0,36).forEach(c=>cand.push(score(c.li,c.pm,false)));
cand.sort((a,b)=>b.q-a.q);
const finals=cand.slice(0,10).map(c=>score(c.li,c.pm,true));
const top=Math.max(...finals.map(c=>c.q)),ok=finals.filter(c=>c.q>=top-0.04);
return ok[hash(key)%ok.length];
}
const url=u=>String(u).replace(/'/g,"%27");
const DUOS=[[60,40],[40,60],[56,44],[44,56],[62,46],[38,54]];
function art2(sel){
const ts=PICK.filter(t=>sel[t]),key=keyOf(sel),h=hash(key);
const[a,b]=DUOS[h%DUOS.length],order=(h>>3)&1?ts:ts.slice().reverse();
const polys=[[[0,0],[a,0],[b,100],[0,100]],[[a,0],[100,0],[100,100],[b,100]]];
const zones=order.map((t,k)=>{
const c=sel[t],z=polys[k],poly=z.map(([x,y])=>`${x}% ${y}%`).join(",");
if(!c.img){const cx=z.reduce((s,p)=>s+p[0],0)/4;return`<i class="cens" style="clip-path:polygon(${poly})"></i><span class="cn" style="left:${cx.toFixed(1)}%;top:50%">CENSURÉ</span>`;}
const bx=boxOf(t,c);
if(!bx)return`<i style="clip-path:polygon(${poly})"><b style="background-image:url('${url(c.img)}')"></b></i>`;
const f={xs:Float64Array.from(z,p=>p[0]),ys:Float64Array.from(z,p=>p[1]),n:4,
x0:Math.min(...z.map(p=>p[0])),x1:Math.max(...z.map(p=>p[0])),y0:0,y1:100};
const r=[[(f.x0+f.x1)/2,50]],fd=fondOf(c),p=placeFor(bx,f,r,true,fd);
return`<i style="clip-path:polygon(${poly})${fd?`;background:${fd}`:""}"><b style="left:${p.ox.toFixed(2)}%;top:${p.oy.toFixed(2)}%;width:${(100*p.s).toFixed(2)}%;height:${(100*p.s).toFixed(2)}%;background-image:url('${url(c.img)}')"></b></i>`;
}).join("");
return`<div class="patch">${zones}<svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><polyline points="${a},0 ${b},100"/></svg></div>`;
}
function art(sel){
if(PICK.filter(t=>sel[t]).length===2)return art2(sel);
const P=plan(sel),D=DECOUPES[P.li];
const zones=PICK.map((t,k)=>{
const c=sel[t],z=D.z[P.pm[k]],poly=z.map(([x,y])=>`${x}% ${y}%`).join(",");
if(!c)return`<i class="cens" style="clip-path:polygon(${poly})"></i>`;
const cx=z.reduce((s,p)=>s+p[0],0)/z.length,cy=z.reduce((s,p)=>s+p[1],0)/z.length;
if(!c.img)return`<i class="cens" style="clip-path:polygon(${poly})"></i><span class="cn" style="left:${cx.toFixed(1)}%;top:${cy.toFixed(1)}%">CENSURÉ</span>`;
const p=P.fit[t];
if(!p)return`<i style="clip-path:polygon(${poly})"><b style="background-image:url('${url(c.img)}')"></b></i>`;
const fd=fondOf(c);
return`<i style="clip-path:polygon(${poly})${fd?`;background:${fd}`:""}"><b style="left:${p.ox.toFixed(2)}%;top:${p.oy.toFixed(2)}%;width:${(100*p.s).toFixed(2)}%;height:${(100*p.s).toFixed(2)}%;background-image:url('${url(c.img)}')"></b></i>`;
}).join("");
return`<div class="patch">${zones}<svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">${D.l.map(l=>`<polyline points="${l.map(p=>p.join(",")).join(" ")}"/>`).join("")}</svg></div>`;
}
function victimes(cs){
const best=new Map();
cs.forEach(c=>{const g=TRIO.groupeDe(c.i),k=g<0?"c"+c.i:"g"+g;best.set(k,Math.max(best.get(k)||0,c.d));});
return[...best.values()].reduce((s,v)=>s+v,0);
}
const CACHE=new Map();
function make(sel){
const key=keyOf(sel);
if(CACHE.has(key))return CACHE.get(key);
const cs=cards(sel),best=cs.slice().sort((a,b)=>RO[a.r]-RO[b.r])[0];
const dd=cs.filter(c=>c.d!=null),cols=SEAT.map(t=>(sel[t]?TRIO.color(sel[t].i,sel[t].c):"#2b2433"));
const f={
fu:{art:art(sel),key,ids:PICK.map(t=>(sel[t]?sel[t].i:null)),cols},
n:trioPhrase(sel),c:(sel.P||cs[0]).c,r:best.r,cat:`Fusion · ${cs.length} carte${cs.length>1?"s":""}`,
d:dd.length?victimes(dd):null,gt:cs.some(c=>c.gt),a:cs.some(c=>c.a),u:"victimes cumulées",
m:cs.reduce((s,c)=>s+c.m,0),p:cs.reduce((s,c)=>s+c.p,0),mx:1000*cs.length,
t:trioReplique(sel),q:trioClash(sel),ft:"Fusion. Victimes : estimations additionnées, sans compter deux fois les mêmes morts. Le reste : arbitraire.",
ai:cs.some(c=>c.ai),ill:cs.some(c=>c.ill),crs:[...new Set(cs.map(c=>c.cr).filter(Boolean))],
i:0,srcName:null,bg:`linear-gradient(150deg,${cols.join(",")})`,col:cols[1]
};
CACHE.set(key,f);
return f;
}
function fromIds(ids,all){
const sel={P:null,E:null,O:null};
ids.forEach(no=>{const c=all[no-1];if(c)sel[TRIO.of(no)]=c;});
return sel;
}
return{PICK,SEAT,make,fromIds,keyOf,plan,boxOf};
})();
if(typeof module!=="undefined")module.exports=TrioFusion;
