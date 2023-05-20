import { Button, Input } from '@mantine/core';
import Image from 'next/image';
import { ChangeEvent, FormEvent } from 'react';
import style from './Searcher.module.scss';

export interface SearcherProps {
  keyword: string;
  onKeywordChange: (keyword: string) => void,
  onSubmit: () => void,
}

export default function Searcher(props: SearcherProps) {
  const { keyword, onKeywordChange, onSubmit } = props;

  function onFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    onSubmit();
  }

  function onInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    onKeywordChange(value);
  }

  return (
    <form className={style.searcher} onSubmit={onFormSubmit}>
      <div>
        <Input
          data-elem="search-input"
          icon={
            <Image src="/search-icon.svg" alt="search" width={16} height={16} />
          }
          placeholder="Введите название вакансии"
          variant="unstyled"
          value={keyword}
          onChange={onInputChange}
        />
      </div>
      <Button data-elem="search-button" type="submit">Поиск</Button>
    </form>
  );
}
