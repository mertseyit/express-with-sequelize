# E-Ticaret API Projesi

Bu proje, ExpressJS ve Sequelize kullanılarak oluşturulmuş basit bir e-ticaret API'sidir. Satıcıların ürün ekleyebildiği ve kullanıcıların ürün satın alabildiği bir platform sunar.

## Özellikler

- Kullanıcı kimlik doğrulama ve yetkilendirme
- Ürün ekleme, listeleme, güncelleme ve silme
- Ürün satın alma işlemleri
- İlişkili tablolardan ortak verileri çekme

## Teknolojiler

- Node.js
- Express.js
- Sequelize ORM
- MariaDB (veya tercih ettiğiniz başka bir veritabanı. Sequelize kütüphanesi oldukça geniş bir kütüphane desteği sunmaktadır.Farklı veri tabanlarını nasıl kullanacağınızı görmek için [Sequelize Resmi Web Sitesini](https://sequelize.org/docs/v6/getting-started/) ziyaret edebilirsiniz.)

## Kurulum

1. Projeyi lokalinize klonlayın:

   `git clone https://github.com/mertseyit/express-with-sequelize.git `

2. Proje dizinine gidin ve paketleri indirin

   `cd express-with-sequelize `

   `npm install`

   Not: eğer `nodemon` paketini daha öncelerden global olarak indirmediyseniz: `npm i nodemon` ile nodemon paketini de projenize dahil edin.

## Ortam Değişkenlerinin Kurulması

src klasörü içindeki `.env` dosyasınında kendi ayarlamalarınızı yapınız.

## Projenin Başlatılması

`npm run dev`

## Veritabanının ve Tabloların Oluşturulması

Proje içerisinde migrate sistemi olmadığından dolayı veri tabanlarını kendiniz oluşturmanız gerekmektedir. Bu veri tabanlarını istediğiniz DBMS üzerinden `models` klasörü altındaki yer alan modelleri referans alarak oluşturabilirsiniz.

# Postman

Postman ortamlarında API'leri test etmek isterseniz `test_api.json` dosyasını postman uygulamanıza import edebilirsiniz.

## Lisanslama

Bu proje MIT lisansı ile lisanlanmıştır.
