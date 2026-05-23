import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  scrolled = false;
  mobileOpen = false;

  navLinks = [
    { label: 'Home',       path: '/' },
    { label: 'Projects',   path: '/',      fragment: 'projects' },
    { label: 'Services',   path: '/services' },
    { label: 'About Us',   path: '/about' },
    { label: 'Contact Us', path: '/contact' }
  ];

  constructor(private router: Router) {}

  ngOnInit() {}

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled = window.scrollY > 40;
  }

  toggleMobile() {
    this.mobileOpen = !this.mobileOpen;
  }

  navigate(link: any) {
    this.mobileOpen = false;
    if (link.fragment) {
      // Go home then scroll to projects section
      this.router.navigate(['/']).then(() => {
        setTimeout(() => {
          const el = document.getElementById('projects');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      });
    } else {
      this.router.navigate([link.path]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  isActive(link: any): boolean {
    if (link.fragment) {
      return this.router.url === '/';
    }
    return this.router.url === link.path || this.router.url.startsWith(link.path + '/');
  }
}
