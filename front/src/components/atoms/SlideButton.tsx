import styles from '@/components/atoms/SlideButton.module.css';
import Link from 'next/link'; // Next.js の Link を使用
import { useState } from 'react';

type SlideButtonProps = {
  options: { label: string; link: string }[]; // ボタンの選択肢と対応するリンク
  defaultIndex?: number; // 初期選択インデックス
  onChange?: (selected: string) => void; // 選択が変更されたときのコールバック
};

export const SlideButton = ({
  options,
  defaultIndex = 0,
  onChange,
}: SlideButtonProps) => {
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex);

  const handleClick = (index: number) => {
    setSelectedIndex(index);
    onChange?.(options[index].label); // ボタンのラベルをコールバックで返す
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
