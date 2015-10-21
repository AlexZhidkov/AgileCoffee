module App.Domain {
    export interface ISessionParams extends angular.route.IRouteParamsService {
        sessionKey: string;
    }
 }