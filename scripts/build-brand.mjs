import fs from 'node:fs/promises';
import sharp from 'sharp';

// Preserve the approved outlined lettering; rebuild only the infinity geometry.
const badge = await fs.readFile('public/brand/hack-badge-static.svg', 'utf8');
const lettering = badge.match(/<g transform="translate\(0 25\)">([\s\S]*?)<\/g>/)[1];
const k = 44.18278;
const curves = [
  [[220,120],[260,80],[300,40],[340,40]],
  [[340,40],[340+k,40],[420,120-k],[420,120]],
  [[420,120],[420,120+k],[340+k,200],[340,200]],
  [[340,200],[300,200],[260,160],[220,120]],
  [[220,120],[180,80],[140,40],[100,40]],
  [[100,40],[100-k,40],[20,120-k],[20,120]],
  [[20,120],[20,120+k],[100-k,200],[100,200]],
  [[100,200],[140,200],[180,160],[220,120]],
];
const midpoint = (a,b) => a.map((v,i)=>(v+b[i])/2);
function split(c) {
  const a=midpoint(c[0],c[1]), b=midpoint(c[1],c[2]), d=midpoint(c[2],c[3]);
  const e=midpoint(a,b), f=midpoint(b,d), p=midpoint(e,f);
  return [[c[0],a,e,p],[p,f,d,c[3]]];
}
// Begin at the upper-right shoulder, keeping the static dot away from the crossing.
const [before,after] = split(curves[1]);
const ordered = [after,...curves.slice(2),curves[0],before];
const start=ordered[0][0];
const point=p=>p.map(v=>v.toFixed(5)).join(' ');
const path=`M${point(start)} `+ordered.map(c=>`C${c.slice(1).map(point).join(' ')}`).join(' ')+' Z';
const bezier=(c,t)=>[0,1].map(i=>(1-t)**3*c[0][i]+3*(1-t)**2*t*c[1][i]+3*(1-t)*t*t*c[2][i]+t**3*c[3][i]);
let length=0;
for (const c of ordered) {
  let prev=c[0];
  for (let i=1;i<=3000;i++) { const p=bezier(c,i/3000);length+=Math.hypot(p[0]-prev[0],p[1]-prev[1]);prev=p; }
}
function trail(animated) {
  return Array.from({length:64},(_,i)=>{
    const position=(.7+i*.00455)*length;
    const width=1.1+17.4*(i/63)**1.2, opacity=.18+.82*(i/63)**.6;
    return `<use href="#loop" stroke-width="${width.toFixed(2)}" opacity="${opacity.toFixed(3)}" stroke-dasharray="${(length*.0055).toFixed(5)} ${(length*.9945).toFixed(5)}" stroke-dashoffset="${(-position).toFixed(5)}">${animated?`<animate attributeName="stroke-dashoffset" from="${-position}" to="${-position-length}" dur="9s" calcMode="linear" repeatCount="indefinite"/>`:''}</use>`;
  }).join('\n');
}
function motif(animated) {
  const defs=`<defs><path id="loop" d="${path}"/></defs>`;
  const base='<use href="#loop" fill="none" stroke="#FF553D" stroke-width="7" opacity=".85"/>';
  const still=`<g fill="none" stroke="#FF553D" stroke-linecap="round">${trail(false)}</g><circle cx="${start[0]}" cy="${start[1]}" r="14.5" fill="#FF553D"/>`;
  if(!animated) return defs+base+still;
  return defs+'<style>.still{display:none}@media(prefers-reduced-motion:reduce){.motion{display:none}.still{display:inline}}</style>'+base+`<g class="motion"><g fill="none" stroke="#FF553D" stroke-linecap="round">${trail(true)}</g><circle r="14.5" fill="#FF553D"><animateMotion path="${path}" dur="9s" calcMode="paced" repeatCount="indefinite"/></circle></g><g class="still">${still}</g>`;
}
function svg(content,w,h,title,desc) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img" aria-labelledby="title desc">\n<title id="title">${title}</title>\n<desc id="desc">${desc}</desc>\n${content}\n</svg>\n`;
}
const mark=motif(false);
const body='<rect x="24" y="24" width="464" height="464" rx="48" fill="#111315"/><g transform="translate(0 25)">'+lettering+'</g><g transform="translate(91 269) scale(.75)">'+mark+'</g>';
await fs.writeFile('public/brand/hack-badge-static.svg',svg(body,512,512,'HACK, Hackers in the Loop','HACK lettering above a rounded infinity loop with an orange dot and tapered trail.'));
await fs.writeFile('public/brand/hack-infinity-static.svg',svg(mark,440,240,'Hackers in the Loop infinity mark','A continuous rounded infinity loop with an orange dot and tapered trail.'));
await fs.copyFile('public/brand/hack-infinity-static.svg','src/app/icon.svg');
await sharp('public/brand/hack-badge-static.svg').png().toFile('public/brand/hack-discord-icon.png');
console.log('Brand exports rebuilt. Static dot:',start,'Path length:',length.toFixed(3));

// The hero uses a luminous treatment of the same mark. Wordmarks stay flat and static.
function heroHead(animated) {
  const motion=animated?`<animateMotion path="${path}" dur="9s" calcMode="paced" repeatCount="indefinite"/>`:'';
  const transform=animated?'':` transform="translate(${start[0]} ${start[1]})"`;
  return `<g${transform}>${motion}<circle r="32" fill="url(#head-halo)"/><circle r="11.5" fill="url(#head-core)"/><circle r="3.8" fill="#fff8eb"/></g>`;
}
const heroDefs=`<defs><path id="loop" d="${path}"/>
<linearGradient id="track" x1="40" y1="200" x2="375" y2="30" gradientUnits="userSpaceOnUse"><stop stop-color="#df482e"/><stop offset=".4" stop-color="#ff6245"/><stop offset=".72" stop-color="#ffad7c"/><stop offset="1" stop-color="#ff553d"/></linearGradient>
<linearGradient id="shine" x1="0" y1="220" x2="0" y2="40" gradientUnits="userSpaceOnUse"><stop stop-color="#ff553d" stop-opacity="0"/><stop offset="1" stop-color="#fff0d5" stop-opacity=".72"/></linearGradient>
<radialGradient id="head-halo"><stop stop-color="#ff8153" stop-opacity=".65"/><stop offset=".28" stop-color="#ff6342" stop-opacity=".35"/><stop offset="1" stop-color="#ff553d" stop-opacity="0"/></radialGradient>
<radialGradient id="head-core" cx=".38" cy=".3"><stop stop-color="#fff6da"/><stop offset=".38" stop-color="#ffcf94"/><stop offset="1" stop-color="#ff7048"/></radialGradient>
<filter id="track-glow" x="-20%" y="-35%" width="140%" height="170%"><feGaussianBlur stdDeviation="5"/></filter>
</defs>`;
const heroTrack='<use href="#loop" fill="none" stroke="#ff553d" stroke-width="12" opacity=".25" filter="url(#track-glow)"/><use href="#loop" fill="none" stroke="#642d24" stroke-width="13"/><use href="#loop" fill="none" stroke="url(#track)" stroke-width="8"/><use href="#loop" fill="none" stroke="url(#shine)" stroke-width="1.6"/>';
const heroTrail=animated=>`<g fill="none" stroke="#ff9468" stroke-linecap="round">${trail(animated)}</g>`;
const hero=heroDefs+'<style>.still{display:none}@media(prefers-reduced-motion:reduce){.motion{display:none}.still{display:inline}}</style><g transform="rotate(-8 220 120)">'+heroTrack+`<g class="motion">${heroTrail(true)}${heroHead(true)}</g><g class="still">${heroTrail(false)}${heroHead(false)}</g></g>`;
const heroSvg=svg(hero,440,280,'Hackers in the Loop','A luminous orange infinity loop with a steady moving light and tapered trail.').replace('viewBox="0 0 440 280"','viewBox="-12 -20 464 280"');
await fs.writeFile('public/brand/hack-hero.svg',heroSvg);
