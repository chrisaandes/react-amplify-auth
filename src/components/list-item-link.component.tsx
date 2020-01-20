import React from 'react';
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Omit } from '@material-ui/types';

interface ListItemLinkProps {
  icon?: React.ReactElement;
  primary: string;
  to: string;
  selected?: boolean;
}

export const ListItemLink: React.FC<ListItemLinkProps> = ({
  icon,
  primary,
  to,
  selected,
}: ListItemLinkProps): JSX.Element => {
  const renderLink = React.useMemo(
    (): any =>
      React.forwardRef<any, Omit<RouterLinkProps, 'to'>>(
        (itemProps, ref): JSX.Element => (
          <RouterLink to={to} ref={ref} {...itemProps} />
        ),
      ),
    [to],
  );

  return (
    <ListItem button component={renderLink} selected={selected}>
      {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
      <ListItemText primary={primary} />
    </ListItem>
  );
};

ListItemLink.defaultProps = {
  selected: false,
};