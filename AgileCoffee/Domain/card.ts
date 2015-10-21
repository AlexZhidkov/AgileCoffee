 module App.Domain {
     export interface ICard {
         topic: string;
         totalVotes: number;
     }
     export interface IMyCard {
         isMine: boolean;
         myVotes: number;
     }

     export class Card implements ICard {
         topic: string;
         totalVotes: number;
         constructor() {
         }
     }

     export class MyCard implements IMyCard {
         isMine: boolean;
         myVotes: number;
         constructor() {
         }
     }
 }