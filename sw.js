// Network-first cache so the Home Screen app opens offline but always picks up new versions when online.
const C='targ-v11';
const FILES=['./','./index.html','./manifest.webmanifest','./icon-180.png','./icon-192.png','./icon-512.png','./sounds/btr.flac','./sounds/defstart.wav','./sounds/df4.wav','./sounds/deffreem.wav','./sounds/Game_Over.mp3','./sounds/Targ_FanFare_trumpets.m4a','./sounds/Fireworks.mp3','./sounds/coin-drop_soundFX.mp3','./sounds/Targ_Bonus_Screen.m4a','./sounds/Targ_skid.m4a','./sounds/intruder_alert.mp3','./sounds/sound-fx-alarm.mp3','./video/fireworks1.mp4','./video/fireworks2.mp4','./video/fireworks3.mp4'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(FILES)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==C).map(n=>caches.delete(n)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin)return;
  e.respondWith(fetch(e.request).then(r=>{if(r.ok){const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));}return r;})
    .catch(()=>caches.match(e.request,{ignoreSearch:true}).then(r=>r||caches.match('./index.html'))));});
