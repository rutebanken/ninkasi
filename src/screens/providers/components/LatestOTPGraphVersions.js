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

import React, { useState } from 'react';
import { connect } from 'react-redux';
import SupplierActions from 'actions/SuppliersActions';
import cfgreader from 'config/readConfig';
import moment from 'moment';
import UnfoldLess from 'material-ui/svg-icons/navigation/unfold-less';
import UnfoldMore from 'material-ui/svg-icons/navigation/unfold-more';
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover';
import FlatButton from 'material-ui/FlatButton';

const containerStyle = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  backgroundColor: 'rgb(229, 229, 229)'
};

const wrapperStyle = {
  padding: '20px'
};

const versionDetailsStyle = {
  display: 'flex',
  flexDirection: 'column',
  whiteSpace: 'nowrap'
};

const GraphVersionDetails = ({ name, serializationId, creationDate, size }) => (
  <div style={versionDetailsStyle}>
    <div>
      <h5 style={{ textDecoration: 'underline' }}>{name}</h5>
    </div>
    <div style={{ display: 'flex' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontWeight: 'bold' }}>Serialization id: </span>
        <span style={{ fontWeight: 'bold' }}>Created: </span>
        <span style={{ fontWeight: 'bold' }}>Size: </span>
      </div>
      <div
        style={{ display: 'flex', flexDirection: 'column', marginLeft: '10px' }}
      >
        <span>{serializationId}</span>
        <span title={moment(creationDate).fromNow()}>
          {moment(creationDate).format('DD-MM-YYYY hh:mm:ss')}
        </span>
        <span>
          {Math.round((size / 1024 / 1024 / 1024 + Number.EPSILON) * 100) / 100}{' '}
          GB
        </span>
      </div>
    </div>
  </div>
);

class LatestOTPGraphVersions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showGraphVersions: false,
      anchorEl: null
    };
  }

  componentDidMount() {
    cfgreader.readConfig(
      function(config) {
        window.config = config;
        this.props.dispatch(SupplierActions.getOTPGraphVersions());
        this.startPolling();
      }.bind(this)
    );
  }

  componentWillUnmount() {
    clearInterval(this._timer);
  }

  startPolling = () => {
    setTimeout(() => {
      this._timer = setInterval(this.poll, 60000);
    }, 1000);
  };

  poll = () => {
    this.props.dispatch(SupplierActions.getOTPGraphVersions());
  };

  render() {
    const { streetGraphs, transitGraphs } = this.props;

    if (!streetGraphs || !transitGraphs) {
      return null;
    }

    return (
      <>
        <FlatButton
          label="OTP graph versions"
          labelPosition="before"
          icon={this.state.showGraphVersions ? <UnfoldLess /> : <UnfoldMore />}
          onClick={e => {
            e.preventDefault();

            this.setState({
              showGraphVersions: true,
              anchorEl: e.currentTarget
            });
          }}
        />
        <Popover
          open={this.state.showGraphVersions}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={e => {
            this.setState({
              showGraphVersions: false
            });
          }}
          animation={PopoverAnimationVertical}
        >
          <div style={containerStyle}>
            <div style={wrapperStyle}>
              <h4 style={{ fontWeight: 'bold', marginBottom: 0 }}>
                Latest street graphs
              </h4>
              <>
                {streetGraphs.map(streetGraph => (
                  <GraphVersionDetails
                    key={streetGraph.serializationId}
                    name={streetGraph.name}
                    serializationId={streetGraph.serializationId}
                    creationDate={streetGraph.creationDate}
                    size={streetGraph.size}
                  />
                ))}
              </>
            </div>
            <div style={wrapperStyle}>
              <h4 style={{ fontWeight: 'bold', marginBottom: 0 }}>
                Latest transit graphs
              </h4>
              <>
                {transitGraphs.map(transitGraph => (
                  <GraphVersionDetails
                    key={transitGraph.serializationId}
                    name={transitGraph.name}
                    serializationId={transitGraph.serializationId}
                    creationDate={transitGraph.creationDate}
                    size={transitGraph.size}
                  />
                ))}
              </>
            </div>
          </div>
        </Popover>
      </>
    );
  }
}

const mapStateToProps = state => ({
  streetGraphs: state.SuppliersReducer.streetGraphs,
  transitGraphs: state.SuppliersReducer.transitGraphs
});

export default connect(mapStateToProps)(LatestOTPGraphVersions);
