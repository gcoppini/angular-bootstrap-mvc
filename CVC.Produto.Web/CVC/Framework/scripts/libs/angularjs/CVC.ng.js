(function (CVC, angular) {

    if (!angular) {
        return;
    }

    CVC.ng = CVC.ng || {};

    CVC.ng.http = {
        defaultError: {
            message: 'An error has occurred!',
            details: 'Error detail not sent by server.'
        },

        defaultError401: {
            message: 'You are not authenticated!',
            details: 'You should be authenticated (sign in) in order to perform this operation.'
        },

        defaultError403: {
            message: 'You are not authorized!',
            details: 'You are not allowed to perform this operation.'
        },

        defaultError404: {
            message: 'Resource not found!',
            details: 'The resource requested could not found on the server.'
        },

        logError: function (error) {
            CVC.log.error(error);
        },

        showError: function (error) {
            if (error.details) {
                return CVC.message.error(error.details, error.message || CVC.ng.http.defaultError.message);
            } else {
                return CVC.message.error(error.message || CVC.ng.http.defaultError.message);
            }
        },

        handleTargetUrl: function (targetUrl) {
            if (!targetUrl) {
                location.href = CVC.appPath;
            } else {
                location.href = targetUrl;
            }
        },

        handleNonCVCErrorResponse: function (response, defer) {
            if (response.config.vjnHandleError !== false) {
                switch (response.status) {
                    case 401:
                        CVC.ng.http.handleUnAuthorizedRequest(
                            CVC.ng.http.showError(CVC.ng.http.defaultError401),
                            CVC.appPath
                        );
                        break;
                    case 403:
                        CVC.ng.http.showError(CVC.ajax.defaultError403);
                        break;
                    case 404:
                        CVC.ng.http.showError(CVC.ajax.defaultError404);
                        break;
                    default:
                        CVC.ng.http.showError(CVC.ng.http.defaultError);
                        break;
                }
            }

            defer.reject(response);
        },

        handleUnAuthorizedRequest: function (messagePromise, targetUrl) {
            if (messagePromise) {
                messagePromise.done(function () {
                    CVC.ng.http.handleTargetUrl(targetUrl || CVC.appPath);
                });
            } else {
                CVC.ng.http.handleTargetUrl(targetUrl || CVC.appPath);
            }
        },

        handleResponse: function (response, defer) {
            var originalData = response.data;

            if (originalData.success === true) {
                response.data = originalData.result;
                defer.resolve(response);

                if (originalData.targetUrl) {
                    CVC.ng.http.handleTargetUrl(originalData.targetUrl);
                }
            } else if (originalData.success === false) {
                var messagePromise = null;

                if (originalData.error) {
                    if (response.config.vjnHandleError !== false) {
                        messagePromise = CVC.ng.http.showError(originalData.error);
                    }
                } else {
                    originalData.error = defaultError;
                }

                CVC.ng.http.logError(originalData.error);

                response.data = originalData.error;
                defer.reject(response);

                if (response.status == 401 && response.config.vjnHandleError !== false) {
                    CVC.ng.http.handleUnAuthorizedRequest(messagePromise, originalData.targetUrl);
                }
            } else { //not wrapped result
                defer.resolve(response);
            }
        }
    }

    var viajaNetModule = angular.module('CVC', []);

    viajaNetModule.config([
        '$httpProvider', function ($httpProvider) {
            $httpProvider.interceptors.push(['$q', function ($q) {

                return {

                    'request': function (config) {
                        if (endsWith(config.url, '.cshtml')) {
                            config.url = CVC.appPath + 'CVCAppView/Load?viewUrl=' + config.url;
                        }

                        return config;
                    },

                    'response': function (response) {
                        if (!response.data) {
                            return response;
                        }

                        var defer = $q.defer();
                        CVC.ng.http.handleResponse(response, defer);
                        return defer.promise;
                    },

                    'responseError': function (ngError) {
                        var defer = $q.defer();

                        if (!ngError.data) {
                            CVC.ng.http.handleNonCVCErrorResponse(ngError, defer);
                        } else {
                            CVC.ng.http.handleResponse(ngError, defer);
                        }

                        return defer.promise;
                    }

                };
            }]);
        }
    ]);

    function endsWith(str, suffix) {
        if (suffix.length > str.length) {
            return false;
        }

        return str.indexOf(suffix, str.length - suffix.length) !== -1;
    }

})((CVC || (CVC = {})), (angular || undefined));