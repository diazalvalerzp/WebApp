import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import styles from './Switch.module.css'

function Switch() {
    const [isLightMode, setIsLightMode] = useState(false);

    // Apply the current mode on initial render
    useEffect(() => {
        applyMode();
    }, []);

    // Apply the mode whenever isDarkMode changes
    useEffect(() => {
        applyMode();
    }, [isLightMode]);

    const applyMode = () => {
        if (isLightMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    };

    const toggleMode = () => {
        setIsLightMode((prevMode) => !prevMode);
    };

    const element = <FontAwesomeIcon icon={faMoon} />

    return (
        <div className={styles.switchContainer}>
            <input
                type="checkbox"
                className={styles.checkbox}
                checked={isLightMode}
                onChange={toggleMode}
                id="switch"
            />
            <label htmlFor="switch" className={styles.switchLabel}>
                <FontAwesomeIcon icon={isLightMode ? faSun : faMoon} className={styles.switchIcon} />
                <div className={styles.switchSlider}></div>
            </label>
        </div>
    );
}

export default Switch;
