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

import { fetchQuickCreateList } from '../api/studio';

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

  const onItemSelected = ({ contentTypeId, path }: QuickCreateItem) => {
    const today = new Date();
    const formatPath = path
      .replace('{year}', `${today.getFullYear()}`)
      .replace('{month}', ('0' + (today.getMonth() + 1)).slice(-2));
    onQuickCreateItemSelected?.({
      path: formatPath,
      contentTypeId,
      isNewContent: true,
      authoringBase
    });
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
