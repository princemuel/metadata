'use client';

import { Range } from 'react-date-range';
import { Button } from '../atoms';
import { DatePicker } from './calendar';

interface Props {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
}

const ListingReservation = ({
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates,
}: Props) => {
  return (
    <div className='overflow-hidden rounded-xl border border-neutral-200 bg-white'>
      <p className='flex items-center gap-1 p-4'>
        <span className='text-2xl font-semibold'>$ {totalPrice}</span>
        <span className='font-light text-neutral-600'>night</span>
      </p>

      <hr />

      <DatePicker
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />

      <hr />

      <div className='p-4'>
        <Button
          disabled={disabled}
          label='Reserve'
          onClick={onSubmit}
        />
      </div>

      <hr />

      <p className='flex items-center justify-between p-4 text-lg font-semibold'>
        <span>Total</span>
        <span>$ {totalPrice}</span>
      </p>
    </div>
  );
};

export { ListingReservation };
