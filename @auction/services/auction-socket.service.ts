import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuctionSocketService {

  constructor(private _http: HttpClient) {
  }

  connectToAuctionRoom(auctionGuid: string, socketId: string) {
    return this._http.post(
      environment.rts_base_path + '/api/auction/connect-auction-room/' + socketId + '/' + auctionGuid, {});
  }

  leaveFromAuctionRoom(auctionGuid: string, socketId: string) {
    return this._http.post(
      environment.rts_base_path + '/api/auction/leave/' + socketId + '/' + auctionGuid, {});
  }
}
