import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface ServiceCategory {
  id: string;
  icon: string;
  title: string;
  services: { name: string; description: string }[];
}

interface ProblemSolution {
  problem: string;
  solution: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {
  openCategory: string | null = null;

  categories: ServiceCategory[] = [
    {
      id: 'artist-management',
      icon: 'microphone',
      title: 'ARTIST MANAGEMENT',
      services: [
        { name: 'Singers', description: 'All genres, multilingual, from independent talents to top industry artists' },
        { name: 'Comedians', description: 'Stand-up comedy acts for all age groups' },
        { name: 'Bands', description: 'From small ensembles to 15-piece bands, choirs, acapella groups, and customized musical curations' },
        { name: 'Instrumentalists', description: 'Customized instrumental performances across all genres based on event requirements' }
      ]
    },
    {
      id: 'events',
      icon: 'star',
      title: 'EVENTS',
      services: [
        { name: 'Product Launches', description: 'Strategically designed launch experiences that create impact, buzz, and strong brand recall' },
        { name: 'Corporate Events', description: 'Seamlessly executed corporate experiences aligned with your company\'s professionalism and vision' },
        { name: 'Promotional Events', description: 'High-energy activations crafted to drive awareness, engagement, and audience interaction' },
        { name: 'Tailor-made Events', description: 'Custom-built event and marketing solutions designed specifically around brand objectives' }
      ]
    },
    {
      id: 'pr-promotions',
      icon: 'megaphone',
      title: 'PR PROMOTIONS',
      services: [
        { name: 'Guest or Celebrity Invites', description: 'Curating influential celebrity and VIP appearances that elevate brand visibility and engagement' },
        { name: 'Brand Ambassador Management', description: 'Identifying, onboarding, and managing the right faces to represent your brand authentically' },
        { name: 'Personal Branding', description: 'Building powerful personal narratives that position individuals as public figures and industry leaders' }
      ]
    },
    {
      id: 'marketing-creatives',
      icon: 'palette',
      title: 'MARKETING & CREATIVES',
      services: [
        { name: 'Traditional Marketing', description: 'Effective offline promotional strategies for brand visibility' },
        { name: 'Digital Marketing', description: 'Online campaigns and growth strategies to expand brand reach' },
        { name: 'Influencer Marketing', description: 'Collaborations with trusted creators and influencers' },
        { name: 'Brand Management', description: 'Building and maintaining a strong and consistent brand identity' },
        { name: 'Ad Creations', description: 'Producing impactful advertisements that clearly communicate the brand message' },
        { name: 'Photo / Video Shoots', description: 'High-quality visual production to showcase brands professionally' }
      ]
    }
  ];

  problemSolutions: ProblemSolution[] = [
    {
      problem: 'Hard to find the right artists for events?',
      solution: 'We provide access to a strong and trusted network of talented, verified artists.'
    },
    {
      problem: 'Managing artists, marketing, and events through multiple vendors is difficult?',
      solution: 'We offer end-to-end entertainment solutions — from artist management to event execution.'
    },
    {
      problem: 'Multiple vendors increase client costs?',
      solution: 'By handling everything under one platform, we reduce vendor costs and improve operational efficiency.'
    },
    {
      problem: 'High-quality entertainment services are often expensive?',
      solution: 'We deliver premium entertainment experiences at optimized and cost-effective pricing.'
    },
    {
      problem: 'Many events fail to create strong audience engagement?',
      solution: 'We curate immersive and creatively driven experiences that leave a lasting impact on audiences.'
    }
  ];

  toggleCategory(id: string): void {
    this.openCategory = this.openCategory === id ? null : id;
  }

  isOpen(id: string): boolean {
    return this.openCategory === id;
  }
}
