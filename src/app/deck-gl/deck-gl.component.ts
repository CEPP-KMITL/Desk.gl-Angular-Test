import { Component, OnDestroy, OnInit } from '@angular/core';
// @ts-ignore
import { Deck } from '@deck.gl/core';
// @ts-ignore
import { GoogleMapsOverlay as DeckOverlay } from '@deck.gl/google-maps';
// @ts-ignore
import { GeoJsonLayer } from '@deck.gl/layers';
// @ts-ignore
import { ScatterplotLayer, ArcLayer } from '@deck.gl/layers';
// @ts-ignore
import { HeatmapLayer } from '@deck.gl/aggregation-layers';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Loader } from '@googlemaps/js-api-loader';
import { getSafePropertyAccessString } from '@angular/compiler';

@Component({
  selector: 'app-deck-gl',
  templateUrl: './deck-gl.component.html',
  styleUrls: ['./deck-gl.component.css']
})
export class DeckGlComponent implements OnInit, OnDestroy {

  // london
  // INITIAL_VIEW_STATE = {
  //   latitude: 37.8,
  //   longitude: -122.45,
  //   zoom: 13
  // };

  COUNTRIES = 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_admin_0_scale_rank.geojson'; //eslint-disable-line
  AIR_PORTS = 'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson';
  INCIDENT_TH = 'https://event.longdo.com/feed/json';

  model = {
    option: 1
  }

  deckgl: Deck;
  basemap: GeoJsonLayer;
  scatter: ScatterplotLayer;
  heatmap: HeatmapLayer;

  INITIAL_VIEW_STATE = {
    latitude: 13.756331,
    longitude: 100.501762, // BKK
    //zoom: 6,
    zoom: 7.5
    // bearing: 0, // rotate
    // pitch: 0 // blending
  };

  // Set your Google Maps API key here or via environment variable in environment.ts file
  GOOGLE_MAPS_API_KEY = environment.GoogleMapsAPIKey;

  map?: google.maps.Map;
  center: google.maps.LatLngLiteral = { lat: 13.756331, lng: 100.501762 }; // BKK
  overlay: DeckOverlay;

  constructor() { }
  ngOnInit(): void {
    let loader = new Loader({
      apiKey: this.GOOGLE_MAPS_API_KEY
    })

    loader.load().then(() => {
      this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
        center: this.center,
        zoom: 8
      });
      this.overlay = new DeckOverlay()
      this.changeOption();
      this.overlay.setMap(this.map);
    })
  }

  ngOnDestroy(): void {
    console.log("ngOnDestroy");
    // this.deckgl.setProps({
    //   layers: []
    // });
  }

  public initial() {
    // this.basemap = this.basemapBasicLayer();

    console.log("init");
    this.deckgl.setProps({
      layers: []
    });
  }

  public visibleState() {
    console.log("be hide");
    this.basemap.setProps({
      visible: 0
    });
  }

  public changeOption() {
    console.log("change option");
    if (this.model.option == 0)
      this.overlay.setProps({
        layers: []
      });
    else if (this.model.option == 1) {
      this.scatter = this.scatterLayer();
      this.overlay.setProps({
        layers: [this.scatter]
      });
    }
    else if (this.model.option == 2) {
      this.heatmap = this.heatmapLayer();
      this.overlay.setProps({
        layers: [this.heatmap]
      });
    }
  }

  // public deck = () => new Deck({
  //   initialViewState: this.INITIAL_VIEW_STATE,
  //   controller: true,
  // });

  // public basemapBasicLayer = () => {
  //   return new GeoJsonLayer({
  //     id: 'base-map',
  //     data: this.COUNTRIES,
  //     // Styles
  //     stroked: true,
  //     filled: true,
  //     lineWidthMinPixels: 2,
  //     opacity: 0.4,
  //     getLineDashArray: [3, 3],
  //     getLineColor: [60, 60, 60],
  //     getFillColor: [200, 200, 200],
  //   })
  // }

  public scatterLayer = () => {
    return new ScatterplotLayer({
      id: 'scatter',
      data: this.INCIDENT_TH,
      pickable: true,
      opacity: 0.8,
      getRadius: 4,
      radiusScale: 80,
      radiusMinPixels: 4,
      radiusMaxPixels: 12,
      getPosition: (d: any) => [parseFloat(d.longitude), parseFloat(d.latitude)],
      getColor: [255, 0, 0]
    })
  }

  public heatmapLayer = () => {
    return new HeatmapLayer({
      id: 'heatmap',
      data: this.INCIDENT_TH,
      getPosition: (d: any) => [parseFloat(d.longitude), parseFloat(d.latitude)],
      getWeight: 10,
      radiusPixels: 60,
      debounceTimeout: 20,
    })
  }

  public getClick() {
    console.log(typeof (this.model.option))
    console.log(this.model.option)
  }
  public clickDelete() {
    console.log("delete something")
    delete this.deckgl;
  }

}
