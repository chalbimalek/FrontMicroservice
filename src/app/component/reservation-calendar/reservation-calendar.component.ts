import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ReservationService } from 'src/app/service/reservation.service';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // Permet l'interaction avec les événements
import { Reservation } from '../model/Reservation';

@Component({
  selector: 'app-reservation-calendar',
  templateUrl: './reservation-calendar.component.html',
  styleUrls: ['./reservation-calendar.component.css']
})
export class ReservationCalendarComponent implements OnInit {
  reservations: Reservation[] = [];
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    events: []
  };

  constructor(
    private reservationService: ReservationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getReservations();
  }

  getReservations(): void {
    this.reservationService.getReservationsByOwner().subscribe(
      (data) => {
        this.reservations = data;
        this.updateCalendarEvents();
      },
      (error) => {
        console.error('Erreur lors de la récupération des réservations', error);
      }
    );
  }

  updateCalendarEvents(): void {
    const events = this.reservations.map((reservation) => ({
      title: `Réservé - Client ${reservation.clientId}`, // Affiche l’ID du client
      start: reservation.startDate,
      end: reservation.endDate,
      backgroundColor: reservation.status === 'ACCEPTED' ? 'green' : 'orange', // Vert si accepté, orange sinon
      borderColor: 'black',
      textColor: 'white',
    }));

    // Mettre à jour les événements du calendrier
    this.calendarOptions = { ...this.calendarOptions, events };
    this.cdr.detectChanges(); // Force l'update de l'affichage
  }
}
