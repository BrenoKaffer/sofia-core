export const FEATURE_FLAGS = {
    MVP_MODE: 'mvp_mode',
    ENHANCED_AUTH_FLOW: 'enhanced_auth_flow',
    TWO_FACTOR_AUTH: 'two_factor_auth',
    BIOMETRIC_LOGIN: 'biometric_login',
    DASHBOARD_OPTIMIZATION: 'dashboard_optimization',
    LAZY_LOADING: 'lazy_loading',
    REAL_TIME_UPDATES: 'real_time_updates',
    DARK_MODE: 'dark_mode',
    AI_RECOMMENDATIONS: 'ai_recommendations',
    ADVANCED_ANALYTICS: 'advanced_analytics',
    EXPORT_FEATURES: 'export_features',
    DEBUG_MODE: 'debug_mode',
    PERFORMANCE_MONITORING: 'performance_monitoring',
    ERROR_TRACKING: 'error_tracking'
};
const defaultFlags = {
    [FEATURE_FLAGS.MVP_MODE]: (process.env.NEXT_PUBLIC_MVP_MODE ?? 'false') === 'true',
    [FEATURE_FLAGS.ENHANCED_AUTH_FLOW]: true,
    [FEATURE_FLAGS.TWO_FACTOR_AUTH]: false,
    [FEATURE_FLAGS.BIOMETRIC_LOGIN]: false,
    [FEATURE_FLAGS.DASHBOARD_OPTIMIZATION]: true,
    [FEATURE_FLAGS.LAZY_LOADING]: true,
    [FEATURE_FLAGS.REAL_TIME_UPDATES]: true,
    [FEATURE_FLAGS.DARK_MODE]: false,
    [FEATURE_FLAGS.AI_RECOMMENDATIONS]: false,
    [FEATURE_FLAGS.ADVANCED_ANALYTICS]: false,
    [FEATURE_FLAGS.EXPORT_FEATURES]: true,
    [FEATURE_FLAGS.DEBUG_MODE]: process.env.NODE_ENV === 'development',
    [FEATURE_FLAGS.PERFORMANCE_MONITORING]: true,
    [FEATURE_FLAGS.ERROR_TRACKING]: true
};
export class FeatureFlagManager {
    static instance = null;
    flags;
    constructor(initialFlags) {
        this.flags = { ...defaultFlags, ...(initialFlags ?? {}) };
    }
    static getInstance(initialFlags) {
        if (!FeatureFlagManager.instance) {
            FeatureFlagManager.instance = new FeatureFlagManager(initialFlags);
        }
        return FeatureFlagManager.instance;
    }
    isEnabled(flagKey) {
        return this.flags[flagKey] ?? false;
    }
    setFlag(flagKey, enabled) {
        this.flags[flagKey] = enabled;
    }
    setFlags(flags) {
        this.flags = { ...this.flags, ...flags };
    }
    getAllFlags() {
        return { ...this.flags };
    }
}
export const featureFlagManager = FeatureFlagManager.getInstance();
