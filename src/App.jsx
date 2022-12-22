import { useEffect, useState } from "react"
import { Camp } from "./components/Camp";
import { Header } from "./components/Header"
import { Mod } from "./components/Mod";
import { Select } from "./components/Select"
import { TabEscolherNumeros } from "./components/TabEscolherNumeros";
import { TabPontosSoma } from "./components/TabPontosSoma";
import { TabRolagemDados } from "./components/TabRolagemDados";

const origem = ["Humano", "Antroplantae", "Construto", "Meio-Dragão", "Minotauro", "Troll", "Vastaya", "Yordle", "Runinata"]

const classes = ["Acólito", "Arcano", "Atirador", "Bodisatva", "Bruto", "Caçador", "Combatente", "Mercurial", "Ninja", "Peregrino", "Tecmaturgo"]
const passados = ["Andarilho", "Apostador", "Aristocrata", "Artesão", "Artista", "Charlatão", "Criminoso", "Desconhecido", "Estudioso", "Exilado", "Forasteiro", "Gladiador", "Herói Local", "Inventor", "Marujo", "Mercenário", "Órfão", "Pirata", "Religioso", "Soldado"]
const aprimoramento = ["Afortunado", "Ágil", "Ambidestro", "Arcanista Iniciante", "Arqueiro", "Artista", "Atacante Brutal", "Atento", "Atirador de Elite", "Atleta", "Balestreiro", "Blindado", "Briguento", "Cirurgião de Combate", "Conjurador Bélico", "Controlador de Elementos", "Duelista Defensivo", "Encouraçado", "Escudeiro", "Especialista em Armadura Média", "Especialista em Armadura Pesada", "Especialista em Escudos", "Estudioso das Armas", "Explorador Nato", "Grão-Conjurador", "Hábil", "Intérprete", "Investida Incontrolável", "Mãos de Ferro", "Mente Única", "Perito em Armas de Fogo", "Perito em Armas de Haste", "Perito em Armas Grandes", "Perspicaz", "Plenitude de Combate", "Resistente", "Revestido", "Ritualista", "Robusto", "Sagaz", "Senso do Navegador", "Vigilante"]

const armas = {
  "Normal": {
    "Simples": {
      "Corp": ["Adaga", "Arpão", "Azagaia", "Bastão", "Clava Grande", "Foice", "Lança", "Maça", "Machadinha", "Martelo", "Porrete"],
      "Dist": ["Arco Cruto", "Besta Leve", "Dardo", "Funda"]
    },
    "Marciais": {
      "Corp": ["Alabarda", "Cimitarra", "Chicote", "Espada Curta", "Espada Grande", "Espada Longa", "Glaive", "Lança de Montaria", "Lança Longa", "Maça Estrela", "Machado de Batalha", "Machado Grande", "Malho", "Mangual", "Manopla de Guerra", "Martelo de Guerra", "Picareta de Guerra", "Rapieira", "Tridente"],
      "Dist": ["Arco", "Besta de Mão", "Besta Pesada", "Rede", "Zarabatana"]
    }
  },
  "Ninja": {
    "Simples": {
      "Corp": ["Chijirki", "Goad", "Jitte", "Kama", "Kunai"],
      "Dist": ["Shuriken"]
    },
    "Marciais": {
      "Corp": ["Katana", "Kawanaga", "Naginata", "Wakizashi"]
    }
  },
  "Exóticas": {
    "Simples": {
      "Corp": ["Chakram Pequeno", "Chakram Médio", "Chakram Grande", "Ídolo do Deus Ancião", "Khopesh", "Lâmina Navori"],
      "Dist": ["Besta de Repetição", "Besta de Repetição Pesada"]
    }
  },
  "Armas de Fogo": {
    "Leves": ["Pistola de Pederneira", "Garrucha", "Derringer", "Revólver", "Pistola"],
    "Médias": ["Carabina", "Espingarda", "Espingarda de Cano Serrado", "Escopeta"],
    "Longas": ["Mosquete", "Rifle", "Fuzil", "Rifle de Precisão"],
    "Canhões": ["Canhão de Mão", "Canhão Médio", "Canhão Pesado", "Canhão Enorme", "Lança-granadas Simples", "Lança-granadas Médio", "Lança-granadas Pesado"],
    "Lanças-chamas": ["Lança-chamas Simples", "Lança-chamas Compacto", "Inferno"]
  }
}

const regiao = ["Águas de Sentina", "Bandópolis", "Demacia", "Freljord", "Ilhas das Sombras", "Ionia", "Ixtal", "Noxus", "Piltover", "Shurima", "Targon", "Vazio", "Zaun"]

const proficiencias = ["Acrobacia", "Arcanismo", "Atletismo", "Atuação", "Enganação", "Furtividade", "História", "Intimidação", "Intuição", "Investigação", "Lidar com Animais", "Medicina", "Natureza", "Percepção", "Persuasão", "Prestidigitação", "Religião", "Sobrevivência", "Tecnologia"];

const oficios = {
  "Padrão":["Armeiro","Chaveiro","Herbalista","Navegador","Venefícista"],
  "Artesão":["Cartógrafo","Cozinheiro", "Curtidor", "Entalhador", "Falsificador", "Ferreiro", "Funileiro", "Inventor", "Joalheiro", "Maquiador", "Oleiro", "Pedreiro", "Pintor", "Sapateiro", "Tecelão", "Vidreiro"],
  "Condutor": ['Aquáticos','Mecha','Terrestres'],
  "Jogador": ['Aposta do Rei','Jogador de Baralho','Conjunto de Dados'],
  "Músico": ['Alaúde','Flauta','Flauta de Pan','Gaita de Foles','Lira','Oboé','Tambor','Trombeta','Violino','Xilofone']
}

/* OFicios */


const herancas = ["Agilidade Primal", "Centelha Mágica", "Comandante", "Convocar Auxílio", "Cultivo de Ki", "Detectar Fraquezas", "Distração de Combate", "Exótico", "Filho da Escuridão", "Graciosidade", "Guerreiro Primal", "Habilidoso", "Hiperatividade Rúnica", "Lâmina Sanguinária", "Lutador Evasivo", "Meditação Profunda", "Mente Intuitiva", "Mestre Artesão", "Mestre de Armas Exóticas", "Mestre Tático", "Pele Rígida", "Perceber Fraquezas", "Persistência Adaptável", "Piromaniaco", "Prestidigitador", "Punguista", "Resiliência Adaptativa", "Sangue Arcano", "Sono Leve", "Teimosia", "Visão Treinada", "Voz Sedosa"]

const pericias = [["Acrobacia","Des"], ["Arcanismo","Int"], ["Atletismo","For"], ["Atuação","Car"], ["Enganação","Car"],["Furtividade","Des"],["História","Int"],["Intimidação","Car"],["Intuição","Sab"],["Investigação","Int"],["Lidar com Animais","Sab"],["Medicina","Sab"],["Natureza","Int"],["Percepção","Sab"],["Persuasão","Car"],["Prestidigitação","Des"],["Religião","Int"],["Sobrevivência","Sab"],["Tecnologia","Int"]]
const ord =["For","Des","Con","Int","Sab","Car"]

const hera = {
  "Antroplantae": ["Anciã", "Arbusto Frutífero", "Arsenal Floral", "Esporos Inebriantes", "Magia da Floresta", "Mestre de Vinhas", "Variante Anfíbio", "Variante Colosso", "Variante Espectral", "Variante Hextec", "Variante Quimtec"],
  "Construto": ["Descarga Elétrica", "Espírito de Aço", "Sangue Vastaya", "Variante Anfíbio", "Variante Colosso", "Variante Espectral", "Variante Glacinata", "Variante Hextec", "Variante Meio-Vastaya", "Variante Quimtec"],
  "Humano": ["Perceptivo", "Sangue Vastaya", "Variante Anfíbio", "Variante Colosso", "Variante Espectral", "Variante Glacinata", "Variante Hextec", "Variante Meio-Vastaya", "Variante Quimtec"],
  "Minotauro": ["Espírito de Aço", "Selvagem", "Variante Colosso", "Variante Espectral", "Variante Glacinata", "Variante Hextec", "Variante Meio-Vastaya", "Variante Quimtec"],
  "Meio-Dragão": ["Resiliência Dracônica", "Sopro Precoce", "Variante Colosso", "Variante Espectral", "Variante Hextec", "Variante Quimtec"],
  "Troll": ["Benção de Warmog", "Fúria de Warmog", "Variante Colosso", "Variante Espectral", "Variante Hextec", "Variante Quimtec"],
  "Vastaya": ["Anos de Sho’ma", "Cauda Preênsil", "Centelha Mágica Marai", "Conjurador Suporte", "Contemplação Estelar", "Dançarino", "Forma Aprimorada", "Graça do Felino", "Habilidade do Impulso", "Nascido em Kumungu", "Perceptivo", "Potência da Cura", "Precisão Vastayesa", "Procurador da Verdade", "Proficiência Onírica", "Salva-IIP-guarda", "Variante Colosso", "Variante Espectral", "Variante Hextec", "Variante Meio-Vastaya", "Variante Quimtec"],
  "Yordle": ["Extrovertido", "Teleporte das Fadas", "Variante Anfíbio", "Variante Colosso", "Variante Espectral", "Variante Glacinata", "Variante Hextec", "Variante Quimtec"],
  "Águas de Sentina": ["Benção da Fortuna", "Vida Marinha"],
  "Demacia": ["Caçador de Magos", "Resistência Mágica", "Treinamento Demaciano"],
  "Freljord": ["Gelo Ancestral", "Resistência Gélida"],
  "Ionia": ["Centelha Mágica Ioniana", "Linhagem Vastaya"],
  "Ixtal": ["Aptidão Elemental"],
  "Noxus": ["Autoridade Alfa", "Terror Noxiano"],
  "Piltover": ["Autoridade Justa", "Inventor Renomado"],
  "Shurima": ["Resistência ao Sai", "Vida Nômade"],
  "Targon": ["Benção Rakkor", "Fortitude Targonense"],
  "Zaun": ["Experimento Zaunita", "Ladrão de Segredos"]
};

const moral = ["OB","NB","CB","ON","N","CN","OM","NM","CM"];

const linguasco = ["Buhru", "Demaciano", "Freljordiano", "Ioniano", "Ixtaelense", "Minotáutico", "Noxiano", "Sentinense", "Shurimane", "Targonense", "Vastayés", "Yordle", "Zaunita"]

const linguasex = ["Celestial", "Dracônico", "Demoniaco", "Espiritual", "Elemntal", "Feérico", "Heliano", "Icathiano", "Ochnun", "Primordial", "Rúnico", "Shurimane Antigo", "Silvestre", "Troll"]

const her = [
  { "Antroplantae": ["Anciã", "Arbusto Frutífero", "Arsenal Floral", "Esporos Inebriantes", "Magia da Floresta", "Mestre de Vinhas", "Variante Anfíbio", "Variante Colosso", "Variante Espectral", "Variante Hextec", "Variante Quimtec"] },
  { "Construto": ["Descarga Elétrica", "Espírito de Aço", "Sangue Vastaya", "Variante Anfíbio", "Variante Colosso", "Variante Espectral", "Variante Glacinata", "Variante Hextec", "Variante Meio-Vastaya", "Variante Quimtec"] },
  { "Humano": ["Perceptivo", "Sangue Vastaya", "Variante Anfíbio", "Variante Colosso", "Variante Espectral", "Variante Glacinata", "Variante Hextec", "Variante Meio-Vastaya", "Variante Quimtec"] },
  { "Minotauro": ["Espírito de Aço", "Selvagem", "Variante Colosso", "Variante Espectral", "Variante Glacinata", "Variante Hextec", "Variante Meio-Vastaya", "Variante Quimtec"] },
  { "Meio-Dragão": ["Resiliência Dracônica", "Sopro Precoce", "Variante Colosso", "Variante Espectral", "Variante Hextec", "Variante Quimtec"] },
  { "Troll": ["Benção de Warmog", "Fúria de Warmog", "Variante Colosso", "Variante Espectral", "Variante Hextec", "Variante Quimtec"] },
  { "Vastaya": ["Anos de Sho’ma", "Cauda Preênsil", "Centelha Mágica Marai", "Conjurador Suporte", "Contemplação Estelar", "Dançarino", "Forma Aprimorada", "Graça do Felino", "Habilidade do Impulso", "Nascido em Kumungu", "Perceptivo", "Potência da Cura", "Precisão Vastayesa", "Procurador da Verdade", "Proficiência Onírica", "Salva-IIP-guarda", "Variante Colosso", "Variante Espectral", "Variante Hextec", "Variante Meio-Vastaya", "Variante Quimtec"] },
  { "Yordle": ["Extrovertido", "Teleporte das Fadas", "Variante Anfíbio", "Variante Colosso", "Variante Espectral", "Variante Glacinata", "Variante Hextec", "Variante Quimtec"] },
  { "Águas de Sentina": ["Benção da Fortuna", "Vida Marinha"] },
  { "Demacia": ["Caçador de Magos", "Resistência Mágica", "Treinamento Demaciano"] },
  { "Freljord": ["Gelo Ancestral", "Resistência Gélida"] },
  { "Ionia": ["Centelha Mágica Ioniana", "Linhagem Vastaya"] },
  { "Ixtal": ["Aptidão Elemental"] },
  { "Noxus": ["Autoridade Alfa", "Terror Noxiano"] },
  { "Piltover": ["Autoridade Justa", "Inventor Renomado"] },
  { "Shurima": ["Resistência ao Sai", "Vida Nômade"] },
  { "Targon": ["Benção Rakkor", "Fortitude Targonense"] },
  { "Zaun": ["Experimento Zaunita", "Ladrão de Segredos"] }
];

function isEmptyObj(obj){
  return Object.keys(obj).length === 0 && obj.constructor === Object
}

var pass = { Sub: [""], Passado: [""], Classe: [""]}

var perisC = {}

var perisP = {}

var perisS = {}

var perisCl = {}

var perisSubC = []

function setVars(props) {

  const [valu, setValu] = useState(props.initialValue);

  const [add, setAdd] = useState(props.initialValue);

  return {
    handleSelectChange: (e) => {
      e.preventDefault();
      if (e.target.name == "Origem") {
        pass = { ...pass, Sub: "" };
      }
      
      const { name, value } = e.target;
      pass = { ...pass, [name]: value }
      setValu({ ...valu, [name]: value});

      setAdd({ ...add, [name]: value });
    }, add, setAdd, valu, setValu,
  }
}

function usePasCaracs() {
  const adicionar = setVars({ initialValue: {} })  
  var list = []


  return {
    valu: adicionar.valu,
    fun: (value) => {
      list = [];
      value.forEach((ele, index) => {
        // Pericias
        if(index == 1){
          const puma = ele.split(',')
          const puma1 = puma[0].split(' ')
          let l = []
          perisP = {}
          if(puma1[0] == "Escolher"){
            adicionar.setValu()
            puma.shift()
            for(let i = 0; i < puma1[1] ; i++){
              l.push(<Select key={'pericias'+i} array={puma} name={'pericia'+i} onChange={adicionar.handleSelectChange} />)
            }
            list.push(l)
          }else{
            for(let i = 0; i < puma.length; i++){
              if(puma[i].indexOf(' ou ') !== -1){
                let p = puma[i].split(' ou ')
                l.push(<Select key={'pericias'+i+2} array={p} name={'pericia'+i} onChange={adicionar.handleSelectChange} />)                
                ele = ele.replace(puma[i],'')
              }else{
                perisP = {...perisP, ['pericia'+i]: puma[i]}
              }
            }

            ele = ele.replace(',',', ')
            
            l.push(ele)

            list.push(l)
          }
        }
        /* #fff45f */
        // Oficio
        if(index == 2){
          let fin = []
          if(ele != 'null'){
            let l = value[2].split(',')
            for(let i in l){
              let p = l[i].split(' ')
              if(Number(p[0])){
                for(let n = 0; n < p[0];n++){
                  fin.push(<Select array={oficios[p[1]]} name={'Oficio'+n} onChange={adicionar.handleSelectChange} key={'Oficio'+value[0]+n+i} />)
                }
              }else{fin.push(l[i]+' ')}
            }
          }
          list.push(fin)
        }
        // Idioma
        if(index == 3){
          let l = []
          if(ele != index){
            for(let n = 0; n < ele; n++){
              l.push(<Select array={linguasco} name={'linguaco'+n} onChange={adicionar.handleSelectChange} key={'linguaco'+n}/>)
            }
          }
          list.push(l)
        }
        // Proficiencias
        if(index == 4){
          let l = ele.split(',')
          if(l[0] == 'Escolha'){
            l.splice(0, 1)
            list.push(<Select name={'Proficiencia'} array={l} onChange={adicionar.handleSelectChange} key={'proficiencia'} />)
          }else{list.push(value[4])}
        }
        // Equipamento
        if(index == 5){
          list.push(value[5])
        }
        // Caracteristica
        if(index == 6){
          list.push(value[6])
        }
        })
        return list
      
    }
  }
}

function useSubCaracs() {
  var lista = [];
  const hera = [];
  const prof = [];
  const idio = [];
  const adicionar = setVars({ initialValue: {} })

  return {
    valu: adicionar.valu
    ,fun: (value) => {
        perisS = {}
        lista = [];  
        let pa = ''
        value.forEach((ele, index) => {
          // atributo a acrescentar
          if (index == 1) {
            lista.push(ele)
          }

          // pontos de herança
          if (index == 2) {
            for (var i = 0; i < ele; i++) {
              hera.push(
                <div key={'Heranca' + i}>
                  <span>Herança {i + 1}:</span>
                  <Select name={"Heranca"} array={herancas} raca={hera[pass.Origem]} heran={hera[pass.Regiao]} onChange={adicionar.handleSelectChange} />
                </div>)
            }
            lista.push(hera)
          }

          // passos
          if (index == 3) {
            lista.push(ele)
          }

          /* #fff45f */
          // Oficios
          if (index == 4) {
            if (ele != "null") {
              let ofi = []
              for(let of in oficios){
                ofi = ofi.concat(oficios[of])
              }
              lista.push(
                <div key="oficio">
                  <span>Oficio:</span>
                  <Select array={ofi} name="oficio" onChange={adicionar.handleSelectChange} />
                </div>
              )
            } else { lista.push(ele) }
          }


          // Proficiências
          
          if(index == 5){  
            if(ele != "null"){
              const l = ele.split(',');

              if (l[0] == "Escolher") {
                prof.push(
                  <div key="proficiencia">
                    <Select name="proficiencia" array={l.slice(1)} onChange={adicionar.handleSelectChange} />
                  </div>
                )
                pa = adicionar.valu
              }else{
                l.forEach((e) => {
                  if(Number(e)){
                    prof.push(
                      <div key='proficiencia'>
                        <Select name="proficiencia" array={proficiencias} onChange={adicionar.handleSelectChange} />
                      </div>
                    )

                    pa = adicionar.valu
                  }else{

                    prof.push(e)
                    perisS = e
                    
                  }
                })
              }
            }
            lista.push(prof)
          }
          adicionar.setValu(pa)


          // Idiomas
          if (index == 6) {
            if (ele != "null") {
              const l = ele.split(',');
              let i = 0;
              l.forEach((e) => {
                if (Number(e)) {
                  if (i == 0) {
                    idio.push(
                      <div key='idioma'>
                        <span>Idioma:</span>
                        <Select name="idioma" array={linguasco} onChange={adicionar.handleSelectChange} />
                      </div>
                    )
                    i++
                  } else if (i == 1) {
                    idio.push(
                      <div key='idiomaexo'>
                        <span>Idioma exótico:</span>
                        <Select name="idioma" array={linguasex} onChange={adicionar.handleSelectChange} />
                      </div>
                    )
                  }
                } else { idio.push(e) }
              })
              lista.push(idio)
            } else { lista.push(idio) }
          }
          // Traços
          if (index == 8) {
            lista.push(ele)
          }
        })
      
      return lista
    }
  }
}

function useCaracs() {
  var lista = [];
  const heras = [];
  const lings = [];
  const adicionar = setVars({ initialValue: {} })

  return {
    valu: adicionar.valu,
    fun: (value) => {
        perisC = {}
        lista = [];
        value.forEach((ele, index) => {
          // Heranças  
          if (index == 2) {
            for (var i = 1; i <= ele; i++) {
              heras.push(
                <div key={"heranca" + i}>
                  <Select name={"Heranca" + i} array={herancas} raca={hera[pass.Origem]} heran={hera[pass.Regiao]} onChange={adicionar.handleSelectChange} />
                </div>
              );
            }
            lista.push(heras)
          }

          // Pés
          if (index == 3) {
            if (value[3] != null) {
              lista.push(value[3])
            }
          }

          // Idiomas
          if (index == 4) {
            if(ele != "null"){
              const l = value[4].split(',');
              for (var elem in l) {
                if (Number(l[elem])) {
                  for (var i = 0; i < l[elem]; i++) {
                    lings.push(
                      <div key={"idioma" + i + 1}>
                        <Select name={"idioma " + i + 1} array={linguasco} onChange={adicionar.handleSelectChange} />
                      </div>
                    )
                  }
                } else { lings.push(l[elem]) }
              }
            }
            lista.push(lings)
          }

          // Pericías
          if (index == 5) {
            if (Number(ele)) {
              lista.push(
                <div key="proficiencia">
                  <Select name="proficiencia" array={proficiencias} onChange={adicionar.handleSelectChange} />
                </div>
              )
            } else {
              lista.push(ele)
              perisC = {ele}
            }
          }

          // Aprimoramentos
          if (index == 6) {
            if (value[6] != "null") {
              lista.push(
                <div>
                  <Select name="Aprimoramento" array={aprimoramento} onChange={adicionar.handleSelectChange} />
                </div>
              )
            } else { lista.push(value[6]) }
          }

          //Páginas
          if (index == 8) {
            lista.push(ele)
          }

          // Sub-raças
          if (index == 9) {
            if (value[9] != "null") {
              lista.push(
                <div key={'sub' + value[0]} >
                  <Select name="Sub" array={value[9].split(",")} onChange={adicionar.handleSelectChange} />
                </div>
              )
            } else { lista.push(value[9]) }
          }

          // Traços
          if (index == 10) {
            if (index[10] != 'null') {
              lista.push(
                value[10]
              )
            }
          }
        })
      
      return lista
    },
  }
}

function UseReg(){

  const adicionar = setVars({initialValue:{}})

  return{
    value: adicionar.valu,
    setValu: adicionar.setValu,
    fun: (value) => {
      var list = []
      var idio = []
      var per = []
      value.forEach((ele, index) => {

        /* Linguás */
        if(index == 1){
          
          if(ele != 'null'){
            
            var l = ele.split(",")

            var l1 = l[0].split(' ')

            if(l1[0] == 'Escolher'){
              l.shift()
              for(var i = 0; i < l1[1]; i++){
                idio.push(<Select array={l} key={'idioma'+value[0]} name={'idioma'+value[0]} onChange={adicionar.handleSelectChange}/>)
              }
            }else{
              for(var opt in l){
                if(l[opt].indexOf(' ou ') !== -1){
                  var ne = l[opt].split(' ou ')
                  idio.push(<Select key={'idioma'+value[0]} array={ne} name={'idioma'+value[0]} onChange={adicionar.handleSelectChange}/>)
                }else{
                  idio.push(`${l[opt]}, `)
                }
              }
            }
          }
          list.push(idio)
        }

        /* Pericia */
        if(index == 2){
          if(ele != 'null'){
            var l = ele.split(',')
            var puma = l[0].split(' ')

            if(puma[0] == 'Escolher'){
              l.shift()
              
              for(var i = 0; i < puma[1]; i++){
                per.push(<Select name={'peri'+value[0]} key={'peri'+value[0]} array={l} onChange={adicionar.handleSelectChange} />)
              }
            }else if(Number(ele)){
              
              for(var i = 0; i < ele; i++){
                per.push(<Select name={'peri'+value[0]} key={'peri'+value[0]} array={proficiencias} onChange={adicionar.handleSelectChange} />)
              } 
            }
          }
          list.push(per)
        }

        /* Proficiencia com armas */
        if(index == 3){
          let arms = []
          if(ele != 'null'){
            let l = ele.split(',')
            for(let el in l){
              if(l[el] == 'Armas Simples'){
                l.splice(el, 1)
                l = l.concat(armas.Normal.Simples.Corp,armas.Normal.Simples.Dist)
              }
              if(l[el] == 'Armas Marciais'){
                l.splice(el, 1)
                l = l.concat(armas.Normal.Marciais.Corp,armas.Normal.Marciais.Dist)
              }
              if(l[el] == 'Armas de Fogo'){
                l.splice(el, 1)
                l = l.concat(armas['Armas de Fogo']['Leves'],armas['Armas de Fogo']['Médias'],armas['Armas de Fogo']['Longas'],armas['Armas de Fogo']['Canhões'],armas['Armas de Fogo']['Lanças-chamas'])
              }
            }
            let puma = l[0].split(' ')
            if(puma[0] == 'Escolher'){
              l.shift()
              for(let i = 0; i < puma[1]; i++){
                arms.push(<Select array={l} name={'armas'+value[0]+i} key={'armas'+value[0]+i} onChange={adicionar.handleSelectChange}/>)
              }
            } 
          }
          list.push(arms)
        }

        /* #fff45f */
        /* Oficios */
        if(index == 4){
          if(ele != 'null'){
            var l = ele.split(',')
            var puma = l[0].split(' ')
            /* 
            Jogador
            Artesão
            Músico
            Condutor
            */
            if(puma[0] == 'Escolher'){
              l.shift()
              for(let of in l){
                if(l[of] == "Artesão" || l[of] == "Jogador" || l[of] == "Músico" || l[of] == "Condutor"){
                  l = l.concat(oficios[l[of]])
                  l.splice(of, 1)

                }
              }
              for(let i = 0; i < puma[1]; i++){
                list.push(<Select array={l} name={'oficios'+value[0]} key={'oficio'+value[0]} onChange={adicionar.handleSelectChange} />)
              }
            }else if(Number(ele)){
              let of = []
              for(let ofi in oficios){
                console.log(oficios)
                of = of.concat(oficios[ofi])
              }
              list.push(<Select array={of} name={'oficios'+value[0]} key={'oficio'+value[0]} onChange={adicionar.handleSelectChange} />)
            
            }
          }else{list.push(ele)}
        }
      })
      return list
    }
  }
}


/*Classe;Dado de vida;Pts de Vida;Pts de vida nos próximos Nv;Proficiencia;Oficios;Salvaguarda;Pericias;Equipamento;cd das magias;Modificados de ataque de magia;Sub;Sub2*/

function UseCla(){
  const adicionar = setVars({initialValue:{}}) 

  return{
    value: adicionar.valu,
    setValu: adicionar.setValu,
    fun:(value, mods) =>{
      var list = []
      perisSubC = []
      value.forEach((ele, index)=>{

        // dado de vida
        if(index == 1){
          list.push(ele)
        }
        
        // Vida inicial
        if(index == 2){
          if(ele != 'null'){
            let li = ele.split('+')
            list.push(Number(li[0])+Number(mods[2]))
          }else{list.push(ele)}
          
        }

        // Adicionar vida
        if(index == 3){
          list.push(ele)
        }

        // Proficiência
        if(index == 4){
          list.push(ele)
        }

        // Oficios
        if(index == 5){
          if(ele != 'null'){
            var f = []
            var l = ele.split(',')
            for(var i in l){
              if(l[i].indexOf(' ou ') !== -1){
                var li = l[i].split(' ou ')
                var lis = []
                for(var n in li){
                  if(li[n] == "Musicais"){
                    lis = lis.concat(oficios.Músico)
                  }else if(li[n] == "Artesão"){
                    lis = lis.concat(oficios.Artesão)
                  }else{lis.push(li[n])}
                }
                f.push(<Select array={lis} name={'OficiosClasse'} key={"OficioClasse"} onChange={adicionar.handleSelectChange}/>)
              }else{
                var co = l[i].split(' ')
                if(Number(co[0])){
                  var lis = []
                  if(co[1] == 'Musicais'){
                    lis = oficios['Músico']
                  }
                  if(co[1]== "Escolher"){
                    lis = l.splice(i)
                    lis.shift()
                  }
                  for(var n = 0; n < co[0] ; n++){
                    f.push(<Select array={lis} name={'Oficios'+value[0]+n} key={"Oficio"+value[0]+n} onChange={adicionar.handleSelectChange}/>)
                  }
                  break
                }
                else{f.push(l[i])}
              }
            }
            list.push(f)
          }else{list.push(ele)}
        }

        // Salvaguardas
        if(index == 6){
          list.push(ele)
        }

        // Pericias
        if(index == 7){
          if(ele != 'null'){
            var l = []
            var li = ele.split(',')
            perisCl={}
            for(var i  in li){
              if(Number(li[i])){
                for(var n = 0; n < li[i]; n++){
                  l.push(
                    <div key={'per'+value[0]+n}>
                      <Select array={proficiencias} key={"pericias"+value[0]+n} name={'pericia'+n} onChange={adicionar.handleSelectChange}/>
                    </div>
                  )
                }
                break
              }
              if(li[i].indexOf('Escolher') !== -1){
                const p = li[i].split(' ')
                var lis = li.splice(i)
                lis.shift()
                for(let n = 0; n < p[0]; n++){
                  
                  l.push(
                    <div key={'per'+value[0]+n}>
                      <Select array={lis} key={"pericias"+value[0]+n} name={'pericia'+n} onChange={adicionar.handleSelectChange}/>
                    </div>
                  )
                }
              }else{
                perisCl = {...perisCl, ['pericia'+'a']:li[i]}
                l.push(li[i])
              }              
            }
            list.push(l)
          }else{list.push(ele)}
        }

        // Equipamento
        if(index == 8){
          if(ele != 'null'){
            var lis = []
            let l = ele.split(',')
            for(let i in l){
              let li = l[i].split(' ou ')
              if(li.length >=2){
                lis.push(<Select array={li} name={'equipamento'+value[0]+i} key={'equipamento'+value[0]+i} onChange={adicionar.handleSelectChange} />)
              }else{lis.push(l[i])}
            }
            list.push(lis)
          }else(list.push(ele))
        }

        // CD de Magias
        if(index == 9){
          list.push(ele)
        }

        // Modificador de dano de Magia
        if(index == 10){
          list.push(ele)
        }

        // Sub-classe
        if(index == 11){
          if(ele != 'null'){
            var l = ele.split(',') 
            list.push(<Select array={l} name={'SubC'+value[0]} key={'Sub'+value[0]} onChange={adicionar.handleSelectChange}/>)
          }else{list.push(ele)}
        }

        // Sub-classe 2
        if(index == 12){
          if(ele != 'null'){
            var l = ele.split(',')
            list.push(<Select array={l} name={'SubC2'+value[0]} key={'Sub2'+value[0]} onChange={adicionar.handleSelectChange}/>)
          }else{list.push(ele)}
        }
        if(index == 13){
          list.push(ele)
        }
      })
      return list
  }}
}

function UseSubCla(){

  const adicionar = setVars({initialValue:[]})

  return{valu:adicionar.valu,
    fun: (value) => {
    var list = []
    console.log(value)
    value.forEach((ele, index) => {
      // Pericias
      if(index == 1){
        perisSubC = []
        if(ele.indexOf(' ou ') !== -1){
          let l = ele.split(' ou ')
          list.push(<Select array={l} key={'periciassubc'} id={'periciassubc'} name={'periciassubc'} onChange={adicionar.handleSelectChange} />)
          let periSubCa = document.getElementById('periciassubc')
          if(periSubCa){perisSubC= [periSubCa.value]}
        }else if(ele != 'null'){
          list.push(ele)
          let l = ele.split(',')
          perisSubC = [...l]
        }else(list.push(ele))
      }

      // Proficiencias
      if(index == 2){
        if(ele != 'null'){
          list.push(ele)
        } else{list.push(ele)}
      }

      // Oficioos
      if(index == 3){
        if(ele != 'null'){
          list.push(ele)
        } else{list.push(ele)}
      }

      // Idiomas
      if(index == 4){
        if(ele != 'null'){
          list.push(ele)
        } else{list.push(ele)}
      }

      // Movimentação adicional
      if(index == 5){
        if(ele != 'null'){
          list.push(ele)
        } else{list.push(0)}
      }
      // Traços
      if(index == 6){
        if(ele != 'null'){
          list.push(ele)
        } else{list.push(ele)}
      }
      // Pág
      if(index == 7){
        list.push(ele)  
      }
    })
    return list
    }
  }
}

export async function App() {
  const [list, setList] = useState([]);

  const adicionar = setVars({ initialValue: { Origem: "", Sub: "" , periciaP: {}, Regiao: [], Classe:"", SubC: "", SubC2: ""} })

  function splitCSV(text, result){
    let l = text.split('\r\n');
    
    let i = l.map((i) => i.split(';'));

    var ele = 0;

    for(const chave in result){
      result[chave] = i[ele];
      ele = ele +1;
    }

    return result
  }

  const parseCSVRacas = (text) => {
    const result = {

      Humano: [],
      Antroplantae: [],
      Construto: [],
      "Meio-Dragão": [],
      Minotauro: [],
      Troll: [],
      Vastaya: [],
      Yordle: [],
      Runinata: [],
      "": []
    }
    /* raca; herancas; pt_herancas; passos; idiomas; pericia; aprimoramento; oficio; pagina; sub; tracos */

    return splitCSV(text, result);
  }

  const parseCSVSub = (text) => {
    const result = {
      "Arbóreo": [],
      Floral: [],
      Ligeiro: [],
      "Emissário": [],
      Brutal: [],
      "Elemental Glacial": [],
      "Elemental Infernal": [],
      "Elemental da Montanha": [],
      "Elemental das Nuvens": [],
      "Elemental do Oceano": [],
      "Troll do Gelo": [],
      "Troll da Areia": [],
      "Oovi-Kat": [],
      Marai: [],
      Shimon: [],
      Fauhwoon: [],
      Ottrani: [],
      Kiilash: [],
      Lhotlan: [],
      "": []
    }
    /* sub;heranca;pt_heranca;passos;oficio;pericia;idioma;racas;tracos */

    return splitCSV(text, result);
  }

  const parseCSVPassados = (text) => {
      const result = {
        "Andarilho": [],
        "Apostador": [],
        "Aristocrata": [],
        "Artesão": [],
        "Artista": [],
        "Charlatão": [],
        "Criminoso": [],
        "Desconhecido": [],
        "Estudioso": [],
        "Exilado": [],
        "Forasteiro": [],
        "Gladiador": [],
        "Herói Local": [],
        "Inventor": [],
        "Marujo": [],
        "Mercenário": [],
        "Órfão": [],
        "Pirata": [],
        "Religioso": [],
        "Soldado": [],
        "": []
    }

    /*passado;pericias;oficio;idiomas;proficiencia;equipamento;caracteristica;pag*/
    return splitCSV(text, result)
  }

  const parseCSVReg = (text) => {
    const result = {
      "Águas de Sentina": [],
      "Bandópolis": [],
      Demacia: [],
      Freljord: [],
      "Ilhas das Sombras": [],
      Ionia: [],
      Ixtal: [],
      Noxus: [],
      Piltover: [],
      Shurima: [],
      Targon: [],
      Vazio: [],
      Zaun: [],
      "": []
    }

    return splitCSV(text, result)
  }

  const parseCSVCla = (text) => {
    const result = {
      "Acólito":[],
      Arcano:[],
      Atirador:[],
      Bodisatva:[],
      Bruto:[],
      Caçador:[],
      Combatente:[],
      Mercurial:[],
      Ninja:[],
      Peregrino:[],
      Tecmaturgo:[],
      "":[]
    }
    return splitCSV(text, result)
  }

  const parseCSVSubCla = (text) => {
    /*Sub-classe;perícias;proficiencias;Oficio;Idioma;movimentação adicional;Traços;pág*/

    const result = {
      "Rito da Essência Feral": [],
      "Rito das Estrelas": [],
      "Rito da Forja": [],
      "Rito da Lua": [],
      "Rito das Marés": [],
      "Rito de Nagácaburos": [],
      "Rito da Natureza": [],
      "Rito da Sepultura": [],
      "Rito do Sol": [],
      "Rito da Tempestade": [],
      Primitiva: [],
      "Rúnica": [],
      Espiritual: [],
      Intuitivo: [],
      Erudito: [],
      "Trilha do Desesperado": [],
      "Trilha do Vanator": [],
      "Trilha do Ravasz": [],
      "Anima do Andarilho Espiritual": [],
      "Anima do Berserker": [],
      "Anima das Cicatrizes Rúnicas": [],
      "Anima de Lutador": [],
      "Amigo das Feras": [],
      "Mestre da Caça": [],
      Vigia: [],
      "Arqueiro Rúnico": [],
      "Honra do Armestre": [],
      "Guardião": [],
      Strategos: [],
      "Ás Rúnico": [],
      Assassino: [],
      Explorador: [],
      "Trapaceiro Rúnico": [],
      "Ordem Kinkou": [],
      "Ordem das Sombras": [],
      "Nébula da Dança": [],
      "Nébula da Proteção": [],
      "Nébula do Som": [],
      Alquimia: [],
      Armas: [],
      Armaduras: [],
      "Máquinas": [],
      Mechas: [],
      "": [null,null,null,null,null,null,null,null]
    }

    return splitCSV(text, result)
  }

  const [csv, setCsv] = useState({ "": ['null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null'] });

  const [subRacas, setSubRacas] = useState({"": ['null', 'null', 'null', 'null', 'null', 'null', 'null', 'null', 'null'] });

  const [passado, setPassado] = useState({"": ['null','null','null','null','null','null','null']})

  const [Reg, setReg] = useState({"":['null','null','null','null','null']})

  const [cla, setCla] = useState({"":['null','null','null','null','null','null','null','null','null','null','null','null','null','null']})

  const [subCla, setSubCla] = useState({"":['null','null','null','null','null','null','null','null']});

  const [antCla, setAntCla] = useState();

  /* Puchando os CSVs */
  useEffect(async () => {

    let tabraca = await fetch("./src/assets/tabs/tabRacas.csv")
    
    tabraca.then((r) => r.text())
      .then((text) => {
        setCsv(parseCSVRacas(text));
    });

    let tabsub = await fetch("./src/assets/tabs/tabSub.csv")
      
    tabsub.then((r) => r.text())
      .then((text) => {
        setSubRacas(parseCSVSub(text));
    });

    let tabpas = await fetch("./src/assets/tabs/tabPassados.csv")
      
    tabpas.then((r) => r.text())
      .then((text) => {
        setPassado(parseCSVPassados(text));
    });

    let tabreg = await fetch("./src/assets/tabs/tabReg.csv")
      
    tabreg.then((r) => r.text())
      .then((text) => {
        setReg(parseCSVReg(text));
    })

    let tabcla = await fetch("https://drive.google.com/file/d/1Oo9817FY7WuYDj1BaYKHGybiSkhlwKnV/view?usp=sharing")
      
    tabcla.then((r) => r.text())
      .then((text) => {
        setCla(parseCSVCla(text));
    })

    let tabsubcla = await fetch("./src/assets/tabs/tabSubCla.csv")
      
    tabsubcla.then((r) => r.text())
      .then((text) => {
        setSubCla(parseCSVSubCla(text));
    })
  }, []); 

  const [mods, setMods] = useState([]); 

  const useC = useCaracs({ initialValue: [null, null, null, null, null, null, null, null, null, null], csv: csv[adicionar.valu.Origem] });

  const useSubC = useSubCaracs();

  const usePasC = usePasCaracs();

  const useReg = UseReg({initialValue:[null,null,null,null,null]});

  const useCla = UseCla({initialValue:[null,null,null,null,null,null,null,null,null,null,null,null]});

  const useSubCla = UseSubCla()

  useEffect(() => {
    const adicional = useC.fun(csv[adicionar.valu.Origem]);

    const addReg = useReg.fun(Reg[adicionar.valu.Regiao])

    adicionar.setAdd({ ...adicionar.add })

    const addCla = useCla.fun(cla[adicionar.valu.Classe],mods)

    const addsub = useSubC.fun(subRacas[pass.Sub]);
    
    const addPassa = usePasC.fun(passado[pass.Passado]);

    const na = "SubC"+adicionar.valu.Classe
    const na2 = "SubC2"+adicionar.valu.Classe


    var addSubC = ['null','null','null','null','null','null','null']

    var addSubC2 = ['null','null','null','null','null','null','null']

    
    console.log(pass[na])
    if(subCla[pass[na]]){
      addSubC = useSubCla.fun(subCla[pass[na]])
      
    }
    
    if(subCla[pass[na2]]){
      addSubC2 = useSubCla.fun(subCla[pass[na2]])
    }
    
    const listaf = adicional.concat(addsub, addPassa, addReg, addCla, addSubC, addSubC2);

    console.log(listaf)

    adicionar.setValu({...adicionar.valu})
    setList(listaf);
  }, [pass, adicionar.valu.Regiao, mods]);


  /* Recebendo as Pericias */
  useEffect(() => {

    let periciaP = usePasC.valu

    if(!isEmptyObj(perisP)){
      periciaP = {...periciaP, ...perisP}
    }

    let periciaC = useC.valu

    if(!isEmptyObj(perisC)){
      periciaC = perisC
    }

    let periciaS = useSubC.valu

    periciaS = {...periciaS, perisS}

    let periciaR = useReg.value

    
    let periciasR = periciaR['peri'+pass.Regiao]
    
    setAntCla(adicionar.valu.Classe)

    let periciasCl = {}


    if(antCla != adicionar.valu.Classe){
      useCla.setValu()
    }else{
      periciasCl = {...useCla.value,...perisCl}
    }

    adicionar.setValu({...adicionar.valu, periciaP, periciaC, periciaS, periciasR, periciasCl, perisSubC})

    console.log(adicionar.valu)

    if(pass.Regiao != undefined){
      useReg.setValu({['peri'+pass.Regiao]:periciaR['peri'+pass.Regiao]})
    }
  }, [pass, useSubC.valu])

  const [esc, setEsc] = useState(0);

  const escolha = (tipo) => {
    if (tipo.target.id == "smp") {
      setEsc(0)
    } else if (tipo.target.id == "rlg") {
      setEsc(1)
    } else if (tipo.target.id == "ecn") {
      setEsc(2)
    }
  }

  function isNull(val) {
    if (val == "null") {
      return
    }
    else {
      return val
    }
  }

  const adicionaNome = e => {
    const value = e.target.value;
    const name = "name";
    adicionar.setValu({ ...adicionar.valu, [name]: value });
  }
  
  return (
    <div className="text-center h-auto break-all ">
      <Header />
      <div className="bg-[#5F4AA9] mt-5 pb-12">  
        <h1 className="text-center">Para melhor construção dessa ficha é necessario abrir o <a className="font-bold" href="/src/downloads/livro.pdf" download>livro do jogador</a>, a versão lite é mais recomendada pelo fato de abrir vários livros de uma só vez ser um ato recorrente.<br />Ao final é necessario fazer download da <a className="font-bold" href="/src/downloads/ficha.pdf" download>ficha de personagem</a> (recomendo abrir no google chrome pois nele você podera abrir e editar a ficha diretamente) e preencher os campos conforme foi criado aqui.</h1>
        <br/>
        <h1 className="text-center font-semibold text-2xl">ATENÇÃO!</h1>
        <h1>Leia os traços das suas escolhas, a escolha das mágias e runa é por sua conta, consulte as páginas: 7 para súmario, 178 para heranças, 206 para runas, 243 para ofícios, 326 para lista de mágias</h1>
        <span className="">Forma de distribuir pontos (normalmente isso é definido pelo mestre para todos os jogadores):</span>
        <div>
          <input type="radio" name="tipo" id="smp" onChange={(e) => escolha(e)} defaultChecked />
          <label>Soma de pontos</label>
        </div>
        <div>
          <input type="radio" name="tipo" id="rlg" onChange={(e) => escolha(e)} />
          <label>Rolagem</label>
        </div>
        <div>
          <input type="radio" name="tipo" id="ecn" onChange={(e) => escolha(e)} />
          <label>Escolher os números</label>
        </div>
        <div className="text-center text-2xl h-30">
          <div className="flex-col break-all columns-3 w-[100%] ">
            <div>
              <span className="w-[100%] inline-block ">Personagem:</span>
              <div className="w-[80%] text-xl inline-block "><input className="border-[3.5px] w-[100%] border-current border-neutral-900 bg-purple-400" name="name" onKeyUp={(e) => adicionaNome(e)} type="text"></input></div>
            </div>
            <div>
              <span className="w-[100%] inline-block">Origem:</span>
              <div className="w-[100%] text-xl inline-block"><Select name="Origem" array={origem} onChange={adicionar.handleSelectChange} /> {isNull(list[6])}</div>
            </div>
            <div>
              <span className="w-[100%] inline-block">Região:</span>
              <div className="w-[100%] text-xl inline-block"><Select name="Regiao" array={regiao} onChange={adicionar.handleSelectChange} /></div>
            </div>
            <div>
              <span className="w-[100%] inline-block">Passado:</span>
              <div className="w-[100%] text-xl inline-block"><Select name="Passado" array={passados} onChange={adicionar.handleSelectChange} /></div>
            </div>
            <div>
              <span className="w-[100%] inline-block">Moral:</span>
              <div className="w-[100%] text-xl inline-block"><Select name="Moral" array={moral} onChange={adicionar.handleSelectChange} /></div>
            </div>
            <div>
              <span className="w-[100%] inline-block">Classe e Nível:</span>
              <div className="w-[100%] text-xl inline-block"><Select name="Classe" array={classes} onChange={adicionar.handleSelectChange} />
              {isNull(list[35])}
            {isNull(list[36])}<span className="bg bg-purple-400 border-[3.5px] border-current border-neutral-900">1</span></div>
            </div>
          </div>
        </div>
        <div className="h-6">
          <span>Página para consultar a origem:</span>
          <br />
          {isNull(list[5])}

        </div>
        <br />
        <div className="h-6">
          <span>Página para consultar sub-classe:</span>
          <br />

          {isNull(list[44])} {isNull(list[51])}
        </div>
        <br />
        <div className='text-[1.20rem] font-semibold'>
          Vida:  {isNull(list[26])} | 
          Vida adicional nos próximos níveis: ({isNull(list[25])} ou {isNull(list[27])}) + Constituição | 
          Salvaguardas: {isNull(list[30])} | 
          Cd de Magias: {isNull(list[33])} | 
          Dano adicional de Magias: {isNull(list[34])} 
        </div>
        <div className="mt-10 w-[100%] h-[720px]">
          <div className="float-left w-[23%]">
            <div>
              {pericias.map((e) => {
                let check = false
                let nu = 0
                for(const chave in adicionar.valu['periciaP']){
                  if(adicionar.valu['periciaP'][chave] == e[0]){
                    nu=2
                    check = true
                  }
                }
                for(const chave in adicionar.valu['periciaS']){
                  if(adicionar.valu['periciaS'][chave] == e[0]){
                    nu=2
                    check = true
                  }
                }
        
                for (const chave in adicionar.valu['periciasCl']){
                  if(adicionar.valu['periciasCl'][chave] == e[0]){
        
                    nu=2
                    check = true
                  }
                }
                for(const chave in adicionar.valu['periciaC']){
                  if(adicionar.valu['periciaC'][chave] == e[0]){
        
                    nu=2
                    check = true
                  }
                }
                if(adicionar.valu['periciasR'] == e[0]){
        
                  nu=2
                  check = true
                }
                for(const chave in adicionar.valu['perisSubC']){
                  if(adicionar.valu['perisSubC'][chave] == e[0]){
        
                    nu=2
                    check = true
                  }
                }
        
                return(
                  <Mod key={'pericia'+e[0]} e={e} nu={nu} ord={ord} mods={mods} check={check}/>
                )
        
              })}
            <div >
              <span>Perícias:</span>
              {isNull(list[31])} {isNull(list[3])} {isNull(list[15])} {isNull(list[12])} {isNull(list[22])}
              {isNull(list[38])} {isNull(list[45])}
            </div>
            </div>
          </div>
          <div className="float-left h-[100%] w-[16%]">
            <TabRolagemDados add={[csv[adicionar.valu.Origem][1], list[8]]} esc={esc} set={setMods}/>
            <TabEscolherNumeros add={[csv[adicionar.valu.Origem][1], list[8]]} esc={esc} set={setMods}/>
            <TabPontosSoma add={[csv[adicionar.valu.Origem][1], list[8]]} esc={esc} set={setMods}/>

          </div>
          <div className="float-left h-[100%] w-[60%] break-normal">
            <div className="h-[10%]">
              <span>Deslocamento: </span>
              {(!Number.isNaN(Number(isNull(list[1]))) ? Number(list[1]) : 0)+
              (!Number.isNaN(Number(isNull(list[42]))) ? Number(list[42]) : 0)+
              (!Number.isNaN(Number(isNull(list[49]))) ? Number(list[49]) : 0)+ 
              (!Number.isNaN(Number(isNull(list[10]))) ? Number(list[10]) : 0)}
              
               Pés
            </div>
            <div className="h-[30%] inline-block" >
              <span>Inventario:</span>
              <br/>
              {isNull(list[19])}
              {isNull(list[32])}
            </div>
            <div className="columns-4 inline-block w-[100%] h-[40%]">
              <div className="h-[100%] block w-[80%]">
                <span>Ofícios:</span><br />
                {isNull(list[11])}
                {isNull(list[16])}
                {isNull(list[24])}
                {isNull(list[29])}
                {isNull(list[40])}
                {isNull(list[47])}
                <br />
              </div>
              <div className="h-[100%] -ml-[30%] block w-[80%]">
                <span>Idiomas:</span>
                <br />
                {isNull(list[21])}
                {isNull(list[2])}
        
                {isNull(list[13])}
                {isNull(list[17])}
                {isNull(list[48])}
                {isNull(list[41])}
              </div>
              <div className="h-[100%] -ml-[54%] block w-[100%]">
                <span>Proficiência:</span><br />
                {isNull(list[28])} {isNull(list[23])} {isNull(list[18])} {isNull(list[39])} {isNull(list[46])} 
              </div>
              <div className="h-[100%] -ml-[64%] block w-[100%]">
                <span>Heranças:</span>
                <br />
                {isNull(list[0])}
                {isNull(list[9])}
                {isNull(list[4])}
              </div>
            </div>

            <div className="h-[20%]">
              <span>Traços:</span>
                <br />
                {isNull(list[7])}
                {isNull(list[14])}
                {isNull(list[20])}
                {isNull(list[37])}              
                {isNull(list[43])}
                {isNull(list[50])}
            </div>



            <br />
          </div>
        </div>
      </div>
    </div>
  )
}
/* 
    ORDEM DE LIST
  0 Herança da Origem
  1 Pés
  2 Linguás
  3 Pericias
  4 Aprimoramentos
  5 Páginas
  6 Sub-raças
  7 Traços
  8 Atributos
  9 Pontos de Herança
  10 Passos
  11 Oficios
  12 Proficiencias
  13 Idiomas
  14 Traços
  15 Pericias
  16 Oficios
  17 Idioma
  18 Proficiencia
  19 Equipamento 
  20 Caracteristica
  21 Idiomas
  22 Pericias
  23 Proficiencia com Armas
  24 Ofícios
  25 Dado de Vida
  26 Vida
  27 Adicionar de vida fixo
  28 Proficiencias
  29 Oficio
  30 Salvaguarda
  31 Pericias
  32 Equipamento
  33 CD das Magias
  34 Modificador de dano de magia
  35 Sub-classe
  36 Sub-classe 2
  37 Habilidades
  38 Pericias
  39 Proficiencias
  40 OFicios
  41 Idiomas
  42 Movimentação adicional
  43 Traços
  44 Pág sub classe
  45 Pericias
  46 Proficiencias
  47 Oficios
  48 Idiomas
  49 Movimentação adicional 
  50 Traços
  51 Pág sub classe 2
*/
export default App
