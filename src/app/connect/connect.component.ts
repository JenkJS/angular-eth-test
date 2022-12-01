import { Component, OnInit } from '@angular/core';
import {ConnectService} from './services/connect.service'
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.scss']
})
export class ConnectComponent implements OnInit{
  isSign: Boolean = false;
  constructor(private onConnect: ConnectService, private location: Location,   private route: ActivatedRoute,) {
  }

  onConnectMetamask(): void {
    this.onConnect.onConnect()
  }
  async test():Promise<void>{
    console.log( await  this.onConnect.test())
  }
  // @ts-ignore
  async checkLockWallet() {
    this.isSign = await this.onConnect.checkConnect()
    if(this.isSign){
        this.location.go("main")
    }
  }
  ngOnInit(): void {
    this.checkLockWallet()
  }

}
