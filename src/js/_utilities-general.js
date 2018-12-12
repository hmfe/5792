/*
 * General utilities
 ======================== */

define([], function () {
    var utilities = {
        /*
         * Loader and error
         ======================== */

        createLoader: function (
            prefix = 'loader',
            target = 'body'
        ) {
            let loader = document.createElement('div'),
                loaderTarget = document.querySelector(target);

            loader.classList.add(prefix + '__loader');
            loader.insertAdjacentHTML('beforeend', `Loading flickr gallery...`);

            loaderTarget.appendChild(loader);
        },

        destroyLoader: function (prefix = 'loader') {
            let loader = document.querySelectorAll('.' + prefix + '__loader');

            if (loader && loader.length > 0) {
                loader[0].remove();
            }
        },

        showErrorNotFound: function (
            errorResponse,
            prefix = 'error',
            target = 'body'
        ) {
            document.querySelectorAll('.' + prefix + '__error').forEach(function (errMsg) {
                errMsg.remove();
            });

            let errorNotice = document.createElement('div'),
                errorNoticeTarget = document.querySelector(target);

            errorNotice.classList.add(prefix + '__error');
            errorNotice.insertAdjacentHTML('beforeend', errorResponse);

            errorNoticeTarget.appendChild(errorNotice);
        },

        /*
         * Performance
         ======================== */

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
