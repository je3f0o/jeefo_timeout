/* -.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.-.
* File Name   : timeout.js
* Created at  : 2017-08-11
* Updated at  : 2017-08-30
* Author      : jeefo
* Purpose     :
* Description :
_._._._._._._._._._._._._._._._._._._._._.*/
// ignore:start

/* globals */
/* exported */

// ignore:end

var $q          = require("jeefo/q"),
	defers      = Object.create(null),
	set_timeout = setTimeout;

var $timeout = module.exports = function (fn, delay) {
	var deferred = $q.defer(),
		promise  = deferred.promise;

	promise.$timeout_id = set_timeout(function () {
		try {
			deferred.resolve(fn());
		} catch (e) {
			deferred.reject(e);
		} finally {
			delete defers[promise.$timeout_id];
		}
	}, delay);
	
	defers[promise.$timeout_id] = deferred;

	return promise;
};

$timeout.cancel = function cancel (promise) {
	if (promise && defers[promise.$timeout_id]) {
		defers[promise.$timeout_id].reject("canceled");
		delete defers[promise.$timeout_id];
		return clearTimeout(promise.$timeout_id);
	}
};
