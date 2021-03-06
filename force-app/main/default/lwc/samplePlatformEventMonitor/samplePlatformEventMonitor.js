import { LightningElement } from 'lwc';
import { subscribe, unsubscribe, onError, setDebugFlag, isEmpEnabled } from 'lightning/empApi';

export default class SamplePlatformEventMonitor extends LightningElement {
    channelName = '/event/Sample__e';
    isSubscribeDisabled = false;
    isUnsubscribeDisabled = !this.isSubscribeDisabled;
    showModel = false;

    subscription = {};

    connectedCallback() {
        this.registerErrorListener();
        this.handleSubscribe();
    }

    handleSubscribe() {
        const messageCallback = function (response) {
            console.log('New message received: ', JSON.stringify(response));
        };
        subscribe(this.channelName, -1, messageCallback).then(response => {
            console.log('Subscription request sent to: ', JSON.stringify(response.channel));
            this.subscription = response;
            this.toggleSubscribeButton(true);
        });
    }
    handleUnsubscribe() {
        this.toggleSubscribeButton(false);
        unsubscribe(this.subscription, response => {
            console.log('unsubscribe() response: ', JSON.stringify(response));
        });
    }

    toggleSubscribeButton(enableSubscribe) {
        this.isSubscribeDisabled = enableSubscribe;
        this.isUnsubscribeDisabled = !enableSubscribe;
    }

    registerErrorListener() {
        onError(error => {
            console.log('Received error from server: ', JSON.stringify(error));
        });
    }
}
