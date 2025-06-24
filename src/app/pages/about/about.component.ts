import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      <!-- Acerca de nosotros -->
      <section class="py-16">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="mx-auto rounded-2xl relative w-10/12 h-10/12 bg-gray-100 overflow-hidden animate-float">
            <img
              src="https://images.pexels.com/photos/8468/church-building-architecture-religion.jpg"
              alt="Imagen de personas"
              class="w-full h-auto aspect-square object-cover rounded-2xl drop-shadow-3xl"
            />
          </div>

          <div class="flex flex-col justify-center mx-4 sm:mx-6 lg:mx-8">
            <h1 class="text-3xl font-sans font-bold mb-6">
              ACERCA DE NOSOTROS
            </h1>
            <p class="text-gray-400 mb-6 font-sans">
              Su misión principal es la enseñanza de las Sagradas Escrituras, la
              Biblia, y la predicación del evangelio de Jesucristo. La iglesia
              está formada por personas que han reconocido su necesidad
              espiritual, se han arrepentido de sus pecados y han aceptado la
              gracia salvadora de Dios mediante la fe en Jesucristo
            </p>
          </div>
        </div>
      </section>

      <!-- Misión y propósito -->
      <section class="py-16">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="flex flex-col justify-center mx-4 sm:mx-6 lg:mx-8">
            <h1 class="text-3xl font-sans font-bold mb-6">
              MISIÓN Y PROPÓSITO
            </h1>
            <p class="text-gray-400 mb-6 font-sans">
              La Iglesia Cristiana Evangélica tiene como misión principal predicar
              el evangelio de Jesucristo, en cumplimiento del mandato bíblico de
              Marcos 16:15. Además, se enfoca en bautizar a los creyentes en el
              nombre del Padre, del Hijo y del Espíritu Santo, como un paso de fe
              y obediencia en la vida cristiana.
            </p>
            <p class="text-gray-400 mb-6 font-sans">
              El propósito de la iglesia incluye integrar a los creyentes en la
              comunión de la congregación local, fomentando la enseñanza de la
              Palabra, la oración y la adoración. Asimismo, sigue las enseñanzas
              bíblicas en su organización, guiada por pastores, ancianos y
              sobreveedores, quienes lideran con base en principios espirituales y
              bíblicos.
            </p>
          </div>

          <div class="mx-auto rounded-2xl relative w-10/12 h-10/12 bg-gray-100 overflow-hidden animate-float">
            <img
              src="https://images.pexels.com/photos/8468/church-building-architecture-religion.jpg"
              alt="Imagen de personas"
              class="w-full h-auto aspect-square object-cover rounded-2xl drop-shadow-3xl"
            />
          </div>
        </div>
      </section>

      <!-- Valores -->
      <section class="py-16">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-6">NUESTROS VALORES</h2>
          <p class="text-gray-400">Estos son los valores que abrazamos como iglesia.</p>
        </div>
        
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div *ngFor="let value of values" 
               class="bg-zinc-700 p-6 rounded-lg">
            <h3 class="text-xl font-bold mb-4">{{ value.title }}</h3>
            <p class="text-gray-300">{{ value.content }}</p>
          </div>
        </div>
      </section>

      <!-- Creencias -->
      <section class="py-16">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold mb-6">NUESTRAS CREENCIAS</h2>
          <p class="text-gray-400">Esto es en lo que nosotros creemos.</p>
        </div>
        
        <div class="max-w-4xl mx-auto space-y-4">
          <div *ngFor="let belief of beliefs; let i = index" 
               class="bg-zinc-700 rounded-xl overflow-hidden">
            <button
              class="w-full flex justify-between items-center text-white text-left font-sans font-bold py-4 px-6 focus:outline-none hover:bg-zinc-600 transition-colors"
              (click)="toggleBelief(i)">
              {{ belief.title }}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                class="size-6 fill-white transform transition-transform duration-200"
                [class.rotate-45]="activeBeliefIndex === i">
                <path fill-rule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
              </svg>
            </button>
            <div 
              class="overflow-hidden transition-all duration-300"
              [class.max-h-96]="activeBeliefIndex === i"
              [class.max-h-0]="activeBeliefIndex !== i">
              <p class="text-white font-sans p-6 pt-0">{{ belief.content }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Historia CTA -->
      <section class="py-24">
        <div class="flex flex-col justify-center gap-12 items-center">
          <div class="text-center">
            <h1 class="text-3xl font-sans font-bold mb-6">
              NUESTRA HISTORIA
            </h1>
            <p class="text-gray-400 mb-6 font-sans">
              Conoce nuestra historia y como fue nuestro proceso de crecimiento
              como iglesia.
            </p>
          </div>

          <div>
            <a routerLink="/historia" class="btn-primary inline-flex">
              Ver la linea de tiempo
            </a>
          </div>
        </div>
      </section>
    </div>
  `
})
export class AboutComponent {
  activeBeliefIndex = -1;

  values = [
    {
      title: "Unidad",
      content: "Creemos en la unidad del cuerpo de Cristo, formado por todos los creyentes redimidos que, bajo la guía del Espíritu Santo, están unidos en fe y amor, cumpliendo el propósito de glorificar a Dios y testificar de Jesucristo."
    },
    {
      title: "Santidad",
      content: "Reconocemos la importancia de vivir una vida apartada del pecado, en obediencia a la Palabra de Dios, siendo renovados por el Espíritu Santo para reflejar la imagen de Cristo en nuestras acciones y pensamientos."
    },
    {
      title: "Fe",
      content: "Proclamamos que la salvación es por gracia mediante la fe en Jesucristo, quien murió y resucitó para redimirnos, y creemos en las promesas eternas de Dios reveladas en las Escrituras."
    },
    {
      title: "Amor",
      content: "El amor es el fundamento de nuestra fe y prácticas, siguiendo el mandato de Jesús de amar a Dios con todo nuestro corazón y a nuestro prójimo como a nosotros mismos."
    },
    {
      title: "Servicio",
      content: "Dedicamos nuestras vidas a servir a Dios y a la comunidad, usando los dones espirituales otorgados por el Espíritu Santo para la edificación de la iglesia y el bienestar de los demás."
    },
    {
      title: "Evangelismo",
      content: "Cumplimos con el llamado de predicar el evangelio de Jesucristo, llevando el mensaje de salvación a todas las naciones, bautizando y discipulando a quienes creen."
    }
  ];

  beliefs = [
    {
      title: "Dios",
      content: "Creemos en un Dios único y eterno: Padre, Hijo y Espíritu Santo (Deuteronomio 6:4; Mateo 28:19). Dios es el creador de todas las cosas y formó al hombre a su imagen (Génesis 1:27)."
    },
    {
      title: "Jesucristo",
      content: "Jesucristo es plenamente Dios, nacido de la virgen María, perfecto y sin pecado. Su sacrificio es sustitutivo y representativo; resucitó corporalmente y ascendió al Padre (Lucas 1:26-35; Hechos 1:6-11). Es nuestro único mediador y Sumo Sacerdote, y regresará por su iglesia (1 Tesalonicenses 4:13-18)."
    },
    {
      title: "Salvación",
      content: "Todos los seres humanos son pecadores y necesitan la regeneración por el Espíritu Santo (Romanos 3:23). La salvación es por gracia mediante la fe en Jesucristo (Efesios 2:8-10)."
    },
    {
      title: "Iglesia",
      content: "La iglesia es el cuerpo de Cristo, formada por todos los creyentes que han recibido a Cristo como Salvador personal. La iglesia local se reúne para la adoración, oración, edificación y testimonio (Efesios 4:3-6)."
    },
    {
      title: "Espíritu",
      content: "El Espíritu Santo edifica la iglesia y glorifica a Cristo (Efesios 4:12; Juan 16:14). Distribuye dones espirituales para la edificación del cuerpo de Cristo (1 Corintios 12:4-11)."
    },
    {
      title: "Ordenanzas",
      content: "Creemos en dos ordenanzas instituidas por el Señor: Bautismo, por inmersión, simbolizando nuestra identificación con Cristo en su muerte y resurrección (Mateo 28:19), y la Cena del Señor, instituida como una reunión conmemorativa para recordar y anunciar la muerte de Cristo hasta su regreso (1 Corintios 11:23-26)."
    },
    {
      title: "Escatología",
      content: "Creemos en la segunda venida de Jesucristo para buscar a los salvados y establecer su reino milenial (1 Tesalonicenses 4:13-18). Creemos en la resurrección de los salvos para la vida eterna y de los perdidos para la condenación eterna (Apocalipsis 20:11-15)."
    }
  ];

  toggleBelief(index: number) {
    this.activeBeliefIndex = this.activeBeliefIndex === index ? -1 : index;
  }
}