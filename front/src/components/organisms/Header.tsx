import { ChangeThemeToggle } from '@/components/atoms/ChangeThemeToggle';
import styles from '@/components/organisms/Header.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type SlideButtonProps = {
  options: { label: string; link: string }[];
  selectedIndex: number;
  onIndexChange: (index: number) => void;
};

const SlideButton = ({ options, selectedIndex, onIndexChange }: SlideButtonProps) => {
  const handleClick = (index: number) => {
    onIndexChange(index);
  };

  return (
    <div className={styles.container} id="slide-container">
      <div
        className={styles.slider}
        style={{
          width: `${95 / options.length}%`,
          transform: `translateX(${selectedIndex * 105 + 3}%)`,
        }}
        id="slide-button"
      />
      {options.map((option, index) => (
        <Link
          href={option.link}
          key={index}
          className={styles.button}
          onClick={() => handleClick(index)}
        >
          {option.label}
        </Link>
      ))}
    </div>
  );
};

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const fadeOutTriggerPosition = 200;

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);
  const handleLogoClick = () => {
    closeMenu();
    setCurrentSlideIndex(0);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <Link
          href="/"
          className={`${styles.head_name} ${scrollPosition >= fadeOutTriggerPosition ? styles.fade_out : styles.fade_in
            }`}
          onClick={handleLogoClick}
        >
          thirofoo
        </Link>
        <div className={styles.ham_menu} onClick={toggleMenu} id="ham-menu">
          <i className={isMenuOpen ? styles.open : ''}></i>
          <i className={isMenuOpen ? styles.open : ''}></i>
          <i className={isMenuOpen ? styles.open : ''}></i>
        </div>
      </div>
      <div className={`${styles.content} ${isMenuOpen ? styles.head_open : styles.head_close}`}>
        <div className={styles.button_wrapper}>
          <div className={styles.theme_toggle}>
            <ChangeThemeToggle />
          </div>
          <SlideButton
            options={[
              { label: 'Home', link: '/' },
              { label: 'Work', link: '/work' },
              { label: 'Blog', link: '/blog' },
            ]}
            selectedIndex={currentSlideIndex}
            onIndexChange={setCurrentSlideIndex}
          />
        </div>
      </div>
    </header>
  );
};
