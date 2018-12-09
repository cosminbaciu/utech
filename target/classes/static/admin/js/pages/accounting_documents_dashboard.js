function AccountDocument(accountDocument) {
    var self = this;
    self.id = accountDocument.id;
    self.documentPath = accountDocument.documentPath;
    self.filename = accountDocument.filename;
    self.extension = accountDocument.extension;
    self.identifier = accountDocument.identifier;
    self.viewURL = '/api/accountingDocument/' + accountDocument.extension + '/' + accountDocument.identifier;
    self.createdAt = accountDocument.createdAt;
    self.updatedAt = accountDocument.updatedAt;
    self.url = accountDocument.url;
};

function Page(page, displayText, url, active) {

    var self = this;
    self.page = page;
    self.displayText = displayText;
    self.url = url;
    self.active = active;
}

function MyViewModel() {

    var _this = this;
    _this.accountDocuments = ko.observableArray();
    _this.pages = ko.observableArray();

    _this.changePage = function(page) {

        $.getJSON("/api/admin/shop/api/accounting-documents/all?page=" + page.page, function (data) {
            console.log("Account documents ", data);
            _this.pages.removeAll();
            _this.accountDocuments.removeAll();
            data.accountDocumentDTOS.forEach(function (accountDocument, index) {
                var newAccountDocument = new AccountDocument(accountDocument);
                this.accountDocuments.push(newAccountDocument);
            }, _this);


            _this.pages.push(new Page(0, "First", "/api/admin/shop/api/accounting-documents/all?page=0", false))

            for (i = 0; i < data.pages; i++) {

                _this.pages.push(new Page(i, i+1, "/api/admin/shop/api/accounting-documents/all?page=" + i, data.pages == 0))
            }

            _this.pages.push(new Page(data.pages -1, "Last", "/api/admin/shop/api/accounting-documents/all?page=" + (data.pages -1), false))
        });
    }

    console.log(_this.pages());

    $.getJSON("/api/admin/shop/api/accounting-documents/all?page=0", function (data) {
        console.log("Account documents ", data);
        _this.pages.removeAll();
        _this.accountDocuments.removeAll();
        data.accountDocumentDTOS.forEach(function (accountDocument, index) {
            var newAccountDocument = new AccountDocument(accountDocument);
            this.accountDocuments.push(newAccountDocument);
        }, _this);


        _this.pages.push(new Page(0, "First", "/api/admin/shop/api/accounting-documents/all?page=0", false))

        for (i = 0; i < data.pages; i++) {

            _this.pages.push(new Page(i, i+1, "/api/admin/shop/api/accounting-documents/all?page=" + i, data.pages == 0))
        }

        _this.pages.push(new Page(data.pages -1, "Last", "/api/admin/shop/api/accounting-documents/all?page=" + (data.pages -1), false))
    });
};

ko.applyBindings(new MyViewModel());