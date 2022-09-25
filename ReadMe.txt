--Tools used
mySQL workbench
mySQL server
Visual studio
install postman
install json formatter in browser to display the data in a nice format

From mySQL workbench
Create database rainfalldb;

--Created DB
use rainfalldb;
create table `rainfalldata`(
		`RowID` int(11) not null auto_increment,
		`Xref` int(5) not null,
        `Yref` int(5) not null,
        `Date` DATE not null,
        `Value` int(5) not null,
        primary key (`RowID`)
        ) ENGINE=InnoDB AUTO_INCREMENT =0 DEFAULT COLLATE=utf8mb4_0900_ai_ci;


--inserted these data on the DB table
insert into rainfalldata(xref,yref,date,Value)
values(1,148, date_add('1990/1/1', interval 1 year),'3020');

insert into rainfalldata(xref,yref,date,Value)
values(1,148, date_add('1991/1/1', interval 1 year),'2820');

insert into rainfalldata(xref,yref,date,Value)
values(1,148, date_add('1992/1/1', interval 1 year),'3040');

insert into rainfalldata(xref,yref,date,Value)
values(1,148, date_add('1993/1/1', interval 1 year),'2880');

--stored procedure which inserts and update records
CREATE DEFINER=`root`@`localhost` PROCEDURE `RainfalldataAddOrEdit`(
IN _RowID INT,
IN _Xref INT,
IN _Yref INT,
IN _Date datetime,
IN _Value INT
)
BEGIN
 IF _RowID = 0 THEN
 INSERT INTO rainfalldata(Xref,Yref,Date,Value)
 values(_Xref,_Yref,_Date,_Value);
 
 SET _RowID = last_insert_id();
 
 else
 UPDATE rainfalldata
 set Xref = _Xref,
 Yref = _Yref,
 Date = _Date,
 Value =_Value
 where RowID = _RowID;
 
 END IF;
 SELECT _RowID AS 'RowID';
END

--initiallise node
npm init

--install dependencies/npm packages
npm install -save express@4.18.1
npm install -save mysql@2.18.1
npm install -save body-parser@1.20.0


--install nodemon
--this makes sure you dont have to rerun node each time chnages are commented
npm i -g nodemon
nodemon index.js

--refer to index.js to see code which reads the data and connects to the DB
--Run the index.js using
node index.js

--Then go to the browser to loaded
http://localhost:3000/rainfalldata/

--to get the row 1 data loaded
http://localhost:3000/rainfalldata/1

--using postman, post, get, delete reaquest to test the rest of the code


--how to fix Client does not support authentication protocol requested by server; consider upgrading MySQL client error
cd to the bin folder of mysql server in cmd prompt
mysql --version
mysql -u root -p
CREATE USER 'sqluser'@'%' IDENTIFIED WITH mysql_native_password BY 'password';
GRANT ALL PRIVILEGES ON *.* TO 'sqluser'@'%';
FLUSH PRIVILEGES;

In mysql workbench, server => users and privileges, update the sqluser with new password and update it in code

In powershell run the cmd below if you hit the error
nodemon.ps1 cannot be loaded because running  scripts is disabled on this system. For more information, see about_Execution_Policies at  https:/go.microsoft.com/fwlink/?LinkID=135170
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser


