#include "BluetoothSerial.h"

#define RED_LED  5    // red led pin
#define GREEN_LED  18 // green led pin

BluetoothSerial SerialBT;  // bluetooth object

void setup() {
  Serial.begin(115200);
  SerialBT.begin("ESP32_LED_Control");  // bluetooth name
  
  pinMode(RED_LED, OUTPUT);
  pinMode(GREEN_LED, OUTPUT);
  
  digitalWrite(RED_LED, LOW);   // red led off
  digitalWrite(GREEN_LED, LOW); // green led off

  Serial.println("waiting for bluetooth commands...");
}

void loop() {
  if (SerialBT.available()) {  // check bluetooth data
    String command = SerialBT.readString();
    command.trim();  // remove spaces

    Serial.print("received: ");
    Serial.println(command);

    // red led control
    if (command.equalsIgnoreCase("on red light")) {
      digitalWrite(RED_LED, HIGH);  // red led on
      Serial.println("red led is on");
    }
    if (command.equalsIgnoreCase("of red light")) {
      digitalWrite(RED_LED, LOW);  // red led off
      Serial.println("red led is off");
    }

    // green led control
    if (command.equalsIgnoreCase(" on green light")) {
      digitalWrite(GREEN_LED, HIGH);  // green led on
      Serial.println("green led is on");
    }
    if (command.equalsIgnoreCase("of green light")) {
      digitalWrite(GREEN_LED, LOW);  // green led off
      Serial.println("green led is off");
    }
  }
}
