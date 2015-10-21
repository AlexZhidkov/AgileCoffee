/// <reference path="Scripts/typings/angularjs/angular.d.ts"/>
/// <reference path="Scripts/typings/angularjs/angular-route.d.ts"/>
/// <reference path="Scripts/typings/angularfire/angularfire.d.ts"/>
/// <reference path="Scripts/typings/firebase/firebase.d.ts"/>
/// <reference path="Scripts/typings/firebase/firebase-simplelogin.d.ts"/>
module App {
    "use strict";
    var main = angular.module("agileCoffee", ["ngRoute", "ngMaterial", "firebase", "agileCoffee.main", "agileCoffee.session"]);

    main.config(routeConfig);

    routeConfig.$inject = ["$routeProvider"];
    function routeConfig($routeProvider: ng.route.IRouteProvider) : void {

        $routeProvider
            .when("/session/:sessionKey",
            {
                templateUrl: "mainView.html",
                controller: "MainCtrl as vm"
            })
            .when("/topics/:sessionKey",
            {
                templateUrl: "topicsView.html",
                controller: "MainCtrl as vm"
            })
            .otherwise(
            {
                templateUrl: "sessionView.html",
                controller: "SessionCtrl as vm"
            });
    }
}
