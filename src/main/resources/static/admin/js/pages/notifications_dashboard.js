function Notifications(notificationsDetailsDTO){

    var self = this;

    self.contractNrField = ko.observable(notificationsDetailsDTO.contractNr);


    self.updateNotificationDetails = function() {

        var data = {
            contractNr: self.contractNrField()
        };

        console.log('------', self.contractNrField());
        $.ajax({
            type: 'POST',
            url: '/api/notificationDetails/update?customerId=' + 2,//TODO: is correct to update each time customer 2?
            data: JSON.stringify(data),
            success: function (returnedData) {
                console.log('POST /api//notificationDetails/update?customerId=' + 2, returnedData, "This is from function");

                self.contractNrField(data.contractNrField());

            },
            contentType: 'application/json',
            dataType: 'json'
        });

    }
}


function NotificationsViewModel() {

    this.contractNrField = ko.observable(this.contractNr);
    var data = {
        contractNr: this.contractNrField()
    };

    this.updateNotificationDetails = function() {

        var data = {
            contractNr: self.contractNrField()
        };

        console.log('------');
        $.ajax({
            type: 'POST',
            url: '/api/notificationDetails/update?customerId=' + 2,//TODO: is correct to update each time customer 2?
            data: JSON.stringify(data),
            success: function (returnedData) {
                console.log('POST /api//notificationDetails/update?customerId=' + 2, returnedData, "This is from function");

                this.contractNrField(data.contractNr);

            },
            contentType: 'application/json',
            dataType: 'json'
        });

    };

    // $.ajax({
    //     type: 'POST',
    //     url: '/api/notificationDetails/update?customerId=1',
    //     data: JSON.stringify(data),
    //     success: function (returnedData) {
    //         console.log('/api/notificationDetails/update?customerId=1', returnedData, "This is from main");
    //
    //         var newNotification = new Notifications(returnedData);
    //
    //         newNotification.contractNrField = 1111111;
    //
    //         console.log(newNotification, "This is from final");
    //
    //     },
    //     contentType: 'application/json',
    //     dataType: 'json'
    // });

    $.getJSON("/api/notificationDetails/getAll", function (data) {
        console.log("notificationDetails", data);
    }, this);



}
ko.applyBindings(new NotificationsViewModel());
