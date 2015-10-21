module App.Main {
    angular.module("agileCoffee.topics", []);

    export interface ITopicsCtrl {
        cards: AngularFireArray;
    }

    export class TopicsCtrl implements ITopicsCtrl {
        cards: AngularFireArray;

        static $inject = ["$firebaseArray"];
        constructor(private $routeParams: Domain.ISessionParams, private $firebaseArray: AngularFireArrayService) {
            var sessionKey = $routeParams.sessionKey;
            var cardsRef = new Firebase("https://agilecoffee.firebaseio.com/sessions/" + sessionKey + "/cards");
            this.cards = this.$firebaseArray(cardsRef);
        }

    }
    angular
        .module("agileCoffee.topics")
        .controller("TopicsCtrl", TopicsCtrl);
}