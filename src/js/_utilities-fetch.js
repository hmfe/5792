/*
 * Fetch utilities
 ======================== */

define([], function () {
    var fetch = {

        /*
         * Process API and data
         ======================== */

        /**
         * @param {string|null} url 
         * @returns {object|null}
         */
        fetchData: function (url) {
            return url ? new Promise(function (resolve, reject) {
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
            }) : null;
        },

        /**
         * @param {object} data 
         * @param {number} maxLength 
         * @returns {Array}
         */
        getItems: function (
            data = '',
            maxLength = 1
        ) {
            if (data) {
                let items = JSON.parse(data);

                return this.getItemsCount(items, maxLength) ? items : [];
            }

            return [];
        },

        /**
         * @param {Array} items 
         * @param {number} maxLength 
         * @returns {number}
         */
        getItemsCount: function (
            items = [],
            maxLength = 1
        ) {
            return items.length > maxLength ? maxLength : items.length;
        },

        /*
         * Process error responses
         ======================== */

        /**
         * @param {object|null} response 
         * @param {number} count 
         * @returns {string}
         */
        getFetchError: function (
            response, 
            count = 0
        ) {
            let errorFail = this._getErrorFailedResponse(response) ? this._getErrorFailedResponse(response) : '';
            errorFail = errorFail ? errorFail : this._getErrorNoItems(count);

            return errorFail;
        },

        /**
         * @private
         * @param {object|null} response
         * @returns {string}
         */
        _getErrorFailedResponse: function (response) {
            return response && response.status === 404 ? `<strong>Error:</strong> ${response.statusText}.` : '';
        },

        /**
         * @private
         * @param {number} count 
         * @returns {string}
         */
        _getErrorNoItems: function (count = 0) {
            return count < 1 ? `<strong>Error:</strong> No result found.` : '';
        }
    }

    return fetch;
});
