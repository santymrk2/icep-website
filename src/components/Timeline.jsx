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
          primary: '#2A38B2',
          secondary: '#2A38B2',
          cardBgColor: 'white',
          cardTitleColor: '#2A38B2',
          titleColor: '#2A38B2',
          titleColorActive: 'white',
        }}
  />
  )
}

export default Timeline