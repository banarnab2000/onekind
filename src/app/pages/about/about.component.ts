import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit, AfterViewInit {

  artistImages: string[] = [
    'assets/collabs_artists/Screenshot 2026-05-20 215957.png',
    'assets/collabs_artists/Screenshot 2026-05-20 220152.png',
    'assets/collabs_artists/Screenshot 2026-05-20 220219.png',
    'assets/collabs_artists/Screenshot 2026-05-20 220247.png',
    'assets/collabs_artists/Screenshot 2026-05-20 220302.png',
    'assets/collabs_artists/Screenshot 2026-05-20 220321.png',
    'assets/collabs_artists/Screenshot 2026-05-20 220343.png',
    'assets/collabs_artists/Screenshot 2026-05-20 220513.png',
    'assets/collabs_artists/Screenshot 2026-05-20 220532.png'
  ];

  // Triplicated for seamless marquee loop
  marqueeImages: string[] = [];

  brandImages: string[] = [
    'assets/collabs_brands/04012021104004567_brlo.jpg',
    'assets/collabs_brands/1517995738_WnTUzA_radio_mirchi.avif',
    'assets/collabs_brands/1691480783310.jpg',
    'assets/collabs_brands/20210106033700_2021_Kia_logo_1200.jpg',
    'assets/collabs_brands/241412232_386352419565165_2694488283274697082_n.png',
    'assets/collabs_brands/277671334_346330524183722_2785507947776432986_n.png',
    'assets/collabs_brands/309867149_406664558334405_8924561551930917425_n.jpg',
    'assets/collabs_brands/317938114_549499337190017_9096356127883219995_n.jpg',
    'assets/collabs_brands/347412992_840206071003436_701851641397937757_n.png',
    'assets/collabs_brands/358138477_246727514771283_4940152586858724045_n.jpg',
    'assets/collabs_brands/Clarion W Endorsement_Chiclet_RGB (002).jpg',
    'assets/collabs_brands/GT-Holidays-Logo (1).jpg',
    'assets/collabs_brands/Phoenix-Mall.jpg',
    'assets/collabs_brands/Pvrcinemas_logo.jpg',
    'assets/collabs_brands/behindwoodsofficial_logo.jpg',
    'assets/collabs_brands/boom.webp',
    'assets/collabs_brands/channels4_profile (2).jpg',
    'assets/collabs_brands/guardianlink_logo.jpg',
    'assets/collabs_brands/images (1).png',
    'assets/collabs_brands/images (2).png',
    'assets/collabs_brands/images (8).jpg',
    'assets/collabs_brands/logo (1).png',
    'assets/collabs_brands/palladium-logo.png'
  ];

  stats = [
    { value: '20+', label: 'Shows' },
    { value: '2000+', label: 'Artist Network' },
    { value: '20+', label: 'Brand Partners' },
    { value: '∞', label: 'Unforgettable Moments' }
  ];

  marqueeDuration: string = '31.5s';

  ngOnInit(): void {
    // Triplicate artist images for seamless marquee loop
    this.marqueeImages = [
      ...this.artistImages,
      ...this.artistImages,
      ...this.artistImages
    ];
    // Duration: 9 images * 3.5s = 31.5s
    this.marqueeDuration = (this.artistImages.length * 3.5) + 's';
  }

  ngAfterViewInit(): void {
    // Trigger fade-in animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));
  }
}
