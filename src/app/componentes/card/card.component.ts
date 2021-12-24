import { LivroService } from 'src/app/servicos/livro.service';
import { Component, OnInit } from '@angular/core';
import { Livro } from 'src/app/Livro';
import { Router } from '@angular/router';



@Component({
  selector: 'app-cards',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardsComponent implements OnInit {

  Livros!: Livro[]
  constructor(private service: LivroService) { }

  ngOnInit(): void {
this.listarLivros()
  }

  listarLivros(){
    this.service.listar().subscribe({
      next: (resultado) => {
        console.log(resultado)
        this.Livros = <any>resultado
      },
      error: (err) => console.error(err),
      complete: () => console.info('Complete')
    })
  }
}
