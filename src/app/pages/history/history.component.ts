import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface HistoryEvent {
  date: string;
  title: string;
  details: string;
}

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col justify-center items-center space-y-8">
          
          <!-- Header -->
          <div>
            <h1 class="text-3xl font-bold mb-6">Historia</h1>
          </div>
          
          <!-- Timeline -->
          <div class="w-full">
            <div class="text-white py-10 px-5 flex justify-center">
              <div class="max-w-3xl">
                <div class="relative border-l-4 border-gray-300 pl-6">
                  
                  <div *ngFor="let event of timelineEvents" class="mb-10 relative">
                    <div class="absolute -left-[10px] w-5 h-5 bg-white border-4 border-gray-900 rounded-full"></div>
                    <div class="bg-zinc-700 p-5 rounded-lg shadow-lg">
                      <p class="text-sm text-gray-400 font-normal">{{ event.date }}</p>
                      <h3 class="text-lg font-bold mb-2">{{ event.title }}</h3>
                      <p class="text-gray-300">{{ event.details }}</p>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class HistoryComponent {
  timelineEvents: HistoryEvent[] = [
    {
      date: "8 de Abril, 1980",
      title: "Escritura del predio",
      details: "El predio constaba de 2 parcelas, adquiridas en un contexto de alta inflación. Este día se logró la escritura formal, marcando el inicio del proyecto en Pilar."
    },
    {
      date: "12 de Octubre, 1980",
      title: "Colocación Piedra fundamental e Inauguración",
      details: "La iglesia fue inaugurada con la colocación de la piedra fundamental. Se celebró la Cena del Señor con la participación de unos 300 hermanos. Se descubrió el monolito con placas conmemorativas y se realizó un almuerzo congregacional."
    },
    {
      date: "1981",
      title: "Octubre: Celebración del 1º Aniversario",
      details: "Se conmemoró el primer aniversario de la iglesia en un ambiente de gratitud y comunión con la participación de hermanos fundadores y nuevos congregantes."
    },
    {
      date: "27 de Noviembre, 1981",
      title: "Primer casamiento: Laura Vega y Nicanor Cabral",
      details: "Se celebró el primer matrimonio en la comunidad, marcando un hito en la vida social de la iglesia."
    },
    {
      date: "27 de Diciembre, 1981",
      title: "Primer bautismo en Quinta La Lomita",
      details: "Se bautizaron Paula Alterach de Vega, Laura Vega de Cabral y Daniel Cajal, consolidando el compromiso espiritual de los primeros frutos de la iglesia."
    },
    {
      date: "10 de Abril, 1982",
      title: "Segunda reunión de bautismo",
      details: "La Familia Carrillo y Pablo López fueron bautizados, ampliando la comunidad de fe en la iglesia."
    },
    {
      date: "Agosto de 1982",
      title: "Inicio de construcción en planta baja",
      details: "Se comenzaron a construir dependencias para asistencia médica, grabaciones y la oficina de Emmaus, enfrentando las dificultades económicas de la época."
    },
    {
      date: "12 de Octubre, 1982",
      title: "Habilitación parcial de instalaciones",
      details: "Se despidió el salón provisorio y se habilitaron parcialmente las instalaciones nuevas, avanzando en el establecimiento de la obra."
    },
    {
      date: "Junio de 1983",
      title: "Comienza la excavación del subsuelo",
      details: "Se iniciaron los trabajos de excavación para el subsuelo, incluyendo el entoscado del camino de ingreso, optimizando el uso del terreno."
    },
    {
      date: "6 de Agosto, 1983",
      title: "1ª Conferencia de Confraternidad Argentino Boliviana",
      details: "Los oradores Adib Massuh y Ángel Bonatti participaron en este evento, fomentando la unidad y el intercambio espiritual entre las comunidades."
    },
    {
      date: "1984",
      title: "Recital de Primavera",
      details: "El Coro de ICE ofreció un recital en la calle Vicente López, extendiendo el alcance cultural y espiritual de la iglesia."
    },
    {
      date: "18 de Marzo, 1984",
      title: "Inauguración del Jardín de Infantes Primeras Hojitas",
      details: "Se inauguró el jardín de infantes con la presencia de autoridades comunales, marcando un avance en el ámbito educacional."
    },
    {
      date: "23 de Abril, 1985",
      title: "Escritura traslativa de dominio",
      details: "La familia Racciatti-Carbone donó formalmente el terreno, asegurando la continuidad del proyecto."
    },
    {
      date: "23 de Diciembre, 1985",
      title: "Habilitación del primer piso",
      details: "El primer piso se habilitó con una fiesta navideña de la Escuela Dominical, celebrando el crecimiento de la comunidad."
    },
    {
      date: "29 de Noviembre, 1986",
      title: "Inauguración del salón de la Iglesia Cristiana Evangélica",
      details: "Con la visita del misionero Arturo Vigna y su esposa Olga, se inauguró formalmente el salón, consolidando la infraestructura de la iglesia."
    }
  ];
}