import { c as createComponent, r as renderTemplate, k as defineScriptVars, g as renderSlot, h as createAstro, m as maybeRenderHead, a as addAttribute, s as spreadAttributes, d as renderComponent, j as renderScript } from './astro/server_DujD4fpc.mjs';
/* empty css                                           */

const Paths = [
    {
      text: "Inicio",
      href: "/",
      subitems: undefined,
    },
    {
      text: "Nosotros",
      href: "/nosotros",
      subitems: [
        { text: "Historia", href: "/historia" },
        { text: "Creencias", href: "/creencias" },
        /*
        { text: "Hermanos Responsables", href: "/responsables" },
         */
        { text: "Prólogo al libro", href: "/prologo" },
        /*
        {
          text: "Actividades en orden cronologico",
          href: "/actividades-cronologico",
        },*/
      ],
    },
    {
      text: "Ministerios",
      href: "/ministerios",
      subitems: [
        { text: "Niños", href: "/ninios" },
        { text: "Adolescentes", href: "/adolescentes" },
        { text: "Jovenes", href: "/jovenes" },
        { text: "Mujeres", href: "/mujeres" },
        { text: "Matrimonios", href: "/matrimonios" },
      ],
    },
    /*
    {
      text: "Instituto Bíblico",
      href: "/instituto",
      subitems: undefined 
    },
    */
    {
      text: "Calendario",
      href: "https://iglesia-pilar.notion.site/b19a403082ee49238154f16433dd7925?v=7851ff6a1d2c403da600451c9e99c129&pvs=74",
      subitems: undefined,
    },
    {
      text: "Contacto",
      href: "/contacto",
      subitems: undefined,
    },
  ];

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(raw) }));
var _a$1;
const $$Astro$9 = createAstro();
const $$Astronav = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$Astronav;
  const { closeOnClick = false } = Astro2.props;
  return renderTemplate(_a$1 || (_a$1 = __template$1(["", " <script>(function(){", '\n["DOMContentLoaded", "astro:after-swap"].forEach((event) => {\n  document.addEventListener(event, addListeners);\n});\n\n// Function to clone and replace elements\nfunction cloneAndReplace(element) {\n  const clone = element.cloneNode(true);\n  element.parentNode.replaceChild(clone, element);\n}\n\nfunction addListeners() {\n  // Clean up existing listeners\n  const oldMenuButton = document.getElementById("astronav-menu");\n  if (oldMenuButton) {\n    cloneAndReplace(oldMenuButton);\n  }\n\n  const oldDropdownMenus = document.querySelectorAll(".astronav-dropdown");\n  oldDropdownMenus.forEach((menu) => {\n    cloneAndReplace(menu);\n  });\n\n  // Mobile nav toggle\n  const menuButton = document.getElementById("astronav-menu");\n  menuButton && menuButton.addEventListener("click", toggleMobileNav);\n\n  // Dropdown menus\n  const dropdownMenus = document.querySelectorAll(".astronav-dropdown");\n  dropdownMenus.forEach((menu) => {\n    const button = menu.querySelector("button");\n    button &&\n      button.addEventListener("click", (event) =>\n        toggleDropdownMenu(event, menu, dropdownMenus)\n      );\n\n    // Handle Submenu Dropdowns\n    const dropDownSubmenus = menu.querySelectorAll(\n      ".astronav-dropdown-submenu"\n    );\n\n    dropDownSubmenus.forEach((submenu) => {\n      const submenuButton = submenu.querySelector("button");\n      submenuButton &&\n        submenuButton.addEventListener("click", (event) => {\n          event.stopImmediatePropagation();\n          toggleSubmenuDropdown(event, submenu);\n        });\n    });\n  });\n\n  // Clicking away from dropdown will remove the dropdown class\n  document.addEventListener("click", closeAllDropdowns);\n\n  if (closeOnClick) {\n    handleCloseOnClick();\n  }\n}\n\nfunction toggleMobileNav() {\n  [...document.querySelectorAll(".astronav-toggle")].forEach((el) => {\n    el.classList.toggle("hidden");\n  });\n}\n\nfunction toggleDropdownMenu(event, menu, dropdownMenus) {\n  toggleMenu(menu);\n\n  // Close one dropdown when selecting another\n  Array.from(dropdownMenus)\n    .filter((el) => el !== menu && !menu.contains(el))\n    .forEach(closeMenu);\n\n  event.stopPropagation();\n}\n\nfunction toggleSubmenuDropdown(event, submenu) {\n  event.stopPropagation();\n  toggleMenu(submenu);\n\n  // Close sibling submenus at the same nesting level\n  const siblingSubmenus = submenu\n    .closest(".astronav-dropdown")\n    .querySelectorAll(".astronav-dropdown-submenu");\n  Array.from(siblingSubmenus)\n    .filter((el) => el !== submenu && !submenu.contains(el))\n    .forEach(closeMenu);\n}\n\nfunction closeAllDropdowns(event) {\n  const dropdownMenus = document.querySelectorAll(".dropdown-toggle");\n  const dropdownParent = document.querySelectorAll(\n    ".astronav-dropdown, .astronav-dropdown-submenu"\n  );\n  const isButtonInsideDropdown = [\n    ...document.querySelectorAll(\n      `.astronav-dropdown button, .astronav-dropdown label, .astronav-dropdown input,\n	  .astronav-dropdown-submenu button, .astronav-dropdown-submenu label, .astronav-dropdown-submenu input,\n	  #astronav-menu`\n    ),\n  ].some((button) => button.contains(event.target));\n  if (!isButtonInsideDropdown) {\n    dropdownMenus.forEach((d) => {\n      // console.log("I ran", d);\n      // if (!d.contains(event.target)) {\n      d.classList.remove("open");\n      d.removeAttribute("open");\n      d.classList.add("hidden");\n      // }\n    });\n    dropdownParent.forEach((d) => {\n      d.classList.remove("open");\n      d.removeAttribute("open");\n      d.setAttribute("aria-expanded", "false");\n    });\n  }\n}\n\nfunction toggleMenu(menu) {\n  menu.classList.toggle("open");\n  const expanded = menu.getAttribute("aria-expanded") === "true";\n  menu.setAttribute("aria-expanded", expanded ? "false" : "true");\n  menu.hasAttribute("open")\n    ? menu.removeAttribute("open")\n    : menu.setAttribute("open", "");\n\n  const dropdownToggle = menu.querySelector(".dropdown-toggle");\n  const dropdownExpanded = dropdownToggle.getAttribute("aria-expanded");\n  dropdownToggle.classList.toggle("hidden");\n  dropdownToggle.setAttribute(\n    "aria-expanded",\n    dropdownExpanded === "true" ? "false" : "true"\n  );\n}\n\nfunction closeMenu(menu) {\n  // console.log("closing", menu);\n  menu.classList.remove("open");\n  menu.removeAttribute("open");\n  menu.setAttribute("aria-expanded", "false");\n  const dropdownToggles = menu.querySelectorAll(".dropdown-toggle");\n  dropdownToggles.forEach((toggle) => {\n    toggle.classList.add("hidden");\n    toggle.setAttribute("aria-expanded", "false");\n  });\n}\n\nfunction handleCloseOnClick() {\n  const navMenuItems = document.querySelector(".astronav-items");\n  const navToggle = document.getElementById("astronav-menu");\n  const navLink = navMenuItems && navMenuItems.querySelectorAll("a");\n\n  const MenuIcons = navToggle.querySelectorAll(".astronav-toggle");\n\n  navLink &&\n    navLink.forEach((item) => {\n      item.addEventListener("click", () => {\n        navMenuItems?.classList.add("hidden");\n        MenuIcons.forEach((el) => {\n          el.classList.toggle("hidden");\n        });\n      });\n    });\n}\n})();<\/script>'], ["", " <script>(function(){", '\n["DOMContentLoaded", "astro:after-swap"].forEach((event) => {\n  document.addEventListener(event, addListeners);\n});\n\n// Function to clone and replace elements\nfunction cloneAndReplace(element) {\n  const clone = element.cloneNode(true);\n  element.parentNode.replaceChild(clone, element);\n}\n\nfunction addListeners() {\n  // Clean up existing listeners\n  const oldMenuButton = document.getElementById("astronav-menu");\n  if (oldMenuButton) {\n    cloneAndReplace(oldMenuButton);\n  }\n\n  const oldDropdownMenus = document.querySelectorAll(".astronav-dropdown");\n  oldDropdownMenus.forEach((menu) => {\n    cloneAndReplace(menu);\n  });\n\n  // Mobile nav toggle\n  const menuButton = document.getElementById("astronav-menu");\n  menuButton && menuButton.addEventListener("click", toggleMobileNav);\n\n  // Dropdown menus\n  const dropdownMenus = document.querySelectorAll(".astronav-dropdown");\n  dropdownMenus.forEach((menu) => {\n    const button = menu.querySelector("button");\n    button &&\n      button.addEventListener("click", (event) =>\n        toggleDropdownMenu(event, menu, dropdownMenus)\n      );\n\n    // Handle Submenu Dropdowns\n    const dropDownSubmenus = menu.querySelectorAll(\n      ".astronav-dropdown-submenu"\n    );\n\n    dropDownSubmenus.forEach((submenu) => {\n      const submenuButton = submenu.querySelector("button");\n      submenuButton &&\n        submenuButton.addEventListener("click", (event) => {\n          event.stopImmediatePropagation();\n          toggleSubmenuDropdown(event, submenu);\n        });\n    });\n  });\n\n  // Clicking away from dropdown will remove the dropdown class\n  document.addEventListener("click", closeAllDropdowns);\n\n  if (closeOnClick) {\n    handleCloseOnClick();\n  }\n}\n\nfunction toggleMobileNav() {\n  [...document.querySelectorAll(".astronav-toggle")].forEach((el) => {\n    el.classList.toggle("hidden");\n  });\n}\n\nfunction toggleDropdownMenu(event, menu, dropdownMenus) {\n  toggleMenu(menu);\n\n  // Close one dropdown when selecting another\n  Array.from(dropdownMenus)\n    .filter((el) => el !== menu && !menu.contains(el))\n    .forEach(closeMenu);\n\n  event.stopPropagation();\n}\n\nfunction toggleSubmenuDropdown(event, submenu) {\n  event.stopPropagation();\n  toggleMenu(submenu);\n\n  // Close sibling submenus at the same nesting level\n  const siblingSubmenus = submenu\n    .closest(".astronav-dropdown")\n    .querySelectorAll(".astronav-dropdown-submenu");\n  Array.from(siblingSubmenus)\n    .filter((el) => el !== submenu && !submenu.contains(el))\n    .forEach(closeMenu);\n}\n\nfunction closeAllDropdowns(event) {\n  const dropdownMenus = document.querySelectorAll(".dropdown-toggle");\n  const dropdownParent = document.querySelectorAll(\n    ".astronav-dropdown, .astronav-dropdown-submenu"\n  );\n  const isButtonInsideDropdown = [\n    ...document.querySelectorAll(\n      \\`.astronav-dropdown button, .astronav-dropdown label, .astronav-dropdown input,\n	  .astronav-dropdown-submenu button, .astronav-dropdown-submenu label, .astronav-dropdown-submenu input,\n	  #astronav-menu\\`\n    ),\n  ].some((button) => button.contains(event.target));\n  if (!isButtonInsideDropdown) {\n    dropdownMenus.forEach((d) => {\n      // console.log("I ran", d);\n      // if (!d.contains(event.target)) {\n      d.classList.remove("open");\n      d.removeAttribute("open");\n      d.classList.add("hidden");\n      // }\n    });\n    dropdownParent.forEach((d) => {\n      d.classList.remove("open");\n      d.removeAttribute("open");\n      d.setAttribute("aria-expanded", "false");\n    });\n  }\n}\n\nfunction toggleMenu(menu) {\n  menu.classList.toggle("open");\n  const expanded = menu.getAttribute("aria-expanded") === "true";\n  menu.setAttribute("aria-expanded", expanded ? "false" : "true");\n  menu.hasAttribute("open")\n    ? menu.removeAttribute("open")\n    : menu.setAttribute("open", "");\n\n  const dropdownToggle = menu.querySelector(".dropdown-toggle");\n  const dropdownExpanded = dropdownToggle.getAttribute("aria-expanded");\n  dropdownToggle.classList.toggle("hidden");\n  dropdownToggle.setAttribute(\n    "aria-expanded",\n    dropdownExpanded === "true" ? "false" : "true"\n  );\n}\n\nfunction closeMenu(menu) {\n  // console.log("closing", menu);\n  menu.classList.remove("open");\n  menu.removeAttribute("open");\n  menu.setAttribute("aria-expanded", "false");\n  const dropdownToggles = menu.querySelectorAll(".dropdown-toggle");\n  dropdownToggles.forEach((toggle) => {\n    toggle.classList.add("hidden");\n    toggle.setAttribute("aria-expanded", "false");\n  });\n}\n\nfunction handleCloseOnClick() {\n  const navMenuItems = document.querySelector(".astronav-items");\n  const navToggle = document.getElementById("astronav-menu");\n  const navLink = navMenuItems && navMenuItems.querySelectorAll("a");\n\n  const MenuIcons = navToggle.querySelectorAll(".astronav-toggle");\n\n  navLink &&\n    navLink.forEach((item) => {\n      item.addEventListener("click", () => {\n        navMenuItems?.classList.add("hidden");\n        MenuIcons.forEach((el) => {\n          el.classList.toggle("hidden");\n        });\n      });\n    });\n}\n})();<\/script>'])), renderSlot($$result, $$slots["default"]), defineScriptVars({ closeOnClick }));
}, "/home/santymrk2/Develops/icep-website/node_modules/.pnpm/astro-navbar@2.3.9/node_modules/astro-navbar/src/Astronav.astro", void 0);

const $$Astro$8 = createAstro();
const $$MenuIcon = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$MenuIcon;
  const { class: className, ...rest } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<button id="astronav-menu" aria-label="Toggle Menu"> ${renderSlot($$result, $$slots["default"], renderTemplate` <svg fill="currentColor"${addAttribute([className], "class:list")} width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"${spreadAttributes(rest)}> <title>Toggle Menu</title> <path class="astronav-close-icon astronav-toggle hidden" fill-rule="evenodd" clip-rule="evenodd" d="M18.278 16.864a1 1 0 01-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 01-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 011.414-1.414l4.829 4.828 4.828-4.828a1 1 0 111.414 1.414l-4.828 4.829 4.828 4.828z"></path> <path class="astronav-open-icon astronav-toggle" fill-rule="evenodd" d="M4 5h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z"></path> </svg> `)} </button>`;
}, "/home/santymrk2/Develops/icep-website/node_modules/.pnpm/astro-navbar@2.3.9/node_modules/astro-navbar/src/components/MenuIcon.astro", void 0);

const $$Astro$7 = createAstro();
const $$OpenIcon = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$OpenIcon;
  const { class: className, ...rest } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<span${addAttribute(["astronav-open-icon astronav-toggle", className], "class:list")}${spreadAttributes(rest)}>${renderSlot($$result, $$slots["default"])}</span>`;
}, "/home/santymrk2/Develops/icep-website/node_modules/.pnpm/astro-navbar@2.3.9/node_modules/astro-navbar/src/components/OpenIcon.astro", void 0);

const $$Astro$6 = createAstro();
const $$CloseIcon = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$CloseIcon;
  const { class: className, ...rest } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<span${addAttribute(["astronav-close-icon astronav-toggle hidden", className], "class:list")}${spreadAttributes(rest)}> ${renderSlot($$result, $$slots["default"])} </span>`;
}, "/home/santymrk2/Develops/icep-website/node_modules/.pnpm/astro-navbar@2.3.9/node_modules/astro-navbar/src/components/CloseIcon.astro", void 0);

const $$Astro$5 = createAstro();
const $$MenuItems = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$MenuItems;
  const { class: className, ...rest } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<nav${addAttribute(["astronav-items astronav-toggle", className], "class:list")}${spreadAttributes(rest)}> ${renderSlot($$result, $$slots["default"])} </nav>`;
}, "/home/santymrk2/Develops/icep-website/node_modules/.pnpm/astro-navbar@2.3.9/node_modules/astro-navbar/src/components/MenuItems.astro", void 0);

const $$Astro$4 = createAstro();
const $$Dropdown = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Dropdown;
  const { class: className, ...rest } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<menu${addAttribute(["astronav-dropdown", className], "class:list")}${spreadAttributes(rest)} aria-expanded="false">${renderSlot($$result, $$slots["default"])}</menu>`;
}, "/home/santymrk2/Develops/icep-website/node_modules/.pnpm/astro-navbar@2.3.9/node_modules/astro-navbar/src/components/Dropdown.astro", void 0);

const $$Astro$3 = createAstro();
const $$DropdownSubmenu = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$DropdownSubmenu;
  const { class: className, ...rest } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(["astronav-dropdown-submenu", className], "class:list")}${spreadAttributes(rest)} aria-expanded="false"> ${renderSlot($$result, $$slots["default"])} </div>`;
}, "/home/santymrk2/Develops/icep-website/node_modules/.pnpm/astro-navbar@2.3.9/node_modules/astro-navbar/src/components/DropdownSubmenu.astro", void 0);

const $$Astro$2 = createAstro();
const $$DropdownItems = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$DropdownItems;
  const { class: className, ...rest } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(["astronav-dropdown dropdown-toggle hidden", className], "class:list")}${spreadAttributes(rest)} aria-expanded="false"> ${renderSlot($$result, $$slots["default"])} </div>`;
}, "/home/santymrk2/Develops/icep-website/node_modules/.pnpm/astro-navbar@2.3.9/node_modules/astro-navbar/src/components/DropdownItems.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro$1 = createAstro();
const $$StickyHeader = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$StickyHeader;
  const {
    scrollY = 100,
    defaultClass = "",
    activeClass = "",
    class: className = "",
    ...rest
  } = Astro2.props;
  return renderTemplate(_a || (_a = __template(["", "<header", "", " data-astro-cid-6bfkfnkq> ", " </header> <script data-astro-rerun>(function(){", '\n  // @ts-nocheck\n  let lastKnownScrollPosition = 0;\n  let ticking = false;\n\n  const header = document.querySelector(".astronav-sticky-header");\n\n  // Define two different scroll positions\n  const addScrollY = Math.max(scrollY, 100); // Scroll position to add active class\n  const removeScrollY = Math.max(scrollY - 50, 50); // Scroll position to remove active class\n\n  function updateAnimation(scrollPos) {\n    if (scrollPos > addScrollY) {\n      header.classList.remove(...defaultClass.split(" "));\n      header.classList.add("is-active", ...activeClass.split(" "));\n      header.setAttribute("active", "");\n    } else if (scrollPos < removeScrollY) {\n      header.classList.remove("is-active", ...activeClass.split(" "));\n      header.classList.add(...defaultClass.split(" "));\n      header.removeAttribute("active");\n    }\n  }\n\n  window.addEventListener("scroll", function () {\n    lastKnownScrollPosition = window.scrollY;\n    if (!ticking) {\n      window.requestAnimationFrame(function () {\n        updateAnimation(lastKnownScrollPosition);\n        ticking = false;\n      });\n\n      ticking = true;\n    }\n  });\n})();<\/script> '])), maybeRenderHead(), addAttribute(["astronav-sticky-header", className, defaultClass], "class:list"), spreadAttributes(rest), renderSlot($$result, $$slots["default"]), defineScriptVars({ scrollY, defaultClass, activeClass }));
}, "/home/santymrk2/Develops/icep-website/node_modules/.pnpm/astro-navbar@2.3.9/node_modules/astro-navbar/src/components/StickyHeader.astro", void 0);

const $$Astro = createAstro();
const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Header;
  const menuItems = Paths;
  return renderTemplate`${maybeRenderHead()}<div class="relative"> <div class="absolute -inset-0.5 h-24 mx-4 sm:mx-10 bg-gradient-to-r from-blue-400 to-custom-teal rounded-full blur opacity-50 transition duration-100 hover:opacity-100 animate-tilt"></div> <header class="relative h-24 text-white m-4 sm:m-10 rounded-full bg-custom-blue" id="back-menu"> <div class="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 flex h-full text-base font-normal"> <div class="flex justify-between items-center w-full"> <div class="flex items-center m-2"> <a href="/" class="flex items-center"> <svg class="h-[4.5rem] fill-white" viewBox="0 0 800 800"><defs></defs><path d="M400 331.69c28.41-20.36 63.23-32.34 100.85-32.34 25.46 0 49.64 5.49 71.42 15.35.71-6.37 1.09-12.84 1.09-19.4 0-95.74-77.61-173.35-173.35-173.35S226.66 199.56 226.66 295.3c0 6.56.38 13.03 1.09 19.4 21.78-9.86 45.96-15.35 71.42-15.35 37.62 0 72.43 11.99 100.85 32.34Z" class="cls-1"></path><path d="M572.27 314.7c-6.89 61.88-46.34 113.93-100.85 138.6.71 6.37 1.09 12.84 1.09 19.4 0 58.12-28.61 109.56-72.51 141.01 28.41 20.36 63.23 32.34 100.85 32.34 95.74 0 173.35-77.61 173.35-173.35 0-70.28-41.82-130.79-101.93-158Z" class="cls-1"></path><path d="M327.49 472.7c0-6.56.38-13.03 1.09-19.4-54.5-24.67-93.95-76.72-100.85-138.6-60.11 27.21-101.93 87.72-101.93 158 0 95.74 77.61 173.35 173.35 173.35 37.62 0 72.43-11.99 100.85-32.34-43.9-31.45-72.51-82.89-72.51-141.01ZM400 331.69c-38.94 27.9-65.84 71.54-71.42 121.61 21.78 9.86 45.96 15.35 71.42 15.35s49.64-5.49 71.42-15.35c-5.58-50.07-32.48-93.71-71.42-121.61Z" class="cls-1"></path> </svg> </a> </div> <div class="hidden lg:flex space-x-8 justify-center items-center m-2"> ${renderComponent($$result, "Astronav", $$Astronav, { "closeOnClick": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "MenuItems", $$MenuItems, { "class": "flex space-x-4 g-4" }, { "default": ($$result3) => renderTemplate`${menuItems.map(
    (item, index) => item.subitems === void 0 ? renderTemplate`<a${addAttribute(item.href, "href")}${addAttribute(`ring ring-2 ring-white rounded-full px-4 py-2 hover:bg-white hover:text-custom-blue transition-all easy-in-out motion-preset-expand`, "class")}> ${item.text} </a>` : renderTemplate`${renderComponent($$result3, "Dropdown", $$Dropdown, { "class": "relative" }, { "default": ($$result4) => renderTemplate` <button class="flex items-center transition-all easy-in-out space-x-1 motion-preset-expand px-4 py-2 ring ring-2 ring-white rounded-full hover:bg-white hover:text-custom-blue"> <span>${item.text}</span> <svg class="h-5 w-5 transform transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path> </svg> </button> ${renderComponent($$result4, "DropdownItems", $$DropdownItems, { "class": `absolute top-16 -left-2 m-2 bg-custom-blue shadow-lg p-4 px-6 z-10 hidden group-hover:block rounded-[2rem] motion-scale-in-[0.42] motion-translate-x-in-[2%] motion-translate-y-in-[-30%] motion-opacity-in-[0%]` }, { "default": ($$result5) => renderTemplate` <div class="flex flex-col items-center w-[12rem]"> ${Array.isArray(item.subitems) && item.subitems.map(
      (subitem) => renderTemplate`<a${addAttribute(subitem.href, "href")} class="inline-block w-full text-white text-center ring ring-2 ring-white rounded-full px-4 py-2 my-2 hover:bg-white hover:text-custom-blue transition-all easy-in-out motion-preset-expand"> ${subitem.text} </a>`
    )} </div> ` })} ` })}`
  )}` })} ` })} </div> <button id="mobile-menu-button" class="m-2 sm:m-1 bg-cutom-blue ring ring-2 ring-white rounded-full group hover:ring-0 hover:bg-white transition-all easy-in-out group inline-flex w-12 h-12 text-slate-800 bg-white text-center items-center justify-center  shadow-[0_1px_0_theme(colors.slate.950/.04),0_1px_2px_theme(colors.slate.950/.12),inset_0_-2px_0_theme(colors.slate.950/.04)] hover:shadow-[0_1px_0_theme(colors.slate.950/.04),0_4px_8px_theme(colors.slate.950/.12),inset_0_-2px_0_theme(colors.slate.950/.04)] transition" aria-pressed="false" onclick="this.setAttribute('aria-pressed', !(this.getAttribute('aria-pressed') === 'true'))"> <span class="sr-only">Menu</span> <svg class="w-6 h-6 fill-current pointer-events-none" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"> <rect class="origin-center -translate-y-[5px] translate-x-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-[[aria-pressed=true]]:translate-x-0 group-[[aria-pressed=true]]:translate-y-0 group-[[aria-pressed=true]]:rotate-[315deg]" y="7" width="9" height="2" rx="1"></rect> <rect class="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-[[aria-pressed=true]]:rotate-45" y="7" width="16" height="2" rx="1"></rect> <rect class="origin-center translate-y-[5px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-[[aria-pressed=true]]:translate-y-0 group-[[aria-pressed=true]]:-rotate-[225deg]" y="7" width="9" height="2" rx="1"></rect> </svg> </button>  </div> </div> <!-- Mobile menu --> <div class="hidden lg:hidden text-white flex flex-col justify-center" id="mobile-menu"> <div class="gap-5 p-6 flex flex-col items-center"> ${menuItems.map(
    (item) => item.subitems === void 0 ? renderTemplate`<a${addAttribute(item.href, "href")} class="inline-block text-center px-2 py-1 text-normal w-8/12 sm:w-4/12 hover:text-custom-blue hover:bg-white rounded-full ring ring-2 ring-white motion-scale-in-[0.42] motion-translate-x-in-[2%] motion-translate-y-in-[-30%] motion-opacity-in-[0%] transition-all easy-in-out"> ${item.text} </a>` : renderTemplate`${renderComponent($$result, "Dropdown", $$Dropdown, { "class": "flex flex-col justify-center w-8/12 sm:w-4/12 motion-scale-in-[0.42] motion-translate-x-in-[2%] motion-translate-y-in-[-30%] motion-opacity-in-[0%] transition-all easy-in-out" }, { "default": ($$result2) => renderTemplate` <button class="block rounded-full text-medium px-2 py-1 text-center flex flex-row justify-center items-center hover:text-custom-blue hover:bg-white  ring ring-2 ring-white transition-all easy-in-out"> <span>${item.text}</span> <svg class="h-5 w-5 transform transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path> </svg> </button> ${renderComponent($$result2, "DropdownItems", $$DropdownItems, { "class": "mt-2 space-y-3 bg-white shadow-lg rounded-[1.5rem] p-4 mb-2 z-10 hidden group-hover:block flex flex-col justify-center motion-scale-in-[0.42] motion-translate-x-in-[2%] motion-translate-y-in-[-30%] motion-opacity-in-[0%]" }, { "default": ($$result3) => renderTemplate`${Array.isArray(item.subitems) && item.subitems.map(
      (subitem) => renderTemplate`<a${addAttribute(subitem.href, "href")} class="block text-center text-normal mx-2 px-2 py-1 ring ring-2 ring-custom-blue rounded-full text-custom-blue hover:bg-custom-blue hover:text-white transition-all easy-in-out motion-preset-expand"> ${subitem.text} </a>`
    )}` })} ` })}`
  )} </div> </div> </header> </div> ${renderScript($$result, "/home/santymrk2/Develops/icep-website/src/components/Header.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/santymrk2/Develops/icep-website/src/components/Header.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  return renderTemplate`${maybeRenderHead()}<footer class="bg-custom-blue text-white rounded-xl shadow-custom-blue m-4 sm:m-10 px-2"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"> <div class="grid md:grid-cols-3 gap-8 "> <div> <h3 class="text-xl font-semibold mb-4">ICEP</h3> <p class="text-gray-300">
Iglesia Cristiana Evangélica en Pilar
</p> </div> <div> <h3 class="text-xl font-semibold mb-4">Enlaces Rápidos</h3> <ul class="space-y-2"> <li><a href="/ministeriosLista" class="text-gray-300 hover:text-white">Ministerios</a></li> <li><a href="/historia" class="text-gray-300 hover:text-white">Historia</a></li> <li><a href="/creencias" class="text-gray-300 hover:text-white">Creencias</a></li> <li><a href="https://iglesia-pilar.notion.site/b19a403082ee49238154f16433dd7925?v=7851ff6a1d2c403da600451c9e99c129&pvs=74" class="text-gray-300 hover:text-white">Calendario</a></li> <li><a href="/instituto" class="text-gray-300 hover:text-white">Instituto Biblico</a></li> <li><a href="/contacto" class="text-gray-300 hover:text-white">Contacto</a></li> </ul> </div> <div> <h3 class="text-xl font-semibold mb-4">Síguenos</h3> <div class="flex space-x-4"> <a href="https://www.youtube.com/@icepilar" class="text-gray-300 hover:text-white"> <span class="sr-only">YouTube</span> <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"> <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"></path> </svg> </a> <a href="https://www.instagram.com/ice_pilar?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" class="text-gray-300 hover:text-white"> <span class="sr-only">Instagram</span> <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0z"></path> <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm6.5-.25a1.25 1.25 0 0 0-2.5 0 1.25 1.25 0 0 0 2.5 0zM12 9a3 3 0 1 1 0 6 3 3 0 0 1 0-6z"></path> </svg> </a> </div> </div> </div> <div class="mt-8 pt-8 border-t border-white-700"> <p class="text-center text-gray-300">
© ${currentYear} Iglesia Complejo Evangélico Pilar. Todos los derechos reservados.
</p> </div> </div> </footer>`;
}, "/home/santymrk2/Develops/icep-website/src/components/Footer.astro", void 0);

export { $$Header as $, Paths as P, $$Footer as a };
