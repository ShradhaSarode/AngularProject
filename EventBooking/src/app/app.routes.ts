import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventBookingsComponent } from './event-bookings/event-bookings.component';
import { EventListComponent } from './event-list/event-list.component';
import { HomeComponent } from './home/home.component';
import { MyBookingsComponent } from './my-bookings/my-bookings.component';
import { NewEventComponent } from './new-event/new-event.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'Home',
        pathMatch:'full'
      },
      {
        path:'Home',
        component:HomeComponent
      },
      {
        path: 'my-bookings',
        component: MyBookingsComponent
      },
      {
        path:'new-Event',
        component:NewEventComponent
      },
      {
        path:'Event-List',
        component:EventListComponent
      },
      {
        path:'event-bookings',
        component: EventBookingsComponent
      }
    
    ];
    
    // @NgModule({
    //   imports: [RouterModule.forRoot(routes)],
    //   exports: [RouterModule]
    // })
