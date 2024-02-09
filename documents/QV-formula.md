# Adjusted Quadratic Voting Model for DAO

## Overview

Each homeowner has 100 votes. The model aims to cap the maximum additional voting power at 0.5 when using all 100 votes.

## Voting Setup

- **Total Votes per Homeowner:** 100 votes.
- **Maximum Additional Voting Power:** 0.5 for using all 100 votes.

## Calculation

- Quadratic voting formula: \( f \times n^2 \), where \( n \) is the number of votes.
- Factor \( f \) is set to maintain the voting power cap.

## Factor \( f \)

- Derived to ensure a cap of 0.5 additional voting power for 100 votes.
- \( f = 0.00005 \).

## Implementation

- **Vote Allocation:** Up to 100 votes per homeowner.
- **Voting Power Calculation:** \( 0.00005 \times \text{number of votes}^2 \).

## Examples

1. **Using All 100 Votes:**

   - Additional voting power: \( 0.00005 \times 100^2 = 0.5 \).

2. **Using 50 Votes:**

   - Additional voting power: \( 0.00005 \times 50^2 = 0.125 \).

3. **Using 10 Votes:**
   - Additional voting power: \( 0.00005 \times 10^2 = 0.05 \).

## Conclusion

This quadratic voting model balances the influence of each vote, ensuring no over-concentration of power while allowing meaningful participation.
