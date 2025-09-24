
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header';
import { FooterComponent } from './components/footer/footer';

/*
  DECORADOR @Component
  Define la metadata del componente (configuración)
*/
@Component({
  // selector: El nombre del tag HTML que representa este componente (<app-root>)
  selector: 'app-root',

  // imports: Lista de componentes y módulos que este componente puede usar
  imports: [
    RouterOutlet,      // Para mostrar diferentes páginas según la ruta
    HeaderComponent,   // Nuestro componente de navegación
    FooterComponent    // Nuestro componente de pie de página
  ],

  // templateUrl: Archivo HTML que define la estructura visual
  templateUrl: './app.html',

  // styleUrl: Archivo CSS que define los estilos específicos de este componente
  styleUrl: './app.css'
})

/*
  CLASE DEL COMPONENTE
  Contiene la lógica y datos del componente
*/
export class App {
  // signal(): Crea una señal reactiva (se actualiza automáticamente en la UI)
  // protected: Solo accesible desde este componente y componentes heredados
  // readonly: No se puede modificar después de la inicialización
  protected readonly title = signal('mi-proyecto-angular');
}
