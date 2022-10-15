import { FC } from 'react';
import { useManifest } from '../utils/fetchers';

export const List: FC = () => {
  const { data, error, updateFlag } = useManifest();

  if (error) {
    return <div>An error occurred</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {Object.entries(data.flags).map(([flag, enabled]) => (
        <li key={flag}>
          <span>{flag}</span>
          <input
            checked={enabled}
            onChange={(e) => updateFlag(flag, e.currentTarget.checked)}
            type="checkbox"
          />
        </li>
      ))}
    </ul>
  );
};
