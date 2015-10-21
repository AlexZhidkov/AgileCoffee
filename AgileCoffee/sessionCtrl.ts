module App.Main {
    angular.module("agileCoffee.session", []);

    export interface ISessionCtrl {
        sessions: AngularFireArray;
        addSession(name: string, votes: number): void;
    }

    export class SessionCtrl implements ISessionCtrl {
        sessions: AngularFireArray;

        static $inject = ["$firebaseArray"];
        constructor(private $firebaseArray: AngularFireArrayService) {
            var sessionsRef = new Firebase("https://agilecoffee.firebaseio.com/sessions");
            this.sessions = this.$firebaseArray(sessionsRef);

            this.sessions.$loaded(x => this.removeOldSessions(sessionsRef));
        }

        private removeOldSessions(sessionsRef: Firebase) {
            var millisecondsInOneWeek = 7 * 86400000;
            var currentTime = Date.now();
            var weekAgo = currentTime - millisecondsInOneWeek;

            this.sessions.forEach(session => {
                if (session["date"] < weekAgo) {
                    sessionsRef.child(session["$id"]).remove();
                }
            });
        }

        addSession(name: string, votes: number) {
            var newSession = new Domain.Session();
            newSession.name = name;
            newSession.maximumVotes = votes;
            newSession.date = Firebase.ServerValue.TIMESTAMP;
            this.sessions.$add(newSession);
        }

        openSession(id: string) {
            console.log(id);
        }
    }
    angular
        .module("agileCoffee.session")
        .controller("SessionCtrl", SessionCtrl);
}