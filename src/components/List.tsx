import { FC } from 'react';
import { useManifest } from '../utils/fetchers';

export const List: FC = () => {
  const { data, error } = useManifest();

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
          <input checked={enabled} type="checkbox" />
        </li>
      ))}
    </ul>
  );
};
