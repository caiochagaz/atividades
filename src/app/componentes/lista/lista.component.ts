import { Livro } from './../../Livro';
import { LivroService } from 'src/app/servicos/livro.service';
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {

  Livros!: Livro []

  isModal: boolean = false

  idLivroParaExcluir!: any

  idProcurado!: any

  constructor(private service:LivroService, private router:Router) { }

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

  cancelarAcao(){
    this.isModal=false

  }

  deletar(){

  }

  editar(id:any){
    this.router.navigate(['editar/' + id])

  }

  // confirmarAcao(){
  //   this.service.deleteLivro(this.IdProcurado).subscribe({
  //     next: (resultado) => {
  //       console.log("Livro excluído")
  //       this.listarLivros()
  //     this.isModal=false},
  //     error: (erro) => console.error(erro),
  //     complete: () => console.info('Processo de exclusão completo')
  //   })

  // }

  confirmarAcao(){
    this.service.deletarLivro(this.idLivroParaExcluir).subscribe({
          next: (reultado) => {
            console.log('livro excluído')
            this.listarLivros()
            
          },
          error: (err) => console.error(err),
          complete: () => {console.info('Processo de exclusão concluido')
          this.isModal=false}
    })
  }

  mostraModal(id:any){
    this.isModal = true
    this.idLivroParaExcluir = id
  }

  
}
