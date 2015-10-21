 module App.Domain {
     export interface ISession {
         name: string;
         maximumVotes: number;
         date: number;
         cards: Domain.ICard[];
     }
     export class Session implements ISession {
         name: string;
         maximumVotes: number;
         date: number;
         cards: Domain.ICard[];
         constructor() {
         }
     }
 }