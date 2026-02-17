export const colors = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
  },
  success: {
    50: '#f0fdf4',
    500: '#22c55e',
    700: '#15803d',
  },
  warning: {
    50: '#fefce8',
    500: '#eab308',
    700: '#a16207',
  },
  error: {
    50: '#fef2f2',
    500: '#ef4444',
    700: '#b91c1c',
  },
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e5e5e5',
    300: '#d4d4d4',
    400: '#a3a3a3',
    500: '#737373',
    600: '#525252',
    700: '#404040',
    800: '#262626',
    900: '#171717',
  },
};

export const statusColors = {
  draft: colors.neutral[400],
  approved: colors.success[500],
  rejected: colors.error[500],
  pending: colors.warning[500],
  running: colors.primary[500],
  passed: colors.success[500],
  failed: colors.error[500],
  archived: colors.neutral[300],
};
