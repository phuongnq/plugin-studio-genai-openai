import { PluginDescriptor } from '@craftercms/studio-ui';

import { GenerateContent } from './components/GenerateContent';
import { QuickCreateContent } from './components/QuickCreateContent';
import { GenerateContentPanelButton } from './components/GenerateContentPanelButton';
import GenerateContentDialog from './components/GenerateContentDialog';
import QuickCreateContentDialog from './components/QuickCreateContentDialog';

const plugin: PluginDescriptor = {
  locales: undefined,
  scripts: undefined,
  stylesheets: undefined,
  id: 'org.rd.plugin.openai',
  widgets: {
    'org.rd.plugin.openai.QuickCreateContent': QuickCreateContent,
    'org.rd.plugin.openai.QuickCreateContentDialog': QuickCreateContentDialog,
    'org.rd.plugin.openai.GenerateContent': GenerateContent,
    'org.rd.plugin.openai.GenerateContentPanelButton': GenerateContentPanelButton,
    'org.rd.plugin.openai.dialog': GenerateContentDialog
    }
};

export { GenerateContent, GenerateContentDialog };

export default plugin;
