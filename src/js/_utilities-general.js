/*
 * General utilities
 ======================== */

define([], function () {
    var utilities = {
        /*
         * Display loader and error messages
         ======================== */

        /**
         * @param {string} prefix 
         * @param {string} target 
         */
        createLoader: function (
            prefix = 'loader',
            target = 'body'
        ) {
            let loader = document.createElement('div'),
                loaderTarget = document.querySelector(target);

            loader.classList.add(prefix + '__loader');
            loader.insertAdjacentHTML('beforeend', `Searching...`);

            loaderTarget.appendChild(loader);
        },

        /**
         * @param {string} prefix 
         */
        destroyLoader: function (prefix = 'loader') {
            let loader = document.querySelectorAll('.' + prefix + '__loader');

            if (loader && loader.length > 0) {
                loader[0].remove();
            }
        },

        /**
         * @param {string|null} errorResponse 
         * @param {string} prefix 
         * @param {string} target 
         */
        showErrorNotFound: function (
            errorResponse,
            prefix = 'error',
            target = 'body'
        ) {
            this.removeErrorMessages(prefix);

            if (!errorResponse) {
                return;
            }

            let errorNotice = document.createElement('div'),
                errorNoticeTarget = document.querySelector(target);

            errorNotice.classList.add(prefix + '__error');
            errorNotice.insertAdjacentHTML('beforeend', errorResponse);

            errorNoticeTarget.appendChild(errorNotice);
        },

        /**
         * @param {string} prefix 
         */
        removeErrorMessages: function (prefix = 'error') {
            document.querySelectorAll('.' + prefix + '__error').forEach(function (errMsg) {
                errMsg.remove();
            });
        },

        /*
         * Performance utilities
         ======================== */

        /**
         * @param {Function} func 
         * @param {number} wait 
         * @param {boolean|null} immediate 
         */
        debounce: function (func, wait, immediate) {
            let timeout;

            return function () {
                let context = this,
                    args = arguments,
                    later = function () {
                        timeout = null;
                        if (!immediate) func.apply(context, args);
                    },
                    callNow = immediate && !timeout;

                clearTimeout(timeout);
                timeout = setTimeout(later, wait);

                if (callNow) {
                    func.apply(context, args);
                }
            };
        },

        /*
         * Additional Utilities
         ======================== */

        /**
         * @returns {string}
         */
        getFormattedDate: function () {
            let options = {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: 'false'
                },
                date = new Date(Date.now());

            return date.toLocaleDateString("en-SE", options);
        }
    }

    return utilities;
});
