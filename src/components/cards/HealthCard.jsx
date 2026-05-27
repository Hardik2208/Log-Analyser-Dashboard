import React, { useMemo } from 'react';
import { Tooltip, Tag } from 'antd';
import { Clock, Activity, ArrowUpCircle } from 'lucide-react';

/**
 * @typedef {Object} HealthCardProps
 * @property {string} name - Service or system name
 * @property {'healthy'|'warning'|'critical'|'unknown'} [status='unknown'] - Health status
 * @property {number} [latency] - Response latency in milliseconds
 * @property {string} [uptime] - Uptime percentage string (e.g. '99.97%')
 * @property {string} [lastCheck] - ISO 8601 timestamp of last health check
 * @property {Object} [details] - Additional key-value pairs to display
 * @property {boolean} [loading=false] - Show skeleton shimmer when true
 */

/** Status → display label, color variable, and tag color */
const STATUS_CONFIG = {
  healthy: {
    label: 'Healthy',
    color: 'var(--success)',
    tagColor: 'success',
  },
  warning: {
    label: 'Warning',
    color: 'var(--warning)',
    tagColor: 'warning',
  },
  critical: {
    label: 'Critical',
    color: 'var(--danger)',
    tagColor: 'error',
  },
  unknown: {
    label: 'Unknown',
    color: 'var(--text-muted)',
    tagColor: 'default',
  },
};

/**
 * Formats an ISO timestamp into a human-readable relative or absolute string.
 * @param {string} iso - ISO 8601 timestamp
 * @returns {string}
 */
function formatLastCheck(iso) {
  if (!iso) return '—';
  try {
    const date = new Date(iso);
    const now = new Date();
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);

    if (diffSec < 60) return `${diffSec}s ago`;
    if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
    if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}h ago`;
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return iso;
  }
}

/**
 * HealthCard — Displays the health status of a service or subsystem.
 *
 * Features a status dot with pulse animation, latency/uptime readouts,
 * relative timestamp, and expandable detail rows.
 *
 * @param {HealthCardProps} props
 */
function HealthCard({
  name,
  status = 'unknown',
  latency,
  uptime,
  lastCheck,
  details,
  loading = false,
}) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.unknown;

  const detailEntries = useMemo(
    () => (details ? Object.entries(details) : []),
    [details]
  );

  /* ──────────── Skeleton State ──────────── */
  if (loading) {
    return (
      <div className="glass-panel animate-fade-in" style={styles.card}>
        {/* Header skeleton */}
        <div style={styles.header}>
          <div style={styles.headerLeft}>
            <div className="skeleton-shimmer" style={styles.skeletonDot} />
            <div className="skeleton-shimmer" style={styles.skeletonName} />
          </div>
          <div className="skeleton-shimmer" style={styles.skeletonTag} />
        </div>

        {/* Stats skeleton */}
        <div style={styles.statsRow}>
          <div className="skeleton-shimmer" style={styles.skeletonStat} />
          <div className="skeleton-shimmer" style={styles.skeletonStat} />
        </div>

        {/* Footer skeleton */}
        <div className="skeleton-shimmer" style={styles.skeletonFooter} />
      </div>
    );
  }

  /* ──────────── Rendered State ──────────── */
  return (
    <div className="glass-panel animate-fade-in" style={styles.card}>
      {/* Header: Status Dot + Name + Tag */}
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <span className={`status-dot status-dot-${status}`} />
          <span style={styles.serviceName}>{name}</span>
        </div>
        <Tag
          color={config.tagColor}
          style={styles.statusTag}
        >
          {config.label}
        </Tag>
      </div>

      {/* Stats Row */}
      <div style={styles.statsRow}>
        {/* Latency */}
        {latency !== undefined && (
          <Tooltip title="Response latency">
            <div style={styles.stat}>
              <Activity size={14} style={{ color: 'var(--text-muted)' }} />
              <span style={styles.statLabel}>Latency</span>
              <span
                style={{
                  ...styles.statValue,
                  color:
                    latency > 500
                      ? 'var(--danger)'
                      : latency > 200
                        ? 'var(--warning)'
                        : 'var(--success)',
                }}
              >
                {latency}
                <span style={styles.statUnit}>ms</span>
              </span>
            </div>
          </Tooltip>
        )}

        {/* Uptime */}
        {uptime && (
          <Tooltip title="Uptime percentage">
            <div style={styles.stat}>
              <ArrowUpCircle size={14} style={{ color: 'var(--text-muted)' }} />
              <span style={styles.statLabel}>Uptime</span>
              <span style={{ ...styles.statValue, color: 'var(--success)' }}>
                {uptime}
              </span>
            </div>
          </Tooltip>
        )}
      </div>

      {/* Detail Rows */}
      {detailEntries.length > 0 && (
        <div style={styles.detailsSection}>
          {detailEntries.map(([key, val]) => (
            <div key={key} style={styles.detailRow}>
              <span style={styles.detailKey}>{key}</span>
              <span style={styles.detailValue}>{String(val)}</span>
            </div>
          ))}
        </div>
      )}

      {/* Footer: Last Check */}
      <div style={styles.footer}>
        <Clock size={12} style={{ color: 'var(--text-muted)' }} />
        <span style={styles.footerText}>
          Last checked: {formatLastCheck(lastCheck)}
        </span>
      </div>
    </div>
  );
}

/* ──────────── Inline Styles ──────────── */
const styles = {
  card: {
    padding: '20px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
  },

  /* Header */
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },
  serviceName: {
    fontFamily: 'var(--font-sans)',
    fontWeight: 600,
    fontSize: 15,
    color: 'var(--text-primary)',
  },
  statusTag: {
    fontSize: 11,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
    border: 'none',
    borderRadius: 'var(--radius-sm)',
  },

  /* Stats */
  statsRow: {
    display: 'flex',
    gap: 24,
    flexWrap: 'wrap',
  },
  stat: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    cursor: 'default',
  },
  statLabel: {
    fontSize: 12,
    color: 'var(--text-muted)',
    fontFamily: 'var(--font-sans)',
  },
  statValue: {
    fontFamily: 'var(--font-mono)',
    fontSize: 14,
    fontWeight: 600,
    marginLeft: 4,
  },
  statUnit: {
    fontSize: 11,
    fontWeight: 400,
    opacity: 0.7,
    marginLeft: 1,
  },

  /* Details */
  detailsSection: {
    borderTop: '1px solid var(--border-subtle)',
    paddingTop: 12,
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  detailRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    fontSize: 13,
  },
  detailKey: {
    color: 'var(--text-muted)',
    fontFamily: 'var(--font-sans)',
    textTransform: 'capitalize',
  },
  detailValue: {
    color: 'var(--text-secondary)',
    fontFamily: 'var(--font-mono)',
    fontSize: 12,
  },

  /* Footer */
  footer: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    borderTop: '1px solid var(--border-subtle)',
    paddingTop: 12,
  },
  footerText: {
    fontSize: 11,
    color: 'var(--text-muted)',
    fontFamily: 'var(--font-sans)',
  },

  /* Skeleton placeholders */
  skeletonDot: {
    width: 10,
    height: 10,
    borderRadius: '50%',
  },
  skeletonName: {
    width: 120,
    height: 16,
  },
  skeletonTag: {
    width: 64,
    height: 22,
    borderRadius: 'var(--radius-sm)',
  },
  skeletonStat: {
    width: 100,
    height: 20,
    borderRadius: 'var(--radius-sm)',
  },
  skeletonFooter: {
    width: '50%',
    height: 12,
    borderRadius: 'var(--radius-sm)',
    marginTop: 4,
  },
};

export default HealthCard;
