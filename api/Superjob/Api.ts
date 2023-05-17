import { Authorization, Catalogue, VacancyCollection, VacancyOptions } from './interfaces';

export default class Api {
    private static instance?: Api;

    public static getInstance() {
        if (Api.instance === undefined) {
            Api.instance = new Api();
        }

        return Api.instance;
    }

    private baseUrl = process.env.NEXT_PUBLIC__URL || '';
    private secretKey = process.env.NEXT_PUBLIC__SECRET_KEY || '';
    private login = process.env.NEXT_PUBLIC__LOGIN || '';
    private password = process.env.NEXT_PUBLIC__PASSWORD || '';
    private clientId = process.env.NEXT_PUBLIC__CLIENT_ID || '';
    private clientSecret = process.env.NEXT_PUBLIC__CLIENT_SECRET || '';
    private hr = process.env.NEXT_PUBLIC__HR || '';

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
                Accept: 'application/json',
                Authorization: `Bearer ${authorization.accessToken}`,
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
        if (options.filterParams?.published !== undefined) {
            url.searchParams.set('page', String(options.filterParams.published));
        }
        if (options.filterParams?.keyword !== undefined) {
            url.searchParams.set('page', String(options.filterParams?.keyword));
        }
        if (options.filterParams?.paymentFrom !== undefined) {
            url.searchParams.set('page', String(options.filterParams?.paymentFrom));
        }
        if (options.filterParams?.paymentTo !== undefined) {
            url.searchParams.set('page', String(options.filterParams?.paymentTo));
        }
        if (options.filterParams?.catalogues !== undefined) {
            url.searchParams.set('page', String(options.filterParams?.catalogues));
        }

        const request: RequestInit = {
            method: 'GET',
            headers: {
                'X-Secret-Key': this.secretKey,
                Accept: 'application/json',
                Authorization: `Bearer ${authorization.accessToken}`,
            },
        };

        const response = await fetch(url, request);
        if (!response.ok) {
            throw Error();
        }

        return response.json();
    }
}
