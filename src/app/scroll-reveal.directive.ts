import { Directive, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  @Input() revealDelay = 0;        // ms delay per element
  @Input() revealFrom: 'bottom' | 'left' | 'right' | 'fade' = 'bottom';

  private observer?: IntersectionObserver;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit() {
    const el = this.el.nativeElement;

    el.classList.add('sr-hidden');
    el.classList.add(`sr-from-${this.revealFrom}`);
    el.style.transitionDelay = `${this.revealDelay}ms`;

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('sr-visible');
          this.observer?.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );

    this.observer.observe(el);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
