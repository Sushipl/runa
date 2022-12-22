import { useEffect, useState } from "react";

export const Camp = ({num, aume, dimi}) => {

    let mod = Math.floor((num-10)/2)
    
    const [forma, setForma] = useState();
    console.log('aaa17')
    useEffect(() => {
        if((typeof aume === 'function') & (typeof dimi === 'function')){
            setForma(
                <div>
                    <button className="" onClick={aume}><img src={"/Uarrow.png"}/></button><br/>
                    <button className="" onClick={dimi}><img src={"/Darrow.png"}/></button><br/>
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
            {console.log('aaa18')}           
            <span className="text-3xl">{num} </span>
            
        
            {forma}

            <span className=""> {mod}</span>
        </div>
    )
}