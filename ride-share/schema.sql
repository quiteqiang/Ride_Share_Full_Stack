create schema public;

comment on schema public is 'standard public schema';

alter schema public owner to postgres;

create table if not exists passenger
(
	id serial not null
		constraint "Passager_pkey"
			primary key,
	"firstName" varchar(255),
	"lastName" varchar(255),
	"Phone" varchar(255)
);

alter table passenger owner to tim_swanson;

create table if not exists driver
(
	id integer not null
		constraint driver_pk
			primary key,
	firstname text,
	lastname text,
	phone text,
	licensenumber text
);

alter table driver owner to tim_swanson;

create table if not exists vehicle_type
(
	id integer not null
		constraint vehicle_type_pk
			primary key,
	type text
);

alter table vehicle_type owner to tim_swanson;

create table if not exists vehicle
(
	id integer not null
		constraint vehicle_pk
			primary key,
	make text,
	model text,
	color text,
	vehicletypeid integer
		constraint vehicle_vehicle_type_id_fk
			references vehicle_type,
	capacity integer,
	mpg double precision,
	licensestate text,
	licensenumber text
);

alter table vehicle owner to tim_swanson;

create table if not exists state
(
	abbreviation text not null
		constraint state_pk
			primary key,
	name text
);

alter table state owner to tim_swanson;

create table if not exists location
(
	id serial not null
		constraint "Location_pkey"
			primary key,
	name varchar(255),
	address varchar(255),
	city varchar(255),
	"zipCode" varchar(255),
	state text
);

alter table location owner to tim_swanson;

create table if not exists ride
(
	id serial not null
		constraint "Ride_pkey"
			primary key,
	date date,
	time time,
	distance real,
	"fuelPrice" real,
	fee real,
	vehicleid integer
		constraint ride_vehicle_id_fk
			references vehicle,
	fromlocationid integer
		constraint ride_location_id_fk
			references location,
	tolocationid integer
		constraint ride_location_id_fk_2
			references location
);

alter table ride owner to tim_swanson;

create table if not exists "authorization"
(
	"driverId" integer
		constraint authorization_driver_id_fk
			references driver,
	"vehicleId" integer
		constraint authorization_vehicle_id_fk
			references vehicle
);

alter table "authorization" owner to tim_swanson;

create table if not exists drivers
(
	driverid integer
		constraint drivers_driver_id_fk
			references driver,
	rideid integer
		constraint drivers_ride_id_fk
			references ride
);

alter table drivers owner to tim_swanson;

create table if not exists passengers
(
	passengerid integer not null
		constraint passengers_pk
			primary key
		constraint passengers_passenger_id_fk
			references passenger,
	rideid integer
		constraint passengers_ride_id_fk
			references ride
);

alter table passengers owner to tim_swanson;
