# PetSitter Fiki

A one-page Startup Engineering project Fiki for **Stoica Ana-Florina**
(Product & Backend) and **Anca Radu** (Design & Frontend).

The Fiki documents the project. The customer-facing landing page and the
application wireframe are separate static pages linked from the M3 section.
The project has no build step or runtime dependencies.

## Content

- **M1 - 19 October 2026:** project description, team, customer segments,
  competition hypotheses, planned metrics, costs, and revenue.
- **M2 - 2 November 2026:** customer discovery, research questions, supplied
  evidence, findings, product changes, and the next validation experiment.
- **M3 - 9 November 2026:** application wireframes, owner and sitter flows,
  and a customer-facing landing page with an early-access call to action.
- **M4 - 16 November 2026:** three recorded face-to-face interviews with
  potential users, participant profiles, discussion summaries, and product
  insights; illustrated owner/sitter user types, a research-informed primary
  persona, ten prioritized user stories with acceptance criteria, and four
  use cases with screen flows and exception paths. The UX material is a
  design draft, not tested app behavior.

The dates above are assignment deadlines, not claims about submission dates.
Research screenshots remain in Romanian, with English captions and summaries.
Participant identifiers are removed from the published conversation copies.
Findings without supplied evidence are labeled as team-reported.
The M4 persona is explicitly fictional: its needs are informed by M2, while
its biographical details and product interaction assumptions await validation.
M4 links back to research evidence and separates proposed usability tasks from
completed research. M3 links to the clickable wireframe and landing page;
the M4 UX flows document proposed requirements for further iteration.

## Preview

Open `index.html` directly in a browser. All site assets use relative paths and
the milestone ribbons and image links work without JavaScript. Milestones
start collapsed; select a ribbon to expand or collapse its content. With
JavaScript enabled, navigation and direct links also open the relevant
milestone, and printing expands all sections before restoring their state.

## Publish

Repository: `https://github.com/ancaraduu/Petsitter`.

GitHub Pages is configured to publish from **main** and **/ (root)** at
`https://ancaraduu.github.io/Petsitter/`. Preserve the capital `P` in the
Pages address.

Publishing requires repository write access. Review, commit, and push the
local changes to `main`; no build configuration or package installation is
needed. Local changes only appear online after they have been pushed and
deployed.

## Updating the journal

- `index.html`: all milestone content, captions, navigation, and M3/M4 links.
- `landing.html` / `landing.css`: customer-facing landing page and responsive styles.
- `my_wireframes.html`: clickable, low-fidelity application flow supplied for M3.
- `styles.css`: Fiki responsive layout, colors, typography, and print styles.
- `script.js`: milestone link handling, print expansion, reading progress,
  active navigation, and the evidence viewer.
- `assets/`: team photos, the favicon, user-type illustrations, landing-page
  photography, and research evidence.
- `interviu-anda.mp4`, `interviu-aida.mp4`, `interviu-raul.mp4`: face-to-face
  interview recordings in the M4 research section.

The header photo, `assets/pets-hero.jpg`, is by Helena Jankovicova Kovacova,
used under the Pexels License. A resized copy is hosted locally; the display
crop adapts to the screen size.

- Photo: `https://www.pexels.com/photo/dog-and-cat-sitting-together-16395150/`
- License: `https://www.pexels.com/license/`

To add a milestone, follow an existing `.milestone-section`: use a unique ID
and `data-section`, a closed `.milestone-disclosure` with a `.milestone-ribbon`
summary, and a `.milestone-content` wrapper for the actual work and evidence.
Connect it to the header navigation and milestone overview. Keep milestone
documentation on this Fiki, while linking customer-facing product pages
separately when appropriate.

## Research numbers

The supplied Google Forms charts contain 41 responses. Combined percentages
are calculated from counts instead of adding rounded pie slices: 39/41 is
95.1%. The questionnaire asks about more than **3 hours**, not 10 hours away.
The daily-budget question measures stated spending or a fair-price estimate,
not actual paid bookings. Overlapping Facebook/social-media response options
are not added together.
