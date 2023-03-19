import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface IHero {
  id: number;
  name: string;
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  heroes: IHero[] = [];
  newHero: IHero = {
    id: 5,
    name: 'NewHero'
  }

  /* чтобы это инжектировалось нужно в модуль подключить HttpClientModule */
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getData()
  }

  getData() {
    /*     this.http.get('api/heroes').subscribe(res => console.log(res))
        this.http.get('api/users').subscribe(res => console.log(res)) */

        /* Благодаря тому, что в модуле был изменен рутовый адрес, теперь указывать api в ендпоинте не нужно: */
    this.http.get<IHero[]>('heroes').subscribe({
      next: res => this.heroes = res,
      error: error => console.log(error)
    })    
  }

  postData() {
    const url = 'heroes'
    const data = this.newHero
    const headers = new HttpHeaders({'Content-Type': 'application/json'})
    const options = {headers}

    this.http.post<IHero>(url, data, options).subscribe( res => {
      this.getData()
      console.log(res)
    })
  }

  getHeroByName() {
    const url = 'heroes'
    /* Здесь через set реализован второй способ установки хэдера */
    const headers = new HttpHeaders().set('Content-Type', 'application/json')
    let params = new HttpParams
    /* парамс имутабельный, поэтому нужно присвоение */
    /* Если вместо params указать Id, то будет осуществлен поиск по id */
    params = params.set('name', 'Bombasto')
    const options = {headers, params}

    this.http.get<IHero>(url, options).subscribe( res => {
      this.getData()
      console.log(res)
    })

  }

}
