import React, { useState } from "react";
import styles from "./styles.module.css";
import SearchIcon from "../../static/Search.svg";

type SearchProps = {
  title: string;
};

const Search = ({ title }: SearchProps) => {
  const [isShownicon, setIsShowIcon] = useState(true);
  console.log(title);

  return (
    <React.Fragment>
      <div className={styles.pageTitleContainer}>
        <p className={styles.pageTitle}>{title}</p>
        <div className={styles.pageSearch}>
          <input
            placeholder="Search"
            onFocus={() => setIsShowIcon(false)}
            onBlur={() => setIsShowIcon(true)}
            className={styles.pageSearchField}
          />

          {isShownicon ? (
            <img
              className={styles.pageSearchIcon}
              src={SearchIcon}
              alt="SearchLogo"
            />
          ) : null}
        </div>
      </div>
      
    </React.Fragment>
  );
};
export default Search;
