import {Component, OnInit} from '@angular/core';
import {ConnectService} from "../connect/services/connect.service";
import {ConnectComponent} from "../connect/connect.component";
import {Location} from "@angular/common";



@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit{
  transaction: any
  nounce: any
  txStatus: string = 'in progress...'
  isSign: Boolean = false;

  constructor(private onConnect: ConnectService, private location: Location ) {
  }
  async checkLockWallet() {
    this.isSign = await this.onConnect.checkConnect()
    if(!this.isSign){
      this.location.go("connect")
      window.location.reload()
    }
  }
  ngOnInit(): void {
    console.log(1)
    this.checkLockWallet()
  }
  async test():Promise<void>{

      await  this.onConnect.test().then(async el=>{
        this.transaction = el
        // @ts-ignore
       this.onConnect.getStatus(el.hash).then(e=>{
          if(e.status === 1) {
            this.txStatus = 'done'
            this.onConnect.fc().then(el=>{
              this.nounce= el
            })
          }})

    })

  }
}

