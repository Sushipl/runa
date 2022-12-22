import { useEffect, useState } from "react";

export const Select = ({array, name, onChange=() => {}, id='', heran='', raca=''}) => {
    const [ar, setAr] = useState(array)


    useEffect(() => {
        
        if (heran && raca){
            setAr(array.concat(heran,raca))
        }
        else if (heran){
            setAr(array.concat(heran))
        }
        else if (raca){
            setAr(array.concat(raca))
        }
        
        }, [heran, raca]
    );



    const list = ar.map((array) => {
        let l = false
        if(array.indexOf('|') != -1){
            l = true
            
        }
        return <option key={array} disabled={l} value={array} className='whitespace-pre-wrap'>{array}</option>
    });
    
    

    return(

        <select name={name} id={id} className="max-w-[100%] border-neutral-900 border-[3.5px] bg-purple-400 whitespace-pre-wrap" onChange={onChange}>
            <option defaultValue></option>
            {list}
        </select> 
    )
}