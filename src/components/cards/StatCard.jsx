import React from 'react';

/**
 * @typedef {Object} StatCardProps
 * @property {string} title - Stat title / label
 * @property {string|number} value - The stat value to display
 * @property {string} [description] - Muted description text below the value
 * @property {React.ReactNode} [icon] - Icon rendered inside a colored circle
 * @property {string} [color='var(--accent-indigo)'] - CSS color variable for the icon background tint
 * @property {boolean} [loading=false] - When true, renders skeleton shimmer placeholders
 */

/**
 * StatCard — A compact stat display card for secondary metrics.
 *
 * Renders a glass panel with an icon badge, value in mono font,
 * and an optional description in muted text.
 *
 * @param {StatCardProps} props
 */
function StatCard({
  title,
  value,
  description,
  icon,
  color = 'var(--accent-indigo)',
  loading = false,
}) {
  /* ──────────── Skeleton State ──────────── */
  if (loading) {
    return (
      <div className="glass-panel animate-fade-in" style={styles.card}>
        <div style={styles.row}>
          <div className="skeleton-shimmer" style={styles.skeletonIcon} />
          <div style={styles.textBlock}>
            <div className="skeleton-shimmer" style={styles.skeletonValue} />
            <div className="skeleton-shimmer" style={styles.skeletonLabel} />
          </div>
        </div>
        <div className="skeleton-shimmer" style={styles.skeletonDesc} />
      </div>
    );
  }

  /* ──────────── Rendered State ──────────── */
  return (
    <div className="glass-panel animate-fade-in" style={styles.card}>
      <div style={styles.row}>
        {/* Icon Badge */}
        {icon && (
          <div
            style={{
              ...styles.iconCircle,
              background: `color-mix(in srgb, ${color} 15%, transparent)`,
              color,
            }}
          >
            {icon}
          </div>
        )}

        {/* Value + Title */}
        <div style={styles.textBlock}>
          <span style={styles.value}>{value}</span>
          <span className="metric-label">{title}</span>
        </div>
      </div>

      {/* Description */}
      {description && (
        <p style={styles.description}>{description}</p>
      )}
    </div>
  );
}

/* ──────────── Inline Styles ──────────── */
const styles = {
  card: {
    padding: '16px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  row: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
  },

  iconCircle: {
    width: 42,
    height: 42,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },

  textBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: 2,
    minWidth: 0,
  },

  value: {
    fontFamily: 'var(--font-mono)',
    fontWeight: 600,
    fontSize: 22,
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
    color: 'var(--text-primary)',
  },

  description: {
    fontSize: 12,
    lineHeight: 1.5,
    color: 'var(--text-muted)',
    fontFamily: 'var(--font-sans)',
    margin: 0,
    paddingLeft: 56, // align with text (icon width + gap)
  },

  /* Skeleton placeholders */
  skeletonIcon: {
    width: 42,
    height: 42,
    borderRadius: '50%',
    flexShrink: 0,
  },
  skeletonValue: {
    width: 80,
    height: 22,
    borderRadius: 'var(--radius-sm)',
  },
  skeletonLabel: {
    width: 60,
    height: 12,
    borderRadius: 'var(--radius-sm)',
    marginTop: 2,
  },
  skeletonDesc: {
    width: '70%',
    height: 12,
    borderRadius: 'var(--radius-sm)',
    marginLeft: 56,
  },
};

export default StatCard;
