import { useState, useEffect } from "react";
import { getDaysForEvent } from "../../../services/days.js";
function Countdown() {
  const targetDate = new Date(
    new Date().getFullYear(),
    2,
    1,
    8,
    0,
    0,
  ).toISOString();

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const difference = new Date(targetDate) - now;

    if (difference <= 0) return { days: "00", hours: "00", minutes: "00", seconds: "00" };

    return {
      days: String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, "0"),
      hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, "0"),
      minutes: String(Math.floor((difference / (1000 * 60)) % 60)).padStart(2, "0"),
      seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, "0"),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [days, setDays] = useState(null)
  useEffect(() => { setDays(getDaysForEvent()) }, [])


  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (days === null) {
    return <div></div>;
  }

  return (
    <section className="py-20 my-20 motion-preset-slide-right">
      <div className="max-w-5xl mx-auto px-4">
        {days > 1 &&
          <div>
            <h2 className="text-4xl font-extrabold text-center mb-8 text-white uppercase">Faltan</h2>

            <div className="flex flex-row md:flex-row justify-center items-center gap-4 md:gap-8">
              <div className="text-center">
                <div className="flex flex-col justify-center items-center bg-gray-100 rounded-lg sm:p-6 size-18 sm:size-28">
                  <div id="days" className="text-4xl sm:text-6xl font-bold text-green-800 font-big-camp">{timeLeft.days}</div>
                </div>
                <p className="mt-2 text-sm sm:text-lg text-gray-300">días</p>
              </div>

              <div className="text-center">
                <div className="flex flex-col justify-center items-center bg-gray-100 rounded-lg sm:p-6 size-18 sm:size-28">
                  <div id="hours" className="text-4xl sm:text-6xl font-bold text-green-800 font-big-camp">{timeLeft.hours}</div>
                </div>
                <p className="mt-2 text-sm sm:text-lg text-gray-300">horas</p>
              </div>

              <div className="text-center">
                <div className="flex flex-col justify-center items-center bg-gray-100 rounded-lg sm:p-6 size-18 sm:size-28">
                  <div id="seconds" className="text-4xl sm:text-6xl font-bold text-green-800 font-big-camp">{timeLeft.minutes}</div>
                </div>
                <p className="mt-2 text-sm sm:text-lg text-gray-300">minutos</p>
              </div>

              <div className="text-center">
                <div className="flex flex-col justify-center items-center bg-gray-100 rounded-lg sm:p-6 size-18 sm:size-28">
                  <div id="seconds" className="text-4xl sm:text-6xl font-bold text-green-800 font-big-camp">{timeLeft.seconds}</div>
                </div>
                <p className="mt-2 text-sm sm:text-lg text-gray-300">segundos</p>
              </div>
            </div>
          </div>
        }
        {(days <= 0 && days >= -3) &&
          <div className='flex flex-col justify-center items-center  text-center rounded-lg drop-shadow-2xl'>
            <h2 className='m-0 font-bold text-5xl my-10 z-0'>ESTAMOS EN</h2>
            <h2 className='m-0 font-black leading-none text-7xl sm:text-7xl xl:text-9xl animate-bounce mb-20 z-0'>TANDIL</h2>
          </div>
        }
        {(days < -3) &&
          <div className='flex flex-col justify-center items-center  text-center rounded-lg drop-shadow-2xl'>
            <h2 className='m-0 font-bold text-5xl my-10 z-0 uppercase'>Gracias por</h2>
            <h2 className='m-0 font-black leading-none text-4xl sm:text-7xl xl:text-9xl animate-bounce mb-20 z-0 uppercase'>acompañarnos</h2>
          </div>
        }
      </div>

    </section >
  )
}

export default Countdown;