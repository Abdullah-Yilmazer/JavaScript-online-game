# Online Counter Game / Çevrimiçi Sayaç Oyunu

[Türkçe'ye Git](#türkçe)

## English

This project is a real-time, multiplayer counter game built using Socket.IO. Players join rooms and can increment or decrement a counter in a turn-based manner.

### Features

*   Real-time multiplayer gaming experience
*   Turn-based game mechanics
*   Username input and uniqueness check
*   Room creation and invitation system
*   Automatic game cleanup on disconnections

### Technologies

*   Node.js
*   Express
*   Socket.IO
*   HTML
*   JavaScript

### Installation

1.  Clone this repository:

    ```bash
    git clone https://github.com/Abdullah-Yilmazer/JavaScript-online-game.git
    ```

2.  Navigate to the server directory:

    ```bash
    cd server
    ```

3.  Install the dependencies:

    ```bash
    npm install
    ```

4.  Start the server:

    ```bash
    node server.js
    ```

5.  Open the client files in a web browser (e.g., `index.html`). (!! To add multiple users from the same device, you must log in from different browsers.)

### How to Play

1.  Enter a username.
2.  Create a room or join an invitation.
3.  Once the game starts, use the buttons to increment or decrement the counter when it's your turn.
4.  You will need to wait for the other player's move.

### Folder Structure

JavaScript-online-game/
├── server/         # Server-side code
│   ├── server.js   # Main server file
│   └── package.json # Dependencies
└── index.html      # Client file
└── README.md       # Project description

### License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/Abdullah-Yilmazer/JavaScript-online-game?tab=MIT-1-ov-file) file for details.

<a id="türkçe"></a>

## Türkçe

Bu proje, Socket.IO kullanılarak oluşturulmuş gerçek zamanlı, çok oyunculu bir sayaç oyunudur. Oyuncular odalara katılır ve sıra tabanlı olarak bir sayacı artırabilir veya azaltabilirler.

### Özellikler

*   Gerçek zamanlı çok oyunculu oyun deneyimi
*   Sıra tabanlı oyun mekaniği
*   Kullanıcı adı girişi ve benzersizlik kontrolü
*   Oda oluşturma ve davet sistemi
*   Bağlantı kopmalarında otomatik oyun temizleme

### Teknolojiler

*   Node.js
*   Express
*   Socket.IO
*   HTML
*   JavaScript

### Kurulum

1.  Bu depoyu klonlayın:

    ```bash
    git clone https://github.com/Abdullah-Yilmazer/JavaScript-online-game.git
    ```

2.  Sunucu dizinine gidin:

    ```bash
    cd server
    ```

3.  Gerekli bağımlılıkları yükleyin:

    ```bash
    npm install
    ```

4.  Sunucuyu başlatın:

    ```bash
    node server.js
    ```

5.  İstemci dosyalarını bir web tarayıcısında açın (örneğin, `index.html`). (!! Aynı cihazadan birden çok kullanıcı eklemek için farklı tarayıcılardan giriş yapmanız gerekmektedir.)

### Nasıl Oynanır

1.  Bir kullanıcı adı girin.
2.  Bir oda oluşturun veya bir davete katılın.
3.  Oyun başladığında, sıra size geldiğinde sayacı artırmak veya azaltmak için butonları kullanın.
4.  Diğer oyuncunun hamlesini beklemeniz gerekecektir.

### Klasör Yapısı

JavaScript-online-game/
├── server/         # Sunucu kodları
│   ├── server.js   # Ana sunucu dosyası
│   └── package.json # Bağımlılıklar
└── index.html      # İstemci dosyası
└── README.md       # Proje açıklaması

### Lisans

Bu proje MIT lisansı ile lisanslanmıştır. Detaylar için [LICENSE](https://github.com/Abdullah-Yilmazer/JavaScript-online-game?tab=MIT-1-ov-file) dosyasına bakın.
