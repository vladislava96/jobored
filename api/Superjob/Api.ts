import { Authorization, Catalogue, VacancyCollection, VacancyOptions } from './interfaces';

export default class Api {
    private static instance?: Api;

    public static getInstance() {
        if (Api.instance === undefined) {
            Api.instance = new Api();
        }

        return Api.instance;
    }

    private baseUrl = process.env.NEXT_PUBLIC_SUPERJOB_URL || '';
    private secretKey = process.env.NEXT_PUBLIC_SUPERJOB_SECRET_KEY || '';
    private login = process.env.NEXT_PUBLIC_SUPERJOB_LOGIN || '';
    private password = process.env.NEXT_PUBLIC_SUPERJOB_PASSWORD || '';
    private clientId = process.env.NEXT_PUBLIC_SUPERJOB_CLIENT_ID || '';
    private clientSecret = process.env.NEXT_PUBLIC_SUPERJOB_CLIENT_SECRET || '';
    private hr = process.env.NEXT_PUBLIC_SUPERJOB_HR || '';

    private authorization?: Authorization;

    private async authorize(): Promise<Authorization> {
        const url = new URL('oauth2/password', this.baseUrl);
        url.searchParams.set('login', this.login);
        url.searchParams.set('password', this.password);
        url.searchParams.set('client_id', this.clientId);
        url.searchParams.set('client_secret', this.clientSecret);
        url.searchParams.set('hr', this.hr);

        const request: RequestInit = {
            method: 'POST',
            headers: {
                'X-Secret-Key': this.secretKey,
                Accept: 'application/json',
            },
        };

        const response = await fetch(url, request);
        if (!response.ok) {
            throw Error();
        }

        return response.json();
    }

    public async refreshAuthorization(): Promise<Authorization> {
        const authorization = await this.authorizeIfRequire();

        const url = new URL('oauth2/refresh_token', this.baseUrl);
        url.searchParams.set('client_id', this.clientId);
        url.searchParams.set('client_secret', this.clientSecret);

        const request: RequestInit = {
            method: 'GET',
            headers: {
                'X-Secret-Key': this.secretKey,
                Accept: 'application/json',
                Authorization: `Bearer ${authorization.refresh_token}`,
            },
        };

        const response = await fetch(url, request);
        if (!response.ok) {
            throw Error();
        }

        return response.json();
    }

    public async authorizeIfRequire(): Promise<Authorization> {
        if (this.authorization === undefined) {
            this.authorization = await this.authorize();
        }

        return this.authorization;
    }

    public async getCatalogues(): Promise<Catalogue[]> {
        const authorization = await this.authorizeIfRequire();
        const url = new URL('catalogues', this.baseUrl);
        const request: RequestInit = {
            method: 'GET',
            headers: {
                'X-Secret-Key': this.secretKey,
                'X-Api-App-Id': this.clientSecret,
                Accept: 'application/json',
                Authorization: `Bearer ${authorization.access_token}`,
            },
        };

        const response = await fetch(url, request);
        if (!response.ok) {
            throw Error();
        }

        return response.json();
    }

    public async getVacancies(options: VacancyOptions = {}): Promise<VacancyCollection> {
        const authorization = await this.authorizeIfRequire();
        const url = new URL('vacancies', this.baseUrl);
        if (options.count !== undefined) {
            url.searchParams.set('count', String(options.count));
        }
        if (options.page !== undefined) {
            url.searchParams.set('page', String(options.page));
        }
        if (options.keyword !== undefined) {
            url.searchParams.set('keyword', options.keyword);
        }
        if (options.filterParams?.published !== undefined) {
            url.searchParams.set('published', String(options.filterParams.published));
        }
        if (options.filterParams?.paymentFrom !== undefined) {
            url.searchParams.set('paymentFrom', String(options.filterParams?.paymentFrom));
        }
        if (options.filterParams?.paymentTo !== undefined) {
            url.searchParams.set('paymentTo', String(options.filterParams?.paymentTo));
        }
        if (options.filterParams?.catalogues !== undefined) {
            url.searchParams.set('catalogues', String(options.filterParams?.catalogues));
        }

        const request: RequestInit = {
            method: 'GET',
            headers: {
                'X-Secret-Key': this.secretKey,
                'X-Api-App-Id': this.clientSecret,
                Accept: 'application/json',
                Authorization: `Bearer ${authorization.access_token}`,
            },
        };

        const response = await fetch(url, request);
        if (!response.ok) {
            console.log(response);
            throw Error();
        }

        return response.json();
    }
}
