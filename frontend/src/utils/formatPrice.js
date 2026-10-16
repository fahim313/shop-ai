export function formatPrice(amount) {
  if (amount == null || !Number.isFinite(Number(amount))) {
    return "৳0";
  }

  return `৳${Number(amount).toLocaleString("en-IN")}`;
}

/**
 * Calculates discount percentage.
 * @param {number} current
 * @param {number} previous
 * @returns {number}
 */
export function getDiscountPercentage(current, previous) {
  if (
    !Number.isFinite(Number(current)) ||
    !Number.isFinite(Number(previous)) ||
    !previous ||
    previous <= current
  ) {
    return 0;
  }

  return Math.round(((previous - current) / previous) * 100);
}