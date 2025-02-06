const Paths = [
    {
      text: "Inicio",
      href: "/",
      subitems: undefined,
      active: true,
    },
    {
      text: "Nosotros",
      href: "/nosotros",
      subitems: undefined,
      active: true,

    },
    {
      text: "Ministerios",
      href: "/ministerios",
      subitems: [
        { text: "Niños", href: "/ninios" },
        { text: "Adolescentes", href: "/adolescentes" },
        { text: "Jóvenes", href: "/jovenes" },
        { text: "Mujeres", href: "/mujeres" },
        { text: "Matrimonios", href: "/matrimonios" },
      ],
      active: false,

    },
    {
      text: "Calendario",
      href: "https://iglesia-pilar.notion.site/b19a403082ee49238154f16433dd7925?v=7851ff6a1d2c403da600451c9e99c129&pvs=74",
      subitems: undefined,
      active: true,
    },
    {
      text: "Contactanos",
      href: "/contacto",
      subitems: undefined,
      active: true,
    },
    {
      text: "Camp 2025",
      href: "/camps/2025/home",
      subitems: undefined,
      active: false,
    }
  ];

export default Paths