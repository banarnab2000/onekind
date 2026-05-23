import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { getProjectsByOrder, Project } from '../../data/projects.data';

interface AssetsManifest {
  upcoming: string[];
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {

  // Hero slideshow
  heroSlides: { src: string }[] = [];
  currentSlide = 0;
  transitioning = false;
  private slideInterval: any;

  // Projects
  projects: Project[] = getProjectsByOrder();

  // Hover state for project tiles
  hoveredProject: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.http.get<AssetsManifest>('assets-manifest.json').subscribe({
      next: m => {
        this.heroSlides = m.upcoming.map(src => ({ src }));
        this.startSlideshow();
      },
      error: () => {
        this.heroSlides = [
          'assets/upcoming/Purple Flames - Pitch deck 2026_page-0008.jpg',
          'assets/upcoming/Purple Flames - Pitch deck 2026_page-0010.jpg',
          'assets/upcoming/Purple Flames - Pitch deck 2026_page-0011.jpg',
          'assets/upcoming/Purple Flames - Pitch deck 2026_page-0012.jpg',
          'assets/upcoming/Purple Flames - Pitch deck 2026_page-0013.jpg'
        ].map(src => ({ src }));
        this.startSlideshow();
      }
    });

    // Scroll to projects if hash is present
    if (window.location.hash === '#projects') {
      setTimeout(() => {
        const el = document.getElementById('projects');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 400);
    }
  }

  ngOnDestroy() {
    clearInterval(this.slideInterval);
  }

  startSlideshow() {
    clearInterval(this.slideInterval);
    this.slideInterval = setInterval(() => this.nextSlide(), 5000);
  }

  nextSlide() {
    if (this.transitioning || !this.heroSlides.length) return;
    this.transitioning = true;
    setTimeout(() => {
      this.currentSlide = (this.currentSlide + 1) % this.heroSlides.length;
      this.transitioning = false;
    }, 700);
  }

  prevSlide() {
    if (this.transitioning || !this.heroSlides.length) return;
    this.transitioning = true;
    setTimeout(() => {
      this.currentSlide = (this.currentSlide - 1 + this.heroSlides.length) % this.heroSlides.length;
      this.transitioning = false;
    }, 700);
  }

  goToSlide(i: number) {
    if (this.transitioning || i === this.currentSlide) return;
    this.transitioning = true;
    setTimeout(() => {
      this.currentSlide = i;
      this.transitioning = false;
    }, 700);
    this.startSlideshow();
  }

  openProject(slug: string) {
    this.router.navigate(['/projects', slug]);
    window.scrollTo({ top: 0 });
  }

  scrollToProjects() {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }
}
