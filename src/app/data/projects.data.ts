// ONEKIND Project Registry
// All project data defined statically. Photos/videos are in public/assets/shows/[slug]/

export interface ProjectMedia {
  type: 'photo' | 'video';
  src: string;
  poster?: string; // poster frame for video
}

export interface Project {
  slug: string;
  order: number;
  title: string;
  subtitle: string;
  artist: string;
  year: string;
  location: string;
  category: string;
  tagline: string;
  posterSrc: string;      // used in home grid tile
  heroSrc: string;        // full-screen hero image
  description: string;   // short paragraph for hero overlay
  longDescription: string; // full event description on project page
  photos: string[];       // relative paths in assets/shows/[slug]/
  videos: string[];
  color: string;          // dominant accent color
}

function photos(slug: string, count: number): string[] {
  return Array.from({ length: count }, (_, i) =>
    `assets/shows/${slug}/photo-${String(i + 1).padStart(2, '0')}.jpg`
  );
}

function videos(slug: string, count: number): string[] {
  return Array.from({ length: count }, (_, i) =>
    `assets/shows/${slug}/video-${String(i + 1).padStart(2, '0')}.mp4`
  );
}

export const PROJECTS: Project[] = [
  {
    slug: 'nebulakal',
    order: 1,
    title: 'Journey to Nebulakal',
    subtitle: 'Pradeep Kumar Live in Kochi',
    artist: 'Pradeep Kumar',
    year: '2025',
    location: 'Kochi, Kerala',
    category: 'LIVE CONCERT',
    tagline: 'A night Kochi will never forget.',
    posterSrc: 'assets/projects/5. Journey to Nebulakal Live in Kochi (latest show) .jpeg',
    heroSrc: 'assets/shows/nebulakal/photo-11.jpg',
    description: 'December 2025. Kochi. Pradeep Kumar brought the universe to the stage.',
    longDescription: `In the dark heart of December 2025, Kochi witnessed something it had never seen before. Journey to Nebulakal was not merely a concert — it was a celestial voyage. Pradeep Kumar, one of Tamil music's most compelling voices, commanded a full house with a set that moved between tender introspection and electrifying peaks. The sound was raw, the lights were cinematic, and the connection between artist and audience was pure. A night of music that became mythology.`,
    photos: photos('nebulakal', 20),
    videos: videos('nebulakal', 2),
    color: '#7c3aed'
  },
  {
    slug: 'benny-dayal',
    order: 2,
    title: 'Live in Concert',
    subtitle: 'Benny Dayal — Comeback Show',
    artist: 'Benny Dayal',
    year: '2023',
    location: 'Chennai, Tamil Nadu',
    category: 'COMEBACK SHOW',
    tagline: 'The voice that never left came back louder.',
    posterSrc: 'assets/projects/4. Live in Concert with Benny Dayal - Comeback show.jpeg',
    heroSrc: 'assets/shows/benny-dayal/photo-12.jpg',
    description: '2023. Benny Dayal returns. The crowd never let him leave.',
    longDescription: `Some voices are impossible to forget. Benny Dayal's comeback was not just a concert — it was a homecoming. With a career spanning chart-topping Bollywood anthems and soulful indie explorations, Benny took the stage with the confidence of an artist who knows his music lives in people's memories. From high-energy dance numbers to stripped-back emotional ballads, every song felt personal. The crowd sang every word back. That is the measure of an icon.`,
    photos: photos('benny-dayal', 29),
    videos: videos('benny-dayal', 1),
    color: '#d97706'
  },
  {
    slug: 'jonita-gandhi',
    order: 3,
    title: 'Immerse',
    subtitle: 'Jonita Gandhi — Debut Show',
    artist: 'Jonita Gandhi',
    year: '2023',
    location: 'Chennai, Tamil Nadu',
    category: 'DEBUT SHOW',
    tagline: 'A debut that felt like an arrival.',
    posterSrc: 'assets/projects/2. Immerse with Jonita Gandhi - Debut show poster.jpeg',
    heroSrc: 'assets/shows/jonita-gandhi/photo-14.jpg',
    description: '2023. Jonita Gandhi. A debut unlike any other.',
    longDescription: `To debut on stage is one thing. To own it completely is another. Jonita Gandhi did the latter. IMMERSE was a show conceived to introduce one of India's most celebrated voices to a live audience that had only ever heard her through screens. What followed was an evening of stunning range — jazz-inflected phrasing, Bollywood hits reimagined, and original work delivered with the ease of a seasoned performer. By the final note, it felt less like a debut and more like a reunion.`,
    photos: photos('jonita-gandhi', 19),
    videos: videos('jonita-gandhi', 2),
    color: '#db2777'
  },
  {
    slug: 'pradeep-kumar',
    order: 4,
    title: 'Immerse',
    subtitle: 'Pradeep Kumar — Debut Show',
    artist: 'Pradeep Kumar',
    year: '2022',
    location: 'Chennai, Tamil Nadu',
    category: 'DEBUT SHOW',
    tagline: 'Where a voice first met its stage.',
    posterSrc: 'assets/projects/3. Immerse with Pradeep Kumar - Debut Show poster.jpeg',
    heroSrc: 'assets/shows/pradeep-kumar/photo-01.jpg',
    description: '2022. The stage meets a voice. A beginning.',
    longDescription: `Every great artist has a first moment — the night when rehearsal rooms give way to real stages and real crowds. For Pradeep Kumar, IMMERSE was that night. With a voice built on emotion and a performance style honed in solitude, he walked out to an audience eager to witness something genuine. What they received was a masterclass in presence. Each song was a window into a world of sound that felt entirely his own. This was the beginning of something significant.`,
    photos: photos('pradeep-kumar', 8),
    videos: videos('pradeep-kumar', 1),
    color: '#0ea5e9'
  },
  {
    slug: 'goa-gill',
    order: 5,
    title: 'Goa Gill',
    subtitle: 'India Tour',
    artist: 'Goa Gill',
    year: '2023',
    location: 'Pan India',
    category: 'INDIA TOUR',
    tagline: 'The godfather of Goa trance returns to India.',
    posterSrc: 'assets/projects/1.2. Goa Gill India Tour .jpeg',
    heroSrc: 'assets/projects/1.2. Goa Gill India Tour .jpeg',
    description: 'A legend tours India. An experience beyond music.',
    longDescription: `Goa Gill is not simply a DJ — he is a ritual. Known as the "Godfather of Goa Trance," his sets are spiritual journeys that blur the boundary between electronic music and ceremony. When ONEKIND brought him back to India for a full tour, it was a cultural moment. From intimate venues to open-air stages, each night was a collective meditation — a reminder that music, at its highest frequency, is a force that unites.`,
    photos: [
      'assets/projects/1. Goa Gill Live show poster.jpeg',
      'assets/projects/1.2. Goa Gill India Tour .jpeg'
    ],
    videos: [],
    color: '#10b981'
  }
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find(p => p.slug === slug);
}

export function getProjectsByOrder(): Project[] {
  return [...PROJECTS].sort((a, b) => a.order - b.order);
}
