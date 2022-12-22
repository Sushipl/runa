import { useEffect, useState } from "react";
import { Camp } from "./Camp"

const colo = (e, setE, pt, n, setN) => {
    if(e==0 & pt[n]!=null){
        setE(pt[n])
        setN(n+1)
    }
}

/*add é o adicionar recebido pela origem*/
export const TabEscolherNumeros = ({add=[null, null], esc=0, set= () => {}}) => {
    const [addforc, setAddforc] = useState(0);
    const [adddes, setAdddes] = useState(0);
    const [addcons, setAddcons] = useState(0);
    const [addint, setAddint] = useState(0);
    const [addsab, setAddsab] = useState(0);
    const [addcar, setAddcar] = useState(0);
    console.log('aaa11')
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


    const pt = [15, 14, 13, 12, 10, 8]
    const [n, setN] = useState(0);
    const pts = pt[n];
    console.log('aaa10')
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
    }, [pts, esc])
    console.log('aaa9')
    if(esc===2){
        return(
            <div>
                <label>{pts}</label><br/>
                {console.log('aaa13')}
                <span>Força</span><Camp num={forc+addforc} aume={() => colo(forc, setForc, pt, n, setN)}/>
                <span>Destreza</span><Camp num={des+adddes} aume={() => colo(des, setDes, pt, n, setN)}/>
                <span>Constituição</span><Camp num={cons+addcons} aume={() => colo(cons, setCons, pt, n, setN)}/>
                <span>Inteligencia</span><Camp num={int+addint} aume={() => colo(int, setInt, pt, n, setN)}/>
                <span>Sabedoria</span><Camp num={sab+addsab} aume={() => colo(sab, setSab, pt, n, setN)}/>
                <span>Carisma</span><Camp num={car+addcar} aume={() => colo(car, setCar, pt, n, setN)}/>
            </div>
        )
    }else{return(<></>)}
}