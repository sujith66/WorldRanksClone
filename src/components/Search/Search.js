import React from 'react';
import SearchRounded from "@material-ui/icons/SearchRounded";
import styles from "./Search.module.css"
function Search({...rest}) {
    return (
        <div className={styles.wrapper}>
            <SearchRounded color="inherit"/>
            <input className={styles.input} {...rest}/>
        </div>
    );
}

export default Search;