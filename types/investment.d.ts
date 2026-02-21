export interface MutualFund {
  id: string
  name: string
  category: string
  amc: string
  manager: string
  aum: number
  aumGrowth: number
  nav: number
  oneYearReturn: number
  threeYearReturn: number
  fiveYearReturn: number
  expense: number
  exitLoad: string
  riskRating: string
  riskScore: number
  benchmark: string
  inceptionDate: string
  minInvestment: number
  sipMinimum: number
  commission: number
  rating: number
  alpha3Year?: number
  beta?: number
  sharpeRatio?: number
  standardDeviation?: number
  portfolioTurnover?: number
  trackingError?: number
  consistencyScore?: number
  downCaptureRatio?: number
  upCaptureRatio?: number
  sectorAllocation?: { sector: string; allocation: number }[]
  marketCapAllocation?: { type: string; allocation: number }[]
  topHoldings?: { name: string; weight: number }[]
  internationalAllocation?: number
}

export interface Stock {
  id: string
  name: string
  ticker: string
  sector: string
  price: number
  marketCap: number
  peRatio: number
  dividendYield: number
  oneYearReturn: number
  threeYearReturn: number
  fiveYearReturn: number
  beta: number
  rating: number
  eps?: number
  bookValue?: number
  pbRatio?: number
  roe?: number
  roa?: number
  debtToEquity?: number
  currentRatio?: number
  profitMargin?: number
  operatingMargin?: number
  epsCagr5Y?: number
  revenueCagr5Y?: number
  promoterHolding?: number
  fiiHolding?: number
  diiHolding?: number
  publicHolding?: number
  annualRevenue?: number
  annualProfit?: number
  quarterlyGrowth?: number
  yearlyGrowth?: number
  netNpa?: number
  grossNpa?: number
  casaRatio?: number
  netInterestMargin?: number
  attritionRate?: number
  clientCount?: number
  dealWins?: string
  utilization?: number
  coalProduction?: number
  coalOfftake?: number
  pitHeadStock?: number
  eAuctionPremium?: number
}

export interface PMS {
  id: string
  name: string
  manager: string
  strategy: string
  minInvestment: number
  managementFee: number
  performanceFee: string
  oneYearReturn: number
  threeYearReturn: number
  fiveYearReturn: number
  riskRating: string
  rating: number
  aum?: number
  inceptionDate?: string
  sharpeRatio?: number
  standardDeviation?: number
  maxDrawdown?: number
  alpha3Year?: number
  beta?: number
  portfolioTurnover?: number
  investmentApproach?: string
  topHoldings?: { name: string; weight: number }[]
  sectorAllocation?: { sector: string; allocation: number }[]
  marketCapAllocation?: { type: string; allocation: number }[]
  lockInPeriod?: string
  exitLoad?: string
}

export interface AIF {
  id: string
  name: string
  category: string
  manager: string
  strategy: string
  minInvestment: number
  managementFee: number
  performanceFee: string
  lockInPeriod: string
  targetReturn: number
  riskRating: string
  rating: number
  aum?: number
  inceptionDate?: string
  actualReturn1Y?: number
  actualReturn3Y?: number
  sharpeRatio?: number
  standardDeviation?: number
  maxDrawdown?: number
  investmentApproach?: string
  topHoldings?: { name: string; weight: number }[]
  sectorAllocation?: { sector: string; allocation: number }[]
  fundTerm?: string
  exitOptions?: string
  taxImplications?: string
  pastFundPerformance?: { fund: string; irr: number | string }[]
  netExposure?: number
  grossExposure?: number
}

export interface Bond {
  id: string
  name: string
  type: string
  issuer: string
  couponRate: number
  maturity: string
  minInvestment: number
  creditRating: string
  interestPayment: string
  listingStatus: string
  ytm: number
  rating: number
  issueDate?: string
  maturityDate?: string
  faceValue?: number
  issueSize?: number
  callOption?: string
  putOption?: string
  taxStatus?: string
  securityType?: string
  seniority?: string
  industry?: string
  liquidityRating?: string
  yieldCurvePosition?: string
  spreadOverG_Sec?: number
  modifiedDuration?: number
  convexity?: number
  interestFrequency?: string
  dayCountConvention?: string
  redemptionValue?: number
  callableFlag?: boolean
  puttableFlag?: boolean
  stepUpFlag?: boolean
  floatingRateFlag?: boolean
  subordinatedFlag?: boolean
  perpetualFlag?: boolean
}

export interface Deposit {
  id: string
  name: string
  type: string
  institution: string
  interestRate: number
  tenure: string
  minAmount: number
  compounding: string
  prematureWithdrawal: string
  taxStatus: string
  rating: number
  bankRating?: string
  companyRating?: string
  seniorCitizenRate?: number
  prematureWithdrawalPenalty?: string
  autoRenewal?: boolean
  loanAgainstDeposit?: string
  nominationFacility?: boolean
  interestPayout?: string
  tds?: string
  depositInsurance?: string
  specialCategory?: string
  onlineApplication?: boolean
  jointHolders?: string
  sweepInFacility?: boolean
  interestCalculation?: string
  taxSavings?: boolean
  governmentBacked?: boolean
}

export interface ModelPortfolio {
  id: string
  name: string
  description: string
  riskProfile: string
  expectedReturn: string
  timeHorizon: string
  assetAllocation: {
    assetClass: string
    allocation: number
    subAllocation?: { name: string; allocation: number }[]
  }[]
  recommendedProducts: {
    type: string
    id: string
    allocation: number
  }[]
  rebalancingFrequency: string
  suitableFor: string[]
  creator: string
  createdDate: string
  lastUpdated: string
}

export interface InvestmentQuestion {
  id: string
  question: string
  category: string
  intent: string
  relatedQuestions?: string[]
}
