# Bozze SEO — articoli evergreen (Sanity CMS)

Il sito carica gli articoli da **Sanity** (`_type == "article"`), non da file locali. Usa questo file come riferimento per incollare i contenuti nello Studio.

## Come mappare su Sanity

| Bozza (qui) | Campo Sanity (tipico) | Note |
|-------------|------------------------|------|
| **SEO Title** | `seoTitle` o document SEO plugin, oppure *meta* esterno | Se non esiste il campo, usalo per `<title>` / plugin SEO. |
| **Slug** (obbligatorio per URL pubblico) | `slug.current` | Il frontend usa **`/it/articoli/:slug`** (e `/zh/...`). È ancora possibile aprire temporaneamente con `_id` legacy se la GROQ lo risolve, ma i link in lista usano lo **slug** quando presente. |
| **H1 (titolo visibile)** | `title.it` | È l’**unico H1** in pagina (`ArticoloDetail` lo renderizza nell’hero). |
| **Corpo** | `content_it` (Portable Text) | Converti le sezioni `##` in **heading 2**; paragrafi in **normal**; i link in **link** (vedi sotto). |
| **Lingua documento** | `language == "it"` | Le query GROQ filtrano per lingua. |
| **Categoria** | `category` | Es. `Lettura`, `Antropologia del cibo`, `Taiwan`. |
| **Immagine** | `mainImage` | Opzionale; consigliata per lista / condivisione. |

### Link interni (importante)

Nel front-end i percorsi sono **localizzati** (`/it/...`, `/zh/...`). Nello Studio Sanity, imposta gli URL interni con prefisso lingua per l’italiano, ad esempio:

- `/it/glossario/zhengzong`
- `/it/antropologia-del-cibo`
- `/it/dadaocheng`
- `/it/cultura-taiwanese`

Se incolli solo Markdown qui sotto, sostituisci i percorsi relativi con quelli completi prima di pubblicare.

---

## Articolo 1 — «Autentico» e cibo taiwanese

**Slug suggerito:** `autentico-cibo-taiwanese`  
**SEO Title:** `Autentico nel cibo taiwanese: perché questa idea è fuorviante | Portici DaDaocheng`  
**H1 (campo `title.it`):** `Perché "autentico" è una parola pigra nel cibo taiwanese`  
**Categoria suggerita:** `Antropologia del cibo` / `Lettura`

**Meta description (suggerita, per SEO plugin):**  
*Cercare il cibo taiwanese «autentico» sposta il dibattito sul posto sbagliato. Dalla voce zhengzong all’antropologia del cibo: perché la tavola è politica.*

### Corpo (`content_it`) — Markdown → Portable Text

> **Nota:** Non aggiungere un altro H1 nel corpo. Le sezioni seguenti vanno impostate come **H2** nello schema.

## Intro

Quando sento qualcuno chiedere dove si mangi «autentico» in Taiwan, mi fermo un secondo. Non perché la domanda sia stupida — è umanissima — ma perché, così com’è, mi chiede già la risposta sbagliata. «Autentico» suona neutro, quasi tecnico; in pratica spesso significa: dimmi chi ha il diritto di dire com’è fatto *davvero* un piatto, e chi resta fuori racconto. Sul campo, quella parola diventa pigra: comprime storia, potere e desiderio in un’etichetta da guida turistica.

In questo testo parto da un lessico che preferiamo tenere in cinese quando parliamo con cura — **zhengzong** (正宗) — e da ciò che abbiamo messo nero su bianco nella scheda del glossario. Poi collego il discorso all’**[antropologia del cibo](/it/antropologia-del-cibo)**: non come moda accademica, ma come modo per tenere insieme ingredienti, migrazioni e gerarchie.

## Contesto storico e culturale

Taiwan ha attraversato, in poche generazioni, stratificazioni che si leggono anche in cucina: flussi dal Fujian, dal Guangdong, dal Giappone coloniale, dagli Stati Uniti nel secondo Novecento, dalle ondate successive di lavoro migrante e dalle cucine del Sud-est asiatico. Non è un mosaico ordinato da museo: è un mercato che apre all’alba, una fila al banco del riso, un messaggio in chat che chiede «dove lo fanno come si deve».

In questo contesto, «autentico» spesso traduce una nostalgia di centro: un’immagine fissa contro cui misurare chi cucina ai margini. La voce **zhengzong** — che puoi approfondire nella scheda **[Zhengzong 正宗](/it/glossario/zhengzong)** — non è solo un aggettivo da menu; organizza uno sguardo. Chi la usa può voler dire gusto, ma sta anche nominando un tribunale immaginario di appartenenza.

Nei mercati notturni, nelle piccole mense e nelle chat dove si scambiano indirizzi, quella domanda circola con accenti diversi: mandarino, taiwanese, inglese da guida. Io la ascolto come segnale: qualcuno sta cercando un punto fermo in un paesaggio che, per definizione, non smette di muoversi.

## Perché conta oggi

Oggi la tavola taiwanese è fotografata, recensita, spedita a domicilio, discussa in thread che mescolano italiano, mandarino e dialetti. In quel rumore, chiedere l’«autentico» può essere un modo per sedare l’ansia: «dimmi il posto giusto e smetto di dubitare». Ma l’ansia non viene dal cibo in sé; viene dal desiderio di legittimità quando tutti possono commentare.

Io non propongo di smettere di avere preferenze. Propongo di chiedere *perché* quella preferenza suona come verità, e chi ne paga il costo quando diventa confine. Qui entra l’**[antropologia del cibo](/it/antropologia-del-cibo)**: prezzi, lavoro, memoria familiare, sesso, classe, lingua del menu. Sono coordinate più faticose di un aggettivo, ma sono quelle che reggono una lettura onesta.

C’è anche una ragione editoriale, da parte mia: se riduciamo il cibo taiwanese a un’etichetta, perdiamo il filo che ci lega Bologna a Taipei — non come curiosità, ma come due laboratori dove la tavola misura chi conta nella storia pubblica.

## Taiwan e Italia

In Italia conosco un’altra pressione sullo stesso tasto: il piatto «come a casa», «come una volta», «come da quella parte d’Italia che non è la tua». Bologna, dove lavoriamo, ha i suoi portici e le sue liti su ragù e tortellini; Taiwan ha i suoi night market e le sue liti su zuppa e noodles. Il punto non è decidere chi ha ragione, ma notare che in entrambi i posti la tavola diventa spesso il luogo dove si negozia chi è dentro e chi è fuori dalla storia «ufficiale».

Quando confronto le due coste, non cerco parallelismo da brochure. Cerco lo stesso tipo di domanda: chi ha voce quando si definisce il gusto, e chi resta materiale da sfondo.

## Domanda aperta

Quale domanda — più precisa di «è autentico?» — vorresti portare al prossimo banco che ti incuriosisce, sapendo che dietro ogni «così si fa» c’è sempre anche una misura di potere?

---

## Articolo 2 — Che cos’è Dadaocheng

**Slug suggerito:** `cos-e-dadaocheng`  
**SEO Title:** `Che cos'è Dadaocheng e perché conta nella cultura taiwanese | Portici DaDaocheng`  
**H1 (campo `title.it`):** `Dadaocheng: non solo un mercato, ma la tavola dove si siede l'Asia`  
**Categoria suggerita:** `Taiwan` / `Città`

**Meta description (suggerita):**  
*Dadaocheng a Taipei non è un decorativo «quartiere antico»: è stato crocevia di merci, lingue e cultura. Confronto con i portici di Bologna e link alla cultura taiwanese.*

### Corpo (`content_it`) — Markdown → Portable Text

## Intro

La prima volta che ho camminato a Dadaocheng, Taipei, non ho pensato a un concetto. Ho pensato a un odore: erbe da banco, carta oleata, una coda che si forma senza ordine da supermercato. Solo dopo ho capito che quel quartiere — che oggi trovi nel nostro hub **[Dadaocheng](/it/dadaocheng)** — è uno dei modi più concreti per chiedersi che cosa sia la **cultura taiwanese** senza appiattirla su un slogan.

Dadaocheng non è «l’Asia in miniatura» da cartolina. È uno spazio dove merci, accenti e rituali si sono seduti allo stesso tavolo, a volte in trattativa, a volte in attrito.

## Contesto storico e culturale

Storicamente, la zona lungo il Tamsui ha funzionato da punto di snodo per il commercio del tè, delle merci coloniali e delle manifatture locali. Le vie strette, le botteghe che espongono stoffa al metro, i templi che segnano il ritmo del quartiere: non sono decorazioni etniche, sono infrastrutture di una città che ha dovuto più volte ridefinire chi fosse «di qui».

In quel contesto, Dadaocheng ha ospitato stampa, associazioni, piccola finanza, culti di quartiere, cucine che si sono contaminate perché la fame e il lavoro non rispettano i confini narrativi. Capire Dadaocheng significa leggere Taipei attraverso il mercato — prezzi, materiali, corpi — non attraverso una singola immagine ufficiale.

Il tè, le stoffe, le erbe, le lettere sui cartelli scritte a mano: sono tracce di una città che ha imparato a commerciare guardando sia verso l’entroterra sia verso il mare. Non servono aggettivi grandi per descriverlo; servono nomi propri di strade, orari di apertura, materiali che si toccano.

## Perché conta oggi

Oggi Dadaocheng convive con turismo, real estate, memoria locale e progetti di riqualificazione. Ogni volta che un vicolo cambia pavimentazione o insegna, cambia anche chi può restare, chi può vendere, chi può permettersi di abitare lì. La domanda non è solo estetica («piace il vintage?»), è chi ha diritto al quartiere come luogo di lavoro e non solo come sfondo fotografico.

Per questo continuo a tornare alla metafora del tavolo: non come oggetto romantico, ma come superficie dove si divide spazio, tempo e voce.

Chi vive il quartiere come lavoro quotidiano — non come visita — sente prima di tutto i cambi di affitto, i turni, il peso delle casse sui marciapiedi stretti. È lì che la «cultura» smette di essere uno sfondo e diventa contratto, fatica, tempo rubato o restituito.

## Taiwan e Italia

A Bologna, dove abbiamo scelto di lavorare, i **portici** non sono un accessorio urbano: sono una galleria quotidiana dove pioggia, politica locale, turismo e commercio si mescolano senza chiedere permesso. Quando confronto quel dispositivo con i corridoi coperti di Dadaocheng — dove la pioggia monsone incontra banchi di erboristeria e negozi di tessuti — non cerco una equivalenza da brochure. Cerco lo stesso tipo di domanda spaziale: *dove il pubblico resta pubblico*, e dove invece si restringe a chi può pagare lo spazio.

Il confronto non «dimostra» che le due città siano uguali; mostra che entrambe insegnano a leggere la **cultura** non come essenza, ma come pratica quotidiana nel tessuto urbano. Per approfondire quella chiave di lettura, il percorso sulla **[cultura taiwanese](/it/cultura-taiwanese)** raccoglie materiali che evitano slogan e restano sul campo.

## Domanda aperta

Quale dettaglio — un odore, una piega di stoffa, una conversazione sotto un portico — ti farebbe cambiare idea su cosa significhi «essere del posto», a Taipei come a Bologna?

---

## Checklist prima della pubblicazione

- [ ] `language` = `it`
- [ ] `title.it` = H1 esatto (nessun secondo H1 nel corpo)
- [ ] Sezioni principali = **heading 2** in Portable Text
- [ ] Link interni con prefisso `/it/...` (o dominio completo)
- [ ] SEO title + meta description (se lo schema lo supporta)
- [ ] Immagine principale opzionale ma consigliata per anteprima in lista

---

*File generato per Portici DaDaocheng — bozze editoriali SEO.*
