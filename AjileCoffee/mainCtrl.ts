module App.Main {
    angular.module("agileCoffee.main", []);

    export interface IMainCtrl {
        sessionKey: string;
        title: string;
        votesLeft: number;
        cards: AngularFireArray;
        addTopic(text: string): void;
    }

    export class MainCtrl implements IMainCtrl {
        sessionKey: string;
        title: string;
        votesLeft: number;
        cards: AngularFireArray;
        myCards: any; // todo refactor

        static $inject = ["$routeParams", "$firebaseArray", "$firebaseObject"];

        constructor(private $routeParams: Domain.ISessionParams,
                    private $firebaseArray: AngularFireArrayService,
                    private $firebaseObject: AngularFireObjectService)
        {
            this.sessionKey = $routeParams.sessionKey;
            this.myCards = {};

            var sessionRef = new Firebase("https://agilecoffee.firebaseio.com/sessions/" + this.sessionKey);
            this.$firebaseObject(sessionRef).$loaded( session => {
                this.votesLeft = session["maximumVotes"];
                this.title = session["name"];
            });

            var cardsRef = new Firebase("https://agilecoffee.firebaseio.com/sessions/" + this.sessionKey + "/cards");
            this.cards = this.$firebaseArray(cardsRef);

        }

        addTopic(text: string) {
            var newCard = new Domain.Card();
            newCard.topic = text;
            newCard.totalVotes = 0;
            this.cards.$add(newCard).then(ref => {
                var myNewCard = new Domain.MyCard();
                myNewCard.isMine = true;
                myNewCard.myVotes = 0;
                this.myCards[ref.key()] = myNewCard;
            });
        }

        upVote(card: Domain.ICard) {
            this.votesLeft = this.votesLeft - 1;
            card.totalVotes = card.totalVotes + 1;

            this.cards.$save(card).then(ref => {
                if (angular.isDefined(this.myCards[ref.key()])) {
                    this.myCards[ref.key()].myVotes = this.myCards[ref.key()].myVotes + 1;
                } else {
                    var myNewCard = new Domain.MyCard();
                    myNewCard.isMine = false;
                    myNewCard.myVotes = 1;
                    this.myCards[ref.key()] = myNewCard;
                }
            });
        }

        downVote(card: Domain.ICard) {
            this.votesLeft = this.votesLeft + 1;
            card.totalVotes = card.totalVotes - 1;

            this.cards.$save(card).then(ref => {
                this.myCards[ref.key()].myVotes = this.myCards[ref.key()].myVotes - 1;
            });
        }

        getButtonsArray(key: string) {
            var numberOfButtons = 0;
            if (angular.isDefined(this.myCards[key])) {
                numberOfButtons = this.myCards[key].myVotes;
            }
            return [].constructor(numberOfButtons);
        }
    }
    angular
        .module("agileCoffee.main", [])
        .controller("MainCtrl", MainCtrl);
}