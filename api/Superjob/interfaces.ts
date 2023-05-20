export interface Authorization {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  reg_user_resumes_count: number;
  token_type: string;
  ttl: number;
}

export interface Entity {
  id: number;
}

export interface TitledEntity extends Entity {
  title: string;
}

export interface VacancyCollection {
  objects: Vacancy[];
  total: number;
  corrected_keyword: string;
  more: boolean;
}

export interface Metro extends TitledEntity {
  id_metro_line: number;
}

export interface VacancyCatalogue extends TitledEntity {
  positions: TitledEntity[];
}

export interface VacancyTown extends TitledEntity {
  declension: string;
  genitive: string;
}

export interface Vacancy {
  id: number;
  id_client: number;
  payment_from: number;
  payment_to: number;
  date_pub_to: number;
  date_archived: number;
  date_published: number;
  address: null;
  payment: null;
  profession: string;
  candidat: string;
  work: string;
  metro: Metro[];
  currency: string;
  moveable: boolean;
  agreement: boolean;
  anonymous: boolean;
  type_of_work: TitledEntity;
  place_of_work: TitledEntity;
  education: TitledEntity;
  experience: TitledEntity;
  maritalstatus: TitledEntity;
  children: TitledEntity;
  already_sent_on_vacancy: boolean;
  languages: [];
  driving_licence: [];
  catalogues: VacancyCatalogue[];
  agency: TitledEntity;
  town: VacancyTown,
  client_logo: string;
  age_from: number;
  age_to: number;
  gender: TitledEntity;
  firm_name: string;
  firm_activity: string;
  link: string;
}

export interface CataloguePosition {
  title_rus: string,
  url_rus: string,
  title: string,
  id_parent: number,
  key: number
}

export interface Catalogue {
  title_rus: string;
  url_rus: string;
  title: string;
  title_trimmed: string;
  key: number;
  positions: CataloguePosition[];
}

export interface VacancyOptions {
  page?: number,
  count?: number,
  keyword?: string,
  filterParams?: FilterParams,
}

export interface FilterParams {
  paymentFrom?: number,
  paymentTo?: number,
  catalogues?: number,
}
