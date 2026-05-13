# aria_front — Interface praticien ARIA

Interface web du système ARIA. SPA Vue 3 servie par nginx sur alpha-server (port 3000).

---

## Stack

| Composant | Technologie |
|---|---|
| Framework | Vue 3 + Vite |
| Routeur | Vue Router 4 |
| State management | Pinia |
| Styles | Tailwind CSS 4 |
| HTTP | Axios |
| Serving prod | nginx (Docker) |

---

## Démarrage

```zsh
# Développement (hot-reload)
npm install
npm run dev       # http://localhost:5173

# Build production
npm run build

# Preview build
npm run preview
```

Via Docker (stack complète) :

```zsh
# Depuis la racine du monorepo
make up-front
```

---

## Connexions

| Service | URL (Docker) | Description |
|---|---|---|
| `aria_middle` | `http://aria_middle:8000` | API REST + WebSocket |

En développement local, configurer le proxy Vite dans `vite.config.js` pour pointer sur `http://localhost:8000`.

---

## Structure

```
aria_front/
├── src/
│   ├── main.js
│   ├── App.vue
│   ├── router/
│   ├── stores/          ← Pinia stores
│   ├── views/           ← Pages Vue Router
│   └── components/
├── public/
├── nginx.conf           ← Config nginx prod
├── Dockerfile
└── vite.config.js
```

---

*ARIA MVP v2.0 · PFE IA & Santé 2025-2026 · François Hellebuyck*
