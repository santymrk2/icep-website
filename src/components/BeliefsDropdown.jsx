import { useState } from 'react';

import items from '../data/beliefs.json'
  
const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState(-1);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? -1 : index);
  };

  return (
    <section className="w-full max-w-lg mx-auto p-6 m-10">
        <h1
            class="text-center text-3xl mb-4 uppercase mx-auto"
        >
            Nuestras creencias 
        </h1>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="p-4 bg-custom-blue rounded-xl">
            <button
              className="w-full flex justify-between items-center text-white text-left  font-medium py-2 focus:outline-none"
              onClick={() => toggleAccordion(index)}
            >
              {item.title}
              <span
                className={`transform transition-transform ${
                  activeIndex === index ? 'rotate-180' : 'rotate-0'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="size-6 fill-white">
  <path fill-rule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
</svg>

              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                activeIndex === index ? 'max-h-40' : 'max-h-0'
              }`}
            >
              <p className="text-white mt-2">{item.content}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Accordion;
