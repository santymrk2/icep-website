import React from "react"
import { Chrono } from "react-chrono";
import history from "../data/activities.json"

const Timeline = () => {
  const items = history
  console.log(history)

  return (
      <Chrono 
        mode="VERTICAL_ALTERNATING"  
        class="text-black"
        items={items} 
        scrollable={{ scrollbar: true }}  
        theme={{
          primary: '#1e3a8a',
          secondary: '#1e3a8a',
          cardBgColor: 'white',
          cardTitleColor: '#1e3a8a',

        }}
  />
  )
}

export default Timeline