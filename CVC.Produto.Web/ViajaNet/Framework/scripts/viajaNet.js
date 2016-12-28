var ViajaNet = ViajaNet || {};
(function ($) {

    /* Application paths *****************************************/

    //Current application root path (including virtual directory if exists).
    ViajaNet.appPath = ViajaNet.appPath || '/';

    ViajaNet.pageLoadTime = new Date();

    //Converts given path to absolute path using ViajaNet.appPath variable.
    ViajaNet.toAbsAppPath = function (path) {
        if (path.indexOf('/') == 0) {
            path = path.substring(1);
        }

        return ViajaNet.appPath + path;
    };

    
    /* UTILS ***************************************************/

    ViajaNet.utils = ViajaNet.utils || {};

    /* Creates a name namespace.
    *  Example:
    *  var taskService = ViajaNet.utils.createNamespace(ViajaNet, 'services.task');
    *  taskService will be equal to ViajaNet.services.task
    *  first argument (root) must be defined first
    ************************************************************/
    ViajaNet.utils.createNamespace = function (root, ns) {
        var parts = ns.split('.');
        for (var i = 0; i < parts.length; i++) {
            if (typeof root[parts[i]] == 'undefined') {
                root[parts[i]] = {};
            }

            root = root[parts[i]];
        }

        return root;
    };

    /* Find and replaces a string (search) to another string (replacement) in
    *  given string (str).
    *  Example:
    *  ViajaNet.utils.replaceAll('This is a test string', 'is', 'X') = 'ThX X a test string'
    ************************************************************/
    ViajaNet.utils.replaceAll = function (str, search, replacement) {
        var fix = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        return str.replace(new RegExp(fix, 'g'), replacement);
    };

    /* Formats a string just like string.format in C#.
    *  Example:
    *  ViajaNet.utils.formatString('Hello {0}','Tuana') = 'Hello Tuana'
    ************************************************************/
    ViajaNet.utils.formatString = function () {
        if (arguments.length < 1) {
            return null;
        }

        var str = arguments[0];

        for (var i = 1; i < arguments.length; i++) {
            var placeHolder = '{' + (i - 1) + '}';
            str = ViajaNet.utils.replaceAll(str, placeHolder, arguments[i]);
        }

        return str;
    };

    ViajaNet.utils.toPascalCase = function (str) {
        if (!str || !str.length) {
            return str;
        }

        if (str.length === 1) {
            return str.charAt(0).toUpperCase();
        }

        return str.charAt(0).toUpperCase() + str.substr(1);
    }

    ViajaNet.utils.toCamelCase = function (str) {
        if (!str || !str.length) {
            return str;
        }

        if (str.length === 1) {
            return str.charAt(0).toLowerCase();
        }

        return str.charAt(0).toLowerCase() + str.substr(1);
    }

    ViajaNet.utils.truncateString = function (str, maxLength) {
        if (!str || !str.length || str.length <= maxLength) {
            return str;
        }

        return str.substr(0, maxLength);
    };

    ViajaNet.utils.truncateStringWithPostfix = function (str, maxLength, postfix) {
        postfix = postfix || '...';

        if (!str || !str.length || str.length <= maxLength) {
            return str;
        }

        if (maxLength <= postfix.length) {
            return postfix.substr(0, maxLength);
        }

        return str.substr(0, maxLength - postfix.length) + postfix;
    };

    ViajaNet.utils.isFunction = function (obj) {
        if ($) {
            //Prefer to use jQuery if possible
            return $.isFunction(obj);
        }

        //alternative for $.isFunction
        return !!(obj && obj.constructor && obj.call && obj.apply);
    };

    /**
     * parameterInfos should be an array of { name, value } objects
     * where name is query string parameter name and value is it's value.
     * includeQuestionMark is true by default.
     */
    ViajaNet.utils.buildQueryString = function (parameterInfos, includeQuestionMark) {
        if (includeQuestionMark === undefined) {
            includeQuestionMark = true;
        }

        var qs = '';

        for (var i = 0; i < parameterInfos.length; ++i) {
            var parameterInfo = parameterInfos[i];
            if (parameterInfo.value === undefined) {
                continue;
            }

            if (parameterInfo.value === null) {
                parameterInfo.value = '';
            }

            if (!qs.length) {
                if (includeQuestionMark) {
                    qs = qs + '?';
                }
            } else {
                qs = qs + '&';
            }

            if (parameterInfo.value.toJSON && typeof parameterInfo.value.toJSON === "function") {
                qs = qs + parameterInfo.name + '=' + encodeURIComponent(parameterInfo.value.toJSON());
            } else {
                qs = qs + parameterInfo.name + '=' + encodeURIComponent(parameterInfo.value);
            }
        }

        return qs;
    }

});