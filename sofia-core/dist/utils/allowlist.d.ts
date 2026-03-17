export declare function parseAllowlist(value?: string | null): string[];
export declare function isAllowedByAllowlist(params: {
    userId?: string | null;
    email?: string | null;
    allowlistUserIds?: string | null;
    allowlistEmails?: string | null;
}): boolean;
