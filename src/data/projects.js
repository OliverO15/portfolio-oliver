/* Project content: titles, credits and thumbnails. Shot layouts live in Multiview.jsx. */
export const projects = [
  {
    key: 'qf', credits: ['Lead designer and frontend developer', 'Sole designer, with the CEO', 'React, TypeScript', '2023–2025'], title: 'QuickFlick', short: 'QFLICK',
    img: '/assets/qf-title.jpg', alt: 'QuickFlick logo', ltPos: 'bottom: 32px',
    strap: 'AI video creation for real estate agents',
    meta: 'AI VIDEO PLATFORM · 2023–2025',
    constraint: 'Estate agents with no video experience had to make videos with an AI pipeline.',
    context: 'The test for every design decision was: can my grandmother do this?',
    role: 'Lead frontend designer and developer. Sole designer on the product for two years; built it in React and TypeScript with the CEO.',
    did: 'Hid the AI pipeline behind something that feels like an ordinary editor. Built an admin tool so non-engineers could change prompts, model settings and checkpoints.',
    result: '[Outcome: a number or fact about usage]'
  },
  {
    key: 'vorn', credits: ['Interaction flow and layout', 'Team of three', '.NET MAUI, Figma', '2025–2026'], title: 'Vörn', short: 'VÖRN',
    img: '/assets/vorn-splash.jpg', alt: 'Vörn title card: flame logo over a fire service uniform, Fire Safety Inspection App', ltPos: 'bottom: 32px',
    strap: 'Fire inspection app, with Reykjavík Capital Area Fire & Rescue',
    meta: 'FIRE INSPECTION APP · 2025–2026',
    constraint: 'Inspectors use the app while moving between rooms, talking to staff and handling equipment.',
    context: 'The interface competes with the job for attention, so minimising errors under distraction was an explicit goal. Research: surveys, workflow mapping, watching inspectors on location.',
    role: 'Led the interaction flow and layout structure in a team of three. Set up the .NET MAUI codebase.',
    did: 'Redesigned a decade-old in-house app. Turned the overview screen from a passive summary into a status-and-action hub.',
    result: 'Graded 9.0/10. The fire service then hired me to take it toward production.'
  },
  {
    key: 'gfx', credits: ['Designed and built it', 'Solo', 'Electron, React, OBS', '2023–present'], title: 'Graphics Engine', short: 'GFX',
    img: '/assets/g-front.jpg', alt: 'Archery Broadcast Graphics Engine title card', ltPos: 'top: 28px',
    strap: 'Live graphics for national archery championships',
    meta: 'BROADCAST GRAPHICS · 2023–PRESENT',
    constraint: 'The existing graphics package needed a dedicated Windows tower next to the stream.',
    context: 'Volunteers run the broadcasts, often on one laptop. The operator panel has to stay out of the way of the production.',
    role: 'Designed and built alone: the graphics package and the operator control panel.',
    did: 'An Electron and React engine that runs on the streaming machine and feeds OBS through a browser source. The panel fits a 13-inch laptop with the essentials always visible.',
    result: 'In production use at the Icelandic national championships.'
  },
  {
    key: 'bog', credits: ['Design, build, photography and ads', 'Solo, for the centre', 'React, WordPress, Noona', '2026'], title: 'Bogfimisetrið', short: 'BOGFIMI',
    img: '/assets/b-front.jpg', alt: 'Bogfimisetrið title card', ltPos: 'bottom: 32px',
    strap: 'Website redesign for an archery centre in Reykjavík',
    meta: 'CLIENT WEBSITE · 2026',
    constraint: 'Move bookings off the phone and onto a new online system, on a site that had to stay on WordPress.',
    context: 'Most visitors are newcomers. They need pricing, opening hours and safety information before they are ready to book.',
    role: 'Designed and built the site for the centre. I also run its search and paid social.',
    did: 'Prototyped the whole design in React, then ported it into a custom WordPress theme. Put what a newcomer needs first ahead of the booking step.',
    result: '[Outcome: share of bookings now made online — tracked through the ads]'
  }
];
