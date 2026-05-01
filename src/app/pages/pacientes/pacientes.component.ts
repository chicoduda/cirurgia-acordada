import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Firestore, collection, collectionData, addDoc, doc, updateDoc, deleteDoc, DocumentData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

interface Paciente {
  id?: string;
  nome: string;
  dataNascimento: string;
  telefone?: string;
}

@Component({
  selector: 'app-pacientes',
  standalone: true,
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ]
})
export class PacientesComponent implements OnInit {
  form!: FormGroup;
  pacientes$: Observable<Paciente[]>;
  displayedColumns = ['nome', 'dataNascimento', 'telefone', 'acoes'];
  editandoId: string | null = null;
  carregando = true;

  constructor(private fb: FormBuilder, private firestore: Firestore, private snack: MatSnackBar) {
    const ref = collection(this.firestore, 'pacientes');
    this.pacientes$ = collectionData(ref, { idField: 'id' }).pipe(
      map((docs: DocumentData[]) =>
        docs.map(doc => ({
          id: doc['id'],
          nome: doc['nome'] ?? '',
          dataNascimento: doc['dataNascimento'] ?? '',
          telefone: doc['telefone'] ?? ''
        })) as Paciente[]
      ),
      tap(() => this.carregando = false)
    );
  }

  ngOnInit() {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      telefone: ['']
    });
  }

  async salvar() {
    if (this.form.invalid) return;
    const dados = this.form.value;
    const ref = collection(this.firestore, 'pacientes');

    try {
      if (this.editandoId) {
        const docRef = doc(this.firestore, `pacientes/${this.editandoId}`);
        await updateDoc(docRef, dados);
        this.snack.open('Paciente atualizado!', 'OK', { duration: 2000 });
      } else {
        await addDoc(ref, dados);
        this.snack.open('Paciente cadastrado!', 'OK', { duration: 2000 });
      }
      this.cancelar();
    } catch (error) {
      console.error(error);
      this.snack.open('Erro ao salvar paciente', 'Fechar', { duration: 3000 });
    }
  }

  editar(p: Paciente) {
    this.editandoId = p.id || null;
    this.form.patchValue(p);
  }

  async excluir(p: Paciente) {
    if (!p.id) return;
    if (!confirm('Deseja realmente excluir este paciente?')) return;

    try {
      const docRef = doc(this.firestore, `pacientes/${p.id}`);
      await deleteDoc(docRef);
      this.snack.open('Paciente excluído!', 'OK', { duration: 2000 });
    } catch (error) {
      console.error(error);
      this.snack.open('Erro ao excluir paciente', 'Fechar', { duration: 3000 });
    }
  }

  cancelar() {
    this.editandoId = null;
    this.form.reset();
  }
}
