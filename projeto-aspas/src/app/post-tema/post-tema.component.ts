import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TemaModel } from '../model/TemaModel';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-post-tema',
  templateUrl: './post-tema.component.html',
  styleUrls: ['./post-tema.component.css']
})
export class PostTemaComponent implements OnInit {

  tema: TemaModel = new TemaModel();
  listaTemas!: TemaModel[];

  constructor(
    private temaService: TemaService,
    private router: Router,
  ) { }

  ngOnInit(){
    this.findAllTemas()
  }

  findAllTemas() {
    this.temaService.getAllTemas().subscribe((resp: TemaModel[]) =>{
      this.listaTemas = resp;
    })
  }

  findByIdTema() {
    this.temaService.getByIdTema(this.tema.idTema).subscribe((resp: TemaModel) =>{
      this.tema = resp;
    })
  }

  cadastrar() {
    if(this.tema.materia == null || this.tema.serie == null) {
      alert('Preencha o campo de nome do tema corretamente')
    }else{
      this.temaService.postTema(this.tema).subscribe((resp: TemaModel) => {
        this.tema = resp
        this.router.navigate(['/feed'])
        alert('Tema cadastrado com sucesso!')
      })
    }

  }

}
