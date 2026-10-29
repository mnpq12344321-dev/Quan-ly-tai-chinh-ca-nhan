const V='meo-v6',F=['./','index.html','manifest.json','icon-192.png','icon-512.png'],OK=[location.origin,'https://fonts.googleapis.com','https://fonts.gstatic.com'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(F)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET'||!OK.includes(new URL(e.request.url).origin))return;
  e.respondWith(caches.match(e.request).then(m=>{
    const n=fetch(e.request).then(r=>{const k=r.clone();caches.open(V).then(c=>c.put(e.request,k));return r}).catch(()=>m);
    return m||n}))});
