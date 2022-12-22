import { useEffect, useState } from "react";
import { Camp } from "./Camp";

const aume = (e, set=()=>{}, setPts=()=>{}, pts) => {    
    if(pts>0 & e<15){
        if(e>12){
            set(e+1)
            setPts(pts-2)
        }else{
            set(e+1)
            setPts(pts-1)
        }
    }
}

const dimi = (e, set=()=>{}, setPts=()=>{}, pts) => {
    if(e>8){
        if(e>13){
            set(e-1)
            setPts(pts+2)
        }else{
            set(e-1)
            setPts(pts+1)
        }
    }
}
  
/*add é o adicionar recebido pela origem*/
export const TabPontosSoma = ({add=[null, null], esc=0, set=()=>{}}) => {
    const [addforc, setAddforc] = useState(0);
    const [adddes, setAdddes] = useState(0);
    const [addcons, setAddcons] = useState(0);
    const [addint, setAddint] = useState(0);
    const [addsab, setAddsab] = useState(0);
    const [addcar, setAddcar] = useState(0);
    
    useEffect(() => {
        let forc = 0;
        let des = 0;
        let cons = 0;
        let int = 0;
        let sab = 0;
        let car = 0;
        add.forEach((ele)=> {
            if(ele=="forc"){
                forc++
            }if(ele=="dest"){
                des++
            }if(ele=="cons"){
                cons++
            }if(ele=="inte"){
                int++
            }if(ele=="sabe"){
                sab++
            }if(ele=="cari"){
                car++
            }
        })
        setAddforc(forc);
        setAdddes(des);
        setAddcons(cons);
        setAddint(int);
        setAddsab(sab);
        setAddcar(car);
    }, [add]);
      
    const [forc, setForc] = useState(8);
    const [des, setDes] = useState(8);
    const [cons, setCons] = useState(8);
    const [int, setInt] = useState(8);
    const [sab, setSab] = useState(8);
    const [car, setCar] = useState(8);

    const [pts, setPts] = useState(27); 

    useEffect(() => {
        set([
            Math.floor((forc+addforc-10)/2)
            ,Math.floor((des+adddes-10)/2)
            ,Math.floor((cons+addcons-10)/2)
            ,Math.floor((int+addint-10)/2)
            ,Math.floor((sab+addsab-10)/2)
            ,Math.floor((car+addcar-10)/2)
    ])
    }, [pts])

    if(esc==0){
        return (
            <div>
                <span>{pts}</span><br/>
                
                <span>Força</span> <Camp num={forc+addforc} aume={() => aume(forc, setForc, setPts, pts)} dimi={() => dimi(forc, setForc, setPts, pts)}/>
                <span>Destreza</span> <Camp num={des+adddes} aume={() => aume(des, setDes, setPts, pts)} dimi={() => dimi(des, setDes, setPts, pts)}/>
                <span>Constituição</span> <Camp num={cons+addcons} aume={() => aume(cons, setCons, setPts, pts)} dimi={() => dimi(cons, setCons, setPts, pts)}/>
                <span>Inteligencia</span> <Camp num={int+addint} aume={() => aume(int, setInt, setPts, pts)} dimi={() => dimi(int, setInt, setPts, pts)}/>
                <span>Sabedoria</span> <Camp num={sab+addsab} aume={() => aume(sab, setSab, setPts, pts)} dimi={() => dimi(sab, setSab, setPts, pts)}/>
                <span>Carisma</span> <Camp num={car+addcar} aume={() => aume(car, setCar, setPts, pts)} dimi={() => dimi(car, setCar, setPts, pts)}/>
            </div>
        )
    }else{return(<></>)}

};