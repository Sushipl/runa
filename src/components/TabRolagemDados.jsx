import { useEffect, useState } from "react";
import { Camp } from "./Camp";


const lancDadosP = () => {
    
    const rand = ()=> Math.floor(1 +(Math.random() * (7-1)));
    
    let n1 = rand();
    let n2 = rand();
    let n3 = rand();
    let n4 = rand();
    
    let nu = [n1, n2, n3, n4].sort();

    nu.shift();

    var sum = 0

    for(var i = 0; i<nu.length; i++){
            sum = sum + nu[i]
    }

    return(sum);
}

var i = 0;

const coloc = (num, set, e, setNum) => {
    if(e==0){
        set(num)
        i++
        if(i<6){
            setNum(lancDadosP);
        }else{setNum(null)}
    }
}

/*add é o adicionar recebido pela origem*/
export const TabRolagemDados = ({add=[null, null], esc=0, set=() => {}}) => {
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
    const [num, setNum] = useState(lancDadosP);

    const [forc, setForc] = useState(0);
    const [des, setDes] = useState(0);
    const [cons, setCons] = useState(0);
    const [int, setInt] = useState(0);
    const [sab, setSab] = useState(0);
    const [car, setCar] = useState(0);

    useEffect(() => {
        set([
            Math.floor((forc+addforc-10)/2)
            ,Math.floor((des+adddes-10)/2)
            ,Math.floor((cons+addcons-10)/2)
            ,Math.floor((int+addint-10)/2)
            ,Math.floor((sab+addsab-10)/2)
            ,Math.floor((car+addcar-10)/2)
    ])
    }, [num, esc])
    /*<button onClick={()=>lancDados(setNum)}>Rolar</button>*/
    if(esc===1){
        return(
            <div>
                <label>{num}</label><br/>
                
                <span>Força</span><Camp num={forc+addforc} dimi={() => coloc(num, setForc, forc, setNum)} />
                <span>Destreza</span><Camp num={des+adddes} dimi={() => coloc(num, setDes, des, setNum)} />
                <span>Constituição</span><Camp num={cons+addcons} dimi={() => coloc(num, setCons, cons, setNum)} />
                <span>Inteligencia</span><Camp num={int+addint} dimi={() => coloc(num, setInt, int, setNum)} />
                <span>Sabedoria</span><Camp num={sab+addsab} dimi={() => coloc(num, setSab, sab, setNum)} />
                <span>Carisma</span><Camp num={car+addcar} dimi={() => coloc(num, setCar, car, setNum)} />
            </div>
        )
    }else{return(<></>)}
}