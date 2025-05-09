"use client"

import { useState, useEffect } from "preact/hooks"
import { Client } from "@notionhq/client"
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns"
import { es } from "date-fns/locale"
import { NOTION_API_KEY, DATABASE_ID } from "astro:env/server";


// IMPORTANTE: Reemplaza estos valores con tus credenciales de Notion

interface NotionEvent {
  id: string
  title: string
  date: Date
  description?: string
}

export default function NotionCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [events, setEvents] = useState<NotionEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<NotionEvent | null>(null)

  useEffect(() => {
    fetchEventsFromNotion()
  }, [currentDate])

  const fetchEventsFromNotion = async () => {
    try {
      setLoading(true)

      // Crear una instancia del cliente de Notion
      const notion = new Client({ auth: NOTION_API_KEY })

      // Obtener el primer y último día del mes actual
      const firstDay = startOfMonth(currentDate)
      const lastDay = endOfMonth(currentDate)

      // Formatear fechas para la consulta
      const firstDayStr = format(firstDay, "yyyy-MM-dd")
      const lastDayStr = format(lastDay, "yyyy-MM-dd")

      // Consultar la base de datos de Notion
      const response = await notion.databases.query({
        database_id: NOTION_DATABASE_ID,
        filter: {
          and: [
            {
              property: "Date",
              date: {
                on_or_after: firstDayStr,
              },
            },
            {
              property: "Date",
              date: {
                on_or_before: lastDayStr,
              },
            },
          ],
        },
      })

      // Transformar los resultados de Notion en eventos para nuestro calendario
      const notionEvents = response.results.map((page: any) => {
        return {
          id: page.id,
          title: page.properties.Name.title[0]?.plain_text || "Sin título",
          date: new Date(page.properties.Date.date.start),
          description: page.properties.Description?.rich_text[0]?.plain_text || "",
        }
      })

      setEvents(notionEvents)
      setLoading(false)
    } catch (err) {
      console.error("Error al obtener eventos de Notion:", err)
      setError("Error al conectar con Notion. Verifica tu API key y database ID.")
      setLoading(false)
    }
  }

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1))
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1))

  // Generar los días del mes actual
  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Determinar en qué día de la semana comienza el mes (0 = domingo, 1 = lunes, etc.)
  const startDay = monthStart.getDay()

  // Función para verificar si un día tiene eventos
  const hasEvents = (day: Date) => {
    return events.some((event) => isSameDay(new Date(event.date), day))
  }

  // Función para obtener eventos de un día específico
  const getEventsForDay = (day: Date) => {
    return events.filter((event) => isSameDay(new Date(event.date), day))
  }

  // Mostrar detalles del evento seleccionado
  const showEventDetails = (event: NotionEvent) => {
    setSelectedEvent(event)
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 max-w-4xl mx-auto">
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800">{format(currentDate, "MMMM yyyy", { locale: es })}</h2>
        <div className="flex space-x-2">
          <button onClick={prevMonth} className="p-2 rounded-full hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button
            onClick={() => setCurrentDate(new Date())}
            className="px-3 py-1 bg-gray-200 rounded-md text-sm hover:bg-gray-300"
          >
            Hoy
          </button>
          <button onClick={nextMonth} className="p-2 rounded-full hover:bg-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid grid-cols-7 gap-1">
          {/* Encabezados de los días de la semana */}
          {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map((day, index) => (
            <div key={index} className="text-center font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}

          {/* Espacios vacíos para alinear el primer día del mes */}
          {Array.from({ length: startDay }).map((_, index) => (
            <div key={`empty-${index}`} className="h-24 border border-gray-200 bg-gray-50"></div>
          ))}

          {/* Días del mes */}
          {daysInMonth.map((day) => (
            <div
              key={day.toString()}
              className={`h-24 border border-gray-200 p-1 overflow-hidden ${
                isSameMonth(day, currentDate) ? "bg-white" : "bg-gray-50"
              }`}
            >
              <div className="flex flex-col h-full">
                <div
                  className={`text-right ${
                    isSameDay(day, new Date())
                      ? "bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center ml-auto"
                      : ""
                  }`}
                >
                  {format(day, "d")}
                </div>

                <div className="flex-grow overflow-y-auto mt-1">
                  {hasEvents(day) &&
                    getEventsForDay(day).map((event) => (
                      <div
                        key={event.id}
                        onClick={() => showEventDetails(event)}
                        className="text-xs p-1 mb-1 bg-blue-100 text-blue-800 rounded truncate cursor-pointer hover:bg-blue-200"
                      >
                        {event.title}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal para mostrar detalles del evento */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold">{selectedEvent.title}</h3>
              <button type="button" onClick={() => setSelectedEvent(null)} className="text-gray-500 hover:text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mb-4">
              <p className="text-gray-600 mb-2">
                <span className="font-medium">Fecha:</span>{" "}
                {format(new Date(selectedEvent.date), "PPP", { locale: es })}
              </p>
              {selectedEvent.description && (
                <div>
                  <p className="font-medium mb-1">Descripción:</p>
                  <p className="text-gray-700">{selectedEvent.description}</p>
                </div>
              )}
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
