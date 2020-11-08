import { KeyboardArrowDownRounded,KeyboardArrowUpRounded } from "@material-ui/icons";
import { useState } from "react";
import styles from "./CountriesTable.module.css";
import Link from "next/link";

const orderBy = (countries,value,direction) => {
    if(direction === "asc"){
        return [...countries].sort((a, b) => (a[value] > b[value] ? 1 : -1));
    }
    if(direction === "desc"){
        return [...countries].sort((a, b) => (a[value] > b[value] ? -1 : 1));
    }
    return countries;
};

const SortArrow = ({direction})=>{
if(!direction){
    return <></>
}
if(direction === 'asc'){
    return <div className={styles.headingArrow}><KeyboardArrowUpRounded color="inherit"/></div> 
}
if(direction === "desc"){
    return <div className={styles.headingArrow}><KeyboardArrowDownRounded color="inherit"/></div> 
}
}
const CountriesTable = ({ countries }) => {
    const [direction, setDirection] = useState();
    const [value, setValue] = useState();
    const orderedCountries = orderBy(countries,value,direction);

    const switchDirection = ()=>{
        if(!direction){
            setDirection('desc')
        } else if(direction === 'desc'){
            setDirection('asc')
        } else{
            setDirection(null)
        }

    }

    const setValueOnSort = (value)=>{
        switchDirection();
        setValue(value)
    }
  return (
    <div>
      <div className={styles.heading}>
        <div className={styles.button_flag}>
        </div>
        <button className={styles.button_name} onClick={()=>setValueOnSort('name')}>
          <div>Name</div>
          <SortArrow direction={direction} />
        </button>

        <button className={styles.button_population} onClick={()=>setValueOnSort('population')}>
          <div>Population</div>
          <SortArrow direction={direction} />
        </button>

        <button className={styles.button_area} onClick={()=>setValueOnSort('area')}>
          <div>Area (km<sub>2</sub>)</div>
          <SortArrow direction={direction} />
        </button>

        <button className={styles.button_gini} onClick={()=>setValueOnSort('gini')}>
          <div>Gini</div>
          <SortArrow direction={direction} />
        </button>
      </div>
      <div>
        {orderedCountries.map((country,index) => (
            <Link href={`/Country/${country.alpha3Code}`} key={index}>
          <div className={styles.row} key={index}>
          <div className={styles.flag}><img src={country.flag} alt={country.name} /></div>
            <div className={styles.name}>{country.name}</div>
            <div className={styles.population}>{country.population}</div>
            <div className={styles.area}>{country.name}</div>
            <div className={styles.gini}>{country.population}</div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CountriesTable;
