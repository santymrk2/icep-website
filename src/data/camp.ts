// Todo lo que cambia del evento vive acá. Editá este archivo y listo.

export const site = {
  // --- Evento ---
  name: 'Campamento de Jóvenes 2027',
  shortTitle: 'Camp ’27',
  description:
    'Campamento de Jóvenes 2027 (mayores de 18). Del 25 al 28 de marzo en el Complejo Cristiano Loma Verde, Escobar. Asegurá tu lugar.',
  tagline: 'Campamento de Jóvenes. Mayores de 18. Cuatro días, un solo lugar. Asegurá el tuyo.',
  datesLabel: '25–28.03.2027',

  // Ingreso: jueves 25/03/2027 18:00 (hora Argentina). Alimenta la cuenta regresiva.
  targetISO: '2027-03-25T18:00:00-03:00',

  // --- Lugar ---
  place: 'Complejo Cristiano Loma Verde',
  city: 'Escobar',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=Complejo+Cristiano+Loma+Verde+Escobar',

  // --- Costo ---
  price: '$200.000',

  // Solo pueden confirmar quienes pertenecen a esta iglesia (se muestra en el modal).
  church: 'Iglesia CEP',

  // --- Contacto / formulario ---
  // Las inscripciones se guardan en Airtable vía /api/rsvp (AIRTABLE_TOKEN + AIRTABLE_BASE_ID).
  formEndpoint: '/api/rsvp',
  whatsapp: import.meta.env.PUBLIC_WHATSAPP ?? '',

  // --- Social / SEO ---
  ogImage: '/assets/jvns-camp/og.jpg',

  // --- Tarjetas "Qué te espera". `image`: ruta en /public; vacío = placeholder.
  // `pos`: qué parte de la foto se ve al recortarla (object-position).
  story: [
    {
      n: '01',
      title: 'Llegás',
      text: 'Jueves 25 a las 18:00 abrimos las puertas. Dejás todo y te instalás.',
      image: '/assets/jvns-camp/01-lugar.webp',
      pos: 'center 60%',
      alt: 'Camino entre árboles y arbustos en el complejo Loma Verde',
    },
    {
      n: '02',
      title: 'Compartimos',
      text: 'Días de comunidad, juegos, música y tiempo con Dios, entre jóvenes de tu edad.',
      image: '/assets/jvns-camp/02-compartimos.webp',
      pos: 'center 72%',
      alt: 'Jóvenes caminando bajo los árboles en un campamento anterior',
    },
    {
      n: '03',
      title: 'Volvés distinto',
      text: 'Domingo 28 a las 17:00 cerramos. Te llevás amigos nuevos y energía renovada.',
      image: '/assets/jvns-camp/03-volves.webp',
      pos: 'center 55%',
      alt: 'Grupo del campamento en la cima de un cerro',
    },
  ],

  // --- Fechas ---
  program: [
    { time: '18:00', title: 'Jueves 25 · Ingreso' },
    { time: 'VIE 26', title: 'Programa completo a confirmar' },
    { time: 'SÁB 27', title: 'Programa completo a confirmar' },
    { time: '17:00', title: 'Domingo 28 · Salida' },
  ],
};
