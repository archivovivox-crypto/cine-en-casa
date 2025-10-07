const CACHE_NAME = 'cine-en-casa-v1';
const urlsToCache = ['/', '/index.html', '/data.json'];
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(urlsToCache))));
self.addEventListener('fetch', e => {
  if (e.request.url.includes('data.json')) {
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
  } else {
    e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
  }
});
self.addEventListener('activate', e => {
  const whitelist = [CACHE_NAME];
  e.waitUntil(caches.keys().then(names => Promise.all(names.map(n => {
    if (!whitelist.includes(n)) return caches.delete(n);
  }))));
});
