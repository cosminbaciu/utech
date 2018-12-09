function Customer(customerDTO) {

    var self = this;

    // db fields
    self.id = ko.observable(customerDTO.id);
    self.statusCode = ko.observable(customerDTO.statusCode);
    self.email = ko.observable(customerDTO.email);
    self.name = ko.observable(customerDTO.firstName + " " + customerDTO.lastName);
    self.accountId = ko.observable(customerDTO.invoiceStorageDetailDTO.accountId);
    self.address = ko.observable(new Address(customerDTO.legalAddressDTO));

    self.legalAddress = ko.observable(customerDTO.legalAddressDTO.fullAddress);
    self.legalAddressId = ko.observable(customerDTO.legalAddressDTO.id);
    self.consumptionAddress = ko.observable(customerDTO.consumptionAddressDTO.fullAddress);
    self.consumptionAddressId = ko.observable(customerDTO.consumptionAddressDTO.id);

    self.gasPOD = ko.observable(customerDTO.consumptionAddressDTO.gasPOD);
    self.electricityPOD = ko.observable(customerDTO.consumptionAddressDTO.electricityPOD);
    self.gasConsumptionCode = ko.observable(customerDTO.consumptionAddressDTO.gasConsumptionCode);
    self.electricityConsumptionCode = ko.observable(customerDTO.consumptionAddressDTO.electricityConsumptionCode);
    self.contracts = ko.observableArray();
    self.contractSelected = ko.observable(false);
    self.selectedContract = ko.observable();
    customerDTO.contractDTOS.forEach(function (contractDTO, index) {

        this.contracts.push(new Contract(contractDTO));
        if (index === 0)
            self.selectedContract(new Contract(contractDTO));
    }, self);

    self.documents = ko.observableArray();

    // computed fields
    self.contractsCount = ko.observable(self.contracts().length);
    self.documentssCount = ko.observable(self.documents().length);

    // display-logic fields
    self.contactMenuTabId = ko.observable("#contact-" + customerDTO.id);
    self.invoiceStorageMenuTabId = ko.observable("#invoiceStorage-" + customerDTO.id);
    self.contractsMenuTabId = ko.observable("#contracts-" + customerDTO.id);
    self.legalAddressMenuTabId = ko.observable("#legal-address-" + customerDTO.id);

    self.contactTabId = ko.observable("contact-" + customerDTO.id);
    self.invoiceStorageTabId = ko.observable("invoiceStorage-" + customerDTO.id);
    self.notificationTabId = ko.observable("notification-" + customerDTO.id);
    self.contractsTabId = ko.observable("contracts-" + customerDTO.id);
    self.legalAddressTabId = ko.observable("legal-address-" + customerDTO.id);

    // edit fields
    self.email = ko.observable(customerDTO.email);
    self.phone = ko.observable(customerDTO.phone);
    self.firstName = ko.observable(customerDTO.firstName);
    self.lastName = ko.observable(customerDTO.lastName);
    self.idSeries = ko.observable(customerDTO.idSeries);
    self.cnp = ko.observable(customerDTO.cnp);

    self.emailClean = ko.observable(customerDTO.email);
    self.phoneClean = ko.observable(customerDTO.phone);
    self.firstNameClean = ko.observable(customerDTO.firstName);
    self.lastNameClean = ko.observable(customerDTO.lastName);
    self.idSeriesClean = ko.observable(customerDTO.idSeries);
    self.cnpClean = ko.observable(customerDTO.cnp);

    self.selectedStatusCode = ko.observable();

    // constant fields
    self.availableStatusCodes = ko.observableArray([
        {name: "NEW"},
        {name: "FAILED"},
        {name: "VERIFIED"},
        {name: "ACTIVE"},
        {name: "CANCELED"},
        {name: "DROPPED"},
        {name: "FLAGGED"}
    ]);

    // bypass fields
    self.selectedBypassedReportName = ko.observable();

    // constant fields
    self.availablReportNames = ko.observableArray([
        {name: "NEW"},
        {name: "FAILED"},
        {name: "VERIFIED"},
        {name: "ACTIVE"},
        {name: "CANCELED"},
        {name: "DROPPED"},
        {name: "FLAGGED"}
    ]);

    // invoiceStorage fields
    self.quotationId = ko.observable(customerDTO.quotationId);
    self.quoteContractId = ko.observable(customerDTO.quoteContractId);

    self.getMeterDetails = function () {

        var data = {
            customerEmail: self.cleanEmail()
        };

        $.ajax({
            type: 'POST',
            url: '/meter/retrieveFromInvoiceStorageMeterDetailsByClientEmail',
            data: JSON.stringify(data),
            success: function (returnedData) {
                console.log('POST /meter/retrieveFromInvoiceStorageMeterDetailsByClientEmail', returnedData);

            },
            contentType: 'application/json',
            dataType: 'json'
        });
    };

    self.obtainNLC = function () {

        var data = {};

        $.ajax({
            type: 'POST',
            url: '/api/admin/addresses/api/retrieve-nlc?customerId=' + self.id(),
            data: JSON.stringify(data),
            success: function (returnedData) {
                console.log('POST /api/admin/addresses/api/retrieve-nlc?customerId=' + self.id(), returnedData);
            },
            contentType: 'application/json',
            dataType: 'json'
        });
    };

    self.sendToInvoiceStorage = function () {

        var data = {};

        $.ajax({
            type: 'POST',
            url: '/api/invoiceStorageSignOff/createCustomerAndAccountWithLinking?customerId=' + self.id() + '&quotationId=' + self.quotationId(),
            data: JSON.stringify(data),
            success: function (returnedData) {
                console.log('POST /api//invoiceStorageSignOff/createCustomerAndAccountWithLinking?customerId=' + self.id() + '&quotationId=' + self.quotationId(), returnedData);
            },
            contentType: 'application/json',
            dataType: 'json'
        });

    };

    self.sendCustomerFiles = function () {

        var data = {};

        $.ajax({
            type: 'POST',
            url: '/api/invoiceStorageSignOff/sendCustomerFilesToInvoiceStorage?customerId=' + self.id() + '&quotationId=' + self.quotationId(),
            data: JSON.stringify(data),
            success: function (returnedData) {
                console.log('POST /api//invoiceStorageSignOff/sendCustomerFilesToInvoiceStorage?customerId=' + self.id() + '&quotationId=' + self.quotationId(), returnedData);
            },
            contentType: 'application/json',
            dataType: 'json'
        });

    };

    self.generateDocuments = function () {

        var data = {};

        $.ajax({
            type: 'POST',
            url: '/api/admin/customers/api/generate-contract-job?customerId=' + self.id() + '&quoteContractId=' + self.quoteContractId(),
            data: JSON.stringify(data),
            success: function (returnedData) {
                console.log('POST /api/admin/customers/api/generate-contract-job?customerId=' + self.id() + '&quoteContractId=' + self.quoteContractId(), returnedData);
            },
            contentType: 'application/json',
            dataType: 'json'
        });

    };

    self.resetContact = function () {

        self.email(self.emailClean());
        self.phone(self.phoneClean());
        self.firstName(self.firstNameClean());
        self.lastName(self.lastNameClean());
        self.idSeries(self.idSeriesClean());
        self.cnp(self.cnpClean());
    };

    self.updateContact = function () {

        var data = {
            email: self.email(),
            phone: self.phone(),
            firstName: self.firstName(),
            lastName: self.lastName(),
            idSeries: self.idSeries(),
            cnp: self.cnp()
        };

        $.ajax({
            type: 'POST',
            url: '/api/admin/customers/api/update?customerId=' + self.id(),
            data: JSON.stringify(data),
            success: function (returnedData) {
                console.log('POST /api/admin/customers/api/update?customerId=' + self.id(), returnedData);

                self.emailClean(data.email);
                self.phoneClean(data.phone);
                self.firstNameClean(data.firstName);
                self.lastNameClean(data.lastName);
                self.idSeriesClean(data.idSeries);
                self.cnpClean(data.cnp);
                self.resetContact();
            },
            contentType: 'application/json',
            dataType: 'json'
        });

    };

    self.selectContract = function (contract) {

        console.log("SelectContract: ", contract);
        self.contractSelected(true);
        self.selectedContract(contract);
        console.log("SelectContract: ", self.selectedContract().address());
    };

    self.unselectContract = function (contract) {

        console.log("UnselectContract: ", contract);
        self.contractSelected(false);
        self.selectedContract(contract);
        console.log("UnselectContract: ", self.selectedContract().address());
    };

    self.setStatus = function () {

        var data = {
            statusCode: self.selectedStatusCode().name
        };

        $.ajax({
            type: 'POST',
            url: '/api/admin/customers/api/change-status?customerId=' + self.id(),
            data: JSON.stringify(data),
            success: function (returnedData) {
                console.log('POST /api/admin/customers/api/change-status?customerId=' + self.id(), returnedData);
                self.statusCode(returnedData.statusCode);
            },
            contentType: 'application/json',
            dataType: 'json'
        });
    };

    self.refreshCustomer = function () {

        $.getJSON("/api/admin/customers/api/" + self.id(), function (customerDTO) {
            console.log("Customer update: ", customerDTO);

            // db fields
            self.statusCode(customerDTO.statusCode);
            self.email(customerDTO.email);
            self.name(customerDTO.firstName + " " + customerDTO.lastName);
            self.accountId(customerDTO.invoiceStorageDetailDTO.accountId);
            self.address(new Address(customerDTO.legalAddressDTO));

            self.legalAddress(customerDTO.legalAddressDTO.fullAddress);
            self.legalAddressId(customerDTO.legalAddressDTO.id);
            self.consumptionAddress(customerDTO.consumptionAddressDTO.fullAddress);
            self.consumptionAddressId(customerDTO.consumptionAddressDTO.id);

            self.gasPOD(customerDTO.consumptionAddressDTO.gasPOD);
            self.electricityPOD(customerDTO.consumptionAddressDTO.electricityPOD);
            self.gasConsumptionCode(customerDTO.consumptionAddressDTO.gasConsumptionCode);
            self.electricityConsumptionCode(customerDTO.consumptionAddressDTO.electricityConsumptionCode);

            self.contracts.removeAll();
            // self.contractSelected(false);
            // console.log("Refresh Customer Enter: ", self.contracts());

            customerDTO.contractDTOS.forEach(function (contractDTO, index) {

                this.contracts.push(new Contract(contractDTO));
                if (index === 0)
                    self.selectedContract(new Contract(contractDTO));
                //
                // console.log("Refresh Customer Loop: ", self.selectedContract());
            }, self);
            // console.log("Refresh Customer Exit: ", self.selectedContract());

            // computed fields
            self.contractsCount(self.contracts().length);
            self.documentssCount(self.documents().length);

            // edit fields
            self.email(customerDTO.email);
            self.phone(customerDTO.phone);
            self.firstName(customerDTO.firstName);
            self.lastName(customerDTO.lastName);
            self.idSeries(customerDTO.idSeries);
            self.cnp(customerDTO.cnp);

            self.emailClean(customerDTO.email);
            self.phoneClean(customerDTO.phone);
            self.firstNameClean(customerDTO.firstName);
            self.lastNameClean(customerDTO.lastName);
            self.idSeriesClean(customerDTO.idSeries);
            self.cnpClean(customerDTO.cnp);

            // invoiceStorage fields
            self.quotationId(customerDTO.quotationId);
            self.quoteContractId(customerDTO.quoteContractId);
        });
    };

    self.bypassedReportName = ko.observable();
    self.bypassedTotalCostValue = ko.observable();
    self.bypassedConsumAnualElectricitate = ko.observable();
    self.bypassedPretFurnizareElectricitate = ko.observable();
    self.bypassedPretTransportElectricitate = ko.observable();
    self.bypassedPretDistributieElectricitate = ko.observable();
    self.bypassedPretContractElectricitate = ko.observable();
    self.bypassedPretAbonamentElectricitate = ko.observable();
    self.bypassedConsumAnualGaz = ko.observable();
    self.bypassedPretFurnizareGaz = ko.observable();
    self.bypassedPretTransportGaz = ko.observable();
    self.bypassedPretDistributieGaz = ko.observable();
    self.bypassedPretContractGaz = ko.observable();
    self.bypassedPretAbonamentGaz = ko.observable();
    self.bypassedContractNumber = ko.observable();
    self.bypassedSurname = ko.observable();
    self.bypassedGivenNames = ko.observable();
    self.bypassedContractSigningDate = ko.observable();
    self.bypassedEffectiveFromDate = ko.observable();
    self.bypassedEffectiveToDate = ko.observable();

    self.bypassAnnex = function () {

        var data = {
            quoteContractId: self.quoteContractId(),
            reportName: self.bypassedReportName(),
            totalCostValue: self.bypassedTotalCostValue(),
            consumAnualElectricitate: self.bypassedConsumAnualElectricitate(),
            pretFurnizareElectricitate: self.bypassedPretFurnizareElectricitate(),
            pretTransportElectricitate: self.bypassedPretTransportElectricitate(),
            pretDistributieElectricitate: self.bypassedPretDistributieElectricitate(),
            pretContractElectricitate: self.bypassedPretContractElectricitate(),
            pretAbonamentElectricitate: self.bypassedPretAbonamentElectricitate(),
            consumAnualGaz: self.bypassedConsumAnualGaz(),
            pretFurnizareGaz: self.bypassedPretFurnizareGaz(),
            pretTransportGaz: self.bypassedPretTransportGaz(),
            pretDistributieGaz: self.bypassedPretDistributieGaz(),
            pretContractGaz: self.bypassedPretContractGaz(),
            pretAbonamentGaz: self.bypassedPretAbonamentGaz(),
            contractNumber: self.bypassedContractNumber(),
            surname: self.bypassedSurname(),
            givenNames: self.bypassedGivenNames(),
            contractSigningDate: self.bypassedContractSigningDate(),
            effectiveFromDate: self.bypassedEffectiveFromDate(),
            effectiveToDate: self.bypassedEffectiveToDate()
        };

        $.ajax({
            type: 'POST',
            url: '/api/admin/annex/api/bypassPrice',
            data: JSON.stringify(data),
            success: function (returnedData) {
                console.log('POST /api/admin/annex/api/bypassPrice', returnedData);
            },
            contentType: 'application/json',
            dataType: 'json'
        });
    };
}

function Contract(contractDTO) {

    var self = this;
    self.id = contractDTO.id;
    self.address = ko.observable(new Address(contractDTO.address));
    self.documents = ko.observableArray();
    contractDTO.documents.forEach(function (documentDTO) {

        this.documents.push(new Document(documentDTO));
    }, self);

    // display-logic fields
    self.addressMenuTabId = ko.observable("#contract-address-" + contractDTO.id);
    self.notificationMenuTabId = ko.observable("#notification-" + contractDTO.id);
    self.productsMenuTabId = ko.observable("#contract-products-" + contractDTO.id);
    self.documentsMenuTabId = ko.observable("#contract-documents-" + contractDTO.id);

    self.addressTabId = ko.observable("contract-address-" + contractDTO.id);
    self.notificationTabId = ko.observable("notification-" + contractDTO.id);
    self.productsTabId = ko.observable("contract-products-" + contractDTO.id);
    self.documentsTabId = ko.observable("contract-documents-" + contractDTO.id);

    // notification
    self.electricityNotification = ko.observable(new Notification(contractDTO.electricityNotificationDetailsDTO));
    self.gasNotification = ko.observable(new Notification(contractDTO.gasNotificationDetailsDTO));
}

function Address(addressDTO) {

    var self = this;

    self.updateUrl = ko.observable('/api/admin/addresses/api/update?customerId=' + addressDTO.customerId + '&addressId=' + addressDTO.id + '&type=' + addressDTO.type);

    self.id = ko.observable(addressDTO.id);
    self.locality = ko.observable(addressDTO.locality);
    self.subdivision = ko.observable(addressDTO.subdivision);
    self.streetName = ko.observable(addressDTO.streetName);
    self.streetNumber = ko.observable(addressDTO.streetNumber);
    self.building = ko.observable(addressDTO.building);
    self.apartment = ko.observable(addressDTO.apartment);
    self.electricityPOD = ko.observable(addressDTO.electricityPOD);
    self.gasPOD = ko.observable(addressDTO.gasPOD);
    self.electricityNLC = ko.observable(addressDTO.electricityConsumptionCode);
    self.gasNLC = ko.observable(addressDTO.gasConsumptionCode);

    self.localityClean = ko.observable(addressDTO.locality);
    self.subdivisionClean = ko.observable(addressDTO.subdivision);
    self.streetNameClean = ko.observable(addressDTO.streetName);
    self.streetNumberClean = ko.observable(addressDTO.streetNumber);
    self.buildingClean = ko.observable(addressDTO.building);
    self.apartmentClean = ko.observable(addressDTO.apartment);
    self.electricityPODClean = ko.observable(addressDTO.electricityPOD);
    self.gasPODClean = ko.observable(addressDTO.gasPOD);
    self.electricityNLCClean = ko.observable(addressDTO.electricityConsumptionCode);
    self.gasNLCClean = ko.observable(addressDTO.gasConsumptionCode);

    self.resetAddress = function () {

        self.locality(self.localityClean());
        self.subdivision(self.subdivisionClean());
        self.streetName(self.streetNameClean());
        self.streetNumber(self.streetNumberClean());
        self.building(self.buildingClean());
        self.apartment(self.apartmentClean());
        self.electricityPOD(self.electricityPODClean());
        self.gasPOD(self.gasPODClean());
        self.electricityNLC(self.electricityNLCClean());
        self.gasNLC(self.gasNLCClean());
    };

    self.updateAddress = function () {

        var data = {
            id: self.id(),
            streetName: self.streetName(),
            streetNumber: self.streetNumber(),
            building: self.building(),
            apartment: self.apartment(),
            electricityPOD: self.electricityPOD(),
            gasPOD: self.gasPOD(),
            electricityConsumptionCode: self.electricityNLC(),
            gasConsumptionCode: self.gasNLC()
        };

        $.ajax({
            type: 'POST',
            url: self.updateUrl(),
            data: JSON.stringify(data),
            success: function (returnedData) {
                console.log(self.updateUrl(), returnedData);

                self.localityClean(returnedData.locality);
                self.subdivisionClean(returnedData.subdivision);
                self.streetNameClean(returnedData.streetName);
                self.streetNumberClean(returnedData.streetNumber);
                self.buildingClean(returnedData.building);
                self.apartmentClean(returnedData.apartment);
                self.electricityPODClean(returnedData.electricityPOD);
                self.gasPODClean(returnedData.gasPOD);
                self.electricityNLCClean(returnedData.electricityConsumptionCode);
                self.gasNLCClean(returnedData.gasConsumptionCode);
                self.resetAddress();
            },
            contentType: 'application/json',
            dataType: 'json'
        });
    };
}

function Notification(notification) {

    var self = this;
    self.id = ko.observable(notification.id);
    self.contractNrField = ko.observable(notification.contractNr);
    self.customerCodeField = ko.observable(notification.customerCode);
    self.counterIndexField = ko.observable(notification.counterIndex);
    self.counterSeriesField = ko.observable(notification.counterSeries);
    self.dateField = ko.observable(notification.date);
    self.oldContractNrField = ko.observable(notification.oldContractNr);
    self.oldContractDateField = ko.observable(notification.oldContractDate);
    self.soldField = ko.observable(notification.sold);
    self.idDateField = ko.observable(notification.idDate);
    self.idIssuedByField = ko.observable(notification.idIssuedBy);
    self.selectedDistributor = ko.observable();



    self.updateNotificationDetails = function () {

        var data = {
            contractNr: self.contractNrField(),
            customerCode: self.customerCodeField(),
            counterIndex: self.counterIndexField(),
            counterSeries: self.counterSeriesField(),
            date: self.dateField(),
            oldContractNr: self.oldContractNrField(),
            oldContractDate: self.oldContractDateField(),
            sold: self.soldField(),
            idDate: self.idDateField(),
            idIssuedBy: self.idIssuedByField(),
            selectedDistributor: self.selectedDistributor().description
        };

        $.ajax({
            type: 'POST',
            url: '/api/admin/notificationDetails/api/update?id=' + self.id(),
            data: JSON.stringify(data),
            success: function (returnedData) {
                console.log('POST /api/admin/notificationDetails/api/update?id=' + self.id(), returnedData, "This is from function");

                self.contractNrField(data.contractNr);
                self.customerCodeField(data.customerCode);
                self.counterIndexField(data.counterIndex);
                self.counterSeriesField(data.counterSeries);
                self.dateField(data.date);
                self.oldContractNrField(data.oldContractNr);
                self.oldContractDateField(data.oldContractDate);
                self.soldField(data.sold);
                self.idDateField(data.idDate);
                self.idIssuedByField(data.idIssuedBy);
            },
            contentType: 'application/json',
            dataType: 'json'
        });

    };
}

function Document(quotationDocument) {

    var self = this;
    self.id = quotationDocument.id;
    self.url = quotationDocument.url;
    self.uploadUrl = quotationDocument.uploadUrl;
    self.deleteUrl = quotationDocument.deleteUrl;
    self.createdAt = quotationDocument.createdAt;
    self.type = quotationDocument.type;
    self.typeDescription = quotationDocument.typeDescription;
    self.secured = quotationDocument.secured;
    self.defaultFlag = quotationDocument.defaultFlag;

    self.deleteDocument = function () {

        $.getJSON(self.deleteUrl, function (data) {
            console.log("Document deleted: ", data);
        });
    }
};

function Page(page, diaplayText, url, active) {

    var self = this;
    self.page = page;
    self.displayText = diaplayText;
    self.url = url;
    self.active = active;
}

function CustomersViewModel() {

    var _this = this;
    _this.customers = ko.observableArray();
    _this.pages = ko.observableArray();
    _this.distributors = ko.observableArray();
    _this.page = ko.observable(0);
    _this.search = ko.observable(false);
    _this.searchNameQuery = ko.observable('');
    _this.searchIdQuery = ko.observable('');
    _this.searchQuery = ko.observable('');

    _this.changePage = function (page) {

        _this.page(page.page);

        if (_this.search()) {

            var data = {
                query: _this.searchQuery()
            };

            $.ajax({
                type: 'POST',
                url: '/api/admin/customers/api/search?page=' + _this.page(),
                data: JSON.stringify(data),
                success: function (returnedData) {
                    console.log('POST /api/admin/customers/api/search?page=' + _this.page(), returnedData);
                    _this.pages.removeAll();
                    _this.customers.removeAll();
                    returnedData.customerDTOS.forEach(function (customerDTO, index) {

                        var newCustomer = new Customer(customerDTO);
                        this.customers.push(newCustomer);

                        var documentsKO = customerDTO.documents.map(function (document, index) {

                            return new Document(document);
                        });
                        newCustomer.documents(documentsKO);
                    }, _this);


                    _this.pages.push(new Page(0, "First", "/api/admin/customers/api/search?page=0", false));

                    for (i = 0; i < data.pages; i++) {

                        _this.pages.push(new Page(i, i + 1, "/api/admin/customers/api/search?page=" + i, data.pages == 0));
                    }

                    _this.pages.push(new Page(data.pages - 1, "Last", "/api/admin/customers/api/search?page=" + (data.pages - 1), false));
                },
                contentType: 'application/json',
                dataType: 'json'
            });
        } else {

            $.getJSON("/api/admin/customers/api/all?page=" + _this.page(), function (data) {
                console.log("Customers", data);
                _this.pages.removeAll();
                _this.customers.removeAll();
                data.customerDTOS.forEach(function (customerDTO, index) {
                    var newCustomer = new Customer(customerDTO);
                    this.customers.push(newCustomer);

                    var documentsKO = customerDTO.documents.map(function (document, index) {

                        return new Document(document);
                    });
                    newCustomer.documents(documentsKO);
                }, _this);


                _this.pages.push(new Page(0, "First", "/api/admin/customers/api/all?page=0", false))

                for (i = 0; i < data.pages; i++) {

                    _this.pages.push(new Page(i, i + 1, "/api/admin/customers/api/all?page=" + i, data.pages == 0))
                }

                _this.pages.push(new Page(data.pages - 1, "Last", "/api/admin/customers/api/all?page=" + (data.pages - 1), false))
            });
        }
    };

    _this.resetSearch = function () {

        _this.searchQuery("");
        _this.search(false);
        _this.searchNameQuery("");
        _this.searchIdQuery("");
        _this.page(0);
        _this.searchCustomers();
    };

    _this.searchCustomersByName = function () {

        _this.searchQuery(_this.searchNameQuery());
        _this.search(true);
        _this.searchIdQuery("");
        _this.page(0);
        _this.searchCustomers();
    };

    _this.searchCustomersById = function () {

        _this.searchQuery(_this.searchIdQuery());
        _this.search(true);
        _this.searchNameQuery("");
        _this.page(0);
        _this.searchCustomersId();
    };

    _this.searchCustomers = function () {

        if (!_this.search()) {

            $.getJSON("/api/admin/customers/api/all?page=" + _this.page(), function (data) {
                console.log("Customers", data);
                _this.pages.removeAll();
                _this.customers.removeAll();
                data.customerDTOS.forEach(function (customerDTO, index) {
                    var newCustomer = new Customer(customerDTO);
                    this.customers.push(newCustomer);

                    var documentsKO = customerDTO.documents.map(function (document, index) {

                        return new Document(document);
                    });
                    newCustomer.documents(documentsKO);
                }, _this);


                _this.pages.push(new Page(0, "First", "/api/admin/customers/api/all?page=0", false))

                for (i = 0; i < data.pages; i++) {

                    _this.pages.push(new Page(i, i + 1, "/api/admin/customers/api/all?page=" + i, data.pages == 0))
                }

                _this.pages.push(new Page(data.pages - 1, "Last", "/api/admin/customers/api/all?page=" + (data.pages - 1), false))
            });
        } else {

            var data = {
                query: _this.searchQuery()
            };

            $.ajax({
                type: 'POST',
                url: '/api/admin/customers/api/search?page=' + _this.page(),
                data: JSON.stringify(data),
                success: function (returnedData) {
                    console.log('POST /api/admin/customers/api/search?page=' + _this.page(), returnedData);
                    _this.pages.removeAll();
                    _this.customers.removeAll();
                    returnedData.customerDTOS.forEach(function (customerDTO, index) {
                        var newCustomer = new Customer(customerDTO);
                        this.customers.push(newCustomer);

                        var documentsKO = customerDTO.documents.map(function (document, index) {

                            return new Document(document);
                        });
                        newCustomer.documents(documentsKO);
                    }, _this);


                    _this.pages.push(new Page(0, "First", "/api/admin/customers/api/search?page=0", false));

                    for (i = 0; i < data.pages; i++) {

                        _this.pages.push(new Page(i, i + 1, "/api/admin/customers/api/search?page=" + i, data.pages == 0));
                    }

                    _this.pages.push(new Page(data.pages - 1, "Last", "/api/admin/customers/api/search?page=" + (data.pages - 1), false));
                },
                contentType: 'application/json',
                dataType: 'json'
            });
        }
    };

    _this.searchCustomersId = function () {

        if (!_this.search()) {

            $.getJSON("/api/admin/customers/api/all?page=" + _this.page(), function (data) {
                console.log("Customers", data);
                _this.pages.removeAll();
                _this.customers.removeAll();
                data.customerDTOS.forEach(function (customerDTO, index) {
                    var newCustomer = new Customer(customerDTO);
                    this.customers.push(newCustomer);

                    var documentsKO = customerDTO.documents.map(function (document, index) {

                        return new Document(document);
                    });
                    newCustomer.documents(documentsKO);
                }, _this);


                _this.pages.push(new Page(0, "First", "/api/admin/customers/api/all?page=0", false))

                for (i = 0; i < data.pages; i++) {

                    _this.pages.push(new Page(i, i + 1, "/api/admin/customers/api/all?page=" + i, data.pages == 0))
                }

                _this.pages.push(new Page(data.pages - 1, "Last", "/api/admin/customers/api/all?page=" + (data.pages - 1), false))
            });
        } else {

            var data = {
                query: _this.searchQuery()
            };

            $.ajax({
                type: 'POST',
                url: '/api/admin/customers/api/searchId?page=' + _this.page(),
                data: JSON.stringify(data),
                success: function (returnedData) {
                    console.log('POST /api/admin/customers/api/searchId?page=' + _this.page(), returnedData);
                    _this.pages.removeAll();
                    _this.customers.removeAll();
                    returnedData.customerDTOS.forEach(function (customerDTO, index) {
                        var newCustomer = new Customer(customerDTO);
                        this.customers.push(newCustomer);

                        var documentsKO = customerDTO.documents.map(function (document, index) {

                            return new Document(document);
                        });
                        newCustomer.documents(documentsKO);
                    }, _this);


                    _this.pages.push(new Page(0, "First", "/api/admin/customers/api/searchId?page=0", false));

                    for (i = 0; i < data.pages; i++) {

                        _this.pages.push(new Page(i, i + 1, "/api/admin/customers/api/searchId?page=" + i, data.pages == 0));
                    }

                    _this.pages.push(new Page(data.pages - 1, "Last", "/api/admin/customers/api/searchId?page=" + (data.pages - 1), false));
                },
                contentType: 'application/json',
                dataType: 'json'
            });
        }
    };

    console.log(_this.pages());

    $.getJSON("/api/admin/customers/api/all?page=0", function (data) {
        console.log("Customers", data);
        _this.pages.removeAll();
        _this.customers.removeAll();
        data.customerDTOS.forEach(function (customerDTO, index) {
            var newCustomer = new Customer(customerDTO);
            this.customers.push(newCustomer);

            var documentsKO = customerDTO.documents.map(function (document, index) {

                return new Document(document);
            });
            newCustomer.documents(documentsKO);
        }, _this);


        _this.pages.push(new Page(0, "First", "/api/admin/customers/api/all?page=0", false))

        for (i = 0; i < data.pages; i++) {

            _this.pages.push(new Page(i, i + 1, "/api/admin/customers/api/all?page=" + i, data.pages == 0))
        }

        _this.pages.push(new Page(data.pages - 1, "Last", "/api/admin/customers/api/all?page=" + (data.pages - 1), false))
    });


    $.getJSON("/api/distributors/getAll", function(data) {
        data.forEach(function(distributor)
        {
            _this.distributors.push(distributor);
        }, _this);
    });
}

ko.applyBindings(new CustomersViewModel());




