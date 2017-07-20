import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http'
import 'rxjs/Rx'
import { Subject } from 'rxjs/Subject'
const headers = new Headers({ "Content-Type": "application/json" });
@Injectable()
export class NinjaService {
  public ninjaChanged = new Subject<any>();
  url: string = "https://morning-springs-30916.herokuapp.com/api";
  ninjas: any = [];
  constructor(private http: Http) { }

  getNinjas() {
    return this.http.get(this.url)
      .map((res: Response) => {
        const data = res.json().data;
        this.ninjas = data;
        this.ninjaChanged.next(this.ninjas)
        return this.ninjas;
      })
      .subscribe((ninjas) => {
        this.ninjas = ninjas
        this.ninjaChanged.next(this.ninjas)
      })
  }

  addNinja(ninja: any) {
    return this.http.post(`${this.url}/add`, ninja, { headers: headers })
      .map((res) => {
        return res.json()
      })
      .subscribe((ninja) => {
        this.ninjas.push(ninja.data);
      })
  }

  getNinja(index: number) {
    return this.ninjas[index];
  }

  updateNinja(index: number, ninja: any) {
    let getNinja = this.getNinja(index);
    let id = getNinja._id;
    return this.http.put(`${this.url}/add/${id}`, ninja, { headers: headers })
      .map(res => res.json())
      .subscribe((ninja) => { this.ninjas[index] = ninja; this.ninjaChanged.next(this.ninjas) }, (err) => { console.log(err) });
  }

  deleteNinja(index: any) {
    let getNinja = this.getNinja(index);
    let id = getNinja._id;
    return this.http.delete(`${this.url}/delete/${id}`)
      .map((res) => { res.json() })
      .subscribe((ninjaDelete)=>{ this.ninjas.splice(index,1); this.ninjaChanged.next(this.ninjas)})
  }
}

