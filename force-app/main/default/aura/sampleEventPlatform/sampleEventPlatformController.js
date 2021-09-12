({
    onInit: function (component, event, helper) {
        const empApi = component.find("empApi");
        const errorHandler = function (message) {
            console.error("Received error ", JSON.stringify(message));
        };
        empApi.onError(errorHandler);
        const callback = function (response) {
            let utilityAPI = component.find("UtilityBarEx");
            utilityAPI.openUtility();
            console.log("Event Received : " + JSON.stringify(response));
        };
        empApi.subscribe('/event/Sample__e', -1, callback).then(function (response) {
            console.log("Subscribed to channel " + response.channel);
            component.set("v.subscription", response);
        });
    },

    /*subscribe: function (component, event, helper) {
        const empApi = component.find("empApi");
        const callback = function (response) {
            console.log("Event Received : " + JSON.stringify(response));
        };
        empApi.subscribe('/event/Sample__e', -1, callback).then(function (response) {
            console.log("Subscribed to channel " + response.channel);
            component.set("v.subscription", response);
        });
    }, */
    /*unsubscribe: function (component, event, helper) {
        
        const callback = function (message) {
            console.log("Unsubscribed from channel ",JSON.stringify(message));
        };
        empApi.unsubscribe(component.get("v.subscription"), callback);
    } */
})