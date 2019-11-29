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


const express = require('express')
const convictConfig = require('./src/config/convict.js')
const configureApp = require('./server-config').configureApp;
const port = process.env.port || 8988;

convictConfig.then( (convict) => {
  const endpointBase = convict.get('endpointBase');
  const authServerUrl = convict.get('authServerUrl');
  const app = configureApp(express(), endpointBase, authServerUrl);

  app.listen(port, function(error) {
    if (error) {
      console.error(error)
    } else {
      console.info("==> Listening on port %s. Open up http://localhost:%s%s in your browser.", port, port, ENDPOINTBASE)
    }
  })


})
