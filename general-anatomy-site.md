# 🦴 BareBones — General Anatomy, Made Easy
### A complete website blueprint + full content for 1st-year MBBS

> **How to use this file**
> - **Part A** = the frontend design system (the chunky, medical look) + site structure. Give this to your developer, or paste it into an AI site builder.
> - **Part B** = the full study content, chapter by chapter. Every chapter has: Big Idea → Easy Explanation → Drawing → Tables → 🩺 Clinical → 🧠 Mnemonic → 🎤 Viva.
> - Every drawing appears as an **ASCII sketch** (works in any markdown viewer) plus an **🎨 SVG brief** telling the designer exactly how to draw the final illustration.
> - Callouts use GitHub/Obsidian syntax: `[!NOTE]` = ⚡ High-yield, `[!TIP]` = 🧠 Mnemonic, `[!IMPORTANT]` = 🩺 Clinical, `[!WARNING]` = ⚠️ Common mistake.
> - Cross-check facts with your college textbook (e.g. BD Chaurasia's *Handbook of General Anatomy*, Vishram Singh) and your department's syllabus.

---

# PART A — FRONTEND DESIGN SYSTEM

## A1. The vibe in one line
**"A lab notebook that went to the gym."** Thick ink outlines, hard offset shadows, big bold type, chunky rounded cards, and the colour-coding every anatomy student already knows (red arteries, blue veins, yellow nerves).

Keywords: *chunky · tactile · clinical-clean · high-contrast · friendly · specimen-label*

## A2. Colour tokens

```css
:root {
  /* Base */
  --paper:      #FBF7F0;   /* warm off-white page, like notebook paper */
  --paper-2:    #F3ECDF;   /* sunken panels */
  --ink:        #14213D;   /* outlines, text — deep navy, not pure black */
  --ink-soft:   #4A5568;   /* secondary text */
  --grid:       #E8DFCF;   /* graph-paper grid lines */

  /* Brand */
  --scrub:      #0F766E;   /* surgical-scrub teal — primary */
  --scrub-lt:   #CCF2EC;
  --pearl:      #FFE3D3;   /* clinical box background */

  /* Anatomy colour code — use these in EVERY drawing */
  --artery:     #E63946;   /* red   */
  --vein:       #1D4E89;   /* blue  */
  --nerve:      #F4B400;   /* yellow */
  --lymph:      #6A994E;   /* green */
  --bone:       #F1E3C6;   /* ivory */
  --muscle:     #C9736B;   /* rose-brown */
  --cartilage:  #A8DADC;   /* pale blue-glass */
  --fat:        #FFD97D;   /* superficial fascia/fat */
  --fluid:      #BDE0FE;   /* synovial fluid, lymph */
}

/* Dark mode = "X-ray mode" */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --paper: #0E1525; --paper-2: #16203A; --ink: #E8F1FF;
    --ink-soft: #A9B8D0; --grid: #1E2A47; --pearl: #3A2530; --scrub-lt: #0F3B38;
  }
}
:root[data-theme="dark"] { /* same values as above */ }
```

## A3. Typography

| Role | Font (Google Fonts) | Weight | Size (desktop / mobile) |
|---|---|---|---|
| Display headings | **Bricolage Grotesque** | 800 | 56 / 36 px |
| Section headings | Bricolage Grotesque | 700 | 32 / 26 px |
| Body | **Atkinson Hyperlegible** (built for legibility) | 400 / 700 | 19 / 17 px, line-height 1.65 |
| Labels, tags, figure callouts | **JetBrains Mono** | 600, UPPERCASE, letter-spacing .06em | 13 px |

## A4. The "chunky" rules

```css
.chunk {
  background: var(--paper);
  border: 3px solid var(--ink);
  border-radius: 18px;
  box-shadow: 6px 6px 0 var(--ink);       /* hard shadow, NO blur */
}
.btn {
  border: 3px solid var(--ink); border-radius: 14px;
  box-shadow: 4px 4px 0 var(--ink);
  font: 700 17px "Bricolage Grotesque";
  transition: transform .08s, box-shadow .08s;
}
.btn:active { transform: translate(4px,4px); box-shadow: 0 0 0 var(--ink); } /* physical press */
body {
  background-color: var(--paper);
  background-image:                                   /* graph-paper lab notebook */
    linear-gradient(var(--grid) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid) 1px, transparent 1px);
  background-size: 28px 28px;
}
```

- Max content width **760px** for reading; diagrams may break out to **1000px**.
- Spacing scale: 4 · 8 · 12 · 16 · 24 · 32 · 48 · 72.
- Mobile: 16px side gutter, no horizontal scroll, diagrams scroll-zoom inside their frame.
- Section dividers = a thick **ECG line** SVG (`—/\/\—`) in `--scrub`.
- Icons: thick-stroke (2.5px) rounded icons, e.g. Phosphor "bold" or Tabler.

## A5. Components

| Component | Look | Used for |
|---|---|---|
| **Topic Hero** | Huge chapter number (e.g. `03`) in outlined text, title, 1-line "Big Idea", time-to-read pill | Top of every chapter |
| **Concept Card** | `.chunk` card, mono label tag at top-left like a specimen tag with a punched hole ● | Each concept |
| **Figure Frame** | Thick-bordered frame, `FIG 3.2` tab on top, numbered callouts ①②③ linked to a legend below; tap to zoom | Every drawing |
| **🩺 Clinical Pearl** | `--pearl` background, red-cross badge in corner | Clinical correlations |
| **🧠 Mnemonic Sticky** | `--nerve` yellow, rotated −1.5°, tape strip on top | Mnemonics |
| **⚡ High-Yield Strip** | `--scrub` left bar 8px wide, bold text | Must-know facts |
| **⚠️ Trap Box** | Dashed ink border, warning icon | Common exam mistakes |
| **🎤 Viva Flip-Card** | Front: question. Tap → flips (3D) → answer | Viva section |
| **Exam Tags** | Pill tags: `LAQ` `SAQ` `MCQ` `VIVA` | Beside headings |
| **Progress Tracker** | Chunky checkbox per chapter, saved locally | Sidebar / top bar |
| **Compare Table** | Thick outer border, zebra rows in `--paper-2`, sticky first column on mobile | Tables |

## A6. Drawing style guide (for all SVGs)

1. **Outline**: 3px `--ink` stroke, round joins & caps. Flat fills only — no gradients, no realism.
2. **Colour code is law**: arteries red, veins blue, nerves yellow, lymph green, bone ivory, cartilage pale blue, muscle rose.
3. **Labels**: JetBrains Mono uppercase, connected by 2px leader lines ending in a dot; numbered callouts ①②③ that match a legend.
4. **Simplify**: show only what the concept needs. One idea per drawing.
5. **Interactive (nice-to-have)**: hover/tap a part → it highlights and the legend row lights up. "Hide labels" toggle for self-testing.
6. Each figure has `alt` text describing it fully (accessibility + revision).

## A7. Site map

```text
/                      Home — hero, "Start learning" button, chapter grid (12 chunky tiles)
/start                 How to study General Anatomy (5 min)
/ch/01-introduction    Terminology, position, planes, movements
/ch/02-skin-fascia     Skin, superficial & deep fascia
/ch/03-bones           Bones: classification, parts, blood supply, ossification
/ch/04-cartilage       Cartilage types
/ch/05-joints          Joints: classification, synovial joints, Hilton's law
/ch/06-muscles         Muscles, levers, bursae, synovial sheaths
/ch/07-cvs             Arteries, veins, capillaries, anastomoses, end arteries
/ch/08-lymphatic       Lymph vessels, nodes, organs, drainage
/ch/09-nervous         Neuron, spinal nerve, dermatomes, ANS, UMN vs LMN
/ch/10-membranes       Mucous & serous membranes
/ch/11-radiology       Basics of X-ray, CT, MRI
/exam                  High-yield list, LAQ/SAQ bank, MCQs, viva flip cards
/mnemonics             All mnemonics on one page (sticky-note wall)
```

**Global features:** search (titles + headings), dark "X-ray mode" toggle, "Exam Mode" toggle (collapses everything except ⚡ high-yield + tables), print-friendly stylesheet (no shadows, B/W-safe diagrams), progress saved in the browser.

**Chapter page template:**
`Topic Hero → Big Idea → Concept Cards (with figures) → Clinical Pearls → Mnemonics → Quick Recap checklist → Viva flip-cards → Next/Prev chunky buttons`

**Suggested tech:** Astro or Next.js with MDX (each chapter = one `.mdx` file), diagrams as inline SVG components. Or plain HTML + CSS if hosting on GitHub Pages.

---

# PART B — CONTENT

---

## 00 · How to Study General Anatomy

**Big idea:** General anatomy is the *grammar* of anatomy. Once you know it, every region (upper limb, thorax, head & neck) becomes easy, because you already know what a bone, joint, muscle, artery and nerve "normally" do.

- Learn **one rule → one example → one exception** for every topic. Examiners love exceptions.
- Always **draw**. A labelled diagram earns marks in every answer.
- Use the **colour code** in your own notes: red artery, blue vein, yellow nerve, green lymph.
- After each chapter, do the viva cards aloud — speaking it is how you'll be tested.

---

## 01 · Introduction & Anatomical Terminology  `SAQ` `VIVA` `MCQ`

**Big idea:** Every description in anatomy assumes the body is in ONE fixed pose — the *anatomical position*. All directions are described from the **patient's** point of view, never yours.

### 1.1 Anatomical position
The body is:
- Standing **erect**, looking **forward** (eyes directed to the horizon)
- **Upper limbs by the side, palms facing forward**, thumbs pointing laterally
- **Feet together**, toes pointing forward

> [!WARNING]
> ⚠️ **Trap:** The patient's RIGHT is on YOUR LEFT when you face them. Always describe from the patient's side.

**Other positions you'll hear:**

| Position | Meaning |
|---|---|
| Supine | Lying on the back, face up |
| Prone | Lying on the front, face down |
| Lithotomy | Supine with hips & knees flexed, legs apart (obstetrics, perineal surgery) |
| Lateral | Lying on one side |

### 1.2 Planes — imaginary "cuts" through the body

```text
FIG 1.1 — PLANES OF THE BODY

        FRONT VIEW                               SIDE VIEW (patient's right side)

             │  ← MEDIAN plane                           │  ← CORONAL plane
           ( o )                                       ( o )>   nose faces ANTERIOR
            \│/                                          │
      ───────┼───────  ← TRANSVERSE plane         ───────┼───────  ← TRANSVERSE plane
             │                                           │
            / \                                         / \
   Patient's    Patient's                    POSTERIOR ◄─────► ANTERIOR
   RIGHT        LEFT                         (back)            (front)
 (YOUR left)  (YOUR right)
```

| Plane | Direction | Divides body into |
|---|---|---|
| **Median (midsagittal)** | Vertical, front-to-back, through the midline | Equal right & left halves |
| **Sagittal (paramedian)** | Vertical, parallel to median | Unequal right & left parts |
| **Coronal (frontal)** | Vertical, side-to-side (at right angle to median) | Anterior & posterior parts |
| **Transverse (horizontal / axial)** | Horizontal | Superior & inferior parts |
| Oblique | Any slanting plane | — |

> 🎨 **SVG brief FIG 1.1:** Simple chunky human silhouette (front + side). Three translucent coloured sheets slicing through: median = teal, coronal = yellow, transverse = blue. Label each with a mono tag. Add a "YOUR LEFT / PATIENT'S RIGHT" sticker.

### 1.3 Terms of position (relation)

| Term | Meaning | Example |
|---|---|---|
| Anterior / Ventral | Towards the front | Sternum is anterior to the heart |
| Posterior / Dorsal | Towards the back | Vertebral column is posterior |
| Superior / Cranial | Towards the head | Head is superior to neck |
| Inferior / Caudal | Towards the feet | Knee is inferior to hip |
| Medial | Nearer the median plane | Little finger is medial |
| Lateral | Away from median plane | Thumb is lateral |
| Proximal | Nearer the root/attachment of a limb | Elbow is proximal to wrist |
| Distal | Away from the root | Fingers are distal to wrist |
| Superficial | Nearer the surface | Skin is superficial to muscle |
| Deep | Away from the surface | Bone is deep to muscle |
| Ipsilateral / Contralateral | Same side / opposite side | — |

**Special terms in limbs** (because medial/lateral can be confusing):

| Region | "Front" | "Back" | "Lateral" | "Medial" |
|---|---|---|---|---|
| Hand | Palmar (volar) | Dorsal | Radial | Ulnar |
| Foot | Dorsal (top!) | Plantar (sole) | Fibular | Tibial |
| Limb borders | — | — | **Preaxial** (thumb / big-toe side) | **Postaxial** (little-finger / little-toe side) |

> [!WARNING]
> ⚠️ **Trap:** The *top* of the foot is called the **dorsum**, and the sole is the **plantar** surface.

### 1.4 Terms of movement

```text
FIG 1.2 — MOVEMENTS (quick sketches)

 FLEXION            EXTENSION           ABDUCTION           ADDUCTION
 bend, angle ↓      straighten, ↑       away from midline   towards midline
    ●                  ●                     \ o /               o
    │\                 │                      \│/               /│\
    │ \                │                       │                 │
    │  \__             │__                    / \               / \

 MEDIAL ROTATION    LATERAL ROTATION    PRONATION           SUPINATION
 front turns in     front turns out     palm faces BACK     palm faces FRONT
                                        (radius crosses     (holding SOUP in palm)
                                         ulna)
```

| Movement | What happens | Example |
|---|---|---|
| Flexion / Extension | Bending (angle decreases) / straightening | Elbow |
| Abduction / Adduction | Away from / towards the midline | Shoulder |
| Medial / Lateral rotation | Rotation around long axis, front surface turns in / out | Hip |
| Circumduction | Circular cone-shaped movement (flex + abd + ext + add in sequence) | Shoulder, hip |
| Pronation / Supination | Palm faces backward / forward | Forearm (radio-ulnar joints) |
| Inversion / Eversion | Sole faces medially / laterally | Foot (subtalar joints) |
| Dorsiflexion / Plantarflexion | Foot pulled up / pointed down | Ankle |
| Protraction / Retraction | Moving forward / backward | Scapula, mandible |
| Elevation / Depression | Moving up / down | Shoulder shrug, mandible |
| Opposition | Pulp of thumb touches pulp of other fingers | Thumb (CMC joint) |

> [!TIP]
> 🧠 **Supination = "SOUP-ination"** — you can hold a bowl of soup in a supinated palm.

> [!NOTE]
> ⚡ **High-yield:** The thumb is rotated 90° compared with the fingers, so its flexion/extension happen in the plane of the palm and abduction/adduction happen at right angles to the palm. Also, from the knee downward, "flexion" bends the limb backwards (because the lower limb rotated medially during development).

> 🎨 **SVG brief FIG 1.2:** A grid of 10 mini chunky figure-cards, each showing one movement pair with a curved teal arrow. Hover = animate the movement.

### 🎤 Viva — Chapter 01
1. **Define anatomical position.** → Erect, eyes forward, arms by side, palms forward, thumbs lateral, feet together.
2. **Difference between median and sagittal plane?** → Median passes exactly through the midline (equal halves); sagittal is any plane parallel to it.
3. **What is preaxial border?** → The border of a limb on the thumb/big-toe side (lateral in upper limb, medial in lower limb).
4. **Where does pronation occur?** → Superior and inferior radio-ulnar joints.
5. **What is the dorsum of the foot?** → The top (superior) surface.

---

## 02 · Skin & Fascia  `SAQ` `VIVA`

**Big idea:** Under the skin, the body is wrapped in two "sheets": a soft, fatty **superficial fascia** and a tough, tight **deep fascia** that hugs the muscles like a compression stocking.

```text
FIG 2.1 — LAYERS FROM SURFACE TO BONE

 ───────────────────────────────────────────  EPIDERMIS   (stratified squamous keratinised, NO blood vessels)
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  DERMIS      (connective tissue, vessels, nerves, glands, hair roots)
 ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○ ○  SUPERFICIAL FASCIA (fat + loose tissue)
    ▬▬ superficial vein   ┄┄ cutaneous nerve        ← vessels & nerves travel HERE
 ███████████████████████████████████████████  DEEP FASCIA (dense, tough, inelastic)
 ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒  MUSCLE
 ═══════════════════════════════════════════  PERIOSTEUM
 ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  BONE
```

> 🎨 **SVG brief FIG 2.1:** A chunky "layer cake" block cut open at an angle (3D slab). Each layer a distinct flat colour (skin pink, fat `--fat`, deep fascia white-grey, muscle `--muscle`, bone `--bone`). A blue vein and yellow nerve running in the fat layer. Numbered callouts ①–⑦.

### 2.1 Skin
- **Epidermis**: surface layer, stratified squamous keratinised epithelium, **avascular** (gets nutrition from the dermis).
- **Dermis**: papillary layer (with dermal papillae → fingerprints) + reticular layer (dense collagen). Contains vessels, nerves, sweat glands, sebaceous glands, hair follicles.
- **Thick skin**: palms & soles (thick keratin layer, no hair). **Thin skin**: everywhere else.
- **Appendages**: hair, nails, sebaceous glands (open into hair follicles), sweat glands (eccrine — all over; apocrine — axilla, groin, areola).

**Langer's lines (cleavage lines):** the direction in which collagen fibres of the dermis run. On the trunk they are mostly horizontal; on limbs they run roughly spirally/circularly.

> [!IMPORTANT]
> 🩺 **Clinical:** Surgical incisions made **along** Langer's lines gape less and heal with a thin, neat scar. Incisions **across** them gape and leave a broad scar.

### 2.2 Superficial fascia (hypodermis)
- Loose areolar tissue + **fat**, just under the skin.
- Contains: **superficial veins, cutaneous nerves, lymphatics**, cutaneous arteries, mammary gland (in the breast).
- Contains some skin muscles (remnant of *panniculus carnosus* of animals): **platysma, muscles of facial expression, palmaris brevis, dartos**.
- Functions: insulation (fat), energy store, lets skin move over deep structures, pathway for vessels and nerves.

> [!IMPORTANT]
> 🩺 **Clinical:** Subcutaneous (SC) injections — e.g. insulin — are given into the superficial fascia. Oedema fluid collects here first (pitting oedema).

### 2.3 Deep fascia
- Dense, inelastic fibrous sheet wrapping the muscles.
- **Poorly developed / absent in:** face (except over the parotid gland and masseter), anterior abdominal wall, ischioanal fossa. (Allows expansion — e.g. facial expression, abdominal distension.)

**Modifications of deep fascia:**

| Modification | What it is | Example |
|---|---|---|
| Intermuscular septa | Sheets passing to bone, creating compartments | Arm, thigh |
| Retinacula | Thickened bands holding tendons in place (pulleys) | Flexor retinaculum at wrist |
| Aponeurosis | Flattened tough sheet | Palmar & plantar aponeurosis |
| Fascial sheaths | Tubes round vessels/nerves | Carotid sheath, axillary sheath |
| Interosseous membrane | Sheet between two bones | Forearm, leg |
| Bursae | Small fluid sacs to reduce friction | Prepatellar bursa |

**Functions:** keeps muscles in shape, gives attachment to muscles, forms compartments, helps **venous return** (tight fascia + muscle contraction = "calf pump"), retinacula act as pulleys.

> [!IMPORTANT]
> 🩺 **Clinical:** **Compartment syndrome** — swelling inside a tight fascial compartment (e.g. after a leg fracture) squeezes vessels and nerves → severe pain, ischaemia. Treated by cutting the fascia (**fasciotomy**). Pus and infection also spread along fascial planes.

### 🎤 Viva — Chapter 02
1. **What are Langer's lines and why do surgeons care?** → Collagen cleavage lines of the dermis; incisions along them heal with minimal scarring.
2. **Name skin muscles in the superficial fascia.** → Platysma, facial muscles, palmaris brevis, dartos.
3. **Where is deep fascia absent?** → Face (except parotid & masseter), anterior abdominal wall, ischioanal fossa.
4. **What is a retinaculum?** → A thickened band of deep fascia that holds tendons in place.

---

## 03 · Bones  `LAQ` `SAQ` `MCQ` `VIVA`

**Big idea:** Bone is **living** tissue — it has blood vessels, nerves, grows, remodels and heals. A long bone grows like a sandwich: the "filling" (growth plate) keeps making new bone until it's used up after puberty.

### 3.1 Functions of bone
Support · Protection (skull, ribs) · Movement (levers for muscles) · **Blood cell formation** (red marrow) · Storage of **calcium & phosphate** · Gives body its shape.

### 3.2 Classification by shape

| Type | Features | Examples |
|---|---|---|
| **Long** | Shaft + two ends | Humerus, femur, radius, tibia |
| Miniature long | Long bone with only ONE secondary centre | Metacarpals, metatarsals, phalanges |
| Modified long | No medullary cavity / ossifies partly in membrane | **Clavicle** |
| **Short** | Cube-shaped | Carpals, tarsals |
| **Flat** | Two plates of compact bone with spongy bone (diploë) between | Skull vault, sternum, ribs, scapula |
| **Irregular** | Odd shapes | Vertebrae, hip bone |
| **Pneumatic** | Contain air spaces (sinuses) | Maxilla, frontal, sphenoid, ethmoid, temporal (mastoid) |
| **Sesamoid** | Develop inside a tendon; no periosteum | **Patella** (largest), pisiform, fabella |
| Accessory | Extra bones | Sutural (Wormian) bones |

> [!TIP]
> 🧠 **Pneumatic bones — "Every Fool Should Make Tea"**: **E**thmoid, **F**rontal, **S**phenoid, **M**axilla, **T**emporal.

**By development:**
- **Membrane bones** (direct from mesenchyme): skull vault, facial bones.
- **Cartilage bones** (via a cartilage model): limb bones, vertebrae, ribs.
- **Membrano-cartilaginous**: clavicle, mandible, occipital, temporal, sphenoid.

**By structure:** **Compact** (dense, in shafts & outer shell) vs **Spongy / cancellous** (trabeculae, at ends and inside flat bones, holds red marrow).

### 3.3 Parts of a young long bone

```text
FIG 3.1 — PARTS OF A YOUNG (GROWING) LONG BONE

          ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓      ← ARTICULAR CARTILAGE (hyaline)
        ┌──────────────────┐
        │    EPIPHYSIS     │      ← end of bone; SECONDARY centre (mostly after birth)
        │   (spongy bone)  │
        ╞══════════════════╡      ← EPIPHYSEAL PLATE (growth plate) — cartilage
        │   METAPHYSIS     │      ← flared zone of shaft next to the plate
        │  ╭╮ ╭╮ ╭╮ ╭╮     │         most active growth + richest blood supply
         ╲                ╱
          │  ┌────────┐  │
          │  │        │  │
          │  │MEDULL- │  │      ← MEDULLARY CAVITY (yellow marrow in adults)
          │  │  ARY   │  │
 nutrient ┼─►│ CAVITY │  │      ← DIAPHYSIS (shaft) — PRIMARY centre (before birth)
 artery   │  │        │  │
          │  └────────┘  │      ← compact bone wall
          │              │      ← PERIOSTEUM wraps the outside (not over cartilage)
         ╱                ╲
        │   METAPHYSIS     │
        ╞══════════════════╡      ← EPIPHYSEAL PLATE
        │    EPIPHYSIS     │
        └──────────────────┘
          ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
```

| Part | What it is | Key point |
|---|---|---|
| **Diaphysis** | Shaft | Ossifies from the **primary centre** |
| **Epiphysis** | Ends | Ossify from **secondary centres** |
| **Epiphyseal plate** | Plate of hyaline cartilage between them | Responsible for **growth in length**; disappears when bone stops growing (fusion) |
| **Metaphysis** | Zone of diaphysis next to the plate | **Most vascular, most actively growing** part |
| **Periosteum** | Fibrous outer layer + inner osteogenic (bone-forming) layer | Attached by **Sharpey's fibres**; richly supplied by nerves (bone pain); growth in **width** |
| **Endosteum** | Lines the medullary cavity | — |

> [!IMPORTANT]
> 🩺 **Clinical — Why osteomyelitis in children starts at the metaphysis:** The arteries here make **hairpin bends**, blood flows slowly, and these vessels are functionally end arteries → circulating bacteria settle and grow. Also, injury to the **growth plate** can stop growth or deform the limb.

> 🎨 **SVG brief FIG 3.1:** Vertical long bone cut lengthwise. Epiphyses in `--bone` with spongy-texture dots, growth plates as a bold `--cartilage` band, medullary cavity in pale yellow, compact wall in thicker ivory, periosteum as a thin dark outer line. Red nutrient artery entering the shaft at an angle. Callouts ①–⑦.

### 3.4 Types of epiphyses

| Type | Formed by | Examples |
|---|---|---|
| **Pressure** | Weight/pressure at a joint (articular) | Head of femur, head of humerus, lower end of radius |
| **Traction** | Pull of muscles/tendons (non-articular) | Greater & lesser trochanters, tubercles of humerus, mastoid process |
| **Atavistic** | Bone that was independent in ancestors, now fused | Coracoid process of scapula, os trigonum (posterior tubercle of talus) |
| **Aberrant** | Not always present | Head of 1st metacarpal, bases of other metacarpals |

### 3.5 Blood supply of a long bone

```text
FIG 3.2 — BLOOD SUPPLY OF A LONG BONE

                    ↓ EPIPHYSEAL ARTERIES (from joint's arterial circle)
             ┌──────────────────┐
             │    EPIPHYSIS     │
             ╞══════════════════╡  ← growth plate = barrier (in children)
 METAPHYSEAL ►    METAPHYSIS    ◄ METAPHYSEAL ARTERIES
 ARTERIES    │  ╭╮ ╭╮ ╭╮ ╭╮     │    (hairpin loops — slow flow)
              ╲      ↑        ╱
               │     │ ascending branch
               │     │        │◄── PERIOSTEAL ARTERIES → outer 1/3 of cortex
  NUTRIENT ────┼─────┤        │
  ARTERY       │     │        │◄── PERIOSTEAL ARTERIES
  (via nutrient│     ↓ descending branch
   foramen)    │              │
```

| Artery | Supplies |
|---|---|
| **Nutrient artery** (main supply) | Medullary cavity, **inner 2/3 of the cortex**, metaphysis |
| **Periosteal arteries** | **Outer 1/3 of the cortex** |
| **Metaphyseal arteries** | Metaphysis (join nutrient branches) |
| **Epiphyseal arteries** | Epiphysis |

**Rule of nutrient foramen:** it is directed **away from the growing end** of the bone.

> [!TIP]
> 🧠 **"To the ELBOW I go, from the KNEE I flee."** Nutrient foramina in the upper limb point **towards the elbow**; in the lower limb they point **away from the knee**. So the growing ends are: **shoulder & wrist** (upper limb) and **knee** (lower limb).

> [!IMPORTANT]
> 🩺 **Clinical:** If periosteum is stripped widely during surgery, the outer cortex can die (it depends on periosteal vessels). A fracture line passing through the nutrient foramen can be confused with a crack on X-ray.

### 3.6 Ossification (bone formation)

**Two methods:**
1. **Intramembranous** — mesenchyme turns directly into bone. *Skull vault, face, clavicle (mostly).*
2. **Endochondral** — a **hyaline cartilage model** is made first, then replaced by bone. *Limb bones, vertebrae, base of skull.*

```text
FIG 3.3 — ENDOCHONDRAL OSSIFICATION (5 STEPS)

  ①            ②              ③               ④                 ⑤
 CARTILAGE    BONE COLLAR    PRIMARY CENTRE   SECONDARY         ADULT
 MODEL        + cartilage    (periosteal bud  CENTRES in ends   plates fused,
              calcifies      invades shaft)   (after birth)     growth stops

  ╭──╮         ╭──╮           ╭──╮             ╭●─╮              ╭──╮
  │  │         │▒▒│           │▒▒│             │▒▒│              │  │
  │  │   ──►  ║│▒▒│║   ──►   ║│██│║    ──►    ═╪══╪═    ──►      │  │
  │  │        ║│▒▒│║         ║│██│║            │██│              │  │
  │  │         │▒▒│           │▒▒│             ═╪══╪═             │  │
  ╰──╯         ╰──╯           ╰──╯             ╰●─╯              ╰──╯
                                               ═ = growth plate (still cartilage)
```

**Timing:**
- **Primary centres** appear **before birth** (mostly around the 8th week of intrauterine life).
- **Secondary centres** appear **after birth** — exception: **lower end of femur** (appears just before birth, ~9th month) → its presence is used medico-legally to say a newborn was **full-term**.
- **Clavicle** is the **first bone to start ossifying** (5th–6th week IU).

**Laws of ossification:**
1. The epiphysis whose centre **appears first, fuses last** → this is the **growing end**. *Exception: lower end of fibula — appears first AND fuses first.*
2. Nutrient foramen points **away from** the growing end.

**Growth plate zones** (from epiphysis side → shaft): resting → proliferating → hypertrophic → calcified → ossification.

> [!IMPORTANT]
> 🩺 **Clinical:**
> - **Bone age** (X-ray of wrist/hand, elbow) estimates age for medico-legal cases and growth disorders.
> - **Rickets** — defective mineralisation at growth plates (vitamin D deficiency) → bowed legs, widened wrists.
> - **Achondroplasia** — defective endochondral ossification → short limbs, normal skull vault (membrane bone unaffected).
> - **Wolff's law** — bone remodels according to the stresses placed on it.

> [!WARNING]
> ⚠️ **Trap:** On a child's X-ray, the dark line of an unfused growth plate is **normal** — don't call it a fracture.

### 3.7 Microscopic structure (just the basics)
- **Osteon (Haversian system)** = central (Haversian) canal with vessels + concentric lamellae + osteocytes in lacunae, linked by canaliculi.
- **Volkmann's canals** run across, connecting Haversian canals.
- Cells: **osteoblasts** (build), **osteocytes** (maintain), **osteoclasts** (break down — multinucleated).

### 🎤 Viva — Chapter 03
1. **Which is the most vascular part of a growing long bone?** → Metaphysis.
2. **Name a sesamoid bone.** → Patella (largest), pisiform.
3. **Which bone ossifies first?** → Clavicle.
4. **Which secondary centre appears before birth?** → Lower end of femur (± upper end of tibia).
5. **Exception to "first to appear, last to fuse"?** → Lower end of fibula.
6. **Give an atavistic epiphysis.** → Coracoid process.
7. **Direction of nutrient foramen in humerus?** → Towards the elbow (downward).
8. **What are Sharpey's fibres?** → Collagen fibres anchoring periosteum (and tendons) into bone.

---

## 04 · Cartilage  `SAQ` `MCQ`

**Big idea:** Cartilage is firm, flexible connective tissue with **no blood vessels** — it's fed by diffusion, so it heals very poorly.

```text
FIG 4.1 — THREE TYPES OF CARTILAGE (microscope look)

  HYALINE                 ELASTIC                     FIBROCARTILAGE
  glassy, smooth          stretchy, bends back        tough, shock-absorbing
  ┌──────────────┐        ┌──────────────┐            ┌──────────────┐
  │  ◎      ◎    │        │ ◎ ∿∿∿ ◎ ∿∿∿  │            │ ◎ ════ ◎ ════│
  │      ◎       │        │ ∿∿ ◎ ∿∿∿ ◎ ∿ │            │ ════ ◎ ════ ◎│
  │  ◎       ◎   │        │ ◎ ∿∿∿ ◎ ∿∿∿  │            │ ◎ ════ ◎ ════│
  └──────────────┘        └──────────────┘            └──────────────┘
  ◎ = chondrocytes in     ∿ = elastic fibres          ═ = thick collagen bundles
  lacunae; plain matrix                                cells in rows
```

| Feature | Hyaline | Elastic | Fibrocartilage |
|---|---|---|---|
| Fibres | Fine collagen (type II), invisible | Elastic fibres | Thick collagen (type I) bundles |
| Perichondrium | Present (absent on articular surfaces) | Present | **Absent** |
| Calcifies with age? | Yes | No | Variable |
| **Examples** | Articular cartilage, costal cartilages, nasal, tracheal rings, epiphyseal plate, most laryngeal cartilages | **Pinna**, epiglottis, external acoustic meatus, auditory (Eustachian) tube, corniculate & cuneiform | **Intervertebral disc**, pubic symphysis, menisci of knee, articular discs (TMJ, sternoclavicular), glenoid & acetabular labrum |

> [!TIP]
> 🧠 **Elastic cartilage = "PEACE"**: **P**inna, **E**piglottis, **A**uditory (Eustachian) tube, **C**orniculate & Cuneiform, **E**xternal acoustic meatus.

> [!IMPORTANT]
> 🩺 **Clinical:** Torn knee meniscus and worn articular cartilage (**osteoarthritis**) heal poorly because cartilage is avascular. A **slipped (herniated) disc** = the soft centre (nucleus pulposus) bulging through the fibrocartilage ring (annulus fibrosus).

> 🎨 **SVG brief FIG 4.1:** Three round "microscope view" circles side by side with chunky borders, each showing simplified cells and fibres in the style above; below each, tiny icons of where it's found (knee, ear, spine).

---

## 05 · Joints  `LAQ` `SAQ` `MCQ` `VIVA`

**Big idea:** A joint is where two or more bones meet. The more movement a joint allows, the less stable it is — **mobility vs stability** is the trade-off.

### 5.1 Classification

```text
FIG 5.1 — CLASSIFICATION OF JOINTS (STRUCTURAL)

                                   JOINTS
              ┌──────────────────────┼───────────────────────┐
           FIBROUS              CARTILAGINOUS              SYNOVIAL
         (fibrous tissue)       (cartilage)              (cavity + fluid)
     ┌──────┼──────┬──────┐       ┌──────┴──────┐      freely movable
  Suture  Syndes-  Gom-  Schin-   PRIMARY      SECONDARY
          mosis   phosis dylesis  (hyaline)    (fibrocartilage
  skull   inf.    tooth  vomer +  synchondrosis  = symphysis)
          tibio-  in     rostrum  epiphyseal   pubic symphysis,
          fibular socket of       plate,       intervertebral disc,
                         sphenoid 1st sterno-  manubriosternal
                                  costal       (ALL in midline)
```

**Functional classification:** **Synarthrosis** (immovable — sutures), **Amphiarthrosis** (slightly movable — symphysis), **Diarthrosis** (freely movable — synovial).

**Types of sutures:** plane (internasal), serrate (sagittal), denticulate (lambdoid), squamous (temporoparietal), schindylesis (ridge-in-groove: vomer + sphenoid rostrum).

| Primary cartilaginous | Secondary cartilaginous |
|---|---|
| Bones joined by **hyaline** cartilage | Surfaces covered with hyaline cartilage, joined by a **fibrocartilage** disc |
| Usually **temporary** — becomes bone (synostosis) after growth | **Permanent**, slightly movable |
| Epiphyseal plate, spheno-occipital joint, 1st sternocostal joint | Pubic symphysis, intervertebral disc joints, manubriosternal joint |
| — | All lie in the **median plane** |

### 5.2 The synovial joint — draw this every time!

```text
FIG 5.2 — TYPICAL SYNOVIAL JOINT

                       BONE A
              ┌──────────────────────┐
              │                      │
   ┌──────────┤▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓├──────────┐  ① ARTICULAR CARTILAGE (hyaline)
   │ ┄┄┄┄┄┄┄┄┄                        ┄┄┄┄┄┄┄┄┄│  ② SYNOVIAL MEMBRANE (lines capsule,
   │                                            │     NOT the articular cartilage)
   │      ~ ~ ~  SYNOVIAL FLUID  ~ ~ ~          │  ③ JOINT CAVITY with fluid
   │                                            │
   │ ┄┄┄┄┄┄┄┄┄                        ┄┄┄┄┄┄┄┄┄│
   └──────────┤▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓├──────────┘
   ▲          │                      │          ▲
   ④ FIBROUS CAPSULE (attached around the articular margins)
   ⑤ LIGAMENTS strengthen the capsule
              │                      │
              └──────────────────────┘
                       BONE B
```

**Features of a synovial joint:**
1. **Articular cartilage** — hyaline (smooth, low friction). *Exception: **fibrocartilage** in TMJ, sternoclavicular and acromioclavicular joints* (bones ossifying in membrane).
2. **Fibrous capsule** — sleeve enclosing the joint.
3. **Synovial membrane** — lines the inside of the capsule and all intracapsular non-articular surfaces; **never covers articular cartilage**.
4. **Synovial fluid** — contains hyaluronic acid; **lubricates** and **nourishes** the cartilage.
5. **Ligaments** — capsular, intracapsular (e.g. cruciate ligaments) or extracapsular.
6. ± **Articular disc / menisci**, **labrum**, **fat pads**, bursae.

> 🎨 **SVG brief FIG 5.2:** Two ivory bone ends facing each other, pale-blue articular cartilage caps, pink synovial membrane as a dashed lining, light-blue fluid filling the cavity, thick grey capsule wrapping around. Callouts ①–⑤. Interactive: tap "synovial membrane" → highlights to show it does NOT cover the cartilage.

### 5.3 Types of synovial joints (by shape & axes)

```text
FIG 5.3 — SHAPES OF SYNOVIAL JOINTS

 PLANE          HINGE          PIVOT           CONDYLAR        ELLIPSOID       SADDLE          BALL & SOCKET
 slide          door hinge     rotation        two knuckles    oval in oval    two saddles     sphere in cup
 ═══            ╭─╮            ( O )           ╭─╮ ╭─╮         ╭────╮          ╲╱              ╭─●─╮
 ═══            ╰┬╯             │||│           ╰─╯ ╰─╯         ╰────╯          ╱╲              ╰───╯
 non-axial      UNI-axial      UNI-axial       BI-axial        BI-axial        BI-axial        MULTI-axial
```

| Type | Axes | Movements | Examples |
|---|---|---|---|
| **Plane** | Non-axial (gliding) | Sliding | Intercarpal, acromioclavicular, facet joints |
| **Hinge** | Uniaxial | Flexion/extension | Elbow (humero-ulnar), ankle, interphalangeal |
| **Pivot** | Uniaxial | Rotation | Median atlanto-axial, superior & inferior radio-ulnar |
| **Condylar (bicondylar)** | Biaxial (mainly one) | Flex/ext + some rotation | **Knee**, TMJ |
| **Ellipsoid** | Biaxial | Flex/ext + abd/add | Wrist (radiocarpal), MCP, atlanto-occipital |
| **Saddle (sellar)** | Biaxial | Flex/ext + abd/add + some rotation | **1st carpometacarpal (thumb)**, sternoclavicular, calcaneocuboid |
| **Ball & socket** | Multiaxial | All, incl. circumduction & rotation | **Shoulder, hip**, incudostapedial |

> 🎨 **SVG brief FIG 5.3:** 7 chunky tiles, each with a simplified 3D toy-like model of the joint shape, curved arrows showing allowed movements, and an "AXES: 1 / 2 / 3" badge.

### 5.4 Stability of joints
Depends on: **shape of bones** (hip — deep socket), **ligaments** (knee), **muscles** (shoulder — rotator cuff is the main stabiliser), and atmospheric pressure. **Close-packed position** = most congruent, most stable position (e.g. knee in full extension).

### 5.5 Blood & nerve supply — HILTON'S LAW
- **Blood:** from an arterial circle (periarticular anastomosis) around the joint.
- **Nerve — Hilton's law:** *The nerve supplying a joint also supplies the muscles moving that joint and the skin over the insertions of those muscles.*

> [!NOTE]
> ⚡ **High-yield:** Hilton's law explains **referred pain** — e.g. hip disease (obturator nerve) can present as **pain in the knee**, because the same nerve supplies both.

> [!IMPORTANT]
> 🩺 **Clinical:** **Dislocation** (bones fully displaced — shoulder is the most commonly dislocated large joint because it trades stability for mobility), **subluxation** (partial), **sprain** (ligament injury), **effusion** (excess fluid), **arthritis** — osteoarthritis (wear of cartilage), rheumatoid arthritis (inflamed synovial membrane).

### 🎤 Viva — Chapter 05
1. **State Hilton's law.** → See 5.5.
2. **Give an example of a secondary cartilaginous joint.** → Pubic symphysis.
3. **Which synovial joints have fibrocartilage on articular surfaces?** → TMJ, sternoclavicular, acromioclavicular.
4. **Type of joint at the thumb CMC?** → Saddle.
5. **Type of knee joint?** → Bicondylar (modified hinge) synovial joint.
6. **What is a gomphosis?** → Fibrous joint between tooth and its socket.
7. **Main stabiliser of the shoulder?** → Rotator cuff muscles.

---

## 06 · Muscles  `LAQ` `SAQ` `MCQ` `VIVA`

**Big idea:** Muscles can only **pull**, never push. Their shape (fibre arrangement) decides whether they are built for **range** or for **power**.

### 6.1 Three types of muscle

| Feature | Skeletal | Smooth | Cardiac |
|---|---|---|---|
| Striations | Yes | No | Yes |
| Cell shape | Long cylindrical, multinucleated | Spindle, one central nucleus | Branched, 1–2 central nuclei |
| Special | — | — | **Intercalated discs** |
| Control | **Voluntary** | Involuntary | Involuntary (autorhythmic) |
| Location | Attached to skeleton | Walls of gut, vessels, bladder | Heart |

### 6.2 Parts of a skeletal muscle
- **Origin** — the more fixed attachment (usually proximal).
- **Insertion** — the more mobile attachment (usually distal).
- **Belly** — fleshy contractile part.
- **Tendon** — cord of dense collagen joining muscle to bone. **Aponeurosis** — flattened tendon. **Raphe** — line where two muscles' fibres interlace (e.g. pterygomandibular raphe).

### 6.3 Fibre arrangement (architecture)

```text
FIG 6.1 — FIBRE ARRANGEMENT OF MUSCLES

   STRAP       FUSIFORM     UNIPENNATE    BIPENNATE     MULTIPENNATE   CONVERGENT    CIRCULAR
   ┃┃┃┃┃          ┃            ┃            ┃            ┃  ┃  ┃        ╲  │  ╱        .────.
   ┃┃┃┃┃        ╱┃┃┃╲          ┃╲           ╲┃╱          ╲┃╱╲┃╱╲┃╱         ╲ │ ╱        ╱      ╲
   ┃┃┃┃┃       ┃┃┃┃┃┃┃         ┃╲╲         ╲╲┃╱╱         ╲┃╱╲┃╱╲┃╱          ╲│╱        │  ()  │
   ┃┃┃┃┃        ╲┃┃┃╱          ┃╲╲         ╲╲┃╱╱         ╲┃╱╲┃╱╲┃╱           ┃          ╲      ╱
   ┃┃┃┃┃          ┃            ┃            ┃            ┃  ┃  ┃            ┃           '────'
  Sartorius    Biceps        FPL         Rectus        Deltoid       Temporalis    Orbicularis
                                         femoris      (acromial)                    oculi

   ◄─────── MORE RANGE (parallel) ───────►   ◄──────── MORE POWER (pennate) ────────►
```

| Arrangement | Examples |
|---|---|
| Parallel — strap | Sartorius, rectus abdominis |
| Parallel — fusiform | Biceps brachii |
| Parallel — quadrilateral | Thyrohyoid, pronator quadratus |
| **Unipennate** (fibres on one side of tendon, like half a feather) | Flexor pollicis longus, extensor digitorum longus, palmar interossei |
| **Bipennate** (both sides — like a feather) | Rectus femoris, dorsal interossei |
| **Multipennate** | Deltoid (acromial part), subscapularis |
| **Circumpennate** | Tibialis anterior |
| Convergent / triangular | Temporalis, pectoralis major |
| Spiral / twisted | Supinator, latissimus dorsi |
| Cruciate | Sternocleidomastoid, masseter |
| Circular (sphincter) | Orbicularis oculi, orbicularis oris |

> [!NOTE]
> ⚡ **High-yield:** **Parallel fibres → greater range of movement. Pennate fibres → greater power** (more fibres packed into the same space).

### 6.4 Functional roles

| Role | Meaning | Example (elbow flexion) |
|---|---|---|
| **Prime mover (agonist)** | Main muscle producing the movement | Brachialis, biceps |
| **Antagonist** | Opposes the movement (relaxes to allow it) | Triceps |
| **Fixator** | Stabilises the proximal bone | Shoulder muscles holding the humerus steady |
| **Synergist** | Prevents unwanted movement at an intermediate joint | Wrist extensors when making a fist |

**Types of contraction:** **Isotonic** (length changes — concentric: shortens; eccentric: lengthens under load) and **Isometric** (tension builds, length stays same — e.g. holding a bag still).

### 6.5 Levers

```text
FIG 6.2 — THREE ORDERS OF LEVERS  (F = fulcrum △, E = effort, L = load)

 1st ORDER — F in the middle (see-saw)
        E ↓                       ↓ L
        ━━━━━━━━━━━━━━△━━━━━━━━━━━━━━
   e.g. nodding the head at the atlanto-occipital joint

 2nd ORDER — L in the middle (wheelbarrow)
        △━━━━━━━━━━━━━━━━━━━━━━━━━━━ ↑ E
               ↓ L
   e.g. standing on tiptoe (fulcrum = toes, load = body, effort = calf muscles)

 3rd ORDER — E in the middle (tweezers)  ★ MOST COMMON IN THE BODY
        △━━━━━━━━━━━━━━━━━━━━━━━━━━━ ↓ L
               ↑ E
   e.g. biceps flexing the elbow (gains speed & range, loses power)
```

### 6.6 Nerve supply & motor unit
- A muscle's nerve enters at the **neurovascular hilum** with its artery.
- Nerve to a muscle has **motor fibres** (alpha → main fibres; gamma → muscle spindles), **sensory fibres** (from spindles and Golgi tendon organs — position sense), and **sympathetic fibres** (to blood vessels).
- **Motor unit** = **one motor neuron + all the muscle fibres it supplies.**
  - **Small** units (only a handful of fibres) → precise movement → extraocular muscles, small hand muscles.
  - **Large** units (1000–2000 fibres) → power, less precision → gastrocnemius, back muscles.

> [!IMPORTANT]
> 🩺 **Clinical:**
> - **Intramuscular injection sites:** deltoid, **upper outer quadrant of the gluteal region** (avoids the sciatic nerve), vastus lateralis (preferred in infants).
> - **LMN lesion** → flaccid paralysis + wasting; **UMN lesion** → spastic paralysis (see Chapter 09).
> - **Hypertrophy** with exercise; **atrophy** with disuse or denervation.

### 6.7 Bursae & synovial sheaths
- **Bursa** = a closed sac of synovial membrane with a film of fluid, placed where tendon/skin rubs over bone → **reduces friction**. Types: subcutaneous, subtendinous, submuscular. Some communicate with joint cavities (e.g. **suprapatellar bursa** with the knee).
- **Synovial sheath** = a tubular bursa wrapped around a tendon where it passes through a tight tunnel (wrist, ankle). The **mesotendon** carries blood vessels to the tendon (in fingers it becomes **vincula**).

> [!IMPORTANT]
> 🩺 **Clinical:** **Bursitis** — *housemaid's knee* (prepatellar bursa), *student's elbow* (olecranon bursa). **Tenosynovitis** — inflamed tendon sheath; infection can spread along sheaths in the hand.

### 🎤 Viva — Chapter 06
1. **Define motor unit.** → One motor neuron and all the muscle fibres it supplies.
2. **Example of bipennate muscle?** → Rectus femoris.
3. **Which lever is most common in the body?** → Third order.
4. **Why inject in the upper outer quadrant of the buttock?** → To avoid the sciatic nerve.
5. **What is a fixator?** → A muscle that stabilises the proximal bone so the prime mover works efficiently.
6. **Difference between bursa and synovial sheath?** → Bursa is a sac; a sheath is a tube around a tendon.

---

## 07 · Cardiovascular System  `LAQ` `SAQ` `MCQ` `VIVA`

**Big idea:** The heart is the pump, **arteries** carry blood away from the heart (high pressure, thick walls), **veins** bring it back (low pressure, thin walls, valves), and **capillaries** are where the real exchange happens.

### 7.1 Circulations
- **Systemic**: left ventricle → aorta → body → venae cavae → right atrium.
- **Pulmonary**: right ventricle → pulmonary trunk → lungs → pulmonary veins → left atrium.
- **Portal circulation**: blood passes through **two capillary beds** before returning to the heart — **hepatic portal** (gut → liver) and **hypophyseal portal** (hypothalamus → anterior pituitary).

### 7.2 Structure of vessel wall

```text
FIG 7.1 — ARTERY vs VEIN (cross-section)

        ARTERY                                  VEIN
   (thick wall, round,                    (thin wall, collapsed,
    small lumen)                           large lumen, has valves)

        ╭━━━━━━━━━╮                         ╭───────────────╮
      ╭━┛ ╭─────╮ ┗━╮ ← TUNICA ADVENTITIA   │ ╭───────────╮ │ ← adventitia (thickest
      ┃  ╱███████╲  ┃ ← TUNICA MEDIA         │ │           │ │    layer in veins)
      ┃ │██ ( ) ██│ ┃    (THICK smooth       │ │   lumen   │ │ ← media (thin)
      ┃  ╲███████╱  ┃     muscle/elastic)    │ ╰───────────╯ │ ← intima
      ╰━┓ ╰─────╯ ┏━╯ ← TUNICA INTIMA        ╰───────────────╯
        ╰━━━━━━━━━╯     (endothelium)
```

| Layer | Made of |
|---|---|
| **Tunica intima** | Endothelium + thin connective tissue (+ internal elastic lamina in arteries) |
| **Tunica media** | Smooth muscle ± elastic fibres — **thickest in arteries** |
| **Tunica adventitia** | Connective tissue; carries **vasa vasorum** & nerves — **thickest in veins** |

### 7.3 Types of arteries

| Type | Wall | Job | Examples |
|---|---|---|---|
| **Elastic (conducting)** | Lots of elastic fibres | Stretch with each heartbeat, keep flow continuous | Aorta, pulmonary trunk, brachiocephalic, common carotid, subclavian, common iliac |
| **Muscular (distributing)** | Mostly smooth muscle | Distribute blood to organs | Radial, femoral, brachial, coronary |
| **Arterioles** | Few layers of muscle | **Resistance vessels** — control blood pressure | Throughout tissues |

### 7.4 Capillaries & sinusoids

```text
FIG 7.2 — TYPES OF CAPILLARIES

 CONTINUOUS                 FENESTRATED                 SINUSOID (discontinuous)
 ══════════════════         ═══ ═══ ═══ ═══ ═══         ═══     ═══     ═══
   no gaps                    small "windows"             wide gaps, broken basement
                                                          membrane, wide irregular lumen
 muscle, skin, lungs,       kidney glomerulus, gut      liver, spleen,
 brain (blood-brain         villi, endocrine glands     bone marrow
 barrier)
```

### 7.5 Veins
- Thin wall, large lumen, low pressure. Usually accompany arteries. Small arteries are often accompanied by **two veins (venae comitantes)**.
- **Valves** (folds of intima) keep blood moving towards the heart.
- **Valves are ABSENT in:** venae cavae, portal vein, hepatic veins, pulmonary veins, cerebral veins & dural venous sinuses, emissary veins.
- **Venous return is helped by:** valves, **muscle pump** (calf muscles inside tight deep fascia), **respiratory pump** (negative pressure in chest on inspiration), pulsation of the artery inside venae comitantes.

> [!IMPORTANT]
> 🩺 **Clinical:** **Varicose veins** — incompetent valves → dilated tortuous superficial veins (long saphenous vein). **Deep vein thrombosis (DVT)** — clot in calf veins, especially after immobility → can travel to the lungs (pulmonary embolism).

### 7.6 Anastomosis & end arteries

```text
FIG 7.3 — ANASTOMOSIS vs END ARTERY

 ARTERIAL ANASTOMOSIS                          END ARTERY
   A ━━━━━━━┓       ┏━━━━━━━ B                 A ━━━━━━┳━━━━━
            ┗━━━●━━━┛                                  ┣━━━━━   each branch alone,
            tissue ●  ← if A is blocked,               ┗━━━━━   NO backup
                         B still feeds it      block A ✖ → tissue dies (INFARCT)
                         (COLLATERAL circulation)
```

**Anastomosis** = communication between vessels.
- **Arterial — actual** (wide end-to-end channels): palmar arches, circle of Willis, intestinal arcades.
- **Arterial — potential** (tiny channels between arterioles; open slowly): coronary arteries.
- **Venous**: very common (venous plexuses).
- **Arteriovenous (AV) shunts**: direct artery-to-vein channels bypassing capillaries — skin of fingertips, nose, lips, ear → **temperature regulation**.

**End arteries** = arteries that do **not** anastomose with neighbours; blockage → death of the tissue it supplies.
- **True (anatomical) end arteries:** **central artery of retina**, labyrinthine artery, central branches of cerebral arteries.
- **Functional end arteries** (anastomoses too small to help in a sudden block): **coronary arteries**, segmental arteries of kidney & spleen, vasa recta of intestine.

> [!IMPORTANT]
> 🩺 **Clinical:** Blocked central artery of retina → **sudden painless blindness**. Blocked coronary artery → **myocardial infarction**. Blocked striate (central) branch → **stroke**. Slowly developing blocks allow collaterals to open; sudden ones don't.

> 🎨 **SVG brief FIG 7.3:** Two side-by-side panels. Left: two red vessels joined by a loop feeding a tissue blob; a ✖ on one vessel, glowing arrows showing blood arriving from the other. Right: a single red tree feeding a wedge of tissue; ✖ on the stem → wedge turns grey ("infarct").

### 🎤 Viva — Chapter 07
1. **Name an elastic artery.** → Aorta.
2. **Example of a true end artery?** → Central artery of retina.
3. **Where are sinusoids found?** → Liver, spleen, bone marrow.
4. **Where are AV anastomoses found and why?** → Skin of fingertips, nose, lips, ears — temperature regulation.
5. **Name veins without valves.** → Venae cavae, portal vein, cerebral veins, dural sinuses.
6. **What is a portal circulation?** → Blood passes through two capillary beds before reaching the heart.

---

## 08 · Lymphatic System  `SAQ` `MCQ` `VIVA`

**Big idea:** The lymphatic system is the body's **drainage + security system**: it returns leaked tissue fluid to the blood and filters it through lymph nodes, where immune cells check for germs and cancer cells.

### 8.1 Pathway

```text
FIG 8.1 — PATH OF LYMPH

 TISSUE FLUID ─► LYMPH CAPILLARIES ─► LYMPH VESSELS ─► LYMPH NODES ─► LYMPH TRUNKS ─► DUCTS ─► VEINS
                (blind-ended, very     (have valves)   (filters)
                 permeable; in gut
                 villi = LACTEALS
                 carrying fat/chyle)
```

**Lymph capillaries are ABSENT in:** epidermis, cornea, cartilage, bone marrow, splenic pulp, hair, nails, and (classically) the brain/spinal cord substance.

### 8.2 The two big ducts

```text
FIG 8.2 — WHO DRAINS WHERE

        ┌─────────────────────┬────────────────────────────────┐
        │  RIGHT UPPER        │                                │
        │  QUARTER            │       EVERYTHING ELSE          │
        │  • right head/neck  │  • left head/neck, left arm    │
        │  • right upper limb │  • left chest                  │
        │  • right chest      │  • whole body below diaphragm  │
        └──────────┬──────────┴───────────────┬────────────────┘
                   ▼                          ▼
        RIGHT LYMPHATIC DUCT           THORACIC DUCT
                   │                (begins at CISTERNA CHYLI
                   │                 in the upper abdomen)
                   ▼                          ▼
        RIGHT venous angle             LEFT venous angle
   (right IJV + right subclavian)  (left IJV + left subclavian)
```

> 🎨 **SVG brief FIG 8.2:** Body silhouette, right upper quarter shaded light green, rest shaded darker green. Green ducts drawn ending at the junction of the internal jugular and subclavian veins (blue) on each side.

### 8.3 Lymph node structure

```text
FIG 8.3 — LYMPH NODE (bean-shaped)

            afferent vessels (MANY) enter all over convex surface
              ↓        ↓        ↓        ↓
         ╭──────────────────────────────────╮  ← CAPSULE
        ╱  ◉      ◉      ◉      ◉      ◉     ╲  ← CORTEX: follicles (B cells)
       │   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░    │  ← PARACORTEX (T cells)
       │       ≈≈≈≈≈≈≈ MEDULLA ≈≈≈≈≈≈≈        ├──► HILUM: efferent vessel (one/few) out,
        ╲                                    ╱       artery in, vein out
         ╰──────────────────────────────────╯
```

### 8.4 Lymphoid organs
- **Primary** (where lymphocytes are made/mature): **bone marrow, thymus**.
- **Secondary** (where they meet antigens): **lymph nodes, spleen, tonsils, MALT** (e.g. Peyer's patches in ileum).

> [!IMPORTANT]
> 🩺 **Clinical:**
> - **Lymphadenitis** — tender, enlarged nodes in infection.
> - **Cancer spread** — carcinoma spreads by lymph; e.g. stomach cancer may enlarge the **left supraclavicular node (Virchow's node, Troisier's sign)**.
> - **Sentinel lymph node** — the first node draining a tumour, biopsied to stage breast cancer.
> - **Lymphoedema** — blocked lymphatics → swelling; in India, **filariasis** causes **elephantiasis** of the limbs.

### 🎤 Viva — Chapter 08
1. **Where does the thoracic duct end?** → Junction of left internal jugular and left subclavian veins.
2. **Where does it begin?** → Cisterna chyli.
3. **What are lacteals?** → Lymph capillaries in intestinal villi that absorb fat.
4. **Name primary lymphoid organs.** → Bone marrow and thymus.
5. **Afferent or efferent at the hilum of a lymph node?** → Efferent.

---

## 09 · Nervous System  `LAQ` `SAQ` `MCQ` `VIVA`

**Big idea:** The nervous system is the body's **wiring**. The brain & spinal cord are the **central computer (CNS)**; nerves are the **cables (PNS)**. Every spinal nerve is a mixed cable — sensory coming in, motor going out.

### 9.1 Divisions
- **CNS**: brain + spinal cord.
- **PNS**: **12 pairs of cranial nerves** + **31 pairs of spinal nerves** (8 cervical, 12 thoracic, 5 lumbar, 5 sacral, 1 coccygeal) + ganglia.
- **Functional**: somatic (voluntary, body wall) vs **autonomic** (involuntary, viscera).

> [!TIP]
> 🧠 **31 spinal nerves = "8-12-5-5-1"** — Breakfast at **8**, lunch at **12**, dinner at **5**, sleep at… well, **5 & 1** more coffee. Just chant **8–12–5–5–1**.

### 9.2 The neuron

```text
FIG 9.1 — TYPES OF NEURONS

   MULTIPOLAR                 BIPOLAR                  PSEUDO-UNIPOLAR
   (many dendrites,           (one dendrite,           (single stalk that splits
    one axon)                  one axon)                 into a "T")

     ╲  │  ╱                      │                        ( ● )
    ──( ● )──   ← dendrites     ( ● )                        │
     ╱  │  ╲                      │                 ◄────────┴────────►
        │                         │               to periphery    to spinal cord
        │  axon                   │                 (skin)
        ▼
   Motor neurons,             Retina, olfactory        Dorsal root ganglia,
   most CNS neurons           epithelium, cochlear &   sensory ganglia of
                              vestibular ganglia       cranial nerves
```

- Parts: **cell body (soma)** with Nissl bodies, **dendrites** (carry impulse TO the cell body), **axon** (carries impulse AWAY).
- **Grey matter** = cell bodies; **white matter** = myelinated fibres.
- Collection of cell bodies: **nucleus** (in CNS) / **ganglion** (in PNS). Bundle of fibres: **tract** (CNS) / **nerve** (PNS).

**Neuroglia (support cells):**

| CNS | PNS |
|---|---|
| Astrocytes (support, blood-brain barrier) | **Schwann cells** (make myelin in PNS) |
| **Oligodendrocytes** (make myelin in CNS) | Satellite cells (around ganglion cells) |
| Microglia (immune/phagocytic) | — |
| Ependymal cells (line ventricles) | — |

### 9.3 Formation of a typical spinal nerve — MUST DRAW

```text
FIG 9.2 — TYPICAL SPINAL NERVE (one side)

                                             DORSAL ROOT GANGLION (sensory cell bodies)
       SPINAL CORD           DORSAL ROOT              │
     ┌─────────────┐        (sensory, IN)              ▼
     │   ╲     ╱   │════════════════════════════════( ● )═══╗
     │ DH ╲   ╱    │                                         ║        ┌───► DORSAL RAMUS
     │     ╲ ╱     │                                         ╠═══════╡     → back muscles & skin
     │     ╱ ╲     │                                         ║ SPINAL │
     │ VH ╱   ╲    │                                         ║ NERVE  └───► VENTRAL RAMUS
     │   ╱     ╲   │═════════════════════════════════════════╝ (mixed)       → front & sides of trunk,
     └─────────────┘        VENTRAL ROOT                                     LIMBS (form plexuses)
       DH = dorsal horn     (motor, OUT)                       │
       VH = ventral horn                                       ╞══ rami communicantes ⇄ sympathetic ganglion
                                                               └── meningeal branch
```

**Step by step:**
1. **Dorsal root** (sensory) carries the **dorsal root ganglion**.
2. **Ventral root** (motor) leaves the ventral horn.
3. The two roots join in the **intervertebral foramen** → **spinal nerve** (mixed, very short).
4. It divides into:
   - **Dorsal ramus** → muscles and skin of the **back**.
   - **Ventral ramus** → front and sides of the trunk + **limbs**. Ventral rami form **plexuses** (cervical, brachial, lumbar, sacral); thoracic ventral rami stay separate as **intercostal nerves**.
5. **Rami communicantes** connect to the sympathetic chain: **white rami** (preganglionic, myelinated, only **T1–L2**), **grey rami** (postganglionic, unmyelinated, to **all 31** spinal nerves).

> [!WARNING]
> ⚠️ **Trap:** Roots are purely sensory (dorsal) or purely motor (ventral), but **both rami are MIXED**. "Dorsal ramus" ≠ "dorsal root".

> 🎨 **SVG brief FIG 9.2:** Cross-section of spinal cord (grey H in a white oval) on the left. Yellow nerve roots with a bulging yellow ganglion on the dorsal root, joining into a thick yellow spinal nerve that forks into two rami. Animated dots: blue arrows moving IN along the dorsal root (sensory), red arrows moving OUT along the ventral root (motor). A small sympathetic ganglion bead connected by white & grey rami.

### 9.4 Dermatomes & myotomes
- **Dermatome** = area of **skin** supplied by **one spinal segment** (one spinal nerve).
- **Myotome** = group of **muscles** supplied by **one spinal segment**.

| Landmark | Dermatome |
|---|---|
| Lateral side of arm (over deltoid) | C5 |
| **Thumb** | **C6** |
| **Middle finger** | **C7** |
| **Little finger** | **C8** |
| **Nipple** | **T4** |
| **Umbilicus** | **T10** |
| Inguinal region / groin | L1 |
| Medial side of leg & ankle | L4 |
| Dorsum of foot & great toe | L5 |
| Lateral border of foot, little toe, sole | S1 |

> [!TIP]
> 🧠 **T4 = "Tea for two at the nipple line"**; **T10 = "belly-bu-TEN"** (umbilicus). Hand: **C6-7-8 = thumb → middle → little**, going across the hand.

> [!IMPORTANT]
> 🩺 **Clinical:** **Herpes zoster (shingles)** — virus sleeping in a dorsal root ganglion reactivates → painful blistering rash in exactly **one dermatome**, in a band. Dermatomes are also used to find the **level of spinal cord injury**.

### 9.5 Peripheral nerve structure & injury
- Coverings: **endoneurium** (around each fibre) → **perineurium** (around each bundle/fascicle) → **epineurium** (around the whole nerve).
- **Seddon's classification of injury:**
  - **Neurapraxia** — temporary block, nerve intact, full recovery.
  - **Axonotmesis** — axon cut, sheaths intact → regenerates (~1 mm/day).
  - **Neurotmesis** — whole nerve cut → needs surgical repair.
- **Wallerian degeneration** — the part of the axon distal to the cut degenerates.

### 9.6 Autonomic nervous system (ANS)

```text
FIG 9.3 — SYMPATHETIC vs PARASYMPATHETIC OUTFLOW

  SYMPATHETIC  = "THORACO-LUMBAR"            PARASYMPATHETIC = "CRANIO-SACRAL"
  lateral horn of T1 ─ L2                    cranial nerves III, VII, IX, X + S2, S3, S4

  cord ══●───────────────────► organ         brain ══════════════════════●──► organ
       short pre    long post                     long pre            short post
       (ganglion near the cord —                  (ganglion NEAR or IN the organ)
        sympathetic chain)

  "FIGHT or FLIGHT"                          "REST and DIGEST"
```

| | Sympathetic | Parasympathetic |
|---|---|---|
| Outflow | T1–L2 | CN III, VII, IX, X + S2–S4 |
| Preganglionic fibre | Short | Long |
| Postganglionic fibre | Long | Short |
| Ganglia | Sympathetic chain / prevertebral | Near or in the wall of the organ |
| Transmitter at ganglia | Acetylcholine | Acetylcholine |
| Transmitter at organ | **Noradrenaline** (except **sweat glands = ACh**) | Acetylcholine |
| Pupil | Dilates | Constricts |
| Heart rate | Increases | Decreases |
| Bronchi | Dilate | Constrict |
| Gut movement & secretion | Decreases | Increases |
| Bladder | Relaxes wall (retention) | Contracts wall (emptying) |
| Salivary secretion | Scanty, thick | Plenty, watery |

> [!TIP]
> 🧠 **Parasympathetic cranial nerves = "1973"** → CN **10, 9, 7, 3**. Sacral outflow: **"S2, 3, 4 keeps the pelvis off the floor."**

### 9.7 UMN vs LMN lesion

| Feature | Upper Motor Neuron lesion | Lower Motor Neuron lesion |
|---|---|---|
| Site | Brain/spinal cord tracts above the anterior horn | Anterior horn cell, root, or peripheral nerve |
| Paralysis | **Spastic** | **Flaccid** |
| Tone | Increased (hypertonia) | Decreased (hypotonia) |
| Reflexes | Exaggerated | Reduced / absent |
| Muscle wasting | Little (disuse only) | **Marked** |
| Plantar reflex | **Extensor (Babinski positive)** | Flexor / absent |
| Fasciculations | Absent | Present |
| Example | Stroke | Polio, nerve injury |

### 🎤 Viva — Chapter 09
1. **How many pairs of spinal nerves?** → 31.
2. **Which type of neuron is in the dorsal root ganglion?** → Pseudo-unipolar.
3. **Which cells make myelin in the CNS? In the PNS?** → Oligodendrocytes; Schwann cells.
4. **Where are white rami communicantes found?** → Only T1–L2.
5. **Dermatome of the umbilicus?** → T10.
6. **Sympathetic postganglionic fibres to sweat glands release?** → Acetylcholine.
7. **Babinski sign is positive in UMN or LMN lesion?** → UMN.

---

## 10 · Mucous & Serous Membranes  `SAQ`

**Big idea:** Membranes line body tubes and cavities. **Mucous** membranes line tubes that open to the outside; **serous** membranes line closed cavities and let organs slide.

```text
FIG 10.1 — SEROUS MEMBRANE = "FIST IN A BALLOON"

        ╭───────────────────╮   ← PARIETAL layer (lines the cavity wall)
       │   ╭───────────╮    │
       │  │  ORGAN ✊  │ ←  │── VISCERAL layer (sticks to the organ)
       │   ╰───────────╯    │
       │  ~ serous fluid ~  │   ← potential CAVITY between the two layers
        ╰─────────┬─────────╯
              root / hilum
```

| | Mucous membrane | Serous membrane |
|---|---|---|
| Lines | Tubes opening to the exterior (gut, airways, urinary & genital tracts) | Closed body cavities |
| Layers | Epithelium + lamina propria (+ muscularis mucosae in gut) | Mesothelium + thin connective tissue; **parietal & visceral layers** |
| Secretion | Mucus | Thin serous fluid (lubricant) |
| Examples | Stomach lining, trachea lining | **Pleura** (lungs), **pericardium** (heart), **peritoneum** (abdomen) |

> [!IMPORTANT]
> 🩺 **Clinical:** Fluid collecting between serous layers — **pleural effusion**, **pericardial effusion**, **ascites** (peritoneal cavity). Inflammation (pleurisy, pericarditis) makes the layers rub → **friction rub** heard with a stethoscope. Parietal layers are pain-sensitive (somatic nerves); visceral layers are not.

---

## 11 · Radiological Anatomy — The Basics  `VIVA`

**Big idea:** On an X-ray, the more a tissue **blocks** X-rays, the **whiter** it looks.

```text
FIG 11.1 — X-RAY DENSITY SCALE

  BLACK ◄──────────────────────────────────────────────────► WHITE
  AIR        FAT          SOFT TISSUE / FLUID       BONE        METAL / CONTRAST
  (lungs,    (darker       (muscle, heart,          (calcium)   (implants, barium)
   gut gas)   grey)         organs)
  RADIOLUCENT ─────────────────────────────────────── RADIOPAQUE
```

| Technique | Uses | Key point |
|---|---|---|
| **Plain X-ray** | Bones, chest | Fast, cheap; views: PA, AP, lateral |
| **Contrast studies** | Barium swallow/meal/enema (gut), IVU (urinary tract), angiography (vessels) | Contrast makes hollow structures radiopaque |
| **CT** | Head injury, chest, abdomen | Cross-sectional (axial) slices; viewed as if from the **patient's feet** |
| **MRI** | Brain, spinal cord, joints, soft tissue | No radiation. **T1: fat bright. T2: water bright.** |
| **Ultrasound (USG)** | Pregnancy, abdomen, vessels (Doppler) | No radiation, real-time |

> [!TIP]
> 🧠 **MRI: "World War 2"** → **T2 = H₂O** (water) is bright/white.

> [!WARNING]
> ⚠️ **Trap:** In a child's X-ray, dark **epiphyseal lines** are normal growth plates, not fractures. Compare with the other side if unsure.

---

## 12 · EXAM ZONE

### 12.1 ⚡ Top 30 high-yield facts (night-before-exam list)
1. Anatomical position: palms **forward**.
2. Median plane → equal halves; coronal → front/back; transverse → top/bottom.
3. Supination = palm forward/up ("soup").
4. Dorsum of foot = top surface.
5. Langer's lines → incisions along them heal best.
6. Deep fascia absent in face (except parotid & masseter).
7. Metaphysis = most vascular, site of childhood osteomyelitis.
8. Nutrient foramen → away from the growing end. "To the elbow I go, from the knee I flee."
9. Growing ends: shoulder, wrist, knee.
10. First to appear fuses last — exception lower end of fibula.
11. Clavicle — first bone to ossify.
12. Lower end of femur — secondary centre present at birth (full-term sign).
13. Patella — largest sesamoid bone.
14. Coracoid process — atavistic epiphysis.
15. Pneumatic bones: ethmoid, frontal, sphenoid, maxilla, temporal.
16. Elastic cartilage: pinna, epiglottis, auditory tube.
17. Fibrocartilage has no perichondrium.
18. Secondary cartilaginous joints lie in the midline.
19. TMJ, sternoclavicular, acromioclavicular → fibrocartilage on articular surfaces.
20. Synovial membrane never covers articular cartilage.
21. Thumb CMC = saddle; knee = bicondylar; wrist = ellipsoid.
22. Hilton's law → referred pain (hip → knee).
23. Parallel fibres → range; pennate fibres → power.
24. Third-order lever = most common.
25. Motor unit = one motor neuron + its muscle fibres.
26. Central artery of retina = true end artery.
27. Sinusoids: liver, spleen, bone marrow.
28. Thoracic duct → left venous angle; drains all but the right upper quarter.
29. White rami only T1–L2; grey rami to all 31 spinal nerves.
30. Parasympathetic cranial nerves: 3, 7, 9, 10 ("1973").

### 12.2 Long answer questions (LAQ) — practice with diagrams
1. Classify bones with examples. Describe the parts of a young long bone and its blood supply.
2. Define ossification. Describe the types and laws of ossification with their clinical importance.
3. Classify joints with examples. Describe the features of a typical synovial joint.
4. Describe the formation and branches of a typical spinal nerve with a labelled diagram.
5. Classify muscles according to fibre arrangement. Add notes on motor unit and levers.
6. Describe the types of arteries, capillaries and anastomoses. Add a note on end arteries.

### 12.3 Short answer questions (SAQ)
Hilton's law · Metaphysis · Nutrient artery · Types of epiphyses · Sesamoid bones · Pneumatic bones · Langer's lines · Deep fascia & its modifications · Bursae · Synovial sheath · Elastic cartilage · Secondary cartilaginous joint · Saddle joint · Motor unit · Levers · End arteries · Arteriovenous anastomosis · Sinusoids · Thoracic duct · Lymph node structure · Dermatome · Rami communicantes · Pseudo-unipolar neuron · UMN vs LMN · Serous membranes.

### 12.4 MCQs (answers at the end)
1. The most vascular part of a growing long bone is: (a) epiphysis (b) diaphysis (c) metaphysis (d) articular cartilage
2. Which is an atavistic epiphysis? (a) head of femur (b) coracoid process (c) greater trochanter (d) mastoid process
3. Fibrocartilage is found in: (a) pinna (b) epiglottis (c) pubic symphysis (d) costal cartilage
4. Hilton's law is related to: (a) blood supply of bone (b) nerve supply of joints (c) lymphatic drainage (d) ossification
5. The first carpometacarpal joint is: (a) hinge (b) pivot (c) saddle (d) ball & socket
6. Rectus femoris is: (a) unipennate (b) bipennate (c) multipennate (d) strap
7. A true end artery is: (a) radial (b) central artery of retina (c) femoral (d) splenic
8. Thoracic duct drains into: (a) right venous angle (b) left venous angle (c) SVC directly (d) azygos vein
9. White rami communicantes are present in: (a) all spinal nerves (b) C1–C8 (c) T1–L2 (d) S2–S4
10. Dermatome of the middle finger: (a) C5 (b) C6 (c) C7 (d) C8

<details>
<summary><b>Show answers</b></summary>

1-c · 2-b · 3-c · 4-b · 5-c · 6-b · 7-b · 8-b · 9-c · 10-c

</details>

### 12.5 🎤 Rapid-fire viva (for flip cards)

| Question | Answer |
|---|---|
| Largest sesamoid bone? | Patella |
| Bone with no medullary cavity that ossifies in membrane? | Clavicle |
| Which cartilage lacks perichondrium? | Fibrocartilage (and articular hyaline cartilage) |
| Example of gomphosis? | Tooth in its socket |
| Example of schindylesis? | Vomer with rostrum of sphenoid |
| Most commonly dislocated large joint? | Shoulder |
| Muscle with circumpennate fibres? | Tibialis anterior |
| Example of 1st-order lever? | Nodding at the atlanto-occipital joint |
| Where are venae comitantes found? | Alongside small and medium arteries (e.g. brachial, radial) |
| Valveless veins? | Venae cavae, portal, cerebral veins, dural sinuses |
| Lymph capillaries absent in? | Epidermis, cornea, cartilage, bone marrow |
| What are vincula? | Mesotendons carrying vessels to flexor tendons in fingers |
| Myelin in CNS made by? | Oligodendrocytes |
| Herpes zoster virus lies dormant in? | Dorsal root ganglion |
| T1 or T2: water bright on MRI? | T2 |

---

## 13 · Mnemonic Wall (for `/mnemonics` page)

| Topic | Mnemonic |
|---|---|
| Supination | **"SOUP"** — hold soup in a supinated palm |
| Nutrient foramina | **"To the elbow I go, from the knee I flee"** |
| Pneumatic bones | **"Every Fool Should Make Tea"** — Ethmoid, Frontal, Sphenoid, Maxilla, Temporal |
| Ossification law | **"First to come, last to go"** (except lower fibula) |
| Elastic cartilage | **"PEACE"** — Pinna, Epiglottis, Auditory tube, Corniculate/Cuneiform, External acoustic meatus |
| Spinal nerves | **8–12–5–5–1** |
| Parasympathetic cranial nerves | **"1973"** — CN 10, 9, 7, 3 |
| Sacral parasympathetic | **"S2, 3, 4 keeps the pelvis off the floor"** |
| Dermatomes | **T4 nipple, "belly-bu-TEN" = T10 umbilicus** |
| MRI | **"World War 2"** — T2 = H₂O bright |
| Muscle architecture | **"Parallel = range, Pennate = power"** |

---

## 14 · Figure List (for the designer)

| ID | Title | Chapter |
|---|---|---|
| FIG 1.1 | Planes of the body | 01 |
| FIG 1.2 | Movements grid | 01 |
| FIG 2.1 | Layers from skin to bone | 02 |
| FIG 3.1 | Parts of a young long bone | 03 |
| FIG 3.2 | Blood supply of a long bone | 03 |
| FIG 3.3 | Endochondral ossification — 5 steps | 03 |
| FIG 4.1 | Three types of cartilage | 04 |
| FIG 5.1 | Classification tree of joints | 05 |
| FIG 5.2 | Typical synovial joint | 05 |
| FIG 5.3 | Shapes of synovial joints | 05 |
| FIG 6.1 | Muscle fibre arrangements | 06 |
| FIG 6.2 | Three orders of levers | 06 |
| FIG 7.1 | Artery vs vein cross-section | 07 |
| FIG 7.2 | Types of capillaries | 07 |
| FIG 7.3 | Anastomosis vs end artery | 07 |
| FIG 8.1 | Path of lymph | 08 |
| FIG 8.2 | Lymphatic drainage map | 08 |
| FIG 8.3 | Lymph node structure | 08 |
| FIG 9.1 | Types of neurons | 09 |
| FIG 9.2 | Typical spinal nerve | 09 |
| FIG 9.3 | Sympathetic vs parasympathetic outflow | 09 |
| FIG 10.1 | Serous membrane — fist in a balloon | 10 |
| FIG 11.1 | X-ray density scale | 11 |

---

*Made for first-year MBBS students. Learn the rule, the example, and the exception — and draw everything.* 🦴
