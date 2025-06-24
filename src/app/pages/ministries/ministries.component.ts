import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Ministry {
  title: string;
  desc: string;
  logo?: string;
  href: string;
  bg: string;
}

@Component({
  selector: 'app-ministries',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="flex flex-col justify-center items-center py-16">
      
      <!-- Header -->
      <div class="flex flex-col justify-center items-center text-center mb-32 py-16">
        <h1 class="text-3xl font-bold p-4">Nuestros Ministerios</h1>
        <p class="text-sm p-4">
          Conoce nuestros espacios en donde nos desarrollamos como iglesia.
        </p>
      </div>

      <!-- Ministerios Grid -->
      <div class="container mx-auto px-10 sm:px-20 lg:px-32 xl:px-64 grid gap-8 grid-cols-1 md:grid-cols-2">
        <div *ngFor="let ministry of ministries" 
             class="relative rounded-2xl overflow-hidden group"
             [ngClass]="'bg-gradient-to-b ' + ministry.bg">
          
          <a [routerLink]="ministry.href">
            <div class="relative w-full aspect-[3/2]">
              
              <!-- Logo o título -->
              <img *ngIf="ministry.logo; else titleTemplate"
                   [src]="ministry.logo"
                   [alt]="ministry.title"
                   class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2/3 transition-all duration-300 ease-out group-hover:opacity-0 group-hover:scale-75" />
              
              <ng-template #titleTemplate>
                <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-out group-hover:opacity-0 group-hover:scale-75">
                  <div class="text-center w-full">
                    <h2 class="text-[clamp(1rem,5cqw,1.5rem)] text-white font-bold text-center w-full">
                      {{ ministry.title }}
                    </h2>
                  </div>
                </div>
              </ng-template>

              <!-- Hover content -->
              <div class="absolute inset-0 flex flex-col items-start justify-end p-4 sm:p-8 pointer-events-none">
                <h3 class="mb-2 sm:mb-4 text-xl sm:text-3xl md:text-3xl lg:text-3xl font-bold text-white align-text-bottom opacity-0 transform translate-y-4 transition-all duration-300 ease-in group-hover:opacity-100 group-hover:translate-y-0">
                  {{ ministry.desc }}
                </h3>
                <div class="flex flex-row items-center px-2 mt-2 bg-white opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  <p class="text-left text-sm sm:text-md font-bold text-black">
                    Leer más
                  </p>
                  <svg class="size-5 sm:size-6 pl-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 12h12m0 0-5-5m5 5-5 5"></path>
                  </svg>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  `
})
export class MinistriesComponent {
  ministries: Ministry[] = [
    {
      title: "Activados",
      desc: "Nuestro espacio para adolescentes",
      logo: "/assets/ministerios/activados/Imagotipo_white.svg",
      href: "/ministerios/adolescentes",
      bg: "from-[#7cd604] to-[#7cd604]/50"
    },
    {
      title: "Pontifex",
      desc: "Creando puentes entre nuestros jóvenes",
      logo: "/assets/ministerios/jovenes/Imagotipo_white.svg",
      href: "/ministerios/jovenes",
      bg: "from-[#f84b00] to-[#f84b00]/50"
    },
    {
      title: "Matrimonios",
      desc: "Un espacio para los matrimonios",
      href: "/ministerios/matrimonios",
      bg: "from-zinc-800 to-zinc-800/50"
    },
    {
      title: "Mujeres",
      desc: "Un espacio para las mujeres",
      href: "/ministerios/mujeres",
      bg: "from-zinc-800 to-zinc-800/50"
    },
    {
      title: "Niños",
      desc: "Un espacio para conocer a Dios",
      href: "/ministerios/ninios",
      bg: "from-zinc-800 to-zinc-800/50"
    }
  ];
}