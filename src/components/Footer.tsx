import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-neutral-900 dark:text-white light:text-neutral-900 bg-neutral-100 dark:bg-neutral-900 light:bg-neutral-100">
      <div className="max-w-7xl mx-auto px-8 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 md:justify-items-center gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">ICEP</h3>
            <p className="text-neutral-600 dark:text-gray-300 light:text-neutral-600">
              Iglesia Cristiana Evangélica en Pilar
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Seguinos</h3>
            <ul className="items-left text-left items-center space-x-4">
              <li>
                <a
                  href="https://www.youtube.com/@icepilar"
                  className="text-neutral-600 dark:text-gray-300 light:text-neutral-600 text-left hover:text-blue-500 transition-all"
                >
                  YouTube
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/ice_pilar?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                  className="text-neutral-600 dark:text-gray-300 light:text-neutral-600 hover:text-blue-500 transition-all"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/pilar_ice"
                  className="text-neutral-600 dark:text-gray-300 light:text-neutral-600 hover:text-blue-500 transition-all"
                >
                  X
                </a>
              </li>
              <li>
                <a
                  href="https://tiktok.com/@ice_pilar"
                  className="text-neutral-600 dark:text-gray-300 light:text-neutral-600 hover:text-blue-500 transition-all"
                >
                  TikTok
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/profile.php?id=61574986704374"
                  className="text-neutral-600 dark:text-gray-300 light:text-neutral-600 hover:text-blue-500 transition-all"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/nosotros"
                  className="text-neutral-600 dark:text-gray-300 light:text-neutral-600 hover:text-blue-500 hidden transition-all"
                >
                  Nosotros
                </a>
              </li>
              <li>
                <a
                  href="https://iglesia-pilar.notion.site/b19a403082ee49238154f16433dd7925?v=7851ff6a1d2c403da600451c9e99c129&pvs=74"
                  className="text-neutral-600 dark:text-gray-300 light:text-neutral-600 hover:text-blue-500 transition-all"
                >
                  Calendario
                </a>
              </li>
              <li>
                <a
                  href="/contacto"
                  className="text-neutral-600 dark:text-gray-300 light:text-neutral-600 hover:text-blue-500 transition-all"
                >
                  Contacto
                </a>
              </li>
              {/*
              <li>
                <a
                  href="https://camp.icepilar.org"
                  className="text-neutral-600 dark:text-gray-300 light:text-neutral-600 hover:text-blue-500 transition-all"
                >
                  Camp 2025
                </a>
              </li>
              */}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-neutral-300 dark:border-white/10 light:border-neutral-300">
          <p className="text-sm text-center text-neutral-600 dark:text-gray-300 light:text-neutral-600">
            © {currentYear} Iglesia Complejo Evangélico Pilar. Todos los
            derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

