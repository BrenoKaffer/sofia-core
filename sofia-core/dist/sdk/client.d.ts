import { LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, PasswordRecoveryRequest, PasswordRecoveryResponse, CheckoutLinkRequest, CheckoutLinkResponse, CheckoutLinkStatusResponse, CreatePixRequest, CreatePixResponse, VerifyPixRequest, VerifyPixResponse, CreateSubscriptionRequest, CreateSubscriptionResponse, PartnerMeResponse, PartnerLinksResponse, PartnerQuickLinksResponse, StrategyListQuery, StrategyListResponse, CreateStrategyRequest, CreateStrategyResponse, UpdateStrategyStatusRequest, UpdateStrategyStatusResponse } from '../contracts';
export type SofiaClientFetcher = typeof fetch;
export interface SofiaClientOptions {
    baseUrl?: string;
    timeoutMs?: number;
    requestId?: string;
    headers?: Record<string, string>;
    fetcher?: SofiaClientFetcher;
    getToken?: () => string | null | Promise<string | null>;
}
export interface SofiaClientResult<T> {
    ok: boolean;
    status: number;
    data: T | null;
    request_id: string | null;
}
export declare function createSofiaClient(options?: SofiaClientOptions): {
    request: (pathOrUrl: string, init?: RequestInit) => Promise<Response>;
    requestJson: <T>(pathOrUrl: string, init?: RequestInit) => Promise<SofiaClientResult<T>>;
    auth: {
        login: (body: LoginRequest) => Promise<SofiaClientResult<LoginResponse>>;
        register: (body: RegisterRequest) => Promise<SofiaClientResult<RegisterResponse>>;
        recoverPassword: (body: PasswordRecoveryRequest) => Promise<SofiaClientResult<PasswordRecoveryResponse>>;
    };
    billing: {
        createCheckoutLink: (body: CheckoutLinkRequest) => Promise<SofiaClientResult<CheckoutLinkResponse>>;
        getCheckoutLinkStatus: (linkId: string) => Promise<SofiaClientResult<CheckoutLinkStatusResponse>>;
    };
    payments: {
        createPix: (body: CreatePixRequest) => Promise<SofiaClientResult<CreatePixResponse>>;
        verifyPix: (params: VerifyPixRequest) => Promise<SofiaClientResult<VerifyPixResponse>>;
        createSubscription: (body: CreateSubscriptionRequest) => Promise<SofiaClientResult<CreateSubscriptionResponse>>;
    };
    partners: {
        me: () => Promise<SofiaClientResult<PartnerMeResponse>>;
        links: () => Promise<SofiaClientResult<PartnerLinksResponse>>;
        quickLinks: () => Promise<SofiaClientResult<PartnerQuickLinksResponse>>;
    };
    automation: {
        listStrategies: (query?: StrategyListQuery) => Promise<SofiaClientResult<StrategyListResponse>>;
        createStrategy: (body: CreateStrategyRequest) => Promise<SofiaClientResult<CreateStrategyResponse>>;
        updateStrategyStatus: (id: string, body: UpdateStrategyStatusRequest) => Promise<SofiaClientResult<UpdateStrategyStatusResponse>>;
    };
    system: {
        health: () => Promise<SofiaClientResult<Record<string, any>>>;
    };
};
