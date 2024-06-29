
#  SharedSpace : Shared Workspace Management

ShareSpot is an innovative full-stack application designed to revolutionize the management of shared workspaces. 

## Project Video Link

https://drive.google.com/file/d/10dp_aNtIzPAXeT--xesHVnB1K8EDKTrX/view?usp=sharing
# Project Details and It's Future Scope :

- A secure and seamless user authentication system, allowing users to register, log in, and manage their profiles with ease.
- Administrators benefit from a comprehensive dashboard to oversee workspace availability, bookings, and resources, with intuitive tools for updating workspace details such as photos, amenities, and rules.
- The real-time booking system enables users to reserve workspaces, meeting rooms, and other facilities effortlessly, while the calendar view helps manage and view schedules efficiently.
- ShareSpace features robust inventory management for workspace resources and a reservation system for equipment.
- Integrated secure payment gateways allow users to process booking fees and memberships, generating invoices and tracking payment history, ensuring a smooth and efficient experience for both users and administrators.

## Tech Stack

- HTML
- CSS
- Bootstrap
- JavaScript
- NodeJS
- ExpressJS
- Localhost/phpMyadmin (for database)
## Run Locally

Clone the Repository
```bash
  https://github.com/Khushishah224/ShareSpot.git
```
Navigate to the ShareSpot directory
```bash
  cd ShareSpot
```
Navigate to the backend directory
```bash
  cd backend
```

Install Xampp and click on MySQL->admin
- create Database "share_spot"
- Create Tables in it
```bash
    create table user_details(
	full_name varchar(100),
	email varchar(50),
	mobile_no bigint,
	uname varchar(60),
	pass varchar(20)
)

create table venue_details(
	venue_id int ,
	venue_name varchar(50),
	city varchar(30),
	capacity bigint,
	room_type varchar(60),
	adress varchar(90)
)

create table venue_history(
	uname varchar(60),
	venue_name varchar(50),
	time_duration time,
	amount_paid bigint,
	event_date date
)

create table current_booked(
	uname varchar(60),
	venue_name_booked varchar(50),
	date_duration date,
	extra_chairs bigint,
	extra_desk bigint,
	extra_projector bigint
)

create table Payment_history(
	uname varchar(60),
	Amount_paid bigint,
	payment_Date date,
	payment_mode varchar(60)
)

 ```
Install backend dependencies
```bash
  npm install
```
Start the backend server
```bash
nodemon index.js
```
Open your browser and navigate to 
```bash
http://localhost:7000
```
## Project Team Members

- [Khushishah224](https://github.com/Khushishah224)

- [Jeelpala07](https://github.com/Jeelpala07)

- [KshamtaShah](https://github.com/KshamtaShah)

- [Nimit-Jain-30](https://github.com/Nimit-Jain-30)
