import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { getProject, Project } from '../../data/projects.data';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.css'
})
export class ProjectDetailComponent implements OnInit, OnDestroy {

  project: Project | undefined;
  notFound = false;

  // Lightbox
  lightboxOpen = false;
  lightboxIndex = 0;

  // Per-video mute state (index -> muted)
  videoMutedMap: Record<number, boolean> = {};

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug') ?? '';
      this.project = getProject(slug);
      this.notFound = !this.project;
      window.scrollTo({ top: 0 });
      this.lightboxOpen = false;
      this.videoMutedMap = {}; // reset all per-video mute states
    });
  }

  ngOnDestroy() {}

  goBack() {
    this.router.navigate(['/']);
    setTimeout(() => {
      const el = document.getElementById('projects');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 200);
  }

  openLightbox(index: number) {
    this.lightboxIndex = index;
    this.lightboxOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    this.lightboxOpen = false;
    document.body.style.overflow = '';
  }

  lightboxNext() {
    if (!this.project) return;
    this.lightboxIndex = (this.lightboxIndex + 1) % this.project.photos.length;
  }

  lightboxPrev() {
    if (!this.project) return;
    this.lightboxIndex = (this.lightboxIndex - 1 + this.project.photos.length) % this.project.photos.length;
  }

  @HostListener('document:keydown', ['$event'])
  onKey(e: KeyboardEvent) {
    if (!this.lightboxOpen) return;
    if (e.key === 'Escape') this.closeLightbox();
    if (e.key === 'ArrowRight') this.lightboxNext();
    if (e.key === 'ArrowLeft') this.lightboxPrev();
  }

  toggleMute(videoEl: HTMLVideoElement, index: number) {
    videoEl.muted = !videoEl.muted;
    this.videoMutedMap[index] = videoEl.muted;
  }

  isVideoMuted(index: number): boolean {
    return this.videoMutedMap[index] !== false; // default muted
  }

  onLightboxBackdrop(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains('lightbox-backdrop')) {
      this.closeLightbox();
    }
  }

  // Layout helper — returns tile classes for the photo grid
  tileClass(index: number): string {
    // First photo: large, next two: side by side, then repeat
    const pattern = index % 3;
    if (pattern === 0) return 'photo-large';
    return 'photo-sm';
  }
}
