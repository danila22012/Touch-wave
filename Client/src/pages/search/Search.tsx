import { useState } from "react";
import styles from "./styles.module.css";
import BackIcon from "../../static/BackIcon.svg";
import SearchIcon from "../../static/Search.svg";

type SearchProps = {
  setMobileSearch: any;
};

const Search = ({ setMobileSearch }: SearchProps) => {
  const [isShownicon, setIsShowIcon] = useState(true);

  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchHeader}>
        <div className={styles.searcHeaderTitle}>
          <img
            src={BackIcon}
            alt="back"
            onClick={() => setMobileSearch(false)}
          />
          <p style={{ marginLeft: "10px" }}>Search</p>
        </div>
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
    </div>
  );
};
export default Search;
