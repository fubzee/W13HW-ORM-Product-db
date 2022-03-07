# W13HW-ORM-Product_DB
## Important links

Git Repo



W13HW - Part 1 
https://drive.google.com/file/d/1l5GEweBUoqbXHY6iDXGCw42g2ViTD3bI/view

W13HW - Part 2 
https://drive.google.com/file/d/1G04sl5ZycfcA5yHayhQK6g1nf-h4DPL_/view

W13HW - Part 3 
https://drive.google.com/file/d/1BhnKxg466aLNi6j2pCmMr8KW8yVaWRdm/view


## Table of Contents: 

* [Introduction](#Introduction)
* [Installation](#Installation)
* [Licence](#Licence)
* [Usage](#usage)
* [Contributing](#contributing)
* [Testing](#Testing)
* [GIT Profile](#gitprofile)
* [Questions](#questions)

## Introduction

Using Insomnia, this code supports the basic CRUD functionality using the ORM and APIs and creates and maintains an ecommerce database (ecommerce_db) with the following tables: 

- Categories
  - Table that groups products into categories and captures the category name
- Products
  - Products showing the product, the category that is falls under, price and stock    
- Tags
  - Tags that provide additional information about the product, like colour, genre of music, etc  
- Product_tag
  - Relationship table the indicates the many-to-many relationship between tags and products.

### CRUD

|      Add      |         Read  (Query)         |      Update     |      Delete      |  
|---------------| ------------------------------|-----------------|------------------|
|  Categories   |   All Categories              |   Categories    |     Categories   |
|  Tags         |   Category by ID              |   Tags          |      Tags        |
|  Products     |   All Tags                    |   Products      |     Products     |
|               |   Tags by ID                  |                 |                  |
|               |   All Products                |                 |                  |
|               |   Products by ID              |                 |                  |



## Installation

Node JS
Express
MySQL
Sequeliser

## Licence

There are no licences.

## Usage

This application requires the following NPM packages:

- mysql2 
- Express
- dotenv (has been excluded from the GIT repo for security reasons)


## Contributing

 If you contribute please refer to the Github link below:
 - raise an issue 
 - create a feature branch. 
 When ready to merge your code please raise a pull request for review and feedback.

## Testing

CRUD functions were tested using Insomnia to make calls to the application - the links above show the different api calls being tested
   

## Git Profile  :link:

https://github.com/fubzee/W12HW-EMPLOYEES-DBMS


### Questions :question:

* If you have any questions about this application please email me at smarti-dev@outlook.com
