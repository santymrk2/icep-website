import React, { useState } from 'react';
import { getDaysForEvent } from "../../../services/days.js";

function Schedule({ days }) {


  return (

      <section className="grid grid-cols-1 sm:grid-cols-2 justify-items-center m-8 p-4 gap-8 w-full">
        {days.map((day) => (
          <div
            key={day.number}
            className={`w-full p-8 rounded-xl ${
              getDaysForEvent() === day.number
                ? 'bg-white text-green-800'
                : 'ring ring-1 ring-white text-white'
            } animate-float`}
          >
            <h2 className="text-4xl font-bold mb-4">{day.day}</h2>
            {day.schedule.map((item, index) => (
              <div key={index}>
                {item.link ? (
                  <p
                    className="text-xl"
                  >
                    {item.text}
                  </p>
                ) : (
                  <p className="text-xl">{item.text}</p>
                )}
              </div>
            ))}
          </div>
        ))}
      </section>

  );
}

export default Schedule;