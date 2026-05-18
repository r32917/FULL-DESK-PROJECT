import type {TurnesCardProps} from "./TurnesCard.tsx";
import TurnesCard from "./TurnesCard.tsx";
import "./TurnesList.css"
import { useState } from "react";

export default function TurnesList() {


    const [cards,setCards] = useState<TurnesCardProps[]>([])
    
    cards.map(card=>(<TurnesCard key={card.id} id={card.id} date={card.date}/>))
    function addCard() {
    const newCard: TurnesCardProps = {
    id: cards.length + 1,     
    date: new Date()            
  };

  setCards([...cards, newCard]);  
}
return (
  <div style={{ padding: "20px", textAlign: "center" }}>
    <h2>יומן אירועים</h2>
    
    {cards.map(card => (
      <TurnesCard key={card.id} id={card.id} date={card.date} />
    ))}

    <button 
      onClick={addCard}
      style={{
        padding: "15px 30px",
        fontSize: "18px",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        marginTop: "20px"
      }}
    >
      הוסף אירוע
    </button>
  </div>
);
}