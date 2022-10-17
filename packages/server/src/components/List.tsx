import { FC } from 'react';
import { useManifest } from '../utils/fetchers';
import styles from './List.module.scss';

export const List: FC = () => {
  const { data, error, updateFlag } = useManifest();

  if (error) {
    return <div>{error.message}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={styles['input-wrapper']}>
        <input aria-label="New Flag" placeholder="New Flag" />
      </div>
      {Object.entries(data.flags).map(([flag, enabled]) => (
        <label className={styles.card} htmlFor={`flag-${flag}`} key={flag}>
          <span>{flag}</span>
          <input
            checked={enabled}
            id={`flag-${flag}`}
            onChange={(e) => updateFlag(flag, e.currentTarget.checked)}
            type="checkbox"
          />
        </label>
      ))}
    </>
  );
};
