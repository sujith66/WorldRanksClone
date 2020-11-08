import { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import styles from "./Country.module.css";

const getcountry = async (id) => {
  const result = await fetch(`https://restcountries.eu/rest/v2/alpha/${id}`);
  const country = await result.json();
  return country;
};

const country = ({ country }) => {
  const [borders, setBorders] = useState([]);

  const getBorders = async () => {
    const borders = await Promise.all(
      country.borders.map((item) => getcountry(item))
    );
    setBorders(borders);
  };

  useEffect(() => {
    getBorders();
  }, []);

  return (
    <Layout title={country.name}>
      <section className={styles.container}>
        <section className={styles.container_left}>
        <div className={styles.overview_panel}>
          <img src={country.flag} alt={country.name} />
          <h1 className={styles.overview_country}>{country.name}</h1>
          <p className={styles.overview_region}>{country.region}</p>

          <section className={styles.overview_numbers}>
            <div className={styles.overview_population}>
              <p className={styles.overview_value}>{country.population}</p>
              <p className={styles.overview_label}>Population</p>
            </div>
            <div className={styles.overview_area}>
              <p className={styles.overview_value}>{country.area}</p>
              <p className={styles.overview_label}>Area</p>
            </div>
          </section>
        </div>
        </section>
       
        <section className={styles.container_right}>
        <div className={styles.details_panel}>
          <h3 className={styles.details_panel_heading}>Details</h3>
          <div className={styles.details_panel_row}>
            <div className={styles.details_name}>Capital</div>
            <div className={styles.details_value}>{country.capital}</div>
          </div>
          <div className={styles.details_panel_row}>
            <div className={styles.details_name}>Languages</div>
            <div className={styles.details_value}>
              {country.languages.map(({ name }) => name).join(", ")}
            </div>
          </div>
          <div className={styles.details_panel_row}>
            <div className={styles.details_name}>Currencies</div>
            <div className={styles.details_value}>
              {country.currencies.map(({ name }) => name)}
            </div>
          </div>
          <div className={styles.details_panel_row}>
            <div className={styles.details_name}>Native name</div>
            <div className={styles.details_value}>{country.nativeName}</div>
          </div>
          <div className={styles.details_panel_row}>
            <div className={styles.details_name}>Gini</div>
            <div className={styles.details_value}>{country.gini} %</div>
          </div>

         
          <div className={styles.neighbouring_panel_borders}>
            <h3 className={styles.neighbouring_panel_heading}>
              Neighbouring Countries
            </h3>

            <div className={styles.neighbouring_panel_borders_container}>
             {borders.map(({ flag, name }) => 
                <div className={styles.neighbouring_panel_country}  key={name}>
                  <img src={flag} alt={name} key={name}/>
                <div className={styles.neighbouring_panel_name}>{name}</div>
                </div>
             )}
          </div>
           
          </div >
        </div>
</section>
      </section>
    </Layout>
  );
};

export default country;

export const getStaticPaths = async ()=>{
  const result = await fetch("https://restcountries.eu/rest/v2/all");
  const countryData = await result.json();

  const countryCode = countryData.map(item=>({
    params: {id: item.alpha3Code}
  }));

  return {
    paths : countryCode,
    fallback: false
  }
};

export const getStaticProps = async ({ params }) => {
  const country = await getcountry(params.id);
  return {
    props: {
      country,
    },
  };
};
