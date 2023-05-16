import { Authorization, Catalogue, VacancyCollection } from './interfaces';

export default class Api {
    private authorization?: Authorization;

    public constructor(
        private baseUrl: string,
        private secretKey: string,
        private login: string,
        private password: string,
        private clientId: string,
        private clientSecret: string,
        private hr: string,
    ) {
    }

    private async authorize(): Promise<Authorization> {
        const url = new URL('oauth2/password', this.baseUrl);
        url.searchParams.set('login', this.login);
        url.searchParams.set('password', this.password);
        url.searchParams.set('client_id', this.clientId);
        url.searchParams.set('client_secret', this.clientSecret);
        url.searchParams.set('hr', this.hr);

        const options: RequestInit = {
            method: 'POST',
            headers: {
                'X-Secret-Key': this.secretKey,
                Accept: 'application/json',
            },
        };

        const response = await fetch(url, options);
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
        const options: RequestInit = {
            method: 'GET',
            headers: {
                'X-Secret-Key': this.secretKey,
                Accept: 'application/json',
                Authorization: `Bearer ${authorization.accessToken}`,
            },
        };

        const response = await fetch(url, options);
        if (!response.ok) {
            throw Error();
        }

        return response.json();
    }

    public async getVacancies(): Promise<VacancyCollection> {
        const authorization = await this.authorizeIfRequire();
        const url = new URL('vacancies', this.baseUrl);
        const options: RequestInit = {
            method: 'GET',
            headers: {
                'X-Secret-Key': this.secretKey,
                Accept: 'application/json',
                Authorization: `Bearer ${authorization.accessToken}`,
            },
        };

        const response = await fetch(url, options);
        if (!response.ok) {
            throw Error();
        }

        return response.json();
    }
}
