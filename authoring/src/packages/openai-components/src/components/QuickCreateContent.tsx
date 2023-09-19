import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Tooltip } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import SystemIcon from '@craftercms/studio-ui/components/SystemIcon';
import palette from '@craftercms/studio-ui/styles/palette';
import { newContentCreationComplete, showEditDialog } from '@craftercms/studio-ui/state/actions/dialogs';
import QuickCreateItem from '@craftercms/studio-ui/models/content/QuickCreateItem';
import useEnv from '@craftercms/studio-ui/hooks/useEnv';
import useActiveSiteId from '@craftercms/studio-ui/hooks/useActiveSiteId';
import { batchActions } from '@craftercms/studio-ui/state/actions/misc';
import { reloadDetailedItem } from '@craftercms/studio-ui/state/actions/content';
import { showEditItemSuccessNotification } from '@craftercms/studio-ui/state/actions/system';

import { fetchQuickCreateList, getContentTypeDefinition, writeContent } from '../api/studio';

export function QuickCreateContent(props) {
  const { authoringBase } = useEnv();
  const siteId = useActiveSiteId();
  const { item } = props;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [quickCreateItems, setQuickCreateItems] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      const items = await fetchQuickCreateList(authoringBase, siteId);
      setQuickCreateItems(items);
    })();
  }, []);
  const open = Boolean(anchorEl);
  const dispatch = useDispatch();

  let label = 'Quick Create with AI Assistant';
  let iconId = '@mui/icons-material/PostAddRounded';

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onMenuClose = () => setAnchorEl(null);

  const onQuickCreateItemSelected = (props) => {
    onMenuClose();
    dispatch(
      showEditDialog({
        ...props,
        inProgress: false,
        onSaveSuccess: newContentCreationComplete()
      })
    );
  };

  const onQuickCreateItemCreated = (props) => {
    onMenuClose();
    dispatch(
      showEditDialog({
        ...props,
        inProgress: false,
        onSaveSuccess: batchActions([showEditItemSuccessNotification(), reloadDetailedItem({ path: props.path })])
      })
    );
  };

  const buildContent = async ({ authoringBase, siteId, contentTypeId }) => {
    const config = await getContentTypeDefinition(authoringBase, siteId, contentTypeId);
    console.log(config);
    const configXmlDoc = (new DOMParser()).parseFromString(config, 'text/xml');
    console.log(configXmlDoc);
    const xpath = '/form/sections/section/fields/field';
    const result = configXmlDoc.evaluate(xpath, configXmlDoc, null, XPathResult.ANY_TYPE, null);
    const fields = [];
    let node = result.iterateNext() as Element;
    while (node) {
      const fieldType = node.getElementsByTagName('type')[0].textContent;
      const fieldId = node.getElementsByTagName('id')[0].textContent;
      if (fieldType === 'input' || fieldType === 'textarea') {
        fields.push({ fieldType, fieldId });
      }
      node = result.iterateNext() as Element;
    }

    // build new content
    const contentXmlDoc = (new DOMParser()).parseFromString('<page></page>', 'text/xml');
    const contentTypeElement = contentXmlDoc.createElement('content-type');
    contentTypeElement.textContent = contentTypeId;
    contentXmlDoc.documentElement.appendChild(contentTypeElement);

    const displayTemplate = configXmlDoc.evaluate('/form/properties/property[name="display-template"]',
                            configXmlDoc, null, XPathResult.ANY_TYPE, null).iterateNext() as Element;
    const displayTemplateElement = contentXmlDoc.createElement('display-template');
    displayTemplateElement.textContent = displayTemplate ? displayTemplate.getElementsByTagName('value')[0].textContent : '';
    contentXmlDoc.documentElement.appendChild(displayTemplateElement);

    const noTemplateRequired = configXmlDoc.evaluate('/form/properties/property[name="no-template-required"]',
                                configXmlDoc, null, XPathResult.ANY_TYPE, null).iterateNext() as Element;
    const noTemplateRequiredElement = contentXmlDoc.createElement('no-template-required');
    noTemplateRequiredElement.textContent = noTemplateRequired ? noTemplateRequired.getElementsByTagName('value')[0].textContent : '';
    contentXmlDoc.documentElement.appendChild(noTemplateRequiredElement);

    const mergeStrategy = configXmlDoc.evaluate('/form/properties/property[name="merge-strategy"]',
                            configXmlDoc, null, XPathResult.ANY_TYPE, null).iterateNext() as Element;
    const mergeStrategyElement = contentXmlDoc.createElement('merge-strategy');
    mergeStrategyElement.textContent = mergeStrategy ? mergeStrategy.getElementsByTagName('value')[0].textContent : '';
    contentXmlDoc.documentElement.appendChild(mergeStrategyElement);

    const objectId = crypto.randomUUID();
    const objectGroupIdElement = contentXmlDoc.createElement('objectGroupId');
    objectGroupIdElement.textContent = objectId.substring(0, 4);
    contentXmlDoc.documentElement.appendChild(objectGroupIdElement);

    const objectIdElement = contentXmlDoc.createElement('objectId');
    objectIdElement.textContent = objectId;
    contentXmlDoc.documentElement.appendChild(objectIdElement);

    const fileNameElement = contentXmlDoc.createElement('file-name');
    fileNameElement.textContent = 'index.xml';
    contentXmlDoc.documentElement.appendChild(fileNameElement);

    const folderNameElement = contentXmlDoc.createElement('folder-name');
    // TODO: Get from Open AI
    folderNameElement.textContent = 'Curabitur lobortis laoreet vehicula'.toLowerCase().replace(/\s/g, '-');
    contentXmlDoc.documentElement.appendChild(folderNameElement);

    for (let field of fields) {
      const { fieldId } = field;
      const fieldElement = contentXmlDoc.createElement(fieldId);
      // TODO: get from Open AI
      fieldElement.textContent = 'Curabitur lobortis laoreet vehicula';
      contentXmlDoc.documentElement.appendChild(fieldElement);
    }

    const date = new Date();
    const isoString = date.toISOString();

    const createdDateElement = contentXmlDoc.createElement('createdDate');
    createdDateElement.textContent = isoString;
    contentXmlDoc.documentElement.appendChild(createdDateElement);

    const createdDateDtElement = contentXmlDoc.createElement('createdDate_dt');
    createdDateDtElement.textContent = isoString;
    contentXmlDoc.documentElement.appendChild(createdDateDtElement);

    const lastModifiedDateElement = contentXmlDoc.createElement('lastModifiedDate');
    lastModifiedDateElement.textContent = isoString;
    contentXmlDoc.documentElement.appendChild(lastModifiedDateElement);

    const lastModifiedDateDtElement = contentXmlDoc.createElement('lastModifiedDate_dt');
    lastModifiedDateDtElement.textContent = isoString;
    contentXmlDoc.documentElement.appendChild(lastModifiedDateDtElement);

    const content = (new XMLSerializer()).serializeToString(contentXmlDoc);
    console.log(content);

    return content;
  };

  const onItemSelected = async ({ contentTypeId, path }: QuickCreateItem) => {
    const today = new Date();
    const formatPath = path
      .replace('{year}', `${today.getFullYear()}`)
      .replace('{month}', ('0' + (today.getMonth() + 1)).slice(-2));

      const folderName = 'Curabitur lobortis laoreet vehicula'.toLowerCase().replace(/\s/g, '-');
      const contentPath = `${formatPath}/${folderName}`;

      const body = await buildContent({ authoringBase, siteId, contentTypeId });

      const res = await writeContent(authoringBase, siteId, contentPath, 'index.xml', contentTypeId, body);
      if (res) {
        onQuickCreateItemCreated?.({
          path: contentPath,
          contentTypeId,
          site: siteId,
          authoringBase
        });
      }
  };

  return (
    <>
      <Tooltip title={item ? `${label}` : ''}>
        <IconButton
          size="small"
          onClick={handleClick}
          disabled={!item}
          sx={{
            color: palette.purple.main
          }}
        >
          <SystemIcon icon={{ id: iconId }} />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={onMenuClose}
        sx={{
          paddingTop: 0,
          minWidth: '140px'
        }}
      >
          {quickCreateItems.map((item) => (
            <MenuItem key={item.path} onClick={() => onItemSelected(item)} sx={{ fontSize: '14px' }}>
              {item.label} with AI assistant
            </MenuItem>
          ))}
        </Menu>
    </>
  );
}

export default QuickCreateContent;
