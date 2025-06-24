import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <main>
      <!-- Hero Section -->
      <section class="w-full h-120 flex flex-col justify-center items-left">
        <div class="mx-8 sm:mx-20 md:mx-24 lg:mx-64 mb-10">
          <h1 class="text-3xl md:text-3xl font-sans font-bold text-left">
            Bienvenido a la <br /> Iglesia Cristiana <br /> Evangélica en Pilar
          </h1>
        </div>
      </section>

      <!-- Image Section 1 -->
      <section class="w-full h-full sm:h-screen overflow-hidden">
        <div class="relative h-screen sm:h-full">
          <img
            src="https://images.pexels.com/photos/8468/church-building-architecture-religion.jpg"
            alt="Fachada de la iglesia"
            class="w-full h-full object-cover drop-shadow-3xl brightness-50 transition-all duration-500 ease-in-out"
          />
          <div class="absolute top-1/2 right-10 sm:right-32 md:right-64">
            <div class="text-center">
              <h2 class="text-3xl sm:text-3xl md:text-3xl font-sans font-bold text-center sm:text-right">
                No temas <br /> solo cree
              </h2>
            </div>
          </div>
        </div>
      </section>

      <!-- Services Section -->
      <section class="py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold mb-6">Nuestros Servicios</h2>
            <p class="text-gray-400">Únete a nosotros en nuestras reuniones semanales</p>
          </div>
          
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div *ngFor="let service of services" 
                 class="bg-zinc-800 p-6 rounded-lg text-center hover:bg-zinc-700 transition-colors">
              <h3 class="text-xl font-bold mb-2">{{ service.name }}</h3>
              <p class="text-gray-400 mb-1">{{ service.time }}</p>
              <p class="text-gray-400">{{ service.day }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Image Section 2 -->
      <section class="w-full h-full sm:h-screen overflow-hidden">
        <div class="relative h-screen sm:h-full">
          <img
            src="https://images.pexels.com/photos/8468/church-building-architecture-religion.jpg"
            alt="Grupo de personas en la iglesia"
            class="w-full h-full object-cover drop-shadow-3xl brightness-50 transition-all duration-500 ease-in-out"
          />
          <div class="absolute top-1/2 left-10 sm:left-32 md:left-64">
            <div class="text-center">
              <h2 class="text-3xl sm:text-3xl md:text-3xl font-sans font-bold text-center sm:text-left">
                Dios es amor
              </h2>
            </div>
          </div>
        </div>
      </section>

      <!-- Contact CTA Section -->
      <section class="w-full h-full sm:h-screen overflow-hidden">
        <div class="relative h-screen sm:h-full">
          <img
            src="https://images.pexels.com/photos/8468/church-building-architecture-religion.jpg"
            alt="Personas caminando"
            class="w-full h-full object-cover drop-shadow-3xl brightness-50 transition-all duration-500 ease-in-out"
          />
          <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div class="grid grid-cols-1 sm:grid-cols-2">
              <div class="order"></div>
              <div class="flex flex-col justify-center items-center sm:items-end">
                <div class="text-center mb-6">
                  <h2 class="text-3xl sm:text-3xl font-sans font-bold text-center sm:text-right mb-4">
                    Contactanos
                  </h2>
                  <p class="text-lg sm:text-xl text-zinc-300 font-sans text-center sm:text-right">
                    Estamos para responder tus preguntas
                  </p>
                </div>
                <div>
                  <a routerLink="/contacto" class="btn-primary inline-flex">
                    Quiero contactarme
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="py-16 mx-4 my-16 sm:mx-10 rounded-xl"></section>
    </main>
  `
})
export class HomeComponent {
  services = [
    { name: "Santa Cena", time: "09:00hs - 10:00hs", day: "Domingos" },
    { name: "Reunión de Enseñanza", time: "10:00hs - 11:00hs", day: "Domingos" },
    { name: "Escuela Bíblica Dominical", time: "11:30hs - 13:00hs", day: "Domingos" },
    { name: "Encuentro de Oración", time: "20 hs", day: "Miércoles" },
    { name: "ActivAdos", time: "14:30 hs", day: "1º y 3º Sábados" },
    { name: "Encuentro de Jóvenes", time: "19 hs", day: "2º Sábados" },
    { name: "Encuentro de Mujeres", time: "17 hs", day: "4º Sábados" },
    { name: "Encuentro de Matrimonios", time: "Consultar Horarios", day: null }
  ];
}