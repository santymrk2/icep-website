import { useState } from 'preact/compat';

import items from '../data/beliefs.json'

const Beliefs = () => {
  const [activeIndex, setActiveIndex] = useState(-1);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  return (
    <section className="w-full max-w-lg mx-auto py-24 px-6 m-10 flex flex-col ">
      <div className="container mx-auto mb-16">
        <h1 className="text-3xl text-center font-extrabold font-sans mb-6 uppercase">Nuestras creencias</h1>
        <p className="text-gray-400 mb-6 text-center font-serif ">
          Esto es en lo que nosotros creemos.
        </p>
      </div>


      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="p-4 bg-zinc-700 rounded-xl">
            <button
              className="w-full flex justify-between items-center text-white text-left font-sans font-bold py-2 px-4 focus:outline-none"
              onClick={() => toggleAccordion(index)}
            >
              {item.title}
              <span
                className={`transform transition-transform ${activeIndex === index ? 'rotate-180' : 'rotate-0'
                  }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="size-6 fill-white">
                  <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                </svg>
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${activeIndex === index ? 'max-h-70' : 'max-h-0'
                }`}
            >
              <p className="text-white font-sans m-4">{item.content}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Beliefs;
