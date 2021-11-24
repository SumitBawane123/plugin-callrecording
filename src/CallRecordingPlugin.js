import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';

import reducers, { namespace } from './states';

const PLUGIN_NAME = 'CallRecordingPlugin';

export default class CallRecordingPlugin extends FlexPlugin {
  constructor() {
    super(PLUGIN_NAME);
  }

  /**
   * This code is run when your plugin is being started
   * Use this to modify any UI components or attach to the actions framework
   *
   * @param flex { typeof import('@twilio/flex-ui') }
   * @param manager { import('@twilio/flex-ui').Manager }
   */
  init(flex, manager) {
    this.registerReducers(manager);
   
    /*flex.Actions.addListener('afterTransferTask', (payload) =>{
               console.log("beforehangupcall/////////////////////////////////////////////////////////////////////////////", payload);
    })*/

    flex.Actions.replaceAction('AcceptTask', (payload, original) => {

           console.log("payload////////////////////////////////////////",payload)
           console.log("outgoing////////////////////////////////////////",payload.task._task.sid)
       
       payload.conferenceOptions.record = 'true'
       payload.conferenceOptions.recordingStatusCallback=  `https://drab-barracuda-8971.twil.io/copyrecording?taskSid=${payload.task.taskSid}&sid=${payload.task.sid}`
       return original(payload);



    });
  }
  registerReducers(manager) {
    if (!manager.store.addReducer) {
      // eslint: disable-next-line
      console.error(`You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`);
      return;
    }

    manager.store.addReducer(namespace, reducers);
  }
}
