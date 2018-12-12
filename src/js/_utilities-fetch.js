/*
 * Fetch utilities
 ======================== */

define([], function () {
    var fetch = {

        /*
         * Process API and data
         ======================== */

        fetchData: function (url) {
            return new Promise(function (resolve, reject) {
                let xhr = new XMLHttpRequest();

                xhr.open('GET', url);

                xhr.onload = function () {
                    if (this.status >= 200 && this.status < 300) {
                        resolve(xhr.response);
                    } else {
                        reject({
                            status: this.status,
                            statusText: xhr.statusText
                        });
                    }
                };

                xhr.onerror = function () {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText
                    });
                };

                xhr.send();
            });
        },

        getItems: function (
            data = '',
            maxLength = 1
        ) {
            if (data) {
                let items = JSON.parse(data);

                return this.getItemsCount(items, maxLength) ? items : [];
            }

            return '';
        },

        getItemsCount: function (
            items = [],
            maxLength = 1
        ) {
            return items.length > maxLength ? maxLength : items.length;
        },

        /*
         * Process error responses
         ======================== */

        getErrorFailedResponse: function (response) {
            return response && response.status === 404 ? `<strong>Error:</strong> ${response.statusText}.` : '';
        },

        getErrorNoItems: function (count) {
            return count < 1 ? `<strong>Error:</strong> No result found.` : '';
        },

        getFetchError: function (response, count) {
            let errorFail = this.getErrorFailedResponse(response) ? this.getErrorFailedResponse(response) : '';
            errorFail = errorFail ? errorFail : this.getErrorNoItems(count);

            return errorFail;
        }
    }

    return fetch;
});
