import { ref, computed } from 'vue';
import { TABS, SITE } from '../uiText.js';

const title = ref('');
const subtitle = ref('');
const statusIcon = ref('');
const statusLabel = ref('');
const statusDescription = ref('');
const statusValue = ref(null);


const kpiStatus = ref([]); // This should be updated by MetricsView or a data provider
const bodyBalanceData = ref(null); // This should be updated by SiteView or a data provider

const kpisOnTargetPercent = computed(() => {
  const kpis = kpiStatus.value;
  if (!kpis || !kpis.length) return 0;
  const onTarget = kpis.filter(k => k.onTarget).length;
  return Math.round((onTarget / kpis.length) * 100);
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
  };
}
