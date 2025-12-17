#!/usr/bin/env python3
"""Check common data availability across all indices"""

import pandas as pd
from pathlib import Path

# Load all indices
print('='*80)
print('CHECKING COMMON DATA AVAILABILITY ACROSS ALL INDICES')
print('='*80)

# Nifty200
print('\n📊 NIFTY200 MOMENTUM 30:')
nifty200_files = [
    'NIFTY200 MOMENTUM 30-01-04-2023-to-31-03-2024.csv',
    'NIFTY200 MOMENTUM 30-01-04-2024-to-31-03-2025.csv',
    'NIFTY200 MOMENTUM 30-01-04-2025-to-30-11-2025.csv'
]
nifty200_dfs = []
for f in nifty200_files:
    df = pd.read_csv(f, skipinitialspace=True)
    df.columns = df.columns.str.strip()
    df['Date'] = pd.to_datetime(df['Date'], format='%d-%b-%Y')
    nifty200_dfs.append(df)
    print(f'  {f}: {len(df)} rows ({df["Date"].min().date()} to {df["Date"].max().date()})')

nifty200 = pd.concat(nifty200_dfs).sort_values('Date').drop_duplicates(subset='Date')
print(f'  ✓ Combined: {len(nifty200)} rows ({nifty200["Date"].min().date()} to {nifty200["Date"].max().date()})')

# Midcap150
print('\n📊 NIFTY MIDCAP150 MOMENTUM 50:')
midcap_files = [
    'NIFTY MIDCAP150 MOMENTUM 50-01-04-2023-to-31-03-2024.csv',
    'NIFTY MIDCAP150 MOMENTUM 50-01-04-2024-to-31-03-2025.csv',
    'NIFTY MIDCAP150 MOMENTUM 50-01-04-2025-to-30-11-2025.csv'
]
midcap_dfs = []
for f in midcap_files:
    df = pd.read_csv(f, skipinitialspace=True)
    df.columns = df.columns.str.strip()
    df['Date'] = pd.to_datetime(df['Date'], format='%d-%b-%Y')
    midcap_dfs.append(df)
    print(f'  {f}: {len(df)} rows ({df["Date"].min().date()} to {df["Date"].max().date()})')

midcap = pd.concat(midcap_dfs).sort_values('Date').drop_duplicates(subset='Date')
print(f'  ✓ Combined: {len(midcap)} rows ({midcap["Date"].min().date()} to {midcap["Date"].max().date()})')

# Smallcap250
print('\n📊 NIFTY SMALLCAP250 MOMENTUM QUALITY 100:')
smallcap_files = [
    'NIFTY SMALLCAP250 MOMENTUM QUALITY 100-01-04-2024-to-31-03-2025.csv',
    'NIFTY SMALLCAP250 MOMENTUM QUALITY 100-01-04-2025-to-30-11-2025.csv'
]
smallcap_dfs = []
for f in smallcap_files:
    df = pd.read_csv(f, skipinitialspace=True)
    df.columns = df.columns.str.strip()
    df['Date'] = pd.to_datetime(df['Date'], format='%d-%b-%Y')
    smallcap_dfs.append(df)
    print(f'  {f}: {len(df)} rows ({df["Date"].min().date()} to {df["Date"].max().date()})')

smallcap = pd.concat(smallcap_dfs).sort_values('Date').drop_duplicates(subset='Date')
print(f'  ✓ Combined: {len(smallcap)} rows ({smallcap["Date"].min().date()} to {smallcap["Date"].max().date()})')

# Find common dates
print('\n' + '='*80)
print('COMMON DATA PERIODS')
print('='*80)

nifty200_dates = set(nifty200['Date'])
midcap_dates = set(midcap['Date'])
smallcap_dates = set(smallcap['Date'])

# All three indices
common_all = sorted(list(nifty200_dates & midcap_dates & smallcap_dates))
print(f'\n✓ ALL THREE INDICES OVERLAP:')
print(f'  Trading days: {len(common_all)}')
if common_all:
    print(f'  Period: {min(common_all).date()} to {max(common_all).date()}')
    days_span = (max(common_all) - min(common_all)).days
    years_span = days_span / 365.25
    print(f'  Duration: {days_span} days ({years_span:.2f} years)')

# Nifty200 + Midcap only
common_n200_mid = sorted(list(nifty200_dates & midcap_dates))
print(f'\n✓ NIFTY200 + MIDCAP150 (without Smallcap):')
print(f'  Trading days: {len(common_n200_mid)}')
if common_n200_mid:
    print(f'  Period: {min(common_n200_mid).date()} to {max(common_n200_mid).date()}')
    days_span = (max(common_n200_mid) - min(common_n200_mid)).days
    years_span = days_span / 365.25
    print(f'  Duration: {days_span} days ({years_span:.2f} years)')

print('\n' + '='*80)
print('DATA AVAILABILITY SUMMARY')
print('='*80)
print(f'\nFor FULL portfolio (all 3 indices): {len(common_all)} days available')
print(f'For 2-index portfolio (N200 + Midcap): {len(common_n200_mid)} days available')
print(f'\n⚠️  Missing Smallcap data BEFORE: {min(smallcap_dates).date()}')
print(f'⚠️  Missing Midcap data BEFORE: {min(midcap_dates).date()}')
