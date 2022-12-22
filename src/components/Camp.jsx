import { useEffect, useState } from "react";
import Darrow from "../assets/Darrow.png"
import Uarrow from "../assets/Uarrow.png"

export const Camp = ({num, aume, dimi}) => {

    let mod = Math.floor((num-10)/2)
    
    const [forma, setForma] = useState();
    
    useEffect(() => {
        if((typeof aume === 'function') & (typeof dimi === 'function')){
            setForma(
                <div>
                    <button className="" onClick={aume}><img src={Uarrow}/></button><br/>
                    <button className="" onClick={dimi}><img src={Darrow}/></button><br/>
                </div>
            )
        }else if(typeof aume === 'function'){
            setForma(
                <div>
                    <button className="" onClick={aume}>Colocar</button>
                </div>
            )
        }else if(typeof dimi === 'function'){
            setForma(
                <div>
                    <button className="" onClick={dimi}>Colocar</button>
                </div>
            )
        }
    }, [aume, dimi])

    return (
        <div className="flex items-center justify-center w-28 border-gray-900 mx-auto my-3 border-4">
            
            <span className="text-3xl">{num} </span>
            
        
            {forma}

            <span className=""> {mod}</span>
        </div>
    )
}