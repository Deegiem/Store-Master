export interface ReportQueryParams {
  start_date?: string
  end_date?: string
  branch_id?: string
}

export interface ProfitReportQueryParams {
  start_date?: string
  end_date?: string
  branch_id?: string
}

export interface SalesSummaryReport {
  period: {
    start: string
    end: string
    days: number
  }
  revenue: {
    gross_revenue: number
    subtotal: number
    total_tax_collected: number
    total_discounts_given: number
    cancelled_revenue_lost: number
  }
  transactions: {
    completed_sales: number
    cancelled_sales: number
    average_transaction: number
  }
}

export interface SalesByBranchReport {
  period: {
    start: string
    end: string
  }
  total_revenue: number
  branches: {
    branch_id: string
    branch_name: string
    revenue: number
    sales_count: number
    tax_collected: number
    discounts_given: number
    avg_transaction: number
  }[]
}

export interface SalesByPaymentReport {
  period: {
    start: string
    end: string
  }
  total_revenue: number
  payment_breakdown: {
    payment_method: string
    transaction_count: number
    revenue: number
    percentage: number
  }[]
}

export interface ProfitReport {
  period: {
    start: string
    end: string
  }
  overall: {
    total_revenue: number
    total_cogs: number
    gross_profit: number
    margin_percentage: number
  }
  by_branch: {
    branch_name: string
    branch_id: string
    revenue: number
    cogs: number
    gross_profit: number
    margin_percentage: number
  }[]
}

export interface TaxReport {
  period: {
    start: string
    end: string
  }
  total_vat_collected: number
  total_revenue: number
  effective_tax_rate: number
  by_branch: {
    branch_name: string
    tax_collected: number
  }[]
}

export interface ProcurementSpendReport {
  period: {
    start: string
    end: string
  }
  total_procurement_spend: number
  total_pos: number
  by_branch: {
    branch: string
    spend: number
  }[]
  by_supplier: {
    supplier: string
    spend: number
  }[]
}

export interface SlowMovingInventoryReport {
  threshold_days: number
  total_slow_items: number
  total_value_tied_up: number
  items: {
    product_name: string
    branch: string
    quantity: number
    selling_price: number
    value_tied_up: number
    last_updated: string
  }[]
}
