/*
  COMPONENTE FOOTER (PIE DE PÁGINA)
  Componente reutilizable que muestra información del pie de página
*/

// Importación básica de Angular para crear el componente
import { Component } from '@angular/core';

/*
  CONFIGURACIÓN DEL COMPONENTE FOOTER
*/
@Component({
  // Selector: Nombre del tag HTML para usar este componente (<app-footer>)
  selector: 'app-footer',

  // standalone: true = Componente independiente (no necesita NgModule)
  standalone: true,

  // imports: Array vacío porque este componente no usa otros módulos
  // Si necesitáramos RouterModule para enlaces, lo agregaríamos aquí
  imports: [],

  // Template HTML que define la estructura visual del footer
  templateUrl: './footer.html',

  // Estilos CSS específicos para este componente
  styleUrl: './footer.css'
})

/*
  CLASE DEL COMPONENTE
  Por ahora está vacía porque el footer solo muestra contenido estático
  Aquí podrías agregar propiedades como:
  - Año actual dinámico
  - Enlaces a redes sociales
  - Información de contacto
*/
export class FooterComponent {
  // Sin propiedades ni métodos por ahora
}
