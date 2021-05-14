import React, { useState } from "react";
import styles from "./styles.module.css";
import SearchIcon from "../../static/Search.svg";

type PageTitleProps = {
  title: string;
};

const PageTitle = ({ title }: PageTitleProps) => {
  
  const [isShownicon, setIsShowIcon] = useState(true);
  const [mobileSearch, setMobileSearch] = useState(false);

  return (
    <React.Fragment>
      <div className={styles.pageTitleContainer}>
        <div className={styles.searchMobileToggle}>
          <p className={styles.pageTitle}>{title}</p>
          <img
            className={styles.mobileSearchIcon}
            src={SearchIcon}
            alt="SearchLogo"
          />
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
    </React.Fragment>
  );
};
export default PageTitle;
