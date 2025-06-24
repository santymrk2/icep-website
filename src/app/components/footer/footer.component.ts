import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <footer class="text-white">
      <div class="max-w-7xl mx-auto px-8 sm:px-6 lg:px-8 py-12">
        <div class="grid md:grid-cols-3 md:justify-items-center gap-8">
          
          <!-- Información de la iglesia -->
          <div>
            <h3 class="text-xl font-bold mb-4">ICEP</h3>
            <p class="text-gray-300">Iglesia Cristiana Evangélica en Pilar</p>
          </div>

          <!-- Redes sociales -->
          <div>
            <h3 class="text-xl font-bold mb-4">Seguinos</h3>
            <ul class="items-left text-left items-center space-y-2">
              <li>
                <a href="https://www.youtube.com/@icepilar" 
                   class="text-gray-300 text-left hover:text-white transition-colors">
                  YouTube
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/ice_pilar" 
                   class="text-gray-300 hover:text-white transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://x.com/pilar_ice" 
                   class="text-gray-300 hover:text-white transition-colors">
                  X
                </a>
              </li>
              <li>
                <a href="https://tiktok.com/@ice_pilar" 
                   class="text-gray-300 hover:text-white transition-colors">
                  TikTok
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/profile.php?id=61574986704374" 
                   class="text-gray-300 hover:text-white transition-colors">
                  Facebook
                </a>
              </li>
            </ul>
          </div>

          <!-- Enlaces rápidos -->
          <div>
            <h3 class="text-xl font-bold mb-4">Enlaces Rápidos</h3>
            <ul class="space-y-2">
              <li>
                <a href="https://iglesia-pilar.notion.site/b19a403082ee49238154f16433dd7925?v=7851ff6a1d2c403da600451c9e99c129&pvs=74" 
                   class="text-gray-300 hover:text-white transition-colors">
                  Calendario
                </a>
              </li>
              <li>
                <a routerLink="/contacto" 
                   class="text-gray-300 hover:text-white transition-colors">
                  Contacto
                </a>
              </li>
              <li>
                <a href="https://camp.icepilar.org" 
                   class="text-gray-300 hover:text-white transition-colors">
                  Camp 2025
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Copyright -->
        <div class="mt-8 pt-8 border-t border-white-700">
          <p class="text-sm text-center text-gray-300">
            © {{ currentYear }} Iglesia Complejo Evangélico Pilar. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}