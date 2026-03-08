import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export interface MapMarker {
  lat: number;
  lng: number;
  title: string;
  price: string;
  type: "stay" | "car" | "bike" | "experience";
  id?: string;
}

interface ListingsMapProps {
  markers: MapMarker[];
  center?: [number, number];
  zoom?: number;
  className?: string;
}

const serviceColors: Record<string, string> = {
  stay: "#013220",
  car: "#1e40af",
  bike: "#b45309",
  experience: "#7c3aed",
};

const serviceIcons: Record<string, React.FC<{ className?: string }>> = {
  stay: Home,
  car: Car,
  bike: Bike,
  experience: Compass,
};

function createMarkerIcon(type: string) {
  const color = serviceColors[type] || "#013220";
  const IconComponent = serviceIcons[type] || Home;
  const iconSvg = renderToStaticMarkup(
    <IconComponent className="w-4 h-4" />
  );

  return L.divIcon({
    className: "custom-map-marker",
    html: `<div style="
      background: ${color};
      width: 32px;
      height: 32px;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      border: 2px solid white;
    ">
      <div style="transform: rotate(45deg); color: white; display: flex; align-items: center; justify-content: center;">
        ${iconSvg}
      </div>
    </div>`,
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [0, -40],
  });
}

const ListingsMap = ({ markers, center, zoom = 10, className = "" }: ListingsMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Clean up previous map
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const defaultCenter: [number, number] = center || [20.5937, 78.9629];

    const map = L.map(mapRef.current, {
      center: defaultCenter,
      zoom,
      scrollWheelZoom: true,
      zoomControl: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    const bounds = L.latLngBounds([]);

    markers.forEach((marker) => {
      const icon = createMarkerIcon(marker.type);
      const m = L.marker([marker.lat, marker.lng], { icon }).addTo(map);

      m.bindPopup(`
        <div style="font-family: system-ui; min-width: 140px;">
          <strong style="font-size: 13px;">${marker.title}</strong>
          <div style="font-size: 12px; color: #666; margin-top: 2px;">${marker.price}</div>
          <div style="font-size: 10px; color: ${serviceColors[marker.type]}; margin-top: 4px; text-transform: capitalize; font-weight: 600;">${marker.type}</div>
        </div>
      `);

      bounds.extend([marker.lat, marker.lng]);
    });

    if (markers.length > 0 && bounds.isValid()) {
      map.fitBounds(bounds, { padding: [40, 40], maxZoom: 13 });
    }

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, [markers, center, zoom]);

  return (
    <div className={`relative ${className}`}>
      <div ref={mapRef} className="w-full h-full rounded-xl" />
      {/* Legend */}
      <div className="absolute bottom-3 left-3 z-[1000] bg-background/90 backdrop-blur-md rounded-lg border border-border p-2.5 shadow-md">
        <div className="flex flex-wrap gap-3 text-[11px]">
          {Object.entries(serviceColors).map(([type, color]) => (
            <div key={type} className="flex items-center gap-1.5">
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="capitalize text-foreground/70">{type === "stay" ? "Stays" : type === "car" ? "Cars" : type === "bike" ? "Bikes" : "Experiences"}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListingsMap;
