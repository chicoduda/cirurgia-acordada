import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Firestore, collection, addDoc, deleteDoc, doc, collectionData, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { MatCellDef, MatHeaderCellDef, MatHeaderRowDef, MatRowDef } from "@angular/material/table";
import { MatIcon } from "@angular/material/icon";
import { MatFormField, MatLabel } from "@angular/material/input";
import { MatCard } from "@angular/material/card";
import { MatToolbar } from "@angular/material/toolbar";
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, FormGroup } from '@angular/forms';
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { MatOption } from "@angular/material/select";


interface Pergunta {
  id?: string;
  texto: string;
  respostaPadrao: string;
}

@Component({
  selector: 'app-perguntas',
  templateUrl: './perguntas.component.html',
  styleUrls: ['./perguntas.component.scss'],
  imports: [MatCellDef,
    MatHeaderCellDef,
    MatHeaderRowDef,
    MatRowDef,
    MatIcon,
    MatFormField,
    MatLabel,
    MatCard,
    MatToolbar,
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule, 
    MatProgressSpinner, 
    MatOption
],
})
export class PerguntasComponent implements OnInit {
  form!: FormGroup;
  perguntas$!: Observable<Pergunta[]>;
  novaPergunta: Pergunta = { texto: '', respostaPadrao: '' };
  editando: Pergunta | null = null;
  carregando = true;
  displayedColumns = ['texto', 'tipo', 'categoria', 'acoes'];

  constructor(private firestore: Firestore) {}

  ngOnInit() {
    const ref = collection(this.firestore, 'perguntas');
    this.perguntas$ = collectionData(ref, { idField: 'id' }) as Observable<Pergunta[]>;
  }

  async salvarPergunta() {
    const ref = collection(this.firestore, 'perguntas');
    if (this.editando) {
      const docRef = doc(this.firestore, `perguntas/${this.editando.id}`);
      await updateDoc(docRef, { texto: this.novaPergunta.texto, respostaPadrao: this.novaPergunta.respostaPadrao });
      this.editando = null;
    } else {
      await addDoc(ref, this.novaPergunta);
    }
    this.novaPergunta = { texto: '', respostaPadrao: '' };
  }

  editarPergunta(pergunta: Pergunta) {
    this.editando = pergunta;
    this.novaPergunta = { ...pergunta };
  }

  async excluirPergunta(id?: string) {
    if (!id) return;
    const docRef = doc(this.firestore, `perguntas/${id}`);
    await deleteDoc(docRef);
  }

  cancelarEdicao() {
    this.editando = null;
    this.novaPergunta = { texto: '', respostaPadrao: '' };
  }
}
