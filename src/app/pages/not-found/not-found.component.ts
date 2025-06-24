import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center h-[calc(100vh-18rem)]">
      <p class="font-bold text-3xl">ERROR 404</p>
      <h1 class="font-normal text-xl mt-2">- La página solicitada no existe -</h1>
      <a routerLink="/" class="btn-primary mt-8 inline-flex">
        Volver al inicio
      </a>
    </div>
  `
})
export class NotFoundComponent {}