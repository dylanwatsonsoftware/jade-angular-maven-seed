/*global angular:false, beforeEach:false, describe:false, expect:false, it:false, inject:false */
'use strict';

var assert = chai.assert;

describe('Home Controller', function () {

    var $scope, $controller;

    beforeEach(angular.mock.module('myApp'));

    beforeEach(function () {
        inject(function ($injector) {
          $scope = {};
          $controller = $injector.get('$controller');
        });
    });

    it('HomeCtrl Exists', inject(function () {

      var hc = $controller('HomeCtrl', { $scope: $scope });

      expect(hc).not.toBe(null);
    }));
});