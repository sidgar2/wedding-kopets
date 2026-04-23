import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('1s 0.3s ease', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ]),
    trigger('flap', [
      state('closed', style({ transform: 'rotateX(0deg)' })),
      state('open', style({ transform: 'rotateX(-180deg)' })),
      transition('closed => open', animate('600ms cubic-bezier(0.4, 0, 0.2, 1)'))
    ]),
    trigger('envelopeSlide', [
      state('visible', style({ opacity: 1, transform: 'translateY(0) scale(1)' })),
      state('hidden', style({ opacity: 0, transform: 'translateY(-60px) scale(0.9)' })),
      transition('visible => hidden', animate('600ms 300ms cubic-bezier(0.4, 0, 0.2, 1)'))
    ]),
    trigger('cardReveal', [
      state('hidden', style({ opacity: 0, transform: 'translateY(60px) scale(0.95)' })),
      state('visible', style({ opacity: 1, transform: 'translateY(0) scale(1)' })),
      transition('hidden => visible', animate('700ms 800ms cubic-bezier(0.4, 0, 0.2, 1)'))
    ])
  ]
})
export class LandingComponent implements OnInit, OnDestroy {
  isOpening = false;
  flapState = 'closed';
  envelopeState = 'visible';
  cardState = 'hidden';
  snowflakes: Array<{ left: string; delay: string; duration: string; size: string }> = [];
  private snowInterval?: ReturnType<typeof setInterval>;

  constructor(private router: Router) {}

  ngOnInit() {
    this.generateSnowflakes();
  }

  ngOnDestroy() {
    if (this.snowInterval) clearInterval(this.snowInterval);
  }

  generateSnowflakes() {
    this.snowflakes = Array.from({ length: 30 }, () => ({
      left: Math.random() * 100 + '%',
      delay: Math.random() * 10 + 's',
      duration: (Math.random() * 10 + 8) + 's',
      size: (Math.random() * 4 + 3) + 'px'
    }));
  }

  openInvitation() {
    if (this.isOpening) return;
    this.isOpening = true;
    this.flapState = 'open';

    setTimeout(() => {
      this.cardState = 'visible';
    }, 200);

    setTimeout(() => {
      this.envelopeState = 'hidden';
    }, 400);

    setTimeout(() => {
      this.router.navigate(['/invitation']);
    }, 1400);
  }
}
