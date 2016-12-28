(function (ViajaNet, angular) {

    if (!angular) {
        return;
    }

    ViajaNet.ng = ViajaNet.ng || {};

    ViajaNet.ng.http = {
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
            ViajaNet.log.error(error);
        },

        showError: function (error) {
            if (error.details) {
                return ViajaNet.message.error(error.details, error.message || ViajaNet.ng.http.defaultError.message);
            } else {
                return ViajaNet.message.error(error.message || ViajaNet.ng.http.defaultError.message);
            }
        },

        handleTargetUrl: function (targetUrl) {
            if (!targetUrl) {
                location.href = ViajaNet.appPath;
            } else {
                location.href = targetUrl;
            }
        },

        handleNonViajaNetErrorResponse: function (response, defer) {
            if (response.config.vjnHandleError !== false) {
                switch (response.status) {
                    case 401:
                        ViajaNet.ng.http.handleUnAuthorizedRequest(
                            ViajaNet.ng.http.showError(ViajaNet.ng.http.defaultError401),
                            ViajaNet.appPath
                        );
                        break;
                    case 403:
                        ViajaNet.ng.http.showError(ViajaNet.ajax.defaultError403);
                        break;
                    case 404:
                        ViajaNet.ng.http.showError(ViajaNet.ajax.defaultError404);
                        break;
                    default:
                        ViajaNet.ng.http.showError(ViajaNet.ng.http.defaultError);
                        break;
                }
            }

            defer.reject(response);
        },

        handleUnAuthorizedRequest: function (messagePromise, targetUrl) {
            if (messagePromise) {
                messagePromise.done(function () {
                    ViajaNet.ng.http.handleTargetUrl(targetUrl || ViajaNet.appPath);
                });
            } else {
                ViajaNet.ng.http.handleTargetUrl(targetUrl || ViajaNet.appPath);
            }
        },

        handleResponse: function (response, defer) {
            var originalData = response.data;

            if (originalData.success === true) {
                response.data = originalData.result;
                defer.resolve(response);

                if (originalData.targetUrl) {
                    ViajaNet.ng.http.handleTargetUrl(originalData.targetUrl);
                }
            } else if (originalData.success === false) {
                var messagePromise = null;

                if (originalData.error) {
                    if (response.config.vjnHandleError !== false) {
                        messagePromise = ViajaNet.ng.http.showError(originalData.error);
                    }
                } else {
                    originalData.error = defaultError;
                }

                ViajaNet.ng.http.logError(originalData.error);

                response.data = originalData.error;
                defer.reject(response);

                if (response.status == 401 && response.config.vjnHandleError !== false) {
                    ViajaNet.ng.http.handleUnAuthorizedRequest(messagePromise, originalData.targetUrl);
                }
            } else { //not wrapped result
                defer.resolve(response);
            }
        }
    }

    var viajaNetModule = angular.module('ViajaNet', []);

    viajaNetModule.config([
        '$httpProvider', function ($httpProvider) {
            $httpProvider.interceptors.push(['$q', function ($q) {

                return {

                    'request': function (config) {
                        if (endsWith(config.url, '.cshtml')) {
                            config.url = ViajaNet.appPath + 'ViajaNetAppView/Load?viewUrl=' + config.url;
                        }

                        return config;
                    },

                    'response': function (response) {
                        if (!response.data) {
                            return response;
                        }

                        var defer = $q.defer();
                        ViajaNet.ng.http.handleResponse(response, defer);
                        return defer.promise;
                    },

                    'responseError': function (ngError) {
                        var defer = $q.defer();

                        if (!ngError.data) {
                            ViajaNet.ng.http.handleNonViajaNetErrorResponse(ngError, defer);
                        } else {
                            ViajaNet.ng.http.handleResponse(ngError, defer);
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

})((ViajaNet || (ViajaNet = {})), (angular || undefined));