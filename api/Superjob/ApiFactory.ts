import Api from './Api';

export default class ApiFactory {
    private static instance?: ApiFactory;

    public static getInstance() {
        if (ApiFactory.instance === undefined) {
            ApiFactory.instance = new ApiFactory();
        }

        return ApiFactory.instance;
    }

    public create() {
        return new Api(
            process.env.NEXT_PUBLIC__URL || '',
            process.env.NEXT_PUBLIC__SECRET_KEY || '',
            process.env.NEXT_PUBLIC__LOGIN || '',
            process.env.NEXT_PUBLIC__PASSWORD || '',
            process.env.NEXT_PUBLIC__CLIENT_ID || '',
            process.env.NEXT_PUBLIC__CLIENT_SECRET || '',
            process.env.NEXT_PUBLIC__HR || '',
        );
    }
}
