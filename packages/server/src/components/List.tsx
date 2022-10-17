import { FC, FormEventHandler, useCallback, useState } from 'react';
import Plus from '../icons/plus.svg';
import { useManifest } from '../utils/fetchers';
import styles from './List.module.scss';

export const List: FC = () => {
  const { addFlag, data, error, updateFlag } = useManifest();
  const [newValue, setNewValue] = useState('');

  const formHandler: FormEventHandler = useCallback(
    (e) => {
      e.preventDefault();
      addFlag(newValue);
      setNewValue('');
    },
    [addFlag, newValue]
  );

  if (error) {
    return <div>{error.message}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <form className={styles['input-wrapper']} onSubmit={formHandler}>
        <input
          aria-label="New Flag"
          onChange={(e) => setNewValue(e.currentTarget.value)}
          placeholder="New Flag"
          value={newValue}
        />
        <button className={styles.button} type="submit">
          <Plus />
        </button>
      </form>
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
