import { Select } from '@mantine/core';
import { useEffect } from 'react';
import style from './CataloguesFilter.module.scss';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { loadCatalogues, selectAllCatalogues } from '../../features/catalogues/catalogues';

interface CataloguesFilterProps {
  catalogueKey?: number;
  onCatalogueKeyChange: (key: number | undefined) => void;
}

export default function CataloguesFilter(props: CataloguesFilterProps) {
  const { catalogueKey, onCatalogueKeyChange } = props;
  const catalogues = useAppSelector(selectAllCatalogues);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadCatalogues());
  }, []);

  function onSelectChange(value: string | null) {
    onCatalogueKeyChange(value === null ? undefined : Number(value));
  }

  return (
    <div className={style.cataloguesFilter}>
      <Select
        data-elem="industry-select"
        label="Отрасль"
        placeholder="Выберите отрасль"
        radius="md"
        size="md"
        value={catalogueKey === undefined ? null : String(catalogueKey)}
        onChange={onSelectChange}
        rightSection={
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5 9L11.2191 14.3306C11.6684 14.7158 12.3316 14.7158 12.7809 14.3306L19 9"
              stroke="#ACADB9"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        }
        rightSectionWidth={30}
        styles={{ rightSection: { pointerEvents: 'none' } }}
        data={
          catalogues.map((catalog) => ({
            value: String(catalog.key),
            label: catalog.title,
          }))
        }
      />
    </div>
  );
}
