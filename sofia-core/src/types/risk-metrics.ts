export interface RiskMetrics {
  overallRiskScore: number
  expectedReturn: number
  volatility: number
  sharpeRatio: number
  maxDrawdown: number
  valueAtRisk: number
  tableRisks: Record<string, TableRiskMetrics>
  strategyRisks: Record<string, StrategyRiskMetrics>
  recommendations: string[]
  lastUpdate: Date
}

export interface TableRiskMetrics {
  volatility: number
  maxDrawdown: number
  sharpeRatio: number
  riskScore: number
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
}

export interface StrategyRiskMetrics {
  accuracyRisk: number
  confidenceRisk: number
  riskScore: number
  riskLevel: 'low' | 'medium' | 'high' | 'critical'
}

export interface AdvancedMetrics {
  roi: number
  hitRate: number
  profitFactor: number
  winStreak: number
  lossStreak: number
  bankrollUsage: number
  consecutiveLosses: number
  totalBets: number
  totalProfit: number
  averageBet: number
  systemUptime: number
  hourlyPerformance: Record<string, number>
  dailyPerformance: Record<string, number>
  timestamp: Date
}

export interface RiskAlert {
  id: string
  type: 'warning' | 'error' | 'critical'
  message: string
  riskScore: number
  timestamp: Date
  acknowledged: boolean
}
