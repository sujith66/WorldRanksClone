import Layout from "../components/Layout/Layout";
import Search from "../components/Search/Search";
import styles from "../styles/Home.module.css";
import CountriesTable from "../components/CountriesTable/CountriesTable";
import { useState } from "react";

export default function Home({ countryData }) {
  const [searchParam, setSearchParam] = useState("");
  const filterCountries = countryData.filter((country) => 
    country.name.toLowerCase().includes(searchParam) ||
    country.region.toLowerCase().includes(searchParam) ||
    country.subregion.toLowerCase().includes(searchParam)
    );
  const onInputChange = (e) => {
    e.preventDefault();
    setSearchParam(e.target.value.toLowerCase());
  };
  return (
    <Layout>
      <div className={styles.container}><div className={styles.counts}>Found {countryData.length} countries</div>
      <div className={styles.searchInput}><Search
        placeholder="Filter by name, region or subregion"
        onChange={onInputChange}
      /></div></div>
      
      <CountriesTable countries={filterCountries} />
    </Layout>
  );
}

export const getStaticProps = async () => {
  const result = await fetch("https://restcountries.eu/rest/v2/all");
  const countryData = await result.json();
  return {
    props: {
      countryData,
    },
  };
};
