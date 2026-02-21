import { mutualFunds, stocksData, pmsData, aifData, bondsData, depositsData } from "@/data/investment-data"

export type InvestmentType = "mutual-fund" | "stock" | "pms" | "aif" | "bond" | "deposit"

export interface QueryParams {
  type?: InvestmentType
  category?: string
  minReturn?: number
  maxReturn?: number
  riskLevel?: string
  minInvestment?: number
  maxInvestment?: number
  term?: string
  sortBy?: string
  sortOrder?: "asc" | "desc"
  limit?: number
}

export interface ComparisonParams {
  type: InvestmentType
  ids: string[]
  metrics: string[]
}

export const getInvestments = (params: QueryParams) => {
  const { type, limit = 10 } = params

  let results: any[] = []

  switch (type) {
    case "mutual-fund":
      results = filterMutualFunds(params)
      break
    case "stock":
      results = filterStocks(params)
      break
    case "pms":
      results = filterPMS(params)
      break
    case "aif":
      results = filterAIF(params)
      break
    case "bond":
      results = filterBonds(params)
      break
    case "deposit":
      results = filterDeposits(params)
      break
    default:
      // Return a mix of all investment types
      results = [
        ...filterMutualFunds({ ...params, limit: 3 }),
        ...filterStocks({ ...params, limit: 3 }),
        ...filterPMS({ ...params, limit: 2 }),
        ...filterBonds({ ...params, limit: 2 }),
      ]
  }

  return results.slice(0, limit)
}

export const compareInvestments = (params: ComparisonParams) => {
  const { type, ids, metrics } = params

  let items: any[] = []

  switch (type) {
    case "mutual-fund":
      items = mutualFunds.filter((fund) => ids.includes(fund.id))
      break
    case "stock":
      items = stocksData.filter((stock) => ids.includes(stock.id))
      break
    case "pms":
      items = pmsData.filter((pms) => ids.includes(pms.id))
      break
    case "aif":
      items = aifData.filter((aif) => ids.includes(aif.id))
      break
    case "bond":
      items = bondsData.filter((bond) => ids.includes(bond.id))
      break
    case "deposit":
      items = depositsData.filter((deposit) => ids.includes(deposit.id))
      break
    default:
      return []
  }

  // If metrics are specified, only return those metrics
  if (metrics && metrics.length > 0) {
    return items.map((item) => {
      const result: Record<string, any> = { id: item.id, name: item.name }
      metrics.forEach((metric) => {
        if (metric in item) {
          result[metric] = item[metric]
        }
      })
      return result
    })
  }

  return items
}

// Helper functions for filtering different investment types
const filterMutualFunds = (params: QueryParams) => {
  const { category, minReturn, maxReturn, riskLevel, sortBy = "rating", sortOrder = "desc", limit = 10 } = params

  let filtered = [...mutualFunds]

  if (category) {
    filtered = filtered.filter((fund) => fund.category.toLowerCase().includes(category.toLowerCase()))
  }

  if (minReturn !== undefined) {
    filtered = filtered.filter((fund) => fund.threeYearReturn >= minReturn)
  }

  if (maxReturn !== undefined) {
    filtered = filtered.filter((fund) => fund.threeYearReturn <= maxReturn)
  }

  if (riskLevel) {
    filtered = filtered.filter((fund) => fund.riskRating.toLowerCase().includes(riskLevel.toLowerCase()))
  }

  // Sort the results
  filtered.sort((a, b) => {
    const aValue = a[sortBy as keyof typeof a]
    const bValue = b[sortBy as keyof typeof b]

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    return 0
  })

  return filtered.slice(0, limit)
}

const filterStocks = (params: QueryParams) => {
  const { category, minReturn, maxReturn, sortBy = "rating", sortOrder = "desc", limit = 10 } = params

  let filtered = [...stocksData]

  if (category) {
    filtered = filtered.filter((stock) => stock.sector.toLowerCase().includes(category.toLowerCase()))
  }

  if (minReturn !== undefined) {
    filtered = filtered.filter((stock) => stock.oneYearReturn >= minReturn)
  }

  if (maxReturn !== undefined) {
    filtered = filtered.filter((stock) => stock.oneYearReturn <= maxReturn)
  }

  // Sort the results
  filtered.sort((a, b) => {
    const aValue = a[sortBy as keyof typeof a]
    const bValue = b[sortBy as keyof typeof b]

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    return 0
  })

  return filtered.slice(0, limit)
}

const filterPMS = (params: QueryParams) => {
  const { category, minReturn, maxReturn, minInvestment, sortBy = "rating", sortOrder = "desc", limit = 10 } = params

  let filtered = [...pmsData]

  if (category) {
    filtered = filtered.filter((pms) => pms.strategy.toLowerCase().includes(category.toLowerCase()))
  }

  if (minReturn !== undefined) {
    filtered = filtered.filter((pms) => pms.threeYearReturn >= minReturn)
  }

  if (maxReturn !== undefined) {
    filtered = filtered.filter((pms) => pms.threeYearReturn <= maxReturn)
  }

  if (minInvestment !== undefined) {
    filtered = filtered.filter((pms) => pms.minInvestment >= minInvestment)
  }

  // Sort the results
  filtered.sort((a, b) => {
    const aValue = a[sortBy as keyof typeof a]
    const bValue = b[sortBy as keyof typeof b]

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    return 0
  })

  return filtered.slice(0, limit)
}

const filterAIF = (params: QueryParams) => {
  const { category, minInvestment, sortBy = "rating", sortOrder = "desc", limit = 10 } = params

  let filtered = [...aifData]

  if (category) {
    filtered = filtered.filter((aif) => aif.category.toLowerCase().includes(category.toLowerCase()))
  }

  if (minInvestment !== undefined) {
    filtered = filtered.filter((aif) => aif.minInvestment >= minInvestment)
  }

  // Sort the results
  filtered.sort((a, b) => {
    const aValue = a[sortBy as keyof typeof a]
    const bValue = b[sortBy as keyof typeof b]

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    return 0
  })

  return filtered.slice(0, limit)
}

const filterBonds = (params: QueryParams) => {
  const { minReturn, maxReturn, term, sortBy = "ytm", sortOrder = "desc", limit = 10 } = params

  let filtered = [...bondsData]

  if (minReturn !== undefined) {
    filtered = filtered.filter((bond) => bond.ytm >= minReturn)
  }

  if (maxReturn !== undefined) {
    filtered = filtered.filter((bond) => bond.ytm <= maxReturn)
  }

  if (term) {
    filtered = filtered.filter((bond) => bond.maturity.toLowerCase().includes(term.toLowerCase()))
  }

  // Sort the results
  filtered.sort((a, b) => {
    const aValue = a[sortBy as keyof typeof a]
    const bValue = b[sortBy as keyof typeof b]

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    return 0
  })

  return filtered.slice(0, limit)
}

const filterDeposits = (params: QueryParams) => {
  const { minReturn, maxReturn, term, sortBy = "interestRate", sortOrder = "desc", limit = 10 } = params

  let filtered = [...depositsData]

  if (minReturn !== undefined) {
    filtered = filtered.filter((deposit) => deposit.interestRate >= minReturn)
  }

  if (maxReturn !== undefined) {
    filtered = filtered.filter((deposit) => deposit.interestRate <= maxReturn)
  }

  if (term) {
    filtered = filtered.filter((deposit) => deposit.tenure.toLowerCase().includes(term.toLowerCase()))
  }

  // Sort the results
  filtered.sort((a, b) => {
    const aValue = a[sortBy as keyof typeof a]
    const bValue = b[sortBy as keyof typeof b]

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    }

    return 0
  })

  return filtered.slice(0, limit)
}
