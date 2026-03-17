export declare const FEATURE_FLAGS: {
    readonly MVP_MODE: "mvp_mode";
    readonly ENHANCED_AUTH_FLOW: "enhanced_auth_flow";
    readonly TWO_FACTOR_AUTH: "two_factor_auth";
    readonly BIOMETRIC_LOGIN: "biometric_login";
    readonly DASHBOARD_OPTIMIZATION: "dashboard_optimization";
    readonly LAZY_LOADING: "lazy_loading";
    readonly REAL_TIME_UPDATES: "real_time_updates";
    readonly DARK_MODE: "dark_mode";
    readonly AI_RECOMMENDATIONS: "ai_recommendations";
    readonly ADVANCED_ANALYTICS: "advanced_analytics";
    readonly EXPORT_FEATURES: "export_features";
    readonly DEBUG_MODE: "debug_mode";
    readonly PERFORMANCE_MONITORING: "performance_monitoring";
    readonly ERROR_TRACKING: "error_tracking";
};
export type FeatureFlagKey = typeof FEATURE_FLAGS[keyof typeof FEATURE_FLAGS];
export interface FeatureFlagDefinition {
    key: FeatureFlagKey;
    name: string;
    description: string;
    enabled: boolean;
    environment?: 'development' | 'staging' | 'production' | 'all';
    userGroups?: string[];
    rolloutPercentage?: number;
}
export declare class FeatureFlagManager {
    private static instance;
    private flags;
    private constructor();
    static getInstance(initialFlags?: Partial<Record<FeatureFlagKey, boolean>>): FeatureFlagManager;
    isEnabled(flagKey: FeatureFlagKey): boolean;
    setFlag(flagKey: FeatureFlagKey, enabled: boolean): void;
    setFlags(flags: Partial<Record<FeatureFlagKey, boolean>>): void;
    getAllFlags(): Record<FeatureFlagKey, boolean>;
}
export declare const featureFlagManager: FeatureFlagManager;
