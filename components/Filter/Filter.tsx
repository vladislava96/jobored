import { Button } from '@mantine/core';
import { FormEvent, KeyboardEvent, useState } from 'react';
import style from './Filter.module.scss';
import CataloguesFilter from '../CataloguesFilter/CataloguesFilter';
import SalaryFilter from '../SalaryFilter/SalaryFilter';
import { useAppDispatch } from '../../app/hooks';
import { loadVacancies, setCatalogues, setPage, setPaymentFrom, setPaymentTo } from '../../features/vacancies/vacancies';

export default function Filter() {
  const dispatch = useAppDispatch();
  const [catalogueKey, setCatalogueKey] = useState<number | undefined>();
  const [paymentFrom, setPaymentFromFilter] = useState<number | undefined>();
  const [paymentTo, setPaymentToFilter] = useState<number | undefined>();

  function onSelectCatalogChange(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    dispatch(setCatalogues(catalogueKey));
    dispatch(setPaymentFrom(paymentFrom));
    dispatch(setPaymentTo(paymentTo));
    dispatch(setPage(1));
    dispatch(loadVacancies());
  }

  function clearForm() {
    setCatalogueKey(undefined);
    setPaymentFromFilter(undefined);
    setPaymentToFilter(undefined);
    dispatch(setCatalogues(undefined));
    dispatch(setPaymentFrom(undefined));
    dispatch(setPaymentTo(undefined));
    dispatch(setPage(1));
    dispatch(loadVacancies());
  }

  function onClearButtonKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    event.preventDefault();
    if (event.key === ' ') {
      clearForm();
    }
  }

  return (
    <form className={style.filter} onSubmit={onSelectCatalogChange}>
      <div className={style.filter__header}>
        Фильтры
        <div
          role="button"
          tabIndex={0}
          className={style.filter__reset}
          onClick={clearForm}
          onKeyDown={onClearButtonKeyDown}
        >
          Сбросить все
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="11.7425" y1="4.44219" x2="4.44197" y2="11.7427" stroke="#ACADB9" strokeWidth="1.25" />
            <line x1="11.9013" y1="11.7425" x2="4.60082" y2="4.44197" stroke="#ACADB9" strokeWidth="1.25" />
          </svg>
        </div>
      </div>
      <div className={style.filter__controls}>
          <CataloguesFilter
            catalogueKey={catalogueKey}
            onCatalogueKeyChange={setCatalogueKey}
          />
          <SalaryFilter
            paymentFrom={paymentFrom}
            paymentTo={paymentTo}
            onPaymentFromChange={setPaymentFromFilter}
            onPaymentToChange={setPaymentToFilter}
          />
          <Button data-elem="search-button" type="submit">Применить</Button>
      </div>
    </form>
  );
}
