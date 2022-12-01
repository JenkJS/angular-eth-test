import { Injectable, OnInit } from '@angular/core';
import {providers, ethers, Contract} from "ethers";
import {Observable} from "rxjs";
import {Location} from "@angular/common";

const abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"guy","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"}]
const adress =  '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6'




const provider = new ethers.providers.Web3Provider(window.ethereum)
const signer = provider.getSigner()




declare let window:any;

@Injectable({
  providedIn: 'root'
})

export class ConnectService implements OnInit {
 nounce: number = 0
  constructor(private location: Location,) {

  }
  connectMetaMasWallet = async ()=>{
    await provider.send("eth_requestAccounts", []).then(
      ()=> {
        console.log('success')
        this.location.go("main")
        window.location.reload()
      }
    )
  }
  ngOnInit (): void {
  }

  onConnect(): void {
    if (window.ethereum) {
      if (localStorage.getItem('locked')) {
        localStorage.removeItem('locked');
      }
      this.connectMetaMasWallet()
    }
  }
  async getStatus(txHash:string){
   return await  provider.waitForTransaction(txHash,1,0)
  }


 async checkConnect():Promise<boolean> {
   let unlock = await provider.listAccounts()
   // window.location.reload()
   return unlock.length>0
  }
   async test (): Promise<void> {
     const contract  = new ethers.Contract(adress, abi, signer)
  let result
       // @ts-ignore
      await contract.approve(adress, ethers.utils.formatUnits(1,'wei')).then((el)=>{
  if(el){
    this.getStatus(el.hash).then((e)=>console.log(e))
    result = el
  }
     })
     return result
  }
  async fc():Promise<number>{
  return  await provider.getTransactionCount(signer.getAddress())

  }
}

