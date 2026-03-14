import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';

export function useChartSize(defaultWidth = 400, defaultHeight = 240) {
  const containerRef = ref(null);
  const chartWidth = ref(defaultWidth);
  const chartHeight = ref(defaultHeight);
  let resizeObserver = null;

  function updateSize() {
    if (containerRef.value) {
      chartWidth.value = containerRef.value.clientWidth;
      chartHeight.value = containerRef.value.clientHeight || defaultHeight;
    }
  }

  onMounted(() => {
    nextTick(() => {
      updateSize();
      resizeObserver = new ResizeObserver(updateSize);
      if (containerRef.value instanceof Element) {
        resizeObserver.observe(containerRef.value);
      } else {
        console.warn('useChartSize: containerRef is not a DOM Element, skipping observe.');
      }
    });
  });

  onBeforeUnmount(() => {
    if (resizeObserver) resizeObserver.disconnect();
  });

  return { containerRef, chartWidth, chartHeight };
}
