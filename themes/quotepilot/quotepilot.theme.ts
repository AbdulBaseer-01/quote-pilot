// The quotepilot theme. `astryx experimental theme editor` wrote this file once and never changes it again.
// The checked settings live in quotepilot.settings.json and the generated quotepilot.settings.ts;
// change them with `astryx experimental theme editor set quotepilot ...`. Add your own changes below: they win over the settings.
import {defineTheme} from '@astryxdesign/core/theme';
import {quotepilotSettings} from './quotepilot.settings';

export const quotepilotTheme = defineTheme({
  extends: quotepilotSettings,
  name: 'quotepilot',
});
