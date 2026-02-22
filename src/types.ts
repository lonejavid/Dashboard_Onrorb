export interface DashboardData {
  summary: {
    totalUsers: number;
    proUsers: number;
    freeUsers: number;
    activeUsers: number;
    signupsThisMonth: number;
    signupsLastMonth?: number;
    signupGrowthPercent?: number;
    proPercent: number;
    freePercent: number;
    activeRatePercent: number;
  };
  signupsOverTime: { month: string; count: number }[];
  planDistribution: { plan: string; count: number; percent: number }[];
  signupProvider: { provider: string; count: number; percent: number }[];
  freeTrial: { label: string; count: number; percent: number }[];
  subscriptionStatus: { status: string; count: number }[];
  recentSignups: { id: string; name: string; date: string; plan: string }[];
  referralCredits: {
    usersWithReferralCode: number;
    referralRewardsGranted: number;
    avgCreditsPerUser: number;
  };
  platformStats: {
    totalScans: number;
    scansLast30Days?: number;
    avgScansPerUser?: number;
    spamDomainsBlocked: number;
    trustedDomains: number;
  };
  lastSynced: string;
}

export interface DashboardFilters {
  from: string;
  to: string;
  plan: string;
  provider: string;
  status: string;
  subscription: string;
}
