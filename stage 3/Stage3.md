# Portfolio Project – Technical Documentation (Stage 3)

## Dairy Direct – Connecting Farms Directly with Consumers



Backend: **Django REST Framework**  

Database: **PostgreSQL**  

Frontend: **Web (HTML, CSS, JavaScript / React optional)**



---



# 0. User Stories and Mockups



## Must Have

- As a consumer, I want to register/login so that I can place orders.

- As a farm owner, I want to register/login so that I can manage my products.

- As a farm owner, I want to add/edit/delete products so inventory stays accurate.

- As a farm owner, I want to set daily capacity so I avoid accepting too many orders.

- As a consumer, I want to browse available products and farms.

- As a consumer, I want to place orders.

- As a farm owner, I want to update order status.

- As a consumer, I want to track my orders.

- As the system, I must prevent ordering out-of-stock items.



## Should Have

- As a consumer, I want to see my order history.

- As a farm owner, I want to view analytics about sales.



## Could Have

- As a farm owner, I want to export data reports.

- As a consumer, I want to add favorite products.



## Won't Have

- AI recommendations  

- Real-time delivery tracking  

- Mobile app version  

- Automated logistics  



---



## Mockups

Mockups were designed using **Figma** and include:

- Login / Signup Page

- Product Listing Page

- Farm Dashboard

- Checkout Page

- Order History



---



# 1. System Architecture



## High-Level Components

- **Frontend**: Web application (HTML / CSS / JavaScript / React).

- **Backend**: Python + Django REST Framework (DRF).

- **Database**: PostgreSQL relational database.

- **External API**: Moyasar payment gateway.



## Data Flow

Farm Owner / Consumer → Frontend → Django REST API → PostgreSQL → Response → User  

Django API ↔ External Payment API



## Architecture Diagram (Text)

