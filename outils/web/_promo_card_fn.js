// 13 octobre 2026 : numéro AFFICHÉ (l'identifiant interne ne change pas, les comptes non plus) :
// Gilles de Rais (208) s'affiche n° 1, Hitler (1) n° 201, la mémorielle du 11 septembre (201) passe en dernier.
const numAff = no => no === 208 ? 1 : no === 1 ? 201 : no === 201 ? 208 : no;
if (typeof window !== "undefined") window.numAff = numAff;
const COLORS={dic:"#8c1c2a",tue:"#3d3d47",att:"#c2410c",gue:"#5b6b2e",nat:"#0f766e",ind:"#a16207",pol:"#1e3a8a",ent:"#15803d",sci:"#6d28d9",sec:"#9d174d",jeu:"#0369a1",oeu:"#7c2d12",web:"#db2777",abs:"#ca8a04",cul:"#be185d",com:"#4d7c0f",ord:"#475569"};
const RN={X:"Irrécupérable",L:"Abominable",E:"Infâme",R:"Notoire",U:"Minable",C:"Nullos"};
const RN_ORD={X:"Fléau majeur",L:"Fléau",E:"Redoutée",R:"Récurrente",U:"Trop fréquente",C:"Monnaie courante"};   // 7 octobre : « tristement commune », sans gloire ni mépris   // Tragédies ordinaires (6 octobre, soir) : « L'immigration — Nullos » ou « Minable » serait un slogan, pas une rareté
const rname=c=>c.mem||c.nf?"Mémorielle":c.c==="ord"?RN_ORD[c.r]:RN[c.r];   // nf : mémorielle (attentats, génocides) : se collectionne, ne se joue pas   // raretés : une échelle de disgrâce (6 octobre 2026), rien à glorifier
// 16 octobre 2026 (soir) : raretés dessinées par l'éditeur (art/icones/rare_*.webp)
const GEM={X:"✦✦✦✦",L:"★★★",E:"★★",R:"★",U:"◆",C:"●"},GEMI=r=>`<img class="gemI" src="art/icones/rare_${r}.webp" alt="${GEM[r]||""}">`;
const RO={X:0,L:1,E:2,R:3,U:4,C:5};
const IMM=[[200,"Saint","#5aa9e6"],[400,"Douteux","#8a9a4a"],[600,"Louche","#e08a1c"],[800,"Ignoble","#d1302a"],[950,"Démoniaque","#8b0d1a"],[1001,"Satanique","#1a0406"]];
const POL=[[200,"Tiède","#d9b44a"],[400,"Chaud","#f59e0b"],[600,"Brûlant","#f97316"],[800,"Incendiaire","#ef4444"],[950,"Volcanique","#b91c1c"],[1001,"Fusion","#7f1d1d"]];
const tier=(t,v)=>t.find(x=>v<x[0]);
// 16 octobre 2026 (soir) : le type de la carte (Personnage, Événement ou lieu, Objet), en petit logo à côté de la rareté
const TY_N={P:"Personnage",E:"Événement ou lieu",O:"Objet, animal ou outil"};
const tyDe=c=>{try{if(typeof TRIO!=="undefined"&&TRIO.of)return TRIO.of(c.i)||"";return (typeof PAPOLE_TYPES!=="undefined"?PAPOLE_TYPES:"")[c.i]||""}catch(e){return ""}};
const tyIco=c=>{if(c.fu||c.mem||c.nf)return "";const t=tyDe(c);return TY_N[t]?`<img class="tyI" src="art/types/${t}.webp" alt="${TY_N[t]}" title="${TY_N[t]}">`:""};
// 31 oct. 2026 (éditeur, 4e tour c9 c) : une carte retirée depuis l'admin (demande d'une personne concernée) s'affiche vide,
// sans nom, sans image, sans texte, chez tout le monde, dès que le téléphone a reçu la liste (api/me ou api/retraits)
window.PAPOLE_RETIREES=window.PAPOLE_RETIREES||new Set();
try{if(typeof window!=="undefined")addEventListener("papole-serveur",e=>{const r=e.detail&&e.detail.retirees;if(Array.isArray(r))window.PAPOLE_RETIREES=new Set(r)})}catch(e){}
function card(c){
  if(c&&!c.fu&&c.i!=null&&window.PAPOLE_RETIREES&&window.PAPOLE_RETIREES.has(c.i+1))return `<div class="slot"><article class="card pp1 retiree" data-no="${c.i+1}"><div class="face"><div class="hd"><h2 class="name">Carte retirée</h2></div><div class="art"><div class="censor"><b>CARTE RETIRÉE<small>à la demande d'une personne concernée</small></b></div></div><div class="txt"><p class="desc">Cette carte a été retirée du jeu. Elle ne se joue plus et ne se tire plus.</p></div><div class="ft"><span>Retirée à la demande d'une personne concernée.</span><b>${String(numAff(c.i)).padStart(3,"0")}</b></div></div></article></div>`;
  // 20 oct. 2026 : versions spéciales (lib/commun/speciaux.js) : la Coupure de presse a sa propre mise en page (même format, mêmes
  // textes) ; les autres habillent la carte officielle telle qu'elle est (c.sp : brillante, radio, conviction)
  // 21 oct. 2026 : plusieurs versions à la fois (« brillante+presse+conviction ») : la fusion du Tag-team garde les versions de ses
  // cartes, superposées. L'hologramme et le néon ne touchent que l'illustration et le bord (la photo, dans une coupure de
  // presse) ; la coupure de presse et le sachet se cumulent normalement.
  const SPL=c.sp&&!c.mem&&!c.nf&&typeof PapoleSpeciaux!=="undefined"?[...new Set(String(c.sp).split("+").filter(Boolean))]:[];
  const SPV=SPL.join("+"),SPH=k=>SPL.includes(k);
  if(SPH("presse"))return PapoleSpeciaux.presse(c,SPL);
  // carte fusionnée (Tag-team) : stats additionnées sur mx (3 000), image en patchwork ; une carte normale ne change pas
  const mx=c.mx||1000,sc=v=>v*1000/mx;
  const ti=tier(IMM,sc(c.m)), tp=tier(POL,sc(c.p));
  const vic=c.d==null?null:(c.gt?"> ":c.a?"≈ ":"")+fmt(c.d);
  const unit=(c.u||"")+(c.a&&!/estim|est\./.test(c.u||"")?(c.u?" · ":"")+"estimé":"");
  const AIB=`<span class="ai" title="Image générée par intelligence artificielle" aria-label="Image générée par intelligence artificielle"><i>✦</i>PAPOL<b>IA</b></span>`;
  // carte fusionnée : le patchwork garde le badge IA si une de ses images est générée (9 octobre 2026) ; les crédits vont sous le texte
  // mentions d'une fusion, en une pastille compacte sur l'image : « illustrations » + auteurs crédités (texte complet au survol)
  const fuNote=c.fu?[...(c.ill?["Illustrations sans rapport avec les œuvres"]:[]),...(c.crs||[]).map(x=>String(x).split(",")[0])]:[];
  const fuFull=c.fu?[...(c.ill?["Images d'illustration sans rapport avec les œuvres réelles"]:[]),...(c.crs||[])].join(" · "):"";
  const art=c.fu?c.fu.art+(c.ai?AIB:"")+(fuNote.length?`<span class="cr fucr" title="${esc(fuFull)}">${esc(fuNote.join(" · "))}</span>`:""):c.img
    ? `<img src="${c.img}"${/^art\/[^/]+\.webp$/.test(c.img)?` srcset="${c.img.replace(/^art\//,"art/s/")} 360w, ${c.img.replace(/^art\//,"art/m/")} 540w, ${c.img} 720w" sizes="(max-width:640px) 46vw, 260px"`:""} alt="${esc(c.n)}" loading="lazy">${c.cr?`<span class="cr">${esc(c.cr)}</span>`:""}${c.ai?AIB:""}`
    : `<div class="censor"><b>IMAGE CENSURÉE<small>par nous-mêmes</small></b></div>`;
  return `<div class="slot${SPH("conviction")?" spConv":""}">${SPH("conviction")?PapoleSpeciaux.sachet(c):""}<article class="card pp${1+((c.i||0)%3)}${c.fu?" fused":""}${typeof HOLOS!=="undefined"&&HOLOS.has(c.i)&&!SPV?" holoS":""}${c.nf||c.mem?" memo":""}${SPL.map(k=>" sp-"+k).join("")}" data-i="${c.i||""}" data-r="${c.mem?"M":c.r}"${SPV?` data-sp="${SPV}"`:""} style="--c:${c.col||COLORS[c.c]}${c.bg?`;background:${c.bg}`:""}">${SPH("radio")?`<i class="spF r" aria-hidden="true"></i>`:""}${SPH("brillante")?`<i class="spF b" aria-hidden="true"></i>`:""}
  <div class="face">
    <div class="hd"><h2 class="name">${esc(c.n)}</h2>${tyIco(c)}<span class="gem" title="${c.mem||c.nf?"Carte mémorielle":rname(c)}">${c.mem||c.nf?`<img class="gemI" src="art/icones/memorielle.webp" alt="🕯">`:GEMI(c.r)}</span></div>
    <div class="art">${art}${SPH("brillante")?`<i class="spA b" aria-hidden="true"></i>`:""}<span class="cat">${esc(c.cat||DATA.cats[c.c])}</span><span class="rn">${rname(c)}</span></div>
    ${c.mem?`<div class="stats mem"><p>Carte mémorielle. Elle ne se joue pas.<br>Pensées pour les victimes et leurs familles.</p></div>`:`    <div class="stats">
      <div class="box dead"><span class="lab"><img class="pi" src="art/icones/victimes.webp" alt=""> Victimes</span><b style="--len:${vic?vic.length:7}">${vic?esc(vic):`<span class="nc">Non chiffré</span>`}</b>${unit?`<small>${esc(unit)}</small>`:""}</div>
      <div class="box imm ${sc(c.m)>=950?"evil":""}" style="--t:${ti[2]}"><span class="lab"><img class="pi" src="art/icones/immoralite.webp" alt=""> Immoralité</span>
        <div class="gauge" title="Immoralité ${c.m} sur ${mx}"><div class="fill" style="width:${c.m*100/mx}%"></div><span><b>${c.m}</b>/${mx}</span></div><em>${ti[1]}</em></div>
      <div class="box pol ${sc(c.p)>=950?"hot":""}" style="--t:${tp[2]}" title="Polémique ${c.p} degrés sur ${mx}"><span class="lab"><img class="pi" src="art/icones/polemique.webp" alt=""> Polémique</span>
        <div class="therm"><div class="bulb">${c.p}°</div><div class="tube"><div class="merc" style="width:${c.p*100/mx}%"></div></div></div><em>${tp[1]}</em></div>
    </div>`}
    <div class="txt">${c.rn?`<p class="rnote">(${esc(c.rnt||"Nom modifié pour des raisons de droit. Les faits sont réels.")})</p>`:""}${c.nf?`<p class="rnote">(Carte mémorielle : elle ne se joue pas.)</p>`:""}<p class="desc">${esc(c.t)}</p><p class="quip">${/^«/.test(c.q)?esc(c.q):"« "+esc(c.q)+" »"}</p>${c.srcName&&!c.mem?`<p class="src">Source : ${c.src?`<a href="${esc(c.src)}" target="_blank" rel="noopener">${esc(c.srcName)}</a>`:esc(c.srcName)}</p>`:""}${c.ill&&!c.mem&&!c.fu?`<p class="ill">Image d'illustration sans rapport avec l'œuvre réelle.</p>`:""}</div>
    <div class="ft"><span>${esc(c.ft||"Victimes : estimations. Le reste : 100 % arbitraire. C'est de l'humour, pauvre tache.")}</span><b>${c.fu?"FUSION":c.mem?"MÉMORIELLE":String(numAff(c.i)).padStart(3,"0")+"/"+(typeof DATA!=="undefined"?DATA.cards.filter(x=>!x.mem).length:201)}</b></div>
  </div></article></div>`;
}
// Ajuste la taille du texte de chaque carte pour qu'il tienne. Tout est en cqw, donc le réglage ne dépend pas de la taille
// de la carte : on le mesure une fois par carte, hors écran, puis on le réutilise (rapide même avec 200 cartes affichées).
const FIT={};let FITBOX=null;
// 12 octobre 2026 (vieux téléphones) : les tailles calculées sont gardées dans le téléphone, par version du jeu et par page
// (même résultat à l'écran, mais plus de 10 à 16 s de calcul à chaque ouverture de la boutique ou du Papolédex)
const FITV=window.PAPOLE_FITV||window.PAPOLE_BUILD||"dev";   // 22 oct. 2026 : le dessin des cartes, pas toute la mise en ligne
