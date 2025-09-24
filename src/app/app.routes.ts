/*
  CONFIGURACIÓN DE RUTAS DE LA APLICACIÓN
  Define qué componente se muestra para cada URL
*/

// Importa el tipo Routes desde Angular Router
import { Routes } from '@angular/router';

// Importa todos los componentes de páginas que creamos
import { HomeComponent } from './pages/home/home';           // Página de inicio
import { AboutComponent } from './pages/about/about';       // Página "Sobre nosotros"
import { ProductsComponent } from './pages/products/products'; // Página de productos
import { ContactComponent } from './pages/contact/contact'; // Página de contacto

/*
  DEFINICIÓN DE RUTAS
  Array que mapea URLs a componentes específicos
*/
export const routes: Routes = [
  // Ruta raíz ('/'): Muestra la página de inicio
  { path: '', component: HomeComponent },

  // Ruta '/nosotros': Muestra la página sobre nosotros
  { path: 'nosotros', component: AboutComponent },

  // Ruta '/productos': Muestra la página de productos
  { path: 'productos', component: ProductsComponent },

  // Ruta '/contacto': Muestra la página de contacto
  { path: 'contacto', component: ContactComponent },

  // Ruta comodín (**): Captura cualquier URL no definida arriba
  // redirectTo: '': Redirige a la página de inicio si la URL no existe
  { path: '**', redirectTo: '' }
];
