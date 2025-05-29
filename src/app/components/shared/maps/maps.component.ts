import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import * as L from 'leaflet';
import { GeocodingService } from './geocoding.service';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss'],
})
export class MapsComponent implements OnInit, OnChanges, OnDestroy {
  map: any;
  isAddress = true;

  @Input()
  address = '';

  constructor(private geocodingService: GeocodingService) {}
  ngOnDestroy(): void {
    if (this.map) {
      this.map.remove();
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['address']) {
      if (this.map) {
        this.map.remove();
        this.getMap();
      }
    }
  }
  icon = new L.Icon({
    iconSize: [50, 41],
    iconAnchor: [13, 41],
    iconUrl: 'assets/blue-marker.svg',
  });

  initMap(lat: number, lon: number): void {
    this.map = L.map('map', {
      center: [lat, lon],
      zoom: 13,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: '© OpenStreetMap',
    }).addTo(this.map);

    const marker = L.marker([lat, lon], { icon: this.icon });
    marker.addTo(this.map).bindPopup(this.address).openPopup();
  }

  ngOnInit(): void {
    this.getMap();
  }

  getMap(): void {
    this.geocodingService.geocodeAddress(this.address).subscribe((response) => {
      if (response && response.length > 0) {
        const lat = parseFloat(response[0].lat);
        const lon = parseFloat(response[0].lon);
        this.initMap(lat, lon);
      } else {
        this.isAddress = false;
      }
    });
  }
}
