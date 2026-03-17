export interface HealthStatus {
  status: 'healthy' | 'unhealthy'
  timestamp: string
  uptime?: number
  memory?: {
    rss: number
    heapTotal: number
    heapUsed: number
    external: number
    arrayBuffers?: number
  }
  version?: string
  services?: {
    database: string
    cache: string
    strategies: string
  }
  error?: string
}
