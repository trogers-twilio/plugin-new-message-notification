import { FlexPlugin } from 'flex-plugin';
import React from 'react';
import NewMessageNotification from './components/NewMessageNotification';

const PLUGIN_NAME = 'NewMessageNotificationPlugin';

export default class NewMessageNotificationPlugin extends FlexPlugin {
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
    flex.TaskListButtons.Content.add(<NewMessageNotification key="newMessageNotification" />)
  }
}
