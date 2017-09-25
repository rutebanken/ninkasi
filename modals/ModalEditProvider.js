import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';

class ModalEditProvider extends Component {
  componentWillReceiveProps(nextProps) {
    if (this.props.provider !== null) {
      const { provider } = nextProps;
      const { name, sftpAccount } = provider;
      const {
        xmlns,
        xmlnsurl,
        referential,
        organisation,
        user,
        regtoppVersion,
        regtoppCoordinateProjection,
        regtoppCalendarStrategy,
        dataFormat,
        enableValidation,
        allowCreateMissingStopPlace,
        enableStopPlaceIdMapping,
        enableCleanImport,
        migrateDataToProvider
      } = provider.chouetteInfo;

      this.setState({
        _providerId: provider.id,
        _name: name,
        _sftpAccount: sftpAccount,
        _chouetteInfoId: provider.chouetteInfo.id,
        _xmlns: xmlns,
        _xmlnsurl: xmlnsurl,
        _referential: referential,
        _organisation: organisation,
        _user: user,
        _regtoppVersion: regtoppVersion,
        _regtoppCoordinateProjection: regtoppCoordinateProjection,
        _regtoppCalendarStrategy: regtoppCalendarStrategy,
        _dataFormat: dataFormat,
        _enableValidation: enableValidation,
        _allowCreateMissingStopPlace: allowCreateMissingStopPlace,
        _enableStopPlaceIdMapping: enableStopPlaceIdMapping,
        _enableCleanImport: enableCleanImport,
        _migrateDataToProvider: migrateDataToProvider
      });
    } else {
      this.setState({
        _providerId: null,
        _name: '',
        _sftpAccount: '',
        _chouetteInfoId: null,
        _xmlns: '',
        _xmlnsurl: '',
        _referential: '',
        _organisation: '',
        _user: '',
        _regtoppVersion: '',
        _regtoppCoordinateProjection: '',
        _regtoppCalendarStrategy: '',
        _dataFormat: '',
        _enableValidation: false,
        _allowCreateMissingStopPlace: false,
        _enableStopPlaceIdMapping: false,
        _enableCleanImport: false,
        _migrateDataToProvider: null
      });
    }
  }

  getTitle() {
    const { provider } = this.props;
    if (provider && provider.id) {
      return `Edit ${provider.name} (${provider.id})`;
    }
    return 'Create new provider';
  }

  getProjections() {
    const projections = [
      { value: 'EPSG:32632', text: 'UTM zone 32N' },
      { value: 'EPSG:32633', text: 'UTM zone 33N' },
      { value: 'EPSG:32634', text: 'UTM zone 34N' },
      { value: 'EPSG:32635', text: 'UTM zone 35N' },
      { value: 'EPSG:4326', text: 'WGS 84 / Latlong' }
    ];
    return projections.map( projection => (
        <MenuItem key={'projection-' + projection.value}
            value={projection.value}
            innerDivStyle={{zIndex: 100000}}
            style={{zIndex: 100000}}
            primaryText={projection.text}
        />
    ));
  }

  render() {
    const { open, provider, providers, handleClose, handleSubmit } = this.props;

    if (!provider || !this.state) return null;

    const title = this.getTitle();
    const projections = this.getProjections();

    const rowStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    };

    const actions = [
      <FlatButton
        label="Cancel"
        primary={false}
        onTouchTap={() => {
          handleClose();
        }}
      />,
      <FlatButton
        label="Update"
        primary={true}
        onTouchTap={() => {
          handleSubmit(this.state);
        }}
      />
    ];

    return (
      <Dialog
        title={title}
        open={open}
        actions={actions}
      >
        <div style={rowStyle}>
          <TextField
            floatingLabelText={'Name'}
            floatingLabelFixed={true}
            value={this.state._name}
            style={{ flex: 1 }}
            onChange={(e, v) => this.setState({ _name: v })}
          />
          <TextField
            floatingLabelText={'Referential'}
            floatingLabelFixed={true}
            value={this.state._referential}
            style={{ flex: 1, padding: '0 15px' }}
            onChange={(e, v) => this.setState({ _referential: v })}
          />
        </div>
        <div style={rowStyle}>
          <TextField
            floatingLabelText={'Organisation'}
            floatingLabelFixed={true}
            value={this.state._organisation}
            style={{ flex: 1 }}
            onChange={(e, v) => this.setState({ _organisation: v })}
          />
          <TextField
            floatingLabelText={'User'}
            floatingLabelFixed={true}
            value={this.state._user}
            style={{ flex: 1, padding: '0 15px' }}
            onChange={(e, v) => this.setState({ _user: v })}
          />
        </div>
        <div style={rowStyle}>
          <TextField
            floatingLabelText={'Regtopp version'}
            floatingLabelFixed={true}
            value={this.state._regtoppVersion}
            style={{ flex: 1 }}
            onChange={(e, v) => this.setState({ _regtoppVersion: v })}
          />
          <SelectField
            value={this.state._regtoppCoordinateProjection}
            floatingLabelText={'Regtopp Coordinate Projection'}
            menuStyle={{zIndex: 100000}}
            floatingLabelFixed={true}
            style={{ flex: 1, padding: '0 15px', zIndex: 100000}}
            onChange={(e, k, v) => {
              this.setState({_regtoppCoordinateProjection: v})
            }}
          >
            {projections}
          </SelectField>
        </div>
        <div style={rowStyle}>
          <TextField
            floatingLabelText={'Regtopp calendar strategy'}
            floatingLabelFixed={true}
            value={this.state._regtoppCalendarStrategy}
            style={{ flex: 1 }}
            onChange={(e, v) => this.setState({ _regtoppCalendarStrategy: v })}
          />
          <TextField
            floatingLabelText={'Data format'}
            floatingLabelFixed={true}
            value={this.state._dataFormat}
            style={{ flex: 1, padding: '0 15px' }}
            onChange={(e, v) => this.setState({ _dataFormat: v })}
          />
        </div>
        <div style={rowStyle}>
          <TextField
            floatingLabelText={'xmlns'}
            floatingLabelFixed={true}
            value={this.state._xmlns}
            style={{ flex: 1 }}
            onChange={(e, v) => this.setState({ _xmlns: v })}
          />
          <TextField
            floatingLabelText={'xmlns URL'}
            floatingLabelFixed={true}
            value={this.state._xmlnsurl}
            style={{ flex: 1, padding: '0 15px' }}
            onChange={(e, v) => this.setState({ _xmlnsurl: v })}
          />
        </div>
        <div style={rowStyle}>
          <SelectField
            floatingLabelText="Migrate data to provider"
            floatingLabelFixed={true}
            style={{ flex: 1 }}
            value={this.state._migrateDataToProvider}
            onChange={(e, i, v) => this.setState({ _migrateDataToProvider: v })}
            autoWidth={true}
          >
            <MenuItem
              value={null}
              primaryText="None"
              style={{ fontStyle: 'italic' }}
            />
            {providers
              .filter(provider => !provider.chouetteInfo.migrateDataToProvider)
              .map(provider => {
                return (
                  <MenuItem
                    key={'provider-' + provider.id}
                    value={provider.id}
                    primaryText={provider.name}
                  />
                );
              })}
          </SelectField>
          <TextField
            floatingLabelText={'sFtp account'}
            floatingLabelFixed={true}
            value={this.state._sftpAccount}
            style={{ flex: 1, padding: '0 15px' }}
            onChange={(e, v) => this.setState({ _sftpAccount: v })}
          />
        </div>
        <div style={{ ...rowStyle, marginTop: 10 }}>
          <Checkbox
            label="Allow create missing stop place"
            checked={this.state._allowCreateMissingStopPlace}
            style={{ flex: 1, maxWidth: 360 }}
            labelStyle={{ fontSize: '0.9em' }}
            onCheck={(e, v) =>
              this.setState({ _allowCreateMissingStopPlace: v })}
          />
          <Checkbox
            label="Enable stop place Id mapping"
            checked={this.state._enableStopPlaceIdMapping}
            style={{ flex: 1 }}
            labelStyle={{ fontSize: '0.9em' }}
            onCheck={(e, v) => this.setState({ _enableStopPlaceIdMapping: v })}
          />
        </div>
        <div style={{ ...rowStyle, marginTop: 10 }}>
          <Checkbox
            label="Enable clean import"
            checked={this.state._enableCleanImport}
            style={{ flex: 1, maxWidth: 360 }}
            labelStyle={{ fontSize: '0.9em' }}
            onCheck={(e, v) => this.setState({ _enableCleanImport: v })}
          />
          <Checkbox
            label="Enable validation"
            checked={this.state._enableValidation}
            style={{ flex: 1 }}
            labelStyle={{ fontSize: '0.9em' }}
            onCheck={(e, v) => this.setState({ _enableValidation: v })}
          />
        </div>
      </Dialog>
    );
  }
}

export default ModalEditProvider;
