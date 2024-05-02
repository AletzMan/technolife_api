CREATE DATABASE expressdb;

CREATE TABLE users (
  id SERIAL primary KEY,
  name varchar(20) DEFAULT NULL,
  lastname varchar(100) DEFAULT NULL,
  genrer varchar(50) DEFAULT NULL,
  email varchar(200) DEFAULT NULL unique,
  password varchar(300) DEFAULT NULL,
  privileges int NOT NULL,
  datebirth varchar(50) DEFAULT NULL,
  phonenumber varchar(15) DEFAULT NULL,
  registration_date varchar(50) DEFAULT NULL,
  oldpasswords json DEFAULT NULL,
  token_reset_password varchar(500) DEFAULT NULL,
  image varchar(500) DEFAULT 'default'
);

CREATE TABLE customers (
  id SERIAL primary KEY,
  name varchar(20) DEFAULT NULL,
  lastname varchar(100) DEFAULT NULL,
  genrer varchar(50) DEFAULT NULL,
  email varchar(200) DEFAULT NULL unique,
  password varchar(300) DEFAULT NULL,
  privileges int NOT NULL,
  datebirth varchar(50) DEFAULT NULL,
  phonenumber varchar(15) DEFAULT NULL,
  registration_date varchar(50) DEFAULT NULL,
  oldpasswords json DEFAULT NULL,
  token_reset_password varchar(500) DEFAULT NULL,
  image varchar(500) DEFAULT 'default'
);

INSERT INTO users(name, lastname, genrer, email, privileges, registration_date, oldpasswords, image) 
VALUES('Alexander', 'Garcia Alonso', 'Male', 'alejo_2986@hotmail.com', 0, '2022-01-13T06:00:00.000Z', '[{"password": "2dd9ff82635b9e0d87455b8e33f7b55e4fdac7f7eba177951f06882df3d158a9bd4a7263fe76248843f7c214fc79a5601658cfb1f3430d3c961c5ae496f8d07b0d3e6c93527cc87aacbaff6eaf78009fec2b87109cb6aaf5decb4af047350c87b2d57fa4deb02a4de2747c"}, {"password": "05c9bd977c5b2b5941cbe19dd3823520ffa8e7979abe972fc7a98be01b152e688f0e1a08b57ae0bb7360d886743d230729155aa01dcca5cfa3c232c3d25b622b732574f126c0a53b9b488fbbb4cdd2f99d25a02b5df586adc9b67bd793af5d36f593857d0bba00b2255594"}]', 'https://firebasestorage.googleapis.com/v0/b/technolife-c974d.appspot.com/o/profilephotos%2FProfilePhoto.webp?alt=media&token=8b1906ef-7e1a-465b-a650-3a86ff72a1d0&_gl=1*mixmia*_ga*NTE3NDMwOTgwLjE2OTYyNjM1MjM.*_ga_CW55HF8NVT*MTY5OTI2MDc5MS44LjEuMTY5OTI2MTI2My42MC4wLjA.');

CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name varchar(200) DEFAULT NULL,
  name_abbr varchar(10) DEFAULT NULL
);

CREATE TABLE subcategories (
id SERIAL PRIMARY KEY,
  category_id int DEFAULT NULL,
  name varchar(200) DEFAULT NULL,
  name_abbr varchar(10) DEFAULT NULL
);

CREATE TABLE alerts_inventory (
  id SERIAL PRIMARY KEY UNIQUE,
  name varchar(100) DEFAULT NULL,
  quantity int DEFAULT NULL
);

CREATE TABLE brands (
  id SERIAL PRIMARY KEY UNIQUE,
  name varchar(50) DEFAULT NULL UNIQUE,
  logo varchar(300) DEFAULT NULL,
  created_date timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  last_modified timestamp NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE coupons (
  id SERIAL PRIMARY KEY UNIQUE,
  code varchar(255) NOT NULL,
  description varchar(255) NOT NULL,
  discount decimal(10,2) NOT NULL,
  limits int DEFAULT NULL,
  uses int DEFAULT '0',
  start_date varchar(50) NOT NULL,
  end_date varchar(50) NOT NULL
);

CREATE TABLE favorites (
  id SERIAL PRIMARY KEY UNIQUE,
  user_id int NOT NULL,
  item_id varchar(15) NOT NULL,
  CONSTRAINT fk_favorite_id FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE newsletters (
  id SERIAL PRIMARY KEY UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  register_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY UNIQUE,
  order_id varchar(20) DEFAULT NULL UNIQUE,
  user_id int DEFAULT NULL,
  creation_date timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  state varchar(50) DEFAULT 'PENDING',
  address_id int DEFAULT NULL,
  total_price varchar(20) DEFAULT NULL
);

CREATE TABLE order_details (
  id SERIAL PRIMARY KEY UNIQUE,
  order_id varchar(20) DEFAULT NULL,
  item_id varchar(10) DEFAULT NULL,
  quantity int DEFAULT NULL,
  CONSTRAINT fk_order_id FOREIGN KEY (order_id) REFERENCES orders(order_id)
);

CREATE TABLE products (
  id SERIAL UNIQUE PRIMARY KEY UNIQUE,
  sku varchar(50) UNIQUE,
  title varchar(500) DEFAULT NULL,
  name varchar(50) DEFAULT NULL,
  description text,
  rating decimal(10,2) DEFAULT NULL,
  specs json DEFAULT NULL,
  image varchar(255) DEFAULT NULL,
  slideImages json DEFAULT NULL,
  brand varchar(255) DEFAULT NULL,
  brandLogo varchar(255) DEFAULT NULL,
  category varchar(255) DEFAULT NULL,
  subcategory varchar(255) DEFAULT NULL,
  sameDayDelivery boolean DEFAULT NULL,
  storePickUp boolean DEFAULT NULL,
  price decimal(10,2) DEFAULT NULL,
  isDiscounted boolean DEFAULT NULL,
  discount int DEFAULT NULL,
  isNew boolean DEFAULT NULL,
  isSale boolean DEFAULT NULL,
  isFreeShipping boolean DEFAULT NULL,
  isClearance boolean DEFAULT NULL,
  createdDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  lastModified TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  inventoryQuantity int DEFAULT NULL,
  minimuninventoryQuantity int DEFAULT NULL,
  soldQuantity int DEFAULT NULL,
  status varchar(20) DEFAULT 'active'
);

CREATE TABLE shipping_address (
  id SERIAL PRIMARY KEY,
  user_id int REFERENCES users(id),
  name varchar(100) DEFAULT NULL,
  last_name varchar(100) DEFAULT NULL,
  phone_number varchar(15) DEFAULT NULL,
  street_name varchar(50) DEFAULT NULL,
  street_number int DEFAULT NULL,
  postal_code int DEFAULT NULL,
  colonia varchar(100) DEFAULT NULL,
  city varchar(100) DEFAULT NULL,
  state varchar(100) DEFAULT NULL
);