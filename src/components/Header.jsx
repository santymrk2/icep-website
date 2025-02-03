import { useState } from "react";
import { Transition } from '@headlessui/react'; // Importar el componente Transition
import Paths from "../data/routingPaths.js";

const Navbar = ({ location }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const menuItems = Paths;

    const buttonClasses = `
    motion-preset-expand 
    text-white
    no-underline
    rounded-full
    py-2
    px-4
    items-center
    text-center
    font-extrabold
    relative
    z-10
    transition-all
    duration-500
    ease-[cubic-bezier(0.785,0.135,0.15,0.86)]
    tracking-wide
    font-sans
    overflow-hidden
    before:content-['']
    before:absolute
    before:top-0
    before:right-0
    before:w-0
    before:h-full
    before:bg-zinc-700
    before:-z-10
    before:transition-all
    before:duration-500
    before:ease-[cubic-bezier(0.785,0.135,0.15,0.86)]
    hover:before:w-full
    hover:before:left-0
    hover:before:right-auto
  `;


    const buttonSelectClasses = `
    motion-preset-expand 
    bg-white
    text-black
    no-underline
    rounded-full
    py-2
    px-4
    items-center
    text-center
    font-extrabold
    relative
    z-10
    transition-all
    duration-500
    ease-[cubic-bezier(0.785,0.135,0.15,0.86)]
    tracking-wide
    font-sans
    overflow-hidden
    before:content-['']
    before:absolute
    before:top-0
    before:right-0
    before:w-0
    before:h-full
    before:-z-10
    before:transition-all
    before:duration-500
    before:ease-[cubic-bezier(0.785,0.135,0.15,0.86)]
    hover:before:w-full
    hover:before:left-0
    hover:before:right-auto
    `;

    return (
        <header
            className={`text-white m-4 sm:m-10 rounded-full z-50 ${isMenuOpen ? "rounded-xl h-auto" : "h-24"
                } transition-all duration-300`}
            id="back-menu"
        >
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10 flex text-base font-normal">
                <div className="flex justify-between items-center w-full">
                    <div className="flex items-center m-2">
                        <a href="/" className="flex items-center">
                            <svg
                                className="h-[4.5rem] fill-white"
                                viewBox="0 0 800 800"
                            >
                                <path d="M400 331.69c28.41-20.36 63.23-32.34 100.85-32.34 25.46 0 49.64 5.49 71.42 15.35.71-6.37 1.09-12.84 1.09-19.4 0-95.74-77.61-173.35-173.35-173.35S226.66 199.56 226.66 295.3c0 6.56.38 13.03 1.09 19.4 21.78-9.86 45.96-15.35 71.42-15.35 37.62 0 72.43 11.99 100.85 32.34Z" />
                                <path d="M572.27 314.7c-6.89 61.88-46.34 113.93-100.85 138.6.71 6.37 1.09 12.84 1.09 19.4 0 58.12-28.61 109.56-72.51 141.01 28.41 20.36 63.23 32.34 100.85 32.34 95.74 0 173.35-77.61 173.35-173.35 0-70.28-41.82-130.79-101.93-158Z" />
                                <path d="M327.49 472.7c0-6.56.38-13.03 1.09-19.4-54.5-24.67-93.95-76.72-100.85-138.6-60.11 27.21-101.93 87.72-101.93 158 0 95.74 77.61 173.35 173.35 173.35 37.62 0 72.43-11.99 100.85-32.34-43.9-31.45-72.51-82.89-72.51-141.01ZM400 331.69c-38.94 27.9-65.84 71.54-71.42 121.61 21.78 9.86 45.96 15.35 71.42 15.35s49.64-5.49 71.42-15.35c-5.58-50.07-32.48-93.71-71.42-121.61Z" />
                            </svg>
                        </a>
                    </div>

                    <div className="hidden lg:flex space-x-8 justify-center items-center m-2">
                        <nav>
                            <ul className="flex space-x-4 g-4">
                                {menuItems.map((item) => (
                                    <li
                                        key={item.text}
                                        className="relative"
                                        onClick={() => setOpenDropdown(item.text)}
                                    >
                                        {!item.subitems ? (
                                            <a
                                                href={item.href}
                                                className={`inline-flex ${location === item.href ? buttonSelectClasses : buttonClasses}`}
                                            >
                                                {item.text}
                                            </a>
                                        ) : (
                                            <div className="relative group">
                                                <a
                                                    href="#"
                                                    className={buttonClasses + "inline-flex"}
                                                >
                                                    <span>{item.text}</span>
                                                    <svg
                                                        className="size-5 transform transition-transform duration-200"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M19 9l-7 7-7-7"
                                                        />
                                                    </svg>
                                                </a>

                                                <Transition
                                                    show={openDropdown === item.text}
                                                    enter="transition ease-out duration-200"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-150"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                    className="absolute top-12 -left-2 m-2 bg-white shadow-lg p-6 z-10 ring-2 ring-white rounded-[2.2rem]"
                                                    onMouseEnter={() => setOpenDropdown(item.text)}
                                                    onMouseLeave={() => setOpenDropdown(null)}
                                                >
                                                    <div className="flex flex-col items-center space-y-2 bg-zinc-800">
                                                        {item.subitems.map((subitem) => (
                                                            <a
                                                                key={subitem.text}
                                                                href={subitem.href}
                                                                className={buttonClasses + "block w-full"}
                                                            >
                                                                {subitem.text}
                                                            </a>
                                                        ))}
                                                    </div>
                                                </Transition>
                                            </div>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </nav>

                    </div>
                    <button
                        id="mobile-menu-button"
                        className="lg:hidden m-2 sm:m-1 rounded-full group transition-all ease-in-out inline-flex w-12 h-12 text-slate-800 text-center items-center justify-center"
                        aria-pressed={isMenuOpen}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <span className="sr-only">Menu</span>
                        <svg
                            className="w-8 h-8 fill-white pointer-events-none"
                            viewBox="0 0 16 16"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect
                                className="origin-center -translate-y-[5px] translate-x-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-[[aria-pressed=true]]:translate-x-0 group-[[aria-pressed=true]]:translate-y-0 group-[[aria-pressed=true]]:rotate-[315deg]"
                                y="7"
                                width="9"
                                height="2"
                                rx="1"
                            />
                            <rect
                                className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-[[aria-pressed=true]]:rotate-45"
                                y="7"
                                width="16"
                                height="2"
                                rx="1"
                            />
                            <rect
                                className="origin-center translate-y-[5px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-[[aria-pressed=true]]:translate-y-0 group-[[aria-pressed=true]]:-rotate-[225deg]"
                                y="7"
                                width="9"
                                height="2"
                                rx="1"
                            />
                        </svg>
                    </button>


                </div>
            </div>

            {isMenuOpen && (
                <div className="lg:hidden text-white flex flex-col justify-center mt-10">
                    <div className="flex flex-col items-center gap-2">
                        {menuItems.map((item) => (
                            <div key={item.text} className="w-8/12 m-0">
                                {!item.subitems ? (
                                    <a
                                        href={item.href}
                                        className={`inline-flex justify-center w-full ${location === item.href ? buttonSelectClasses : buttonClasses}`}
                                    >
                                        {item.text}
                                    </a>
                                ) : (
                                    <div className="relative">
                                        <button
                                            className={`${buttonClasses} inline-flex justify-center w-full`}
                                            onClick={() => setOpenDropdown(
                                                openDropdown === item.text ? null : item.text
                                            )}
                                        >
                                            <span>{item.text}</span>
                                            <svg
                                                className="size-5 transform transition-transform duration-200"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M19 9l-7 7-7-7"
                                                />
                                            </svg>
                                        </button>

                                        <Transition
                                            show={openDropdown === item.text}
                                            enter="transition ease-out duration-200 origin-top"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-150 origin-top"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                            className="p-4 ring-2 ring-white space-y-3 mt-3 bg-zinc-800 shadow-lg rounded-[1.5rem] z-10"
                                        >
                                            <div className="">
                                                {item.subitems.map((subitem) => (
                                                    <a
                                                        key={subitem.text}
                                                        href={subitem.href}
                                                        className={`${buttonClasses} block w-full`}
                                                    >
                                                        {subitem.text}
                                                    </a>
                                                ))}
                                            </div>
                                        </Transition>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;

