# Piano sitemap (URL con valore SEO)

Origine di produzione di riferimento: `https://porticidadaocheng.com` (allineata a `PUBLIC_SITE_URL` / email nel backend).  
Sostituisci il dominio se usi un host diverso.

Le route pubbliche sono prefissate da **`/it`** o **`/zh`**. `/en/*` nel router reindirizza a `/it/*` — per la sitemap **non includere `/en`** come URL canonici.

---

## Localizzazione

| Prefisso | Note |
|----------|------|
| `/it/...` | Italiano (default contenuti editoriali). |
| `/zh/...` | Cinese (pagine disponibili; vedi eccezioni sotto). |

---

## Home e pagine editoriali principali

Per ogni lingua attiva (`it`, `zh` dove la UI espone la route):

- `/it/` — Home  
- `/it/fondatrici`  
- `/it/chi-siamo` (redirect verso fondatrici, utile solo se servita come URL storico)  
- `/it/eventi`  
- `/it/magazine`  
- `/it/newsletter` — **landing conversione newsletter**  
- `/it/articoli` — indice articoli (Sanity)  
- `/it/contatti`  
- `/it/spazio`  
- `/it/workshop`  
- `/it/workshop/calligraphy`  
- `/it/workshops`  

**Zh:** la navigazione nasconde alcune voci (es. magazine/newsletter/eventi in certe configurazioni) — in sitemap includi solo URL realmente 200 per `zh`.

---

## Hub tematici SEO (nuovi)

- `/it/cultura-taiwanese`  
- `/it/antropologia-del-cibo`  
- `/it/taiwan-italia`  
- `/it/dadaocheng`  

Ripetere per `/zh/...` se le pagine hub sono pubbliche in cinese (stesso componente, stesso route suffix).

---

## Glossario

- `/it/glossario` — indice  
- `/it/glossario/zhengzong`  
- `/it/glossario/nian-gao`  

(Aggiungere in sitemap ogni nuova voce `id` definita in `glossaryData.ts`.)

---

## Articoli (`/articoli/:slug`)

- Pattern: `/it/articoli/<slug.current>`  
- **Non** usare più `_id` nell’URL pubblico; il backend Sanity deve popolare `slug` su ogni `article`.  
- Includere in sitemap ogni slug pubblicato (generazione dinamica da CMS / GROQ in pipeline CI o function serverless).

Esempi segnaposto (sostituire con slug reali da CMS):

- `/it/articoli/autentico-cibo-taiwanese`  
- `/it/articoli/cos-e-dadaocheng`  

---

## Route da escludere o trattare con cautela

- `/admin` — solitamente `noindex` / esclusa da sitemap.  
- `/booking/success` — transazionale; spesso esclusa.  
- `/en/*` — redirect; non URL canonica.

---

## Implementazione consigliata

1. **Sitemap.xml dinamico** (Node/Vercel/Netlify function o script build) che:  
   - elenca le route statiche sopra per `it` (e `zh` se applicabile);  
   - interroga Sanity per `slug.current` + `language` degli articoli;  
   - aggiunge le voci glossario da `glossaryData` o da CMS.  
2. Aggiornare `robots.txt` `Sitemap:` se il file sitemap non è in root (es. `https://…/sitemap-index.xml`).

---

*Documento di pianificazione — il file `client/public/robots.txt` punta già a `/sitemap.xml` sulla produzione.*
