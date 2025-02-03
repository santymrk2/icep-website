import React from "react"
import { Chrono } from "react-chrono";
import history from "../data/activities.json"

const Timeline = () => {
  const items = history
  return (
      <Chrono 
        mode="VERTICAL_ALTERNATING"  
        class="text-black"
        items={items} 
        scrollable={{ scrollbar: true }}  
        slideShow
        theme={{
          primary: 'black',
          secondary: 'black',
          cardBgColor: 'white',
          cardTitleColor: 'black',
          titleColor: 'white',
          titleColorActive: 'white',
        }}
  />
  )
}

export default Timeline