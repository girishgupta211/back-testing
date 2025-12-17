#!/usr/bin/env python3
"""
Portfolio Backtesting System
=============================
Backtest a portfolio allocation strategy with:
- Nifty200 Momentum 30: 25%
- Nifty Midcap150 Momentum 50: 50%
- Nifty Smallcap250 Momentum Quality 100: 25%

Period: Jan 2024 - Nov 2025 (based on available data overlap)
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime
from pathlib import Path
import warnings
warnings.filterwarnings('ignore')

# Configuration
PORTFOLIO_ALLOCATION = {
    'NIFTY200_MOMENTUM': 0.25,
    'MIDCAP150_M50': 0.50,
    'SMALLCAP250_MQ100': 0.25
}

INITIAL_CAPITAL = 1000000  # 10 Lakhs
REBALANCE_FREQUENCY = 'quarterly'  # 'daily', 'monthly', 'quarterly', 'none'


class PortfolioBacktester:
    """Main backtesting engine for multi-index portfolio"""
    
    def __init__(self, workspace_path='.'):
        self.workspace_path = Path(workspace_path)
        self.data = {}
        self.portfolio_df = None
        self.metrics = {}
        
    def load_index_data(self, index_name, file_patterns):
        """Load and merge multiple CSV files for an index"""
        print(f"\nLoading {index_name}...")
        dfs = []
        
        for pattern in file_patterns:
            files = list(self.workspace_path.glob(pattern))
            for file in files:
                try:
                    df = pd.read_csv(file, skipinitialspace=True)
                    # Clean column names
                    df.columns = df.columns.str.strip()
                    # Parse dates
                    df['Date'] = pd.to_datetime(df['Date'], format='%d-%b-%Y')
                    dfs.append(df)
                    print(f"  ✓ Loaded {file.name}: {len(df)} rows")
                except Exception as e:
                    print(f"  ✗ Error loading {file.name}: {e}")
        
        if not dfs:
            raise ValueError(f"No data files found for {index_name}")
        
        # Concatenate and sort
        combined_df = pd.concat(dfs, ignore_index=True)
        combined_df = combined_df.sort_values('Date').reset_index(drop=True)
        combined_df = combined_df.drop_duplicates(subset='Date', keep='first')
        
        print(f"  → Total records: {len(combined_df)} | Date range: {combined_df['Date'].min()} to {combined_df['Date'].max()}")
        return combined_df
    
    def load_all_data(self):
        """Load all three indices"""
        print("="*70)
        print("LOADING INDEX DATA")
        print("="*70)
        
        # Load Nifty200 Momentum
        self.data['NIFTY200_MOMENTUM'] = self.load_index_data(
            'Nifty200 Momentum 30',
            ['NIFTY200 MOMENTUM 30-01-04-2023-to-31-03-2024.csv',
             'NIFTY200 MOMENTUM 30-01-04-2024-to-31-03-2025.csv',
             'NIFTY200 MOMENTUM 30-01-04-2025-to-30-11-2025.csv']
        )
        
        # Load Midcap150 M50
        self.data['MIDCAP150_M50'] = self.load_index_data(
            'Midcap150 Momentum 50',
            ['NIFTY MIDCAP150 MOMENTUM 50-01-04-2023-to-31-03-2024.csv',
             'NIFTY MIDCAP150 MOMENTUM 50-01-04-2024-to-31-03-2025.csv',
             'NIFTY MIDCAP150 MOMENTUM 50-01-04-2025-to-30-11-2025.csv']
        )
        
        # Load Smallcap250 MQ100
        self.data['SMALLCAP250_MQ100'] = self.load_index_data(
            'Smallcap250 Momentum Quality 100',
            ['NIFTY SMALLCAP250 MOMENTUM QUALITY 100-01-04-2024-to-31-03-2025.csv',
             'NIFTY SMALLCAP250 MOMENTUM QUALITY 100-01-04-2025-to-30-11-2025.csv']
        )
        
        return self.data
    
    def align_data(self):
        """Align all indices to common trading dates"""
        print("\n" + "="*70)
        print("ALIGNING DATA TO COMMON TRADING DATES")
        print("="*70)
        
        # Find common dates
        date_sets = [set(df['Date']) for df in self.data.values()]
        common_dates = set.intersection(*date_sets)
        common_dates = sorted(list(common_dates))
        
        print(f"\nCommon trading dates: {len(common_dates)}")
        print(f"Date range: {min(common_dates)} to {max(common_dates)}")
        
        # Filter each index to common dates and extract Close prices
        aligned_data = {}
        for idx_name, df in self.data.items():
            filtered = df[df['Date'].isin(common_dates)].copy()
            filtered = filtered.sort_values('Date').reset_index(drop=True)
            aligned_data[idx_name] = filtered[['Date', 'Close']].rename(
                columns={'Close': idx_name}
            )
        
        # Merge all indices
        self.portfolio_df = aligned_data['NIFTY200_MOMENTUM']
        for idx_name in ['MIDCAP150_M50', 'SMALLCAP250_MQ100']:
            self.portfolio_df = self.portfolio_df.merge(
                aligned_data[idx_name], on='Date', how='inner'
            )
        
        print(f"\nAligned portfolio data: {len(self.portfolio_df)} rows × {len(self.portfolio_df.columns)} columns")
        return self.portfolio_df
    
    def calculate_returns(self):
        """Calculate daily returns for each index"""
        print("\n" + "="*70)
        print("CALCULATING RETURNS")
        print("="*70)
        
        for idx_name in ['NIFTY200_MOMENTUM', 'MIDCAP150_M50', 'SMALLCAP250_MQ100']:
            # Daily returns
            self.portfolio_df[f'{idx_name}_return'] = (
                self.portfolio_df[idx_name].pct_change()
            )
            
            # Cumulative returns (for individual index performance)
            self.portfolio_df[f'{idx_name}_cumulative'] = (
                (1 + self.portfolio_df[f'{idx_name}_return']).cumprod()
            )
        
        print("✓ Daily returns calculated")
        print("✓ Cumulative returns calculated")
    
    def calculate_portfolio_value(self):
        """Calculate portfolio value with rebalancing"""
        print("\n" + "="*70)
        print(f"CALCULATING PORTFOLIO VALUE (Rebalance: {REBALANCE_FREQUENCY})")
        print("="*70)
        
        # Initialize portfolio
        n_rows = len(self.portfolio_df)
        portfolio_values = np.zeros(n_rows)
        portfolio_values[0] = INITIAL_CAPITAL
        
        # Track allocations
        allocations = {
            'NIFTY200_MOMENTUM': np.zeros(n_rows),
            'MIDCAP150_M50': np.zeros(n_rows),
            'SMALLCAP250_MQ100': np.zeros(n_rows)
        }
        
        # Initial allocation
        for idx_name, weight in PORTFOLIO_ALLOCATION.items():
            allocations[idx_name][0] = INITIAL_CAPITAL * weight
        
        # Determine rebalancing dates
        rebalance_dates = self._get_rebalance_dates()
        
        # Calculate day-by-day portfolio value
        for i in range(1, n_rows):
            date = self.portfolio_df.loc[i, 'Date']
            
            # Apply returns to each allocation
            for idx_name in PORTFOLIO_ALLOCATION.keys():
                daily_return = self.portfolio_df.loc[i, f'{idx_name}_return']
                allocations[idx_name][i] = allocations[idx_name][i-1] * (1 + daily_return)
            
            # Total portfolio value
            portfolio_values[i] = sum(allocations[idx_name][i] for idx_name in PORTFOLIO_ALLOCATION.keys())
            
            # Rebalance if needed
            if date in rebalance_dates:
                for idx_name, weight in PORTFOLIO_ALLOCATION.items():
                    allocations[idx_name][i] = portfolio_values[i] * weight
        
        # Add to dataframe
        self.portfolio_df['Portfolio_Value'] = portfolio_values
        self.portfolio_df['Portfolio_Return'] = self.portfolio_df['Portfolio_Value'].pct_change()
        
        # Store individual allocations
        for idx_name in PORTFOLIO_ALLOCATION.keys():
            self.portfolio_df[f'{idx_name}_allocation'] = allocations[idx_name]
        
        print(f"\n✓ Portfolio calculated with {len(rebalance_dates)} rebalancing events")
        print(f"  Initial Value: ₹{INITIAL_CAPITAL:,.2f}")
        print(f"  Final Value: ₹{portfolio_values[-1]:,.2f}")
        print(f"  Total Return: {((portfolio_values[-1] / INITIAL_CAPITAL - 1) * 100):.2f}%")
    
    def _get_rebalance_dates(self):
        """Get rebalancing dates based on frequency"""
        if REBALANCE_FREQUENCY == 'none':
            return []
        elif REBALANCE_FREQUENCY == 'daily':
            return set(self.portfolio_df['Date'][1:])
        elif REBALANCE_FREQUENCY == 'monthly':
            # First trading day of each month
            return set(self.portfolio_df.groupby(
                self.portfolio_df['Date'].dt.to_period('M')
            )['Date'].min())
        elif REBALANCE_FREQUENCY == 'quarterly':
            # First trading day of each quarter
            return set(self.portfolio_df.groupby(
                self.portfolio_df['Date'].dt.to_period('Q')
            )['Date'].min())
        return []
    
    def calculate_metrics(self):
        """Calculate performance metrics"""
        print("\n" + "="*70)
        print("CALCULATING PERFORMANCE METRICS")
        print("="*70)
        
        # Time period
        start_date = self.portfolio_df['Date'].iloc[0]
        end_date = self.portfolio_df['Date'].iloc[-1]
        days = (end_date - start_date).days
        years = days / 365.25
        
        # Portfolio metrics
        initial_value = self.portfolio_df['Portfolio_Value'].iloc[0]
        final_value = self.portfolio_df['Portfolio_Value'].iloc[-1]
        total_return = (final_value / initial_value - 1) * 100
        cagr = ((final_value / initial_value) ** (1 / years) - 1) * 100
        
        # Volatility (annualized)
        daily_returns = self.portfolio_df['Portfolio_Return'].dropna()
        volatility = daily_returns.std() * np.sqrt(252) * 100
        
        # Sharpe Ratio (assuming 6% risk-free rate)
        risk_free_rate = 0.06
        sharpe_ratio = (cagr/100 - risk_free_rate) / (volatility/100)
        
        # Maximum Drawdown
        cumulative = self.portfolio_df['Portfolio_Value']
        running_max = cumulative.expanding().max()
        drawdown = (cumulative - running_max) / running_max * 100
        max_drawdown = drawdown.min()
        
        # Individual index performance
        index_performance = {}
        for idx_name in ['NIFTY200_MOMENTUM', 'MIDCAP150_M50', 'SMALLCAP250_MQ100']:
            initial = self.portfolio_df[idx_name].iloc[0]
            final = self.portfolio_df[idx_name].iloc[-1]
            idx_return = (final / initial - 1) * 100
            idx_cagr = ((final / initial) ** (1 / years) - 1) * 100
            index_performance[idx_name] = {
                'Total Return': idx_return,
                'CAGR': idx_cagr
            }
        
        self.metrics = {
            'period': {
                'start_date': start_date,
                'end_date': end_date,
                'days': days,
                'years': years
            },
            'portfolio': {
                'initial_value': initial_value,
                'final_value': final_value,
                'total_return': total_return,
                'cagr': cagr,
                'volatility': volatility,
                'sharpe_ratio': sharpe_ratio,
                'max_drawdown': max_drawdown
            },
            'indices': index_performance
        }
        
        # Print summary
        print(f"\nPERIOD: {start_date.strftime('%d-%b-%Y')} to {end_date.strftime('%d-%b-%Y')}")
        print(f"Duration: {years:.2f} years ({days} days)")
        print(f"\nPORTFOLIO PERFORMANCE:")
        print(f"  Total Return: {total_return:.2f}%")
        print(f"  CAGR: {cagr:.2f}%")
        print(f"  Volatility: {volatility:.2f}%")
        print(f"  Sharpe Ratio: {sharpe_ratio:.2f}")
        print(f"  Max Drawdown: {max_drawdown:.2f}%")
        print(f"\nINDIVIDUAL INDEX PERFORMANCE:")
        for idx_name, perf in index_performance.items():
            print(f"  {idx_name}:")
            print(f"    Total Return: {perf['Total Return']:.2f}% | CAGR: {perf['CAGR']:.2f}%")
        
        return self.metrics
    
    def generate_visualizations(self):
        """Create comprehensive visualizations"""
        print("\n" + "="*70)
        print("GENERATING VISUALIZATIONS")
        print("="*70)
        
        # Set style
        sns.set_style("whitegrid")
        plt.rcParams['figure.figsize'] = (16, 12)
        
        fig, axes = plt.subplots(3, 2, figsize=(16, 12))
        fig.suptitle('Portfolio Backtesting Results', fontsize=16, fontweight='bold', y=0.995)
        
        # 1. Portfolio Value Over Time
        ax1 = axes[0, 0]
        ax1.plot(self.portfolio_df['Date'], self.portfolio_df['Portfolio_Value'] / 100000, 
                linewidth=2, color='#2E86AB')
        ax1.set_title('Portfolio Value Over Time', fontweight='bold')
        ax1.set_xlabel('Date')
        ax1.set_ylabel('Portfolio Value (₹ Lakhs)')
        ax1.grid(True, alpha=0.3)
        ax1.tick_params(axis='x', rotation=45)
        
        # 2. Individual Index Performance (Normalized)
        ax2 = axes[0, 1]
        for idx_name, label in [('NIFTY200_MOMENTUM', 'Nifty200 Mom (25%)'),
                                  ('MIDCAP150_M50', 'Midcap150 M50 (50%)'),
                                  ('SMALLCAP250_MQ100', 'Smallcap250 MQ100 (25%)')]:
            normalized = (self.portfolio_df[idx_name] / self.portfolio_df[idx_name].iloc[0]) * 100
            ax2.plot(self.portfolio_df['Date'], normalized, linewidth=2, label=label)
        ax2.set_title('Index Performance (Normalized to 100)', fontweight='bold')
        ax2.set_xlabel('Date')
        ax2.set_ylabel('Normalized Value')
        ax2.legend()
        ax2.grid(True, alpha=0.3)
        ax2.tick_params(axis='x', rotation=45)
        
        # 3. Drawdown Analysis
        ax3 = axes[1, 0]
        cumulative = self.portfolio_df['Portfolio_Value']
        running_max = cumulative.expanding().max()
        drawdown = (cumulative - running_max) / running_max * 100
        ax3.fill_between(self.portfolio_df['Date'], drawdown, 0, alpha=0.3, color='red')
        ax3.plot(self.portfolio_df['Date'], drawdown, linewidth=1, color='darkred')
        ax3.set_title('Drawdown Analysis', fontweight='bold')
        ax3.set_xlabel('Date')
        ax3.set_ylabel('Drawdown (%)')
        ax3.grid(True, alpha=0.3)
        ax3.tick_params(axis='x', rotation=45)
        
        # 4. Monthly Returns Heatmap
        ax4 = axes[1, 1]
        monthly_returns = self.portfolio_df.set_index('Date')['Portfolio_Return'].resample('M').apply(
            lambda x: (1 + x).prod() - 1
        ) * 100
        monthly_pivot = monthly_returns.to_frame()
        monthly_pivot['Year'] = monthly_pivot.index.year
        monthly_pivot['Month'] = monthly_pivot.index.month
        pivot_table = monthly_pivot.pivot_table(values='Portfolio_Return', index='Month', columns='Year')
        
        sns.heatmap(pivot_table, annot=True, fmt='.1f', cmap='RdYlGn', center=0, 
                   ax=ax4, cbar_kws={'label': 'Return (%)'})
        ax4.set_title('Monthly Returns Heatmap (%)', fontweight='bold')
        ax4.set_ylabel('Month')
        ax4.set_xlabel('Year')
        month_labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        ax4.set_yticklabels(month_labels, rotation=0)
        
        # 5. Allocation Over Time (Stacked Area)
        ax5 = axes[2, 0]
        ax5.stackplot(self.portfolio_df['Date'],
                     self.portfolio_df['NIFTY200_MOMENTUM_allocation'] / 100000,
                     self.portfolio_df['MIDCAP150_M50_allocation'] / 100000,
                     self.portfolio_df['SMALLCAP250_MQ100_allocation'] / 100000,
                     labels=['Nifty200 (25%)', 'Midcap150 (50%)', 'Smallcap250 (25%)'],
                     alpha=0.7)
        ax5.set_title('Portfolio Allocation Over Time', fontweight='bold')
        ax5.set_xlabel('Date')
        ax5.set_ylabel('Value (₹ Lakhs)')
        ax5.legend(loc='upper left')
        ax5.grid(True, alpha=0.3)
        ax5.tick_params(axis='x', rotation=45)
        
        # 6. Performance Comparison Bar Chart
        ax6 = axes[2, 1]
        indices_names = ['Nifty200\nMom', 'Midcap150\nM50', 'Smallcap250\nMQ100', 'Portfolio']
        cagr_values = [
            self.metrics['indices']['NIFTY200_MOMENTUM']['CAGR'],
            self.metrics['indices']['MIDCAP150_M50']['CAGR'],
            self.metrics['indices']['SMALLCAP250_MQ100']['CAGR'],
            self.metrics['portfolio']['cagr']
        ]
        colors = ['#3498db', '#e74c3c', '#f39c12', '#2ecc71']
        bars = ax6.bar(indices_names, cagr_values, color=colors, alpha=0.7, edgecolor='black')
        ax6.set_title('CAGR Comparison', fontweight='bold')
        ax6.set_ylabel('CAGR (%)')
        ax6.grid(True, alpha=0.3, axis='y')
        ax6.axhline(y=0, color='black', linestyle='-', linewidth=0.5)
        
        # Add value labels on bars
        for bar in bars:
            height = bar.get_height()
            ax6.text(bar.get_x() + bar.get_width()/2., height,
                    f'{height:.1f}%', ha='center', va='bottom' if height > 0 else 'top')
        
        plt.tight_layout()
        
        # Save figure
        output_path = self.workspace_path / 'backtest_results.png'
        plt.savefig(output_path, dpi=300, bbox_inches='tight')
        print(f"\n✓ Visualization saved: {output_path}")
        
        plt.show()
    
    def export_results(self):
        """Export detailed results to CSV"""
        output_path = self.workspace_path / 'backtest_portfolio_data.csv'
        self.portfolio_df.to_csv(output_path, index=False)
        print(f"✓ Portfolio data exported: {output_path}")
        
        # Export metrics summary
        metrics_path = self.workspace_path / 'backtest_metrics.txt'
        with open(metrics_path, 'w') as f:
            f.write("PORTFOLIO BACKTESTING RESULTS\n")
            f.write("="*70 + "\n\n")
            f.write("ALLOCATION STRATEGY:\n")
            f.write(f"  Nifty200 Momentum 30: {PORTFOLIO_ALLOCATION['NIFTY200_MOMENTUM']*100:.0f}%\n")
            f.write(f"  Midcap150 Momentum 50: {PORTFOLIO_ALLOCATION['MIDCAP150_M50']*100:.0f}%\n")
            f.write(f"  Smallcap250 MQ100: {PORTFOLIO_ALLOCATION['SMALLCAP250_MQ100']*100:.0f}%\n\n")
            
            f.write(f"PERIOD:\n")
            f.write(f"  Start: {self.metrics['period']['start_date'].strftime('%d-%b-%Y')}\n")
            f.write(f"  End: {self.metrics['period']['end_date'].strftime('%d-%b-%Y')}\n")
            f.write(f"  Duration: {self.metrics['period']['years']:.2f} years ({self.metrics['period']['days']} days)\n\n")
            
            f.write(f"PORTFOLIO PERFORMANCE:\n")
            f.write(f"  Initial Value: ₹{self.metrics['portfolio']['initial_value']:,.2f}\n")
            f.write(f"  Final Value: ₹{self.metrics['portfolio']['final_value']:,.2f}\n")
            f.write(f"  Total Return: {self.metrics['portfolio']['total_return']:.2f}%\n")
            f.write(f"  CAGR: {self.metrics['portfolio']['cagr']:.2f}%\n")
            f.write(f"  Volatility (annualized): {self.metrics['portfolio']['volatility']:.2f}%\n")
            f.write(f"  Sharpe Ratio: {self.metrics['portfolio']['sharpe_ratio']:.2f}\n")
            f.write(f"  Maximum Drawdown: {self.metrics['portfolio']['max_drawdown']:.2f}%\n\n")
            
            f.write(f"INDIVIDUAL INDEX PERFORMANCE:\n")
            for idx_name, perf in self.metrics['indices'].items():
                f.write(f"  {idx_name}:\n")
                f.write(f"    Total Return: {perf['Total Return']:.2f}%\n")
                f.write(f"    CAGR: {perf['CAGR']:.2f}%\n\n")
        
        print(f"✓ Metrics summary exported: {metrics_path}")
    
    def run_backtest(self):
        """Execute complete backtesting workflow"""
        print("\n" + "="*70)
        print("PORTFOLIO BACKTESTING SYSTEM")
        print("="*70)
        print(f"Allocation: Nifty200 {PORTFOLIO_ALLOCATION['NIFTY200_MOMENTUM']*100:.0f}% | " +
              f"Midcap150 {PORTFOLIO_ALLOCATION['MIDCAP150_M50']*100:.0f}% | " +
              f"Smallcap250 {PORTFOLIO_ALLOCATION['SMALLCAP250_MQ100']*100:.0f}%")
        print(f"Rebalancing: {REBALANCE_FREQUENCY.upper()}")
        print(f"Initial Capital: ₹{INITIAL_CAPITAL:,.2f}")
        print("="*70)
        
        # Execute workflow
        self.load_all_data()
        self.align_data()
        self.calculate_returns()
        self.calculate_portfolio_value()
        self.calculate_metrics()
        self.generate_visualizations()
        self.export_results()
        
        print("\n" + "="*70)
        print("BACKTESTING COMPLETE!")
        print("="*70)


if __name__ == "__main__":
    # Initialize and run backtester
    backtester = PortfolioBacktester(workspace_path='.')
    backtester.run_backtest()
