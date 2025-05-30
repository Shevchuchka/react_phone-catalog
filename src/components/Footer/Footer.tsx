import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';
import { ArrowIcon } from '../Icons/Arrow';

export const Footer = () => {
  const handleScrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerLogo}>
          <Link to="/" className="logo logo--footer"></Link>
        </div>

        <div className={styles.footerNav}>
          <Link
            to="https://github.com/Shevchuchka/react_phone-catalog"
            className="link-upper-text"
            target="_blank"
          >
            Github
          </Link>
          <Link
            to="https://github.com/Shevchuchka/react_phone-catalog"
            className="link-upper-text"
            target="_blank"
          >
            Contacts
          </Link>
          <Link
            to="https://github.com/Shevchuchka/react_phone-catalog"
            className="link-upper-text"
            target="_blank"
          >
            Rights
          </Link>
        </div>

        <div
          className={`buttons ${styles.footerButtons}`}
          aria-label="To Top"
          onClick={handleScrollUp}
        >
          <span className="body-text grayText">Back to top</span>

          <button className="button toTop upBtn" aria-label="To Top Arrow">
            <span className="icon">
              <ArrowIcon />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
};
