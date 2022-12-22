import { useEffect, useState } from "react"

export const Mod = ({e=[], ord=[], nu=0, mods={}, check=false}) => {
    const m = ord.findIndex(el => el == e[1])
    const [pr, setPr] = useState(0);
    let num = mods[m]

    return (
        <div className="text-left " key={"pericia"+e[0]}>
            <input  type="checkbox" id={e[0]+1} onChange={(ele) => {if(ele.target.checked==true){
                setPr(2)
            }else{setPr(0)}}} className="  scale-75 h-6"/>
            <input type="checkbox" className="bg-[#552690] " checked={check} readOnly id={e[0]}/>
            <div className=" inline-block w-[8%] text-center">
                <span className="">{String(num+nu+pr)}</span>
            </div>
            <span>{e[0]}</span>
            <span className="float-right">({e[1]})</span>
        </div>
    )
}