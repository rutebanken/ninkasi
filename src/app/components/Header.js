/*
 * Licensed under the EUPL, Version 1.2 or – as soon they will be approved by
 * the European Commission - subsequent versions of the EUPL (the "Licence");
 * You may not use this work except in compliance with the Licence.
 * You may obtain a copy of the Licence at:
 *
 *   https://joinup.ec.europa.eu/software/page/eupl
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the Licence is distributed on an "AS IS" basis,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the Licence for the specific language governing permissions and
 * limitations under the Licence.
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import {
  MoreVert,
  AccountCircle,
  Help,
  History,
  Menu
} from '@mui/icons-material';
import MenuItem from '@mui/material/MenuItem';
import AppActions from 'actions/AppActions';
import SuppliersActions from 'actions/SuppliersActions';
import { getProvidersEnv, getTheme } from 'config/themes';
import Logo from './Logo';
import { MenuList } from '@mui/material';

class Header extends React.Component {
  handleLogout() {
    const { auth } = this.props;
    if (auth) {
      auth.logout({ returnTo: window.location.origin });
    }
  }

  handleShowHistory() {
    this.props.dispatch(SuppliersActions.openHistoryModal());
  }

  getUsername() {
    const { auth } = this.props;
    if (auth && auth.user) {
      return auth.user.name || 'N/A';
    }
  }

  render() {
    const providersEnv = getProvidersEnv(window.config.providersBaseUrl);

    const backgroundStyle = {
      height: 60,
      ...getTheme(providersEnv)
    };

    const username = this.getUsername();
    return (
      <AppBar
        style={backgroundStyle}
        title={
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Logo providersEnv={providersEnv} pathname={this.props.pathname} />
          </div>
        }
        iconElementLeft={
          <IconButton
            onClick={() => this.props.dispatch(AppActions.toggleMenu())}
          >
            <Menu />
          </IconButton>
        }
        iconElementRight={
          <MenuList
            iconButtonElement={
              <IconButton>
                <MoreVert />
              </IconButton>
            }
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
          >
            <MenuItem
              primaryText={'History'}
              leftIcon={<History color="#41c0c4" />}
              style={{ fontSize: 12, padding: 0 }}
              onClick={() => {
                this.handleShowHistory();
              }}
            />
            <MenuItem
              leftIcon={<Help color="#41c0c4" />}
              href="https://enturas.atlassian.net/wiki/spaces/ROR/pages/682623320/Brukerveiledning+-+Ninkasi"
              target="_blank"
              primaryText="User guide (Norwegian)"
              style={{ fontSize: 12, padding: 0 }}
            />
            <MenuItem
              leftIcon={<AccountCircle color="#41c0c4" />}
              primaryText={`Log out ${username}`}
              onClick={() => {
                this.handleLogout();
              }}
              style={{ fontSize: 12, padding: 0 }}
            />
          </MenuList>
        }
      />
    );
  }
}

const mapStateToProps = ({ UserReducer, router }) => ({
  auth: UserReducer.auth,
  pathname: router.location.pathname
});

export default connect(mapStateToProps)(Header);
