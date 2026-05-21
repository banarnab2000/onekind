import {
  Component, OnInit, OnDestroy, HostListener, AfterViewInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

interface AssetsManifest {
  generatedAt: string;
  upcoming: string[];
  projects: string[];
  collabs_artists: string[];
  collabs_brands: string[];
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit, OnDestroy, AfterViewInit {
  title = 'ONEKIND';

  // ── Navbar ──────────────────────────────────────────────
  activeSection = 'home';
  navScrolled = false;
  mobileMenuOpen = false;

  // ── Hero Slideshow ──────────────────────────────────────
  heroSlides: { src: string; alt: string }[] = [];
  currentHeroSlide = 0;
  heroSlideInterval: any;
  heroTransitioning = false;

  // ── Projects ────────────────────────────────────────────
  projects: { src: string; title: string; category: string }[] = [];

  // ── Collabs ─────────────────────────────────────────────
  artistImages: string[] = [];
  brandImages: string[] = [];

  // ── Contact Form ────────────────────────────────────────
  // ➡️  Sign up free at https://formspree.io → create a form → paste the ID below
  private FORMSPREE_ID = 'xwpbkgdq'; // ← replace with your Formspree form ID

  contactForm = { name: '', email: '', message: '' };
  // 'idle' | 'sending' | 'success' | 'error'
  formState: 'idle' | 'sending' | 'success' | 'error' = 'idle';
  formError = '';

  private sectionObserver?: IntersectionObserver;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Load manifest then wire everything up dynamically
    this.http.get<AssetsManifest>('assets-manifest.json').subscribe({
      next: manifest => this.processManifest(manifest),
      error: err => {
        console.error('Failed to load assets-manifest.json, using local fallback manifest:', err);
        // Robust fallback so the page always renders even if the JSON is blocked or 404s
        const fallbackManifest: AssetsManifest = {
          generatedAt: new Date().toISOString(),
          upcoming: [
            'assets/upcoming/Purple Flames - Pitch deck 2026_page-0008.jpg',
            'assets/upcoming/Purple Flames - Pitch deck 2026_page-0010.jpg',
            'assets/upcoming/Purple Flames - Pitch deck 2026_page-0011.jpg',
            'assets/upcoming/Purple Flames - Pitch deck 2026_page-0012.jpg',
            'assets/upcoming/Purple Flames - Pitch deck 2026_page-0013.jpg'
          ],
          projects: [
            'assets/projects/1. Goa Gill Live show poster.jpeg',
            'assets/projects/1.2. Goa Gill India Tour .jpeg',
            'assets/projects/2. Immerse with Jonita Gandhi - Debut show poster.jpeg',
            'assets/projects/3. Immerse with Pradeep Kumar - Debut Show poster.jpeg',
            'assets/projects/4. Live in Concert with Benny Dayal - Comeback show.jpeg',
            'assets/projects/5. Journey to Nebulakal Live in Kochi (latest show) .jpeg'
          ],
          collabs_artists: [
            'assets/collabs_artists/Screenshot 2026-05-20 215957.png',
            'assets/collabs_artists/Screenshot 2026-05-20 220152.png',
            'assets/collabs_artists/Screenshot 2026-05-20 220219.png',
            'assets/collabs_artists/Screenshot 2026-05-20 220247.png',
            'assets/collabs_artists/Screenshot 2026-05-20 220302.png',
            'assets/collabs_artists/Screenshot 2026-05-20 220321.png',
            'assets/collabs_artists/Screenshot 2026-05-20 220343.png',
            'assets/collabs_artists/Screenshot 2026-05-20 220513.png',
            'assets/collabs_artists/Screenshot 2026-05-20 220532.png'
          ],
          collabs_brands: [
            'assets/collabs_brands/Screenshot 2026-05-20 220659.png',
            'assets/collabs_brands/Screenshot 2026-05-20 220710.png',
            'assets/collabs_brands/Screenshot 2026-05-20 220725.png',
            'assets/collabs_brands/Screenshot 2026-05-20 220734.png',
            'assets/collabs_brands/Screenshot 2026-05-20 220745.png',
            'assets/collabs_brands/Screenshot 2026-05-20 220752.png',
            'assets/collabs_brands/Screenshot 2026-05-20 220800.png',
            'assets/collabs_brands/Screenshot 2026-05-20 220812.png',
            'assets/collabs_brands/Screenshot 2026-05-20 220823.png',
            'assets/collabs_brands/Screenshot 2026-05-20 220835.png',
            'assets/collabs_brands/Screenshot 2026-05-20 220856.png',
            'assets/collabs_brands/Screenshot 2026-05-20 220904.png'
          ]
        };
        this.processManifest(fallbackManifest);
      }
    });
  }

  private processManifest(manifest: AssetsManifest) {
    // Hero slides — every image in /upcoming
    this.heroSlides = manifest.upcoming.map(src => ({
      src,
      alt: 'ONEKIND Upcoming Show'
    }));
    if (this.heroSlides.length) this.startHeroSlideshow();

    // Projects — derive a human-readable title from filename
    this.projects = manifest.projects.map(src => {
      const filename = decodeURIComponent(src.split('/').pop() ?? '');
      const raw = filename.replace(/\.\w+$/, '');  // strip extension
      // strip leading "N. " numbering pattern
      const title = raw.replace(/^\d+[\.\d]*\s+/, '').replace(/ -$/, '').trim();
      const lower = title.toLowerCase();
      let category = 'LIVE SHOW';
      if (lower.includes('tour'))     category = 'INDIA TOUR';
      if (lower.includes('debut'))    category = 'DEBUT SHOW';
      if (lower.includes('comeback')) category = 'COMEBACK SHOW';
      if (lower.includes('latest') || lower.includes('kochi')) category = 'LATEST SHOW';
      return { src, title, category };
    });

    // Collabs
    this.artistImages = manifest.collabs_artists;
    this.brandImages  = manifest.collabs_brands;
  }

  ngAfterViewInit() {
    this.setupSectionObserver();
  }

  ngOnDestroy() {
    clearInterval(this.heroSlideInterval);
    this.sectionObserver?.disconnect();
  }

  @HostListener('window:scroll')
  onScroll() {
    this.navScrolled = window.scrollY > 60;
  }

  // ── Section intersection observer ──────────────────────
  setupSectionObserver() {
    const ids = ['home', 'projects', 'about', 'contact'];
    this.sectionObserver = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) this.activeSection = e.target.id; }),
      { threshold: 0.3 }
    );
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) this.sectionObserver!.observe(el);
    });
  }

  // ── Hero slideshow ──────────────────────────────────────
  startHeroSlideshow() {
    clearInterval(this.heroSlideInterval);
    this.heroSlideInterval = setInterval(() => this.nextHeroSlide(), 4500);
  }

  nextHeroSlide() {
    if (this.heroTransitioning || !this.heroSlides.length) return;
    this.heroTransitioning = true;
    setTimeout(() => {
      this.currentHeroSlide = (this.currentHeroSlide + 1) % this.heroSlides.length;
      this.heroTransitioning = false;
    }, 600);
  }

  prevHeroSlide() {
    if (this.heroTransitioning || !this.heroSlides.length) return;
    this.heroTransitioning = true;
    setTimeout(() => {
      this.currentHeroSlide = (this.currentHeroSlide - 1 + this.heroSlides.length) % this.heroSlides.length;
      this.heroTransitioning = false;
    }, 600);
  }

  goToSlide(index: number) {
    if (this.heroTransitioning || index === this.currentHeroSlide) return;
    this.heroTransitioning = true;
    setTimeout(() => {
      this.currentHeroSlide = index;
      this.heroTransitioning = false;
    }, 600);
    this.startHeroSlideshow();
  }

  // ── Navigation ──────────────────────────────────────────
  scrollToSection(sectionId: string) {
    this.mobileMenuOpen = false;
    const el = document.getElementById(sectionId);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  // ── Contact form ────────────────────────────────────────
  submitForm() {
    const { name, email, message } = this.contactForm;
    if (!name || !email || !message) return;

    this.formState = 'sending';
    this.formError = '';

    const payload = { name, email, message, _replyto: email };

    this.http
      .post(`https://formspree.io/f/${this.FORMSPREE_ID}`, payload, {
        headers: { Accept: 'application/json' }
      })
      .subscribe({
        next: () => {
          this.formState = 'success';
          this.contactForm = { name: '', email: '', message: '' };
          // Reset after 6 s so the form can be used again
          setTimeout(() => (this.formState = 'idle'), 6000);
        },
        error: (err) => {
          this.formState = 'error';
          this.formError =
            err?.error?.error ||
            'Something went wrong. Please email us directly at reach@onekindarts.world';
        }
      });
  }

  resetForm() {
    this.formState = 'idle';
    this.formError = '';
  }
}
