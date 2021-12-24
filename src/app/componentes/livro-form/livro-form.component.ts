import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LivroService } from 'src/app/servicos/livro.service';
import { Livro } from 'src/app/Livro';

@Component({
  selector: 'app-livro-form',
  templateUrl: './livro-form.component.html',
  styleUrls: ['./livro-form.component.css']
})

export class LivroFormComponent implements OnInit {
  form!: FormGroup

  //false - significa que estamos utilizando o form para cadastro - aparecer botão cadastrar
  //true - significa que estamos utilizando o form para edição - aparecer botão alterar
  verificarStatus:boolean = true

  livro!: any

  acao!:string

  isModal!: boolean


  constructor(private fb: FormBuilder, private service: LivroService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      id: [null],
      nome: [null],
      autor: [null],
      foto: [null],
      gender: [null]
    })

    const id_entrada = <any>this.route.snapshot.params['id']
    console.log("id de entrada:" + id_entrada)
    this.service.getUmLivro(id_entrada).subscribe({
      next: (resultado) => {console.log(resultado)
      this.livro = resultado
      this.updateForm(this.livro)
      this.verificarStatus = false},
      error: (erro) => console.error(erro),
      complete: () => console.info("Livro encontrado!")
    })

  }

  salvarLivro() {

    console.log(this.form.value)
    if(this.form.value.id!= null){
      //editar
      this.service.editLivro(this.form.value.id,this.form.value).subscribe({
        next: (resultado) => console.log("Livro editado com sucesso"),
        error: (erro) => console.error(erro),
        complete: () => {console.info("Edição completada com êxito")
        }
      })

      this.isModal = true
      this.acao = "cadastro"

    }else{
      //cadastrar
      this.service.addLivro(this.form.value).subscribe({
        next: (resultado) => console.log("Livro adicionado com sucesso!"),
        error: (erro) => console.error(erro),
        complete: () => {
          console.info("Cadastro completo com sucesso!")

        }
      })

      this.acao = "editado"
      this.isModal = true
    }



  }

  updateForm(livro:any){
    this.form.patchValue({
      id:livro.id,
      nome:livro.nome,
      autor:livro.autor,
      genero:livro.genero,
      foto:livro.foto

    })
  }

  fecharModal(){
    this.router.navigate(['/lista'])
  }


}
