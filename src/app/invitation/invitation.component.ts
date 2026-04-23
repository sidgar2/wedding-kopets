import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ScrollRevealDirective } from '../scroll-reveal.directive';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-invitation',
  standalone: true,
  imports: [CommonModule, ScrollRevealDirective],
  templateUrl: './invitation.component.html',
  styleUrl: './invitation.component.css',
  animations: [
    trigger('fadeUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(24px)' }),
        animate('0.7s ease', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class InvitationComponent implements OnInit, OnDestroy {
  @ViewChild('audioPlayer') audioRef!: ElementRef<HTMLAudioElement>;

  countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  private timer?: ReturnType<typeof setInterval>;
  weddingDate = new Date('2026-06-26T13:00:00');

  isPlaying = false;

  dresscodeColors = [
    { name: 'Black',       hex: '#1A1A1A' },
    { name: 'Fairy Wing',  hex: '#D6A5B2' },
    { name: "Mary's Rose", hex: '#E8C8CF' },
  ];

  snowflakes: Array<{ left: string; delay: string; duration: string; size: string }> = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.updateCountdown();
    this.timer = setInterval(() => this.updateCountdown(), 1000);
    this.snowflakes = Array.from({ length: 20 }, () => ({
      left: Math.random() * 100 + '%',
      delay: Math.random() * 10 + 's',
      duration: (Math.random() * 10 + 8) + 's',
      size: (Math.random() * 4 + 2) + 'px'
    }));

    // Autoplay after a short delay (browsers require user interaction first,
    // so we attempt it and fall back gracefully)
    setTimeout(() => this.tryAutoplay(), 800);
  }

  ngOnDestroy() {
    if (this.timer) clearInterval(this.timer);
    this.audioRef?.nativeElement?.pause();
  }

  private tryAutoplay() {
    const audio = this.audioRef?.nativeElement;
    if (!audio) return;
    audio.volume = 0.6;
    audio.play().then(() => {
      this.isPlaying = true;
    }).catch(() => {
      // Autoplay blocked by browser — user can press play manually
      this.isPlaying = false;
    });
  }

  togglePlay() {
    const audio = this.audioRef.nativeElement;
    if (this.isPlaying) {
      audio.pause();
      this.isPlaying = false;
    } else {
      audio.play();
      this.isPlaying = true;
    }
  }

  updateCountdown() {
    const now = new Date();
    const diff = this.weddingDate.getTime() - now.getTime();
    if (diff <= 0) {
      this.countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 };
      return;
    }
    this.countdown = {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60)
    };
  }

  goBack() {
    this.router.navigate(['/']);
  }

  pad(n: number): string {
    return n.toString().padStart(2, '0');
  }
}
