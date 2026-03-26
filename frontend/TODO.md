FRONTEND
Tower height: level of last floor
Material breakdown chart
§d model toggles towers
Sort programs by name so color are consistent

MODEL
New model with 3d elements


Here’s what I found:

The legend is rendered in the parent card, above the 3D viewer, via <ViewerLegend v-if="legendItems && legendItems.length" :items="legendItems" />.
The computed property legendItems in MetricsView.vue only returns a non-empty array if:
For categorical metrics: speckleData.latest.data.elements is a non-empty array and contains valid program properties.
For numeric metrics: selectedMetric has valid left, right, or benchmark values.
If the legend never appears:

It is likely a data issue: either elements is missing/empty, or the selected metric does not have the required properties.
The rendering logic is correct and will show the legend if legendItems is non-empty.
To debug further:

Check in the browser console if legendItems is an empty array or if elements is undefined.
If you want the legend to always show (even if empty), remove the v-if or add a placeholder.
Should the legend be in the parent card or inside the viewer?

The current placement (in the card, above the viewer) is correct for visibility and UX.
If you want it inside the 3D viewer area, move the <ViewerLegend ... /> into the ViewerPanel or SpeckleViewer component.