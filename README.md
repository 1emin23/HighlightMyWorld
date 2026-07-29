# HighlightMyWorld

PostgreSQL ve interaktif SVG haritası kullanan, ziyaret edilen ülkeleri işaretlemeye yarayan server-side rendered bir gezi takip uygulaması.

## Özellikler

- Ziyaret edilen ülkelerin SVG haritasında gösterilmesi
- Ülke adına göre arama ve listeye ekleme
- Toplam ziyaret edilen ülke sayısı
- Aynı ülkenin tekrar eklenmesini engelleme
- Tüm ziyaret kayıtlarını temizleme endpoint’i
- PostgreSQL ile kalıcı veri saklama

## Teknolojiler

- Node.js ve Express
- PostgreSQL ve `pg`
- EJS
- SVG, HTML, CSS ve JavaScript
- dotenv

## Gereksinimler

- Node.js
- PostgreSQL
- `world` isimli veritabanı
- `countries` ve `visited_countries` tabloları

## Kurulum

```bash
npm install
```

Kök dizinde `.env` dosyası oluşturun:

```env
DB_USER=postgres
DB_PASSWORD=your_password
PORT=3000
```

Ardından uygulamayı başlatın:

```bash
node index.js
```

Uygulama [http://localhost:3000](http://localhost:3000) adresinde açılır.

## Veri akışı

Ana sayfa `visited_countries` tablosundaki ülke kodlarını okur. Yeni ülke ekleme işlemi `countries` tablosunda ülke adını arar ve eşleşen ülke kodunu `visited_countries` tablosuna kaydeder.

## Notlar

Veritabanı şeması repository’de bulunmadığı için PostgreSQL tabloları uygulamayı çalıştırmadan önce hazırlanmalıdır.
