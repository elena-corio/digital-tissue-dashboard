import { ref, computed } from 'vue';
import { TABS, SITE } from '../uiText.js';

const title = ref('');
const subtitle = ref('');
const statusIcon = ref('');
const statusLabel = ref('');
const statusDescription = ref('');
const statusValue = ref(null);


// KPI status array and logic for calculating onTarget status for all KPIs
const kpiStatus = ref([]); // This should be updated by MetricsView or a data provider

// Logic for calculating KPI onTarget status (copied from useSpeckleData)
import { METRICS } from '../benchmarks.js';

/**
 * Calculate KPI onTarget status for a given properties object (latest.data.properties)
 * @param {object} properties - The properties object from the latest data
 * @returns {Array<{name: string, value: number|undefined, onTarget: boolean}>}
 */
function calculateKPIStatus(properties) {
  if (!properties) return [];
  const result = [];
  for (const [metricKey, { left, right, benchmark }] of Object.entries(METRICS)) {
    // Convert camelCase to snake_case for property lookup
    const snakeKey = metricKey.replace(/[A-Z]/g, l => `_${l.toLowerCase()}`);
    const value = properties[snakeKey];
    if (typeof value !== 'number' || isNaN(value)) {
      result.push({ name: metricKey, value: undefined, onTarget: false });
      continue;
    }
    // If left < right, higher is better; if left > right, lower is better
    let onTarget = false;
    if (left < right) {
      onTarget = value >= benchmark;
    } else {
      onTarget = value <= benchmark;
    }
    result.push({ name: metricKey, value, onTarget });
  }
  return result;
}
const bodyBalanceData = ref(null); // This should be updated by SiteView or a data provider

// --- KPI On Target Percent: Copy logic from MetricsView ---

function toSnakeCase(str) {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}

const kpisOnTargetPercent = computed(() => {
  const kpis = kpiStatus.value;
  if (!kpis || !kpis.length) return 0;
  // Use the same logic as MetricsView: for each metric in METRICS, check if the value is on target
  let onTargetCount = 0;
  let total = 0;
  for (const [metricKey, { left, right, benchmark }] of Object.entries(METRICS)) {
    const kpi = kpis.find(k => k.name === metricKey);
    if (!kpi || typeof kpi.value !== 'number' || isNaN(kpi.value)) continue;
    let onTarget = false;
    if (left < right) {
      onTarget = kpi.value >= benchmark;
    } else {
      onTarget = kpi.value <= benchmark;
    }
    if (onTarget) onTargetCount++;
    total++;
  }
  if (total === 0) return 0;
  return Math.round((onTargetCount / total) * 100);
});

// Body Balance: Calculate max deviation from 33% for area distribution (copied from SiteView)
const bodyBalance = computed(() => {
  const totalArea = SITE.hypersArea.hb01 + SITE.hypersArea.hb02 + SITE.hypersArea.hb03;
  if (!totalArea) return 0;
  const areaPercents = [
    (SITE.hypersArea.hb01 / totalArea) * 100,
    (SITE.hypersArea.hb02 / totalArea) * 100,
    (SITE.hypersArea.hb03 / totalArea) * 100
  ];
  const maxDeviation = Math.round(Math.max(...areaPercents.map(p => Math.abs(p - 33))));
  return 100 - maxDeviation;
});

export function useWorkspaceUI() {
  return {
    title,
    subtitle,
    statusIcon,
    statusLabel,
    statusDescription,
    statusValue,
    kpiStatus, // expose for updating
    bodyBalanceData, // expose for updating
    kpisOnTargetPercent,
    bodyBalance
    ,calculateKPIStatus
  };
}
