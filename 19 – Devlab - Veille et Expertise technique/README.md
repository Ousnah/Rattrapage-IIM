# Projet IoT : Distributeur automatique connecté 

## Objectif

Concevoir un système IoT pour un distributeur automatique permettant de suivre le niveau de remplissage en temps réel grâce à un capteur connecté à un ESP32avec communication Wi-Fi.

---

## 1. Choix du capteur

###  Capteur : **Capteur à ultrasons HC-SR04**

* Rôle : mesurer la distance entre le capteur et le niveau de remplissage des produits dans le distributeur.
* Ce choix est justifié par :

  * Une précision suffisante (2 cm à 4 m).
  * Un faible coût et largement utilisé dans des projets IoT.
  * Compatibilité avec l’ESP32 en utilisant des broches GPIO standards.

🔗 [Documentation HC-SR04](https://lastminuteengineers.com/arduino-sr04-ultrasonic-sensor-tutorial/)

---

## 2. Composants nécessaires

Voici la liste des composants nécessaires avec une justification technique et fonctionnelle pour chaque élément.

* **ESP32 (module de type DevKitC, WROOM)**

  * **Justification :** microcontrôleur performant (dual-core), Wi‑Fi intégré, GPIOs suffisantes, support de l'IDE Arduino et bibliothèques HTTP/WiFi. Permet traitement local des mesures et envoi sécurisé sur réseau.
  * **Usage :** collecte des mesures, temporisation, connexion Wi‑Fi, gestion des erreurs et retransmission.
  * **Lien :** [https://www.espressif.com/en/products/socs/esp32](https://www.espressif.com/en/products/socs/esp32)

* **HC-SR04 (capteur ultrason)**

  * **Justification :** mesure non intrusive de la distance du haut du réservoir jusqu'au produit, longue portée pratique pour distributeurs (2 cm à 4 m), réponse rapide et faible coût.
  * **Usage :** positionné au-dessus du compartiment il renvoie la distance utile pour calculer le niveau de remplissage (hauteur totale connue moins la distance mesurée).
  * **Lien :** [https://lastminuteengineers.com/arduino-sr04-ultrasonic-sensor-tutorial/](https://lastminuteengineers.com/arduino-sr04-ultrasonic-sensor-tutorial/)

* **Diviseur de tension (résistances 1 kΩ et 2 kΩ recommandées)**

  * **Justification :** l'Echo du HC-SR04 sort un signal à 5 V; l'ESP32 attend du 3.3 V max sur ses entrées. Un diviseur ramène le 5 V à \~3.3 V et protège la GPIO.
  * **Calcul :** Vout = 5V \* R2/(R1+R2) → choisir R1 = 1 kΩ (haut), R2 = 2 kΩ (bas) donne ≈ 3.33 V.
  * **Lien :** [https://learn.sparkfun.com/tutorials/voltage-dividers](https://learn.sparkfun.com/tutorials/voltage-dividers)

* **Regulateur / alimentation 5 V stable (ex : module AMS1117-5.0 ou alimentation USB 5V)**

  * **Justification :** le HC-SR04 et l'ESP32 ont besoin d'une alimentation stable. L'ESP32 fonctionne normalement via 5 V (USB) ou via régulateur 3.3 V selon le module; prévoir une alimentation capable de fournir au moins 500 mA pour stabilité.
  * **Lien :** [https://electronics.stackexchange.com/questions/15445/power-requirements-for-esp32](https://electronics.stackexchange.com/questions/15445/power-requirements-for-esp32)

* **Câblage et connectique (breadboard, jumpers mâle/femelle, bornier 2–3 points)**

  * **Justification :** prototypage et intégration propres; facilite tests et remplacement du capteur.

* **Condensateur de découplage (10 µF) près de l'alimentation**

  * **Justification :** amortit les pics de courant lors des transmissions Wi‑Fi et protège l'ESP32 des chutes de tension momentanées.

* **Boîtier / supports mécaniques (fixation capteur)**

  * **Justification :** positionnement stable du capteur pour des mesures répétables et calibrables.

---

### Remarques pour l'implantation

* **Orientation du capteur** : centré au-dessus du bac produit, perpendiculaire à la surface pour éviter réflexions parasites.
* **Calibration** : mesurer la distance au vide (bac vide) pour obtenir la hauteur totale du réservoir, puis niveau = hauteur\_totale - distance\_mesurée.
---

## 3. Code Arduino

```cpp
#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "VOTRE_SSID";
const char* password = "VOTRE_MOTDEPASSE";

String serverName = "http://example.com/api/data";

const int trigPin = 5;
const int echoPin = 18;

long duration;
int distance;

void setup() {
  Serial.begin(115200);
  pinMode(trigPin, OUTPUT);
  pinMode(echoPin, INPUT);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi connecté");
}

void loop() {
  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  duration = pulseIn(echoPin, HIGH);
  distance = duration * 0.034 / 2; 

  Serial.print("Distance: ");
  Serial.println(distance);

  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverName);
    http.addHeader("Content-Type", "application/x-www-form-urlencoded");
    String httpRequestData = "distance=" + String(distance);
    int httpResponseCode = http.POST(httpRequestData);

    if (httpResponseCode > 0) {
      Serial.print("Réponse serveur: ");
      Serial.println(httpResponseCode);
    } else {
      Serial.print("Erreur envoi: ");
      Serial.println(httpResponseCode);
    }
    http.end();
  }

  delay(60000); 
}
```

---

## 4. Fonctionnement global

1. Le capteur ultrason mesure la distance entre lui et le niveau des produits.
2. L’ESP32 calcule la valeur et l’envoie au serveur via Wi-Fi.
3. Le serveur peut analyser les données pour :

   * Déterminer si le distributeur doit être rechargé.
   * Optimiser la logistique et la maintenance.

---

##  Avantages de la solution

* Faible coût et composants facilement disponibles.
* Simplicité de mise en œuvre avec ESP32.
* Extensible à d’autres capteurs (température, ouverture, etc.).


## 5. Schéma illustré du montage
