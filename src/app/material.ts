import { importProvidersFrom } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

export const MATERIAL_IMPORTS = importProvidersFrom(
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  MatCardModule,
  MatInputModule,
  MatTableModule,
  MatSnackBarModule,
  MatDialogModule,
  MatFormFieldModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatSidenavModule,
  MatListModule
);
