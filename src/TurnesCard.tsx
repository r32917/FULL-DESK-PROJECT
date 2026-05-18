import './TurnesCard.css'
export interface TurnesCardProps {
    id:number,
    date:Date
}
function TurnesCard(props:TurnesCardProps){

        return<div className="Card">
        {props.id} {props.date.toString()}
        </div>
    
}
export default TurnesCard
