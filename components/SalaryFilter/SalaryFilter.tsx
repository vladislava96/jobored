import { NumberInput } from '@mantine/core';
import style from './SalaryFilter.module.scss';

interface SalaryFilterProps {
  paymentFrom?: number,
  paymentTo?: number,
  onPaymentFromChange: (payment: number | undefined) => void,
  onPaymentToChange: (payment: number | undefined) => void,
}

export default function SalaryFilter(props: SalaryFilterProps) {
  const {
    paymentFrom,
    paymentTo,
    onPaymentFromChange,
    onPaymentToChange,
  } = props;

  function onPaymentFromInputChange(value: number | '') {
    onPaymentFromChange(value === '' ? undefined : value);
  }

  function onPaymentToInputChange(value: number | '') {
    onPaymentToChange(value === '' ? undefined : value);
  }

  return (
    <div className={style.salaryFilter}>
      <NumberInput
        data-elem="salary-from-input"
        placeholder="От"
        label="Отрасль"
        radius="md"
        size="md"
        value={paymentFrom === undefined ? '' : paymentFrom}
        onChange={onPaymentFromInputChange}
      />
      <NumberInput
        data-elem="salary-to-input"
        placeholder="До"
        radius="md"
        size="md"
        value={paymentTo === undefined ? '' : paymentTo}
        onChange={onPaymentToInputChange}
      />
    </div>
  );
}
