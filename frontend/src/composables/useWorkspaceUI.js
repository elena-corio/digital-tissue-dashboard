import { ref } from 'vue';

const title = ref('');
const subtitle = ref('');
const statusIcon = ref('');
const statusLabel = ref('');
const statusDescription = ref('');
const statusValue = ref(null);

export function useWorkspaceUI() {

  return {
    title,
    subtitle,
    statusIcon,
    statusLabel,
    statusDescription,
    statusValue,
  };
}
